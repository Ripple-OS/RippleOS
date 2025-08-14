import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function UtilityIcon({ utility }) {
  return (
    <div className="utility_icon" onClick={utility?.action && utility.action}>
        <span>{utility.name}</span>
        <FontAwesomeIcon icon={utility.icon} />
    </div>
  )
}
