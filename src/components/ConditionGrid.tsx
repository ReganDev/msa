import { Link } from 'react-router-dom'
import { conditions } from '../content/conditions'

/** Image cards linking into the consolidated /conditions page. */
export default function ConditionGrid() {
  return (
    <ul className="condition-grid">
      {conditions.map((condition) => (
        <li key={condition.slug}>
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
