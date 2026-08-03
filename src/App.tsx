import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import Osteopathy from './pages/Osteopathy'
import SpinalManipulation from './pages/SpinalManipulation'
import OrpingtonClinic from './pages/OrpingtonClinic'
import ConditionsIndex from './pages/ConditionsIndex'
import NotFound from './pages/NotFound'
import { useReveal } from './hooks/useReveal'
import { usePageMeta } from './hooks/usePageMeta'
import { resolveSlug } from './content/conditions'
import { HOME_DESCRIPTION, HOME_TITLE, routeByPath } from './routes'

/**
 * The per-condition pages were folded into /conditions. vercel.json redirects
 * these paths at the edge, but that doesn't apply in dev or to in-app
 * navigation, so the route is kept and handled here too. An unknown slug is a
 * genuine 404 rather than a silent bounce to the conditions page.
 */
function ConditionRedirect() {
  const { slug } = useParams<{ slug: string }>()
  const current = slug ? resolveSlug(slug) : undefined
  if (!current) return <NotFound />
  return <Navigate to={`/conditions#${current}`} replace />
}

export default function App() {
  const { pathname } = useLocation()
  const route = routeByPath.get(pathname)

  // /conditions is a two-pane reference tool sized to the viewport: it owns its
  // own scrolling, so the page gets no footer and no page-level scrollbar.
  const isViewport = pathname === '/conditions'

  usePageMeta(route?.title ?? HOME_TITLE, route?.description ?? HOME_DESCRIPTION)
  // Re-observe .reveal elements whenever a new page renders.
  useReveal(pathname)

  return (
    <>
      <ScrollManager />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className={isViewport ? 'main--viewport' : undefined}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/osteopathy" element={<Osteopathy />} />
          <Route path="/spinal-manipulation" element={<SpinalManipulation />} />
          <Route path="/locations/orpington" element={<OrpingtonClinic />} />
          <Route path="/conditions" element={<ConditionsIndex />} />
          <Route path="/conditions/:slug" element={<ConditionRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isViewport && <Footer />}
    </>
  )
}
