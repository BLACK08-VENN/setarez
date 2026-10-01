# Security maintenance

Both email APIs validate same-origin JSON requests, cap streamed bodies at 32 KiB,
validate strict schemas, verify BotID, and send only plain text to sales@setarez.com.
Provider failures return generic messages and requests time out after ten seconds.
No personal enquiry data or credentials are logged.

BotID Basic is enabled in code for both endpoints on Vercel. Deep Analysis is not
required and has not been enabled. Test real browser submissions on a preview
before publishing. Direct automated POST requests should be rejected in production.

## Shared rate limiting

Both endpoints share a five-request-per-minute bucket per client IP. Set these
server-only environment variables in Vercel to enable cross-instance enforcement:

- UPSTASH_REDIS_REST_URL: HTTPS REST endpoint for an Upstash Redis database.
- UPSTASH_REDIS_REST_TOKEN: secret REST token for that database.

The Redis counter increments and sets its expiry atomically. IP addresses are
hashed before use as Redis keys. If configured Redis is unavailable, submissions
fail closed with 503. Without Redis, a bounded in-memory fallback protects each
instance only; it is **not** a global rate limit. Alternatively, configure an edge
WAF rate limit for POST /api/contact and POST /api/client-email. Review real traffic
before enforcing new WAF rules. Do not describe global rate limiting as enabled
until its configuration is verified.

## Browser policy

A per-request nonce authorizes Next.js scripts. CSP disallows inline scripts without
a nonce, framing, plugins and third-party form actions. Google Fonts and Vercel
analytics are allowed. HTML is dynamically rendered and not publicly cached to
avoid reusing nonces. Do not cache nonce-bearing HTML in front of this deployment.

## Operations still to verify in account settings

Require MFA for GitHub, Vercel and email administrators. Review collaborators,
protect the production branch, enable spending and error alerts, and document
rollback and recovery. Account settings cannot be inferred from source code.
Weekly dependency updates and a security/build workflow are configured in GitHub.

Report suspected security issues privately to sales@setarez.com. Never post
credentials, personal client information or exploitable details in public issues.
