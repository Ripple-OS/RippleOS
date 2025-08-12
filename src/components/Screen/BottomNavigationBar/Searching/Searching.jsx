import { faChrome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Searching() {
  return (
    <form className="searching">
        <span><FontAwesomeIcon icon={faChrome} /></span>
        <input type="text" placeholder='Search in Google' />
    </form>
  )
}
