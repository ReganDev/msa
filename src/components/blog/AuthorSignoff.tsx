import BookButton from '../BookButton'

/** Sign-off under every article: who wrote it, and the one action that matters. */
export default function AuthorSignoff() {
  return (
    <aside className="signoff">
      <img
        className="signoff__photo"
        src="/matthew-knight.png"
        alt=""
        width="72"
        height="72"
        loading="lazy"
      />
      <div className="signoff__copy">
        <p className="signoff__name">Matthew Knight, M.Ost</p>
        <p className="signoff__role">
          Registered osteopath and sports massage therapist at the Orpington clinic.
          If this sounds familiar, an assessment is the quickest way to find out what is
          driving it.
        </p>
      </div>
      <BookButton className="" />
    </aside>
  )
}
