import React from 'react'
import Dock from './Dock/Dock'
import UtilityMenu from './UtilityMenu/UtilityMenu'
import Searching from './Searching/Searching'

export default function ScreenBottom({ setPopups }) {
  return (
    <div className="screen_bottom_navigation">
        <Searching />
        <Dock setPopups={setPopups} />
        <UtilityMenu />
    </div>
  )
}
