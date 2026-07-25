import { useState } from 'react'
import { ADDRESS, ADDRESS_NOTE, EMAIL, FORMSPREE_ENDPOINT } from '../data'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const isConfigured = !FORMSPREE_ENDPOINT.includes('REPLACE_WITH_FORM_ID')

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!isConfigured) {
      setError(
        'This form isn’t connected yet. Please email me directly and I’ll get straight back to you.',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      if (response.ok) {
        form.reset()
        setStatus('success')
      } else {
        const data = await response.json().catch(() => null)
        setError(
          data?.errors?.map((err: { message: string }) => err.message).join(', ') ||
            'Something went wrong sending your message. Please try again, or email me directly.',
        )
        setStatus('error')
      }
    } catch {
      setError(
        'Couldn’t reach the server — please check your connection and try again, or email me directly.',
      )
      setStatus('error')
    }
  }

  return (
    <section className="contact section section--alt" id="contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <h2 className="section__title section__title--ruled">Get in touch</h2>
          <p className="contact__lead">
            Have a question or want to arrange an assessment? Send a message and Matthew
            will get back to you.
          </p>

          <div className="contact__consult">
            <h3 className="contact__consult-title">Free 15-minute phone consultation</h3>
            <p className="contact__consult-text">
              Email me to arrange a free call. We&rsquo;ll talk about your pain or
              discomfort and what I can do to help.
            </p>
          </div>

          <ul className="contact__points">
            <li className="contact__point">
              <span className="contact__point-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </dd>
              </div>
            </li>
            <li className="contact__point">
              <span className="contact__point-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              </span>
              <div>
                <dt>Location</dt>
                <dd>
                  {ADDRESS}
                  <br />
                  {ADDRESS_NOTE}
                </dd>
              </div>
            </li>
          </ul>
        </div>

        {status === 'success' ? (
          <div className="contact__form form__success" role="status">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>
            <div>
              <p className="form__success-title">Thank you &mdash; your message has been sent.</p>
              <p className="form__success-text">
                Matthew will be in touch as soon as possible.
              </p>
              <button
                type="button"
                className="btn btn--light form__again"
                onClick={() => setStatus('idle')}
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate={false}>
            <div className="form__row">
              <div className="form__group">
                <label className="form__label" htmlFor="firstName">
                  First name <span className="form__req" aria-hidden="true">*</span>
                </label>
                <input className="form__input" type="text" id="firstName" name="firstName" autoComplete="given-name" required />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="lastName">
                  Last name <span className="form__req" aria-hidden="true">*</span>
                </label>
                <input className="form__input" type="text" id="lastName" name="lastName" autoComplete="family-name" required />
              </div>
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email <span className="form__req" aria-hidden="true">*</span>
              </label>
              <input className="form__input" type="email" id="email" name="email" autoComplete="email" required />
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="message">
                Message <span className="form__req" aria-hidden="true">*</span>
              </label>
              <textarea className="form__textarea" id="message" name="message" required />
            </div>

            <label className="form__check">
              <input type="checkbox" name="consent" value="yes" required />
              <span>
                I agree to Matthew contacting me about my enquiry.{' '}
                <span className="form__req" aria-hidden="true">*</span>
              </span>
            </label>

            {status === 'error' && (
              <p className="form__error" role="alert">
                {error}{' '}
                <a href={`mailto:${EMAIL}?subject=Enquiry`}>Email {EMAIL}</a>.
              </p>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--lg form__submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
