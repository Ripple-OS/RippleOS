import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SearchApps from './SearchApps'
import { defaultApps } from '../../../../api/apps/defaultApps'
import { _closeEveryPopup } from '../../../../functions/_closeEveryPopup'

export default function DisplayApps({ setPopups }) {
    const [search, setSearch] = useState('')

    const handleAppClick = (app) => {
        if (app.name === "Display Apps") {
            _closeEveryPopup("Display Apps", setPopups);
        } else {
            // Toggle app opened state in localStorage
            const openedApps = JSON.parse(
                localStorage.getItem("openedApps") || "{}"
            );
            const isCurrentlyOpened = openedApps[app.name] || false;

            // Toggle the state
            openedApps[app.name] = !isCurrentlyOpened;
            localStorage.setItem("openedApps", JSON.stringify(openedApps));

            // Dispatch custom event to notify other components
            window.dispatchEvent(
                new CustomEvent("app-state-changed", {
                    detail: { appName: app.name, isOpened: !isCurrentlyOpened },
                })
            );
        }
    };

    function App({ app }) {
        return (
            <div className="app" onClick={() => handleAppClick(app)}>
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
