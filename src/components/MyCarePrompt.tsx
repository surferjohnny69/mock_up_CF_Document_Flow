import React from 'react'
import { Link } from 'react-router-dom'
import { useBundle } from '../store/bundle'

const MyCarePrompt: React.FC = () => {
  const { bundle } = useBundle()
  if (!(bundle.label && bundle.hasViewedLabel)) return null
  return (
    <div className="panel" role="region" aria-label="Next Steps">
      <div className="h2">Next Steps</div>
      <p>Great—your documents are on the way. Keep details current in <strong>My Care</strong>.</p>
      <Link className="btn btn-primary" to="/my-care">Go to My Care</Link>
    </div>
  )
}
export default MyCarePrompt
