import { createHash } from 'node:crypto';
import { z } from 'zod';

const buckets = new Map();
const WINDOW = 60_000;
const LIMIT = 5;
const MAX_BUCKETS = 10_000;
const MAX_BODY = 32_768;
const email = z.string().trim().email().max(254);
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120).refine(value => !/[\r\n]/.test(value)),
  email,
  project: z.string().trim().min(1).max(5000),
}).strict();
export const emailSchema = z.object({ email }).strict();

class RequestError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const json = (body, status = 200, headers = {}) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store', ...headers },
});

export async function readPayload(request) {
  const origin = request.headers.get('origin');
  const allowed = new Set([new URL(request.url).origin, 'https://setarez.com', 'https://www.setarez.com']);
  for (const url of [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`, process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]) {
    if (url) allowed.add(new URL(url).origin);
  }
  if (!origin || !allowed.has(origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new RequestError(403, 'Please submit this form from the Setarez website.');
  }
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new RequestError(415, 'A JSON request is required.');
  }
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BODY)) {
    throw new RequestError(413, 'Request is too large.');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError(400, 'Invalid request body.');
  const chunks = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        throw new RequestError(413, 'Request is too large.');
      }
      chunks.push(value);
    }
    const bytes = Buffer.concat(chunks);
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError(400, 'Invalid request body.');
  } finally { reader.releaseLock(); }
}

export async function rateLimited(request, { now = Date.now(), fetcher = fetch } = {}) {
  // Vercel overwrites this header with the connecting client's IP. Never use a
  // user-provided cookie or email address to identify a rate-limit bucket.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const key = `setarez:enquiries:${createHash('sha256').update(ip).digest('hex')}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url || token) {
    if (!url || !token || !url.startsWith('https://')) throw new Error('Rate limit configuration incomplete');
    const response = await fetcher(url, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end; return n", '1', key]),
      signal: AbortSignal.timeout(3000), cache: 'no-store',
    });
    if (!response.ok) throw new Error('Rate limit service unavailable');
    const data = await response.json();
    if (data.error || !Number.isInteger(data.result) || data.result < 1) throw new Error('Invalid rate limit response');
    return data.result > LIMIT;
  }
  // Bounded per-instance fallback. Distributed enforcement requires the Redis
  // variables above or a project-level WAF rule; this fallback is not global.
  for (const [storedKey, bucket] of buckets) if (bucket.expires <= now) buckets.delete(storedKey);
  const bucket = buckets.get(key);
  if (bucket) { bucket.count += 1; return bucket.count > LIMIT; }
  if (buckets.size >= MAX_BUCKETS) return true;
  buckets.set(key, { count: 1, expires: now + WINDOW });
  return false;
}

export function createEnquiryHandler({ schema, compose, verifyBot, limiter = rateLimited, fetcher = fetch }) {
  return async function POST(request) {
    try {
      const payload = await readPayload(request);
      const validation = schema.safeParse(payload);
      if (!validation.success) return json({ error: 'Please check your form details.' }, 400);
      if (await limiter(request)) return json({ error: 'Too many requests. Please try again in a minute.' }, 429, { 'Retry-After': '60' });
      if (await verifyBot()) return json({ error: 'Unable to verify this request. Please refresh and try again.' }, 403);
      if (!process.env.RESEND_API_KEY) return json({ error: 'Email delivery is not configured. Please email sales@setarez.com.' }, 503);
      const message = compose(validation.data);
      const response = await fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'User-Agent': 'setarez-website/1.0' },
        body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL || 'Setarez Website <website@setarez.com>', to: ['sales@setarez.com'], reply_to: validation.data.email, ...message }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        console.error('Enquiry delivery rejected', { status: response.status });
        return json({ error: 'Email delivery failed. Please try again or email sales@setarez.com.' }, 502);
      }
      return json({ success: true });
    } catch (error) {
      if (error instanceof RequestError) return json({ error: error.message }, error.status);
      // Do not log request bodies, email addresses, credentials, or provider responses.
      console.error('Enquiry processing failed', { type: error?.name || 'Error' });
      return json({ error: 'Unable to process your request. Please try again or email sales@setarez.com.' }, 503);
    }
  };
}
