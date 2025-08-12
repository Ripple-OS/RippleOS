import React, { useState } from 'react'
import DockApp from './DockApp'
import { defaultApps } from '../../../../api/apps/defaultApps'

export default function Dock({ setPopups }) {
    const [appsInDock] = useState(defaultApps)

  return (
    <div className="dock">
        {appsInDock.filter((app) => app.defaultDock).map((app, index) => <DockApp setPopups={setPopups} app={app} key={index} />)}
    </div>
  )
}
