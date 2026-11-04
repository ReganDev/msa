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
const DEFAULT_TO = 'info@knightosteopathy.com'

/**
 * Resend's shared sender works immediately without domain verification, which
 * makes it right for testing and wrong for production — mail from it is not
 * from Matthew's domain. Set CONTACT_FROM to an address on a domain verified in
 * Resend before going live.
 */
const DEFAULT_FROM = 'Knight Osteopathy <onboarding@resend.dev>'

const LIMIT = { name: 100, email: 254, message: 5000 }

/** For the links in the confirmation email. Kept in step with the live domain. */
const SITE = 'https://www.orpingtonosteopaths.com'
const PRACTICE = 'Knight Osteopathy'
const PRACTICE_ADDRESS = 'Tennis Centre, Avebury Rd, Orpington BR6 9SA'

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

  // Matthew has the enquiry; the visitor's receipt is best-effort and never
  // turns a delivered enquiry into an error.
  const confirmed = await sendConfirmation(apiKey, firstName, email)
  return json({ ok: true, confirmed }, 200)
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/**
 * A short receipt to the visitor: the message arrived, Matthew will reply, how
 * to book meanwhile, and where to go if it's urgent.
 *
 * Only sent once CONTACT_FROM is set. Resend's shared test sender can only
 * mail the Resend account's own address, so without a verified domain every
 * receipt would be rejected.
 *
 * It deliberately carries nothing the visitor typed except a first name that
 * passes a strict check. Anyone can put any address in the form, so an email
 * that echoed the message back would let the form send arbitrary text to
 * strangers under Matthew's name.
 */
async function sendConfirmation(apiKey: string, firstName: string, email: string) {
  const from = process.env.CONTACT_FROM
  if (!from) return false

  const name = /^[\p{L}\p{M}' .-]{1,40}$/u.test(firstName) ? firstName : ''
  const greeting = name ? `Hi ${name},` : 'Hello,'
  const booking = `${SITE}/booking`

  const text = [
    greeting,
    '',
    'Thank you for getting in touch. Your message has reached me, and I’ll reply as soon as I can.',
    '',
    'If you’d like to add anything, just reply to this email.',
    '',
    `If you’d like to book in the meantime, you can see prices and choose a time here: ${booking}`,
    '',
    'Please don’t use email for anything urgent. If you need medical help quickly, call NHS 111, or 999 in an emergency.',
    '',
    'Matthew Knight',
    'Osteopath & Sports Massage Therapist',
    `${PRACTICE} · ${PRACTICE_ADDRESS}`,
  ].join('\n')

  const html = `<!doctype html>
<html lang="en-GB">
  <body style="margin:0;padding:0;background:#f7f9fa;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fa;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e3e9ec;border-radius:16px;">
            <tr>
              <td style="padding:36px 36px 28px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1e2a32;">
                <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;color:#1e2a32;">Thank you for getting in touch</p>
                <p style="margin:0 0 16px;">${escapeHtml(greeting)}</p>
                <p style="margin:0 0 16px;">Your message has reached me, and I&rsquo;ll reply as soon as I can. If you&rsquo;d like to add anything, just reply to this email.</p>
                <p style="margin:0 0 24px;">If you&rsquo;d like to book in the meantime, you can see prices and choose a time online.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                  <tr>
                    <td style="border-radius:999px;background:#2f7d8a;">
                      <a href="${booking}" style="display:inline-block;padding:13px 26px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;">See prices and book</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 28px;padding:14px 18px;background:#dce8e7;border-radius:10px;font-size:14px;line-height:1.55;">Please don&rsquo;t use email for anything urgent. If you need medical help quickly, call NHS&nbsp;111, or 999 in an emergency.</p>
                <p style="margin:0;font-size:15px;line-height:1.5;">Matthew Knight<br><span style="color:#3f4d56;">Osteopath &amp; Sports Massage Therapist</span></p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 36px 24px;border-top:1px solid #e3e9ec;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#3f4d56;">
                ${PRACTICE} &middot; ${PRACTICE_ADDRESS}<br>
                <a href="${SITE}" style="color:#24616b;">orpingtonosteopaths.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        // Replies land in Matthew's inbox, like any other email to him.
        reply_to: process.env.CONTACT_TO || DEFAULT_TO,
        subject: `Thanks for your message to ${PRACTICE}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) {
      console.error('Resend rejected the confirmation', response.status, await response.text())
      return false
    }
    return true
  } catch (error) {
    console.error('Could not send the confirmation', error)
    return false
  }
}
