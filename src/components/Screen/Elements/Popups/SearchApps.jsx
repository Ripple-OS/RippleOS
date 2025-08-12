import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SearchApps({ search, setSearch }) {
  return (
    <div className="search_apps">
        <div className="icon">
            <FontAwesomeIcon icon={faSearch} />
        </div>
        <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}
