import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SearchApps from './SearchApps'
import { defaultApps } from '../../../../api/apps/defaultApps'

export default function DisplayApps() {
    const [search, setSearch] = useState('')

    function App({ app }) {
        return (
            <div className="app">
                <div className="icon">
                    <FontAwesomeIcon icon={app.icon} />
                </div>
                <span>{app.name}</span>
            </div>
        )
    }

  return (
    <div className="popup" id='display_apps'>
        <div className="content">
            <SearchApps search={search} setSearch={setSearch} />
            <div className="apps_list">
                {defaultApps.filter((app) => app.name !== 'Display Apps' && app.name.toLowerCase().includes(search.trim().toLowerCase())).sort((a, b) => a.name.localeCompare(b.name)).map((app, index) => <App app={app} key={index} />)}
            </div>
        </div>
    </div>
  )
}
