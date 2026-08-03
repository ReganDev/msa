import { Link } from 'react-router-dom'
import { conditions } from '../content/conditions'

/** Links into the consolidated /conditions page, opening the matching panel. */
export default function ConditionGrid() {
  return (
    <ul className="condition-grid">
      {conditions.map((condition) => (
        <li key={condition.slug}>
          <Link className="condition-grid__link" to={`/conditions#${condition.slug}`}>
            <span className="condition-grid__name">{condition.name}</span>
            <svg
              className="condition-grid__arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h13m-5-6 6 6-6 6" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  )
}
