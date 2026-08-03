import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import BookButton from '../components/BookButton'
import CheckList from '../components/CheckList'
import CtaBand from '../components/CtaBand'

const helpsWith = [
  'Improve movement in a stiff or restricted joint',
  'Reduce pain and discomfort',
  'Decrease feelings of muscular tension',
  'Make movement feel easier or more comfortable',
  'Support your return to normal activities',
]

export default function SpinalManipulation() {
  return (
    <>
      <PageHero
        eyebrow="Treatment technique"
        title="What is spinal manipulation?"
        // The client's brief left the intro blank; this summarises the page
        // rather than repeating the opening line of the section below.
        lead={[
          'One of the techniques you may come across during osteopathic treatment. Here is what it involves, what the clicking sound actually is, what it can help with, and how you might feel afterwards.',
        ]}
        image="/treatment-sports-massage.png"
        imageAlt="Matthew Knight applying hands-on treatment to a patient’s back"
      >
        <BookButton />
      </PageHero>

      <section className="section section--alt">
        <div className="container prose-wrap">
          <article className="prose reveal">
            <h2 className="prose__heading">What are spinal manipulations?</h2>
            <p>
              Spinal manipulation is a hands-on treatment technique commonly used by
              osteopaths to help improve joint movement and reduce pain or stiffness.
            </p>
            <p>
              The technique involves carefully positioning a joint before applying a
              small, quick and controlled movement. Although it is most commonly used
              around the spine, similar techniques may also be used on other joints in
              the body.
            </p>
          </article>

          <article className="prose reveal">
            <h2 className="prose__heading">What is the clicking sound?</h2>
            <p>
              You may hear a clicking or popping sound during a manipulation. This is
              thought to occur when pressure changes within the joint cause gas in the
              joint fluid to form or release.
            </p>
            <p>
              The sound does not mean that a bone has been &ldquo;put back into
              place&rdquo;, and a click is not required for the technique to be
              effective.
            </p>
          </article>

          <article className="prose reveal">
            <h2 className="prose__heading">What can spinal manipulation help with?</h2>
            <p>
              Depending on your individual circumstances, manipulation may be used to
              help:
            </p>
            <CheckList items={helpsWith} />
            <p>
              Spinal manipulation is not intended to permanently &ldquo;realign&rdquo;
              the spine. It is usually used alongside other approaches such as joint
              mobilisation, soft-tissue treatment, exercise, rehabilitation and activity
              advice.
            </p>
          </article>

          <article className="prose reveal">
            <h2 className="prose__heading">How might I feel afterwards?</h2>
            <p>
              Some people notice an immediate change in movement or comfort. Others may
              experience temporary soreness, stiffness or tiredness following treatment.
            </p>
            <p>
              Your response will be monitored, and you will be given advice based on the
              findings from your assessment. Although serious complications following
              manual therapy are considered rare, all treatment decisions should be based
              on an appropriate assessment of the individual patient.
            </p>
            <p className="prose__note">
              Manipulation is one option among many. It is only ever used where it is
              appropriate for you, it is always explained beforehand, and it is never
              carried out without your consent. See{' '}
              <Link to="/osteopathy">what osteopathy involves</Link> or browse the{' '}
              <Link to="/conditions">conditions commonly treated</Link>.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Not sure whether this is right for you?"
        text="Book an assessment and Matthew will talk you through the findings and the options before any treatment begins."
      />
    </>
  )
}
