import React, { useState, useEffect } from 'react'
import Dock from './Dock/Dock'
import UtilityMenu from './UtilityMenu/UtilityMenu'
import Searching from './Searching/Searching'

export default function ScreenBottom({ setPopups }) {
  const [isHidden, setIsHidden] = useState(false);
  const [maximizedWindows, setMaximizedWindows] = useState(new Set());

  useEffect(() => {
    const handleWindowMaximizeChange = (event) => {
      const { windowTitle, isMaximized } = event.detail;
      
      setMaximizedWindows(prev => {
        const newSet = new Set(prev);
        if (isMaximized) {
          newSet.add(windowTitle);
        } else {
          newSet.delete(windowTitle);
        }
        return newSet;
      });
    };

    const handleAppStateChange = (event) => {
      const { appName, isOpened } = event.detail;
      if (!isOpened) {
        // When an app is closed, remove it from maximized windows
        setMaximizedWindows(prev => {
          const newSet = new Set(prev);
          newSet.delete(appName);
          return newSet;
        });
      }
    };

    window.addEventListener('window-maximize-changed', handleWindowMaximizeChange);
    window.addEventListener('app-state-changed', handleAppStateChange);

    return () => {
      window.removeEventListener('window-maximize-changed', handleWindowMaximizeChange);
      window.removeEventListener('app-state-changed', handleAppStateChange);
    };
  }, []);

  // Update hidden state based on whether any windows are maximized
  useEffect(() => {
    setIsHidden(maximizedWindows.size > 0);
  }, [maximizedWindows]);

  return (
    <div className={`screen_bottom_navigation ${isHidden ? 'hidden' : ''}`}>
        <Searching />
        <Dock setPopups={setPopups} />
        <UtilityMenu setPopups={setPopups} />
    </div>
  )
}
