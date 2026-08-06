/**
 * Contact form delivery, running as a Vercel Function so RESEND_API_KEY stays
 * on the server. A Resend key is a send-as-this-domain credential: anything the
 * browser can read, anyone can read, so it must never be bundled into the
 * client or exposed through a VITE_-prefixed variable.
 *
 * This file must stay self-contained. Vercel transpiles each file under api/ on
 * its own rather than bundling it, so an import reaching outside this directory
 * still points at `../src/...` at runtime, where nothing was emitted, and the
 * function dies on startup with ERR_MODULE_NOT_FOUND. Bare npm imports are fine;
 * relative ones out of api/ are not.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

/**
 * Kept in step with EMAIL in src/data.ts by hand, for the reason above. Setting
 * CONTACT_TO overrides it without touching either.
 */
const DEFAULT_TO = 'msaknight2000@gmail.com'

/**
 * Resend's shared sender works immediately without domain verification, which
 * makes it right for testing and wrong for production — mail from it is not
 * from Matthew's domain. Set CONTACT_FROM to an address on a domain verified in
 * Resend before going live.
 */
const DEFAULT_FROM = 'Knight Osteopathy <onboarding@resend.dev>'

const LIMIT = { name: 100, email: 254, message: 5000 }

interface Payload {
  firstName?: unknown
  lastName?: unknown
  email?: unknown
  message?: unknown
  consent?: unknown
  company?: unknown
}

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

/**
 * Vercel resolves handlers differently per framework: named method exports
 * (`export function POST`) are the Next.js convention, while a project with no
 * framework — this one — needs a default export exposing `fetch`. Exporting the
 * wrong shape leaves the module with no handler Vercel recognises, and the
 * request fails as a bare 500 before any code here runs.
 */
export default {
  fetch: handleRequest,
}

async function handleRequest(request: Request): Promise<Response> {
  // The fetch handler receives every method, so POST is enforced here.
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405)
  }

  const apiKey = process.env.RESEND_API_KEY

  // Missing config is the deploy's problem, not the visitor's, but they still
  // need a way through — the client pairs this with a mailto fallback.
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — contact form cannot send.')
    return json(
      { error: 'The contact form isn’t connected yet. Please email me directly.' },
      503,
    )
  }

  let payload: Payload
  try {
    payload = (await request.json()) as Payload
  } catch {
    return json({ error: 'Could not read that submission. Please try again.' }, 400)
  }

  // Honeypot. No person sees this field, so anything in it came from a bot.
  // Answering 200 leaves the bot nothing to learn from the difference.
  if (clean(payload.company, LIMIT.name)) return json({ ok: true }, 200)

  const firstName = clean(payload.firstName, LIMIT.name)
  const lastName = clean(payload.lastName, LIMIT.name)
  const email = clean(payload.email, LIMIT.email)
  const message = clean(payload.message, LIMIT.message)

  if (!firstName || !lastName || !email || !message) {
    return json({ error: 'Please fill in every field.' }, 400)
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'That email address doesn’t look right.' }, 400)
  }

  // The tick is a GDPR record, so it is re-checked here rather than trusted to
  // the browser, and written into the message for Matthew's own audit trail.
  if (payload.consent !== true) {
    return json({ error: 'Please tick the box so Matthew can reply to you.' }, 400)
  }

  const name = `${firstName} ${lastName}`

  let response: Response
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_TO || DEFAULT_TO],
        // So replying in his mail client reaches the patient, not Resend.
        reply_to: email,
        subject: `Website enquiry — ${name}`,
        text: [
          `From:    ${name}`,
          `Email:   ${email}`,
          `Sent:    ${new Date().toUTCString()}`,
          `Consent: agreed to be contacted about this enquiry`,
          '',
          message,
        ].join('\n'),
      }),
    })
  } catch (error) {
    console.error('Could not reach Resend', error)
    return json(
      { error: 'Something went wrong sending your message. Please email me directly.' },
      502,
    )
  }

  if (!response.ok) {
    // Logged server-side only: upstream errors can echo request detail, and
    // none of it belongs in a response the visitor can read.
    console.error('Resend rejected the message', response.status, await response.text())
    return json(
      { error: 'Something went wrong sending your message. Please email me directly.' },
      502,
    )
  }

  return json({ ok: true }, 200)
}
