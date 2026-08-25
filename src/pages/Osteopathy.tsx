import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import BookButton from '../components/BookButton'
import ConditionGrid from '../components/ConditionGrid'
import MapPanel from '../components/MapPanel'

const intro = [
  'Osteopathy specialises in assessing, treating and managing pain using a holistic approach. This means that osteopaths are trained to look beyond the site of your pain and assess other structures that might be the source of your discomfort. Osteopaths can diagnose and treat issues affecting muscles, joints, ligaments, tendons and connective tissues. Assessments account for all contributing factors, from movement patterns and lifestyle choices to the way various areas of the body interact.',
  'Osteopathy integrates manual therapy with long-term rehabilitation. By combining hands-on techniques, personalised exercise and lifestyle advice, Matthew helps you resolve current symptoms, build strength and prevent injury recurrence. This comprehensive approach means you recover fully and return to the activities that matter most. Treatment includes hands-on techniques, movement and strength assessments, tailored rehabilitation exercises and practical advice.',
]

const pillars = [
  {
    title: 'A Complete Approach to Your Health',
    text: 'Your body is assessed as a whole rather than as a set of separate parts, taking in how your joints, muscles and nervous system work together alongside your work, training and daily demands.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.4 9.5h17.2M3.4 14.5h17.2" />
        <path d="M12 3a15 15 0 0 0 0 18 15 15 0 0 0 0-18z" />
      </svg>
    ),
  },
  {
    title: 'Finding the Root Cause',
    text: 'The site of your pain is not always where the problem starts. Assessment looks beyond the symptom to what is driving it, so treatment addresses the cause rather than chasing the ache.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.7-3.7" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: 'Care Built Around You',
    text: 'No two people present the same way. Your plan is shaped by your history, your goals and what you need to get back to, whether that is sport, work or simply moving comfortably again.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20.5S4.5 15.6 4.5 10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.4-7.5 10.3-7.5 10.3z" />
      </svg>
    ),
  },
  {
    title: 'Evidence-Based Approach',
    text: 'Treatment is guided by current research and clinical reasoning, combining hands-on care with rehabilitation and advice that is known to support recovery.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M9 7.5h7M9 11h5" />
      </svg>
    ),
  },
]

export default function Osteopathy() {
  return (
    <>
      <PageHero
        eyebrow="Osteopathy"
        title="What is Osteopathy?"
        lead={intro}
        image="/treatment-osteopathy.png"
        imageAlt="Matthew Knight performing a knee assessment on a patient"
      >
        <BookButton />
      </PageHero>

      <section className="section section--alt">
        <div className="container">
          <div className="section__heading reveal">
            <h2 className="section__title">
              What you can expect from an osteopathic appointment
            </h2>
            <p className="section__lead">
              Every appointment starts with listening. From there, assessment and
              treatment are built around what your body, and your goals, actually
              need.
            </p>
          </div>

          <p className="prose__note reveal">
            You don&rsquo;t need to be in discomfort to benefit from an osteopathic
            consultation. A full assessment evaluates your body&rsquo;s movement, power
            and overall efficiency. This &lsquo;big picture&rsquo; view provides the
            strategy needed to enhance your physical potential, so you can meet your
            lifestyle goals with ease.
          </p>

          <div className="pillars">
            {pillars.map((pillar, i) => (
              <article
                className="pillars__card reveal"
                key={pillar.title}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="pillars__icon">{pillar.icon}</div>
                <h3 className="pillars__title">{pillar.title}</h3>
                <p className="pillars__text">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__heading reveal">
            <h2 className="section__title">
              Common Injuries &amp; Conditions
            </h2>
            <p className="section__lead">
              A selection of the problems Matthew sees most often at the Orpington
              clinic. Choose one to read more about it, or get in touch if yours
              isn&rsquo;t listed.
            </p>
          </div>

          <div>
            <ConditionGrid />
          </div>

          <p className="section__footnote reveal">
            Techniques used may include{' '}
            <Link to="/spinal-manipulation">spinal manipulation</Link>, alongside
            soft-tissue work, joint mobilisation and rehabilitation exercises.
          </p>
        </div>
      </section>

      <MapPanel
        heading="Visiting the osteopathy clinic in Orpington"
        intro="Appointments are held at the Tennis Centre on Avebury Road, in the same treatment rooms as the Jon W Sports Therapy group, a calm, professional space set up for assessment, treatment and rehabilitation."
      />
    </>
  )
}
