import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      title="We couldn’t find that page"
      lead={[
        'The page you were looking for may have moved or no longer exists. The links below should get you back on track.',
      ]}
    >
      <Link className="btn btn--primary btn--lg" to="/">
        Back to home
      </Link>
      <Link className="btn btn--ghost btn--lg" to="/conditions">
        Browse conditions
      </Link>
    </PageHero>
  )
}
