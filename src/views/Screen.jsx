import React from 'react'
import desktop_wallpaper_1 from '../assets/images/wallpapers/os-wallpaper-1.png'
import ScreenBottom from '../components/Screen/BottomNavigationBar/ScreenBottom'
import ScreenElements from '../components/Screen/Elements/ScreenElements'

export default function Screen() {
  return (
    <main style={{backgroundImage: `url(${desktop_wallpaper_1})`}}>
        <ScreenElements />
        <ScreenBottom />
    </main>
  )
}
