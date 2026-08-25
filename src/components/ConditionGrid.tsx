import { Link } from 'react-router-dom'
import { conditions } from '../content/conditions'

/** Image cards linking into the consolidated /conditions page. */
export default function ConditionGrid() {
  return (
    <ul className="condition-grid">
      {conditions.map((condition, i) => (
        // Capped so the last card in a nine-item grid is not most of a second
        // behind the first.
        <li
          className="reveal"
          key={condition.slug}
          style={{ transitionDelay: `${Math.min(i, 6) * 70}ms` }}
        >
          <Link className="condition-grid__link" to={`/conditions#${condition.slug}`}>
            <img
              className="condition-grid__image"
              src={condition.image}
              alt=""
              loading="lazy"
              width={320}
              height={320}
            />
            <span className="condition-grid__name">{condition.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
