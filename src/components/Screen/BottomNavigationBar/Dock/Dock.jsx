import { faChrome } from '@fortawesome/free-brands-svg-icons'
import { faCalculator, faFolderOpen, faGear, faList } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import DockApp from './DockApp'
import { faCalendar, faImages } from '@fortawesome/free-regular-svg-icons'

export default function Dock() {
    const [appsInDock] = useState([
        {
            name: 'Display Apps',
            icon: faList,
            action: '',
            primary: true
        },
        {
            name: 'Settings',
            icon: faGear,
            action: '',
            primary: false
        },
        {
            name: 'Files Manager',
            icon: faFolderOpen,
            action: '',
            primary: false
        },
        {
            name: 'Chrome Browser',
            icon: faChrome,
            action: '',
            primary: false
        },
        {
            name: 'Calendar',
            icon: faCalendar,
            action: '',
            primary: false
        },
        {
            name: 'Calculator',
            icon: faCalculator,
            action: '',
            primary: false
        },
        {
            name: 'Gallery',
            icon: faImages,
            action: '',
            primary: false
        },
    ])

  return (
    <div className="dock">
        {appsInDock.map((app, index) => <DockApp app={app} key={index} />)}
    </div>
  )
}
