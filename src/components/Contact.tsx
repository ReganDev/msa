import { useState } from 'react'
import { ADDRESS, ADDRESS_NOTE, EMAIL } from '../data'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: wire up a mail service here (e.g. Formspree, EmailJS, or a serverless
    // function). Read the fields from `new FormData(e.currentTarget)` and POST them,
    // or set this <form>'s `action`/`method` to your provider's endpoint.
    // For now the form validates client-side and shows a confirmation only.

    setSubmitted(true)
  }

  return (
    <section className="contact section section--alt" id="contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <h2 className="section__title section__title--ruled">Book a consultation</h2>
          <p className="contact__lead">
            Have a question or want to arrange an assessment? Send a message and Matthew
            will get back to you.
          </p>

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

        {submitted ? (
          <div className="contact__form form__success" role="status">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>
            <div>
              <p className="form__success-title">Thank you &mdash; your message is ready to send.</p>
              <p className="form__success-text">
                Matthew will be in touch as soon as possible. (Note: connect a mail service
                to deliver submissions automatically.)
              </p>
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
              <input type="checkbox" name="newsletter" value="yes" />
              <span>Sign up for news and updates</span>
            </label>

            <button type="submit" className="btn btn--primary btn--lg form__submit">
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
