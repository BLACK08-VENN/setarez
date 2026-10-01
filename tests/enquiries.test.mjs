import test from 'node:test';
import assert from 'node:assert/strict';
import { createEnquiryHandler, contactSchema, emailSchema, readPayload, rateLimited } from '../lib/enquiries.mjs';

const request = (body, headers = {}) => new Request('https://setarez.com/api/contact', {
  method: 'POST', headers: { origin: 'https://setarez.com', 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body),
});
const valid = { name: 'Client', email: 'client@example.com', project: 'Classroom installation' };
function handler(overrides = {}) {
  return createEnquiryHandler({ schema: contactSchema, compose: ({ project }) => ({ subject: 'Enquiry', text: project }), verifyBot: async () => false, limiter: async () => false, fetcher: async () => new Response('{}', { status: 200 }), ...overrides });
}

test('both schemas reject malformed or unexpected input', () => {
  assert.equal(contactSchema.safeParse({ ...valid, name: 'Client\r\nInjected' }).success, false);
  assert.equal(contactSchema.safeParse({ ...valid, project: 'x'.repeat(5001) }).success, false);
  assert.equal(emailSchema.safeParse({ email: 'bad' }).success, false);
  assert.equal(emailSchema.safeParse({ email: valid.email, to: 'attacker@example.com' }).success, false);
});
test('cross-site and missing origins cannot send mail', async () => {
  let sent = false;
  const post = handler({ fetcher: async () => { sent = true; } });
  assert.equal((await post(request(valid, { origin: 'https://attacker.example' }))).status, 403);
  const noOrigin = request(valid); noOrigin.headers.delete('origin');
  assert.equal((await post(noOrigin)).status, 403);
  assert.equal(sent, false);
});
test('bad JSON, wrong content type and oversized streamed bodies are rejected', async () => {
  const post = handler();
  assert.equal((await post(request('{'))).status, 400);
  assert.equal((await post(request(valid, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await post(request('x'.repeat(32769)))).status, 413);
  assert.deepEqual(await readPayload(request(valid)), valid);
});
test('bots and rate-limited clients cannot reach the email provider', async () => {
  const fetcher = async () => { throw new Error('Must never deliver'); };
  assert.equal((await handler({ verifyBot: async () => true, fetcher })(request(valid))).status, 403);
  const response = await handler({ limiter: async () => true, fetcher })(request(valid));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
});
test('per-instance limiter shares one bucket across both endpoints and expires', async () => {
  const req = request(valid, { 'x-forwarded-for': '192.0.2.101' });
  for (let i = 0; i < 5; i++) assert.equal(await rateLimited(req, { now: 100 }), false);
  const other = new Request('https://setarez.com/api/client-email', { headers: { 'x-forwarded-for': '192.0.2.101' } });
  assert.equal(await rateLimited(other, { now: 100 }), true);
  assert.equal(await rateLimited(other, { now: 60100 }), false);
});
test('shared limiter uses atomic Redis counting and rejects service failures', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  try {
    const fetcher = async (url, options) => {
      const command = JSON.parse(options.body);
      assert.equal(command[0], 'EVAL');
      assert.ok(command[3].startsWith('setarez:enquiries:'));
      assert.ok(!command[3].includes('192.0.2'));
      return Response.json({ result: 6 });
    };
    assert.equal(await rateLimited(request(valid), { fetcher }), true);
    await assert.rejects(rateLimited(request(valid), { fetcher: async () => new Response('', { status: 500 }) }));
  } finally {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  }
});
test('legitimate requests use fixed recipients, plain text and no-store responses', async () => {
  process.env.RESEND_API_KEY = 'test-key';
  try {
    let delivered;
    const response = await handler({ fetcher: async (url, options) => { delivered = JSON.parse(options.body); return Response.json({ id: 'test' }); } })(request(valid));
    assert.equal(response.status, 200);
    assert.deepEqual(delivered.to, ['sales@setarez.com']);
    assert.equal(delivered.reply_to, valid.email);
    assert.equal(delivered.text, valid.project);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal((await handler({ fetcher: async () => new Response('', { status: 429 }) })(request(valid))).status, 502);
    assert.equal((await handler({ verifyBot: async () => { throw new Error('verification unavailable'); } })(request(valid))).status, 503);
  } finally { delete process.env.RESEND_API_KEY; }
});
