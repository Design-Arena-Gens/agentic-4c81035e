# Atlas WhatsApp Job Application Agent

Atlas is a WhatsApp-native recruitment assistant. Candidates message your verified WhatsApp number, Atlas qualifies them through multi-turn conversations, and the team receives a structured application digest moments later. The web UI ships with a marketing overview, while the `/api/whatsapp` endpoint powers the automation.

## Stack

- Next.js 16 (App Router, Node.js runtime API routes)
- React 18 with TypeScript
- Lightweight in-memory + JSON persistence for captured applications
- Optional Resend email notifications for operator handoff

## Local Development

```bash
npm install
npm run dev
```

Then expose your dev server if you want to test with Twilio (e.g. `npx localtunnel --port 3000`).

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `TWILIO_AUTH_TOKEN` | Verifies that requests hitting `/api/whatsapp` actually originate from Twilio. Required in production. |
| `WHATSAPP_OPERATOR_EMAIL` | Address that receives application digests. Optional but recommended. |
| `RESEND_API_KEY` | Enables transactional email delivery through Resend. Without it, digests are logged to stdout. |

Configure these in Vercel via **Settings → Environment Variables** before deploying.

## Twilio WhatsApp Setup

1. Create a WhatsApp sender (Sandbox is fine for testing).
2. Set the incoming message webhook URL to `https://<your-domain>/api/whatsapp`.
3. Ensure the HTTP method is `POST`.
4. Add `TWILIO_AUTH_TOKEN` to Vercel so signatures can be validated.

Atlas stores active conversation context in-memory (warm serverless instances) and writes final submissions to `data/submissions.json`. Swap `persistSubmission` with your preferred database or ATS integration when ready.

## API Surface

- `POST /api/whatsapp` — Twilio webhook endpoint. Accepts `application/x-www-form-urlencoded` payloads, responds with TwiML to drive the conversation.
- `GET /api/dashboard` — Returns a JSON snapshot of captured submissions during the current runtime session. Useful for quick admin views.

## Deployment

The project is deployment-ready on Vercel. Use the provided production command:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-4c81035e
```

After deploying, verify the live app:

```bash
curl https://agentic-4c81035e.vercel.app
```

## Extending Atlas

- **Job catalog** — Update `lib/jobs.ts` or connect to your ATS.
- **Scoring logic** — Enhance `findJobMatch` with vector search or LLM powered routing.
- **Persistence** — Replace the JSON writer with a proper database (Supabase, DynamoDB, etc.).
- **Notifications** — Hook into Slack or CRM webhooks inside `lib/notifications.ts`.

Happy hiring!
