import ConditionViewer from '../components/ConditionViewer'

/**
 * Deliberately chrome-free: no page hero, no closing CTA band and no footer
 * (App.tsx drops it for this route). The page is a reference tool, so the whole
 * viewport goes to the picker and the condition you are reading.
 */
export default function ConditionsIndex() {
  return <ConditionViewer />
}
