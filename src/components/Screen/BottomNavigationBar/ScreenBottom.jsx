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
        // Try both appName and common window title variations
        setMaximizedWindows(prev => {
          const newSet = new Set(prev);
          newSet.delete(appName);
          // Also try removing common variations of the app name that might be used as window titles
          newSet.delete(appName.replace(/ /g, ''));
          newSet.delete(appName.toLowerCase());
          return newSet;
        });
      }
    };

    const handleAppMinimizeChange = (event) => {
      const { appName, isMinimized } = event.detail;
      if (isMinimized) {
        // When an app is minimized, remove it from maximized windows
        // since minimized apps should not keep the bottom bar hidden
        setMaximizedWindows(prev => {
          const newSet = new Set(prev);
          newSet.delete(appName);
          // Also try removing common variations
          newSet.delete(appName.replace(/ /g, ''));
          newSet.delete(appName.toLowerCase());
          return newSet;
        });
      }
    };

    // Periodic cleanup to ensure consistency
    const periodicCleanup = () => {
      // Get currently opened apps
      const openedApps = JSON.parse(localStorage.getItem('openedApps') || '{}');
      const minimizedApps = JSON.parse(localStorage.getItem('minimizedApps') || '{}');
      
      setMaximizedWindows(prev => {
        const newSet = new Set();
        // Only keep maximized windows for apps that are still opened and not minimized
        for (const windowTitle of prev) {
          const isAppOpened = openedApps[windowTitle] || false;
          const isAppMinimized = minimizedApps[windowTitle] || false;
          
          if (isAppOpened && !isAppMinimized) {
            newSet.add(windowTitle);
          }
        }
        return newSet;
      });
    };

    // Run cleanup every 2 seconds to handle edge cases
    const cleanupInterval = setInterval(periodicCleanup, 2000);

    window.addEventListener('window-maximize-changed', handleWindowMaximizeChange);
    window.addEventListener('app-state-changed', handleAppStateChange);
    window.addEventListener('app-minimize-changed', handleAppMinimizeChange);

    return () => {
      window.removeEventListener('window-maximize-changed', handleWindowMaximizeChange);
      window.removeEventListener('app-state-changed', handleAppStateChange);
      window.removeEventListener('app-minimize-changed', handleAppMinimizeChange);
      clearInterval(cleanupInterval);
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
