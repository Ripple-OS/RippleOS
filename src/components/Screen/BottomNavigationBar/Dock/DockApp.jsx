import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function DockApp({ app }) {
  return (
    <div className={`dock_app${app.primary ? ' primary' : ''}`}>
        <span>{app.name}</span>
        <FontAwesomeIcon icon={app.icon} />
    </div>
  )
}
