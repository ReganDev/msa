import BookButton from './BookButton'

interface Props {
  title: string
  text: string
}

/** Closing "book an appointment" band used at the foot of the content pages. */
export default function CtaBand({ title, text }: Props) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner reveal">
        <div>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <BookButton />
      </div>
    </section>
  )
}
