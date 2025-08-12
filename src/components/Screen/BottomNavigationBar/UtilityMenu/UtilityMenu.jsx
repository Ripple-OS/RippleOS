import { faBatteryFull, faBell, faVolumeHigh, faWifi } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import UtilityIcon from './UtilityIcon'

export default function UtilityMenu() {
    const menu = [
        {
            name: 'Internet Connection',
            icon: faWifi
        },
        {
            name: 'Sound Control',
            icon: faVolumeHigh
        },
        {
            name: 'Battery',
            icon: faBatteryFull
        },
        {
            name: 'Notifications',
            icon: faBell
        },
    ]

  return (
    <div className="utility_menu">
        {menu.map((app, index) => <UtilityIcon utility={app} key={index} />)}
    </div>
  )
}
