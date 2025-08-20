import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { _closeEveryPopup } from "../../../../functions/_closeEveryPopup";

export default function DockApp({ app, setPopups }) {
    const [isMinimized, setIsMinimized] = useState(false);
    
    // Load minimized state from localStorage
    useEffect(() => {
        const loadMinimizedState = () => {
            const minimizedApps = JSON.parse(
                localStorage.getItem("minimizedApps") || "{}"
            );
            setIsMinimized(minimizedApps[app.name] || false);
        };
        
        loadMinimizedState();
        
        // Listen for minimize state changes
        const handleMinimizeChange = (event) => {
            const { appName, isMinimized: minimized } = event.detail;
            if (appName === app.name) {
                setIsMinimized(minimized);
            }
        };
        
        window.addEventListener("app-minimize-changed", handleMinimizeChange);
        
        return () => {
            window.removeEventListener("app-minimize-changed", handleMinimizeChange);
        };
    }, [app.name]);
    
    const handleAppClick = () => {
        if (app.name === "Display Apps") {
            _closeEveryPopup("Display Apps", setPopups);
        } else {
            const openedApps = JSON.parse(
                localStorage.getItem("openedApps") || "{}"
            );
            const isCurrentlyOpened = openedApps[app.name] || false;
            
            // If app is already opened and minimized, restore it
            if (isCurrentlyOpened && isMinimized) {
                window.dispatchEvent(
                    new CustomEvent("app-minimize-changed", {
                        detail: { appName: app.name, isMinimized: false },
                    })
                );
            }
            // If app is opened and not minimized, minimize it
            else if (isCurrentlyOpened && !isMinimized) {
                window.dispatchEvent(
                    new CustomEvent("app-minimize-changed", {
                        detail: { appName: app.name, isMinimized: true },
                    })
                );
            }
            // If app is not opened, open it
            else {
                openedApps[app.name] = true;
                localStorage.setItem("openedApps", JSON.stringify(openedApps));
                
                window.dispatchEvent(
                    new CustomEvent("app-state-changed", {
                        detail: { appName: app.name, isOpened: true },
                    })
                );
            }
        }
    };

    // Check if app is opened
    const isOpened = JSON.parse(localStorage.getItem("openedApps") || "{}")[app.name] || false;

    return (
        <div
            className={`dock_app${app.primary ? " primary" : ""}${isOpened ? " opened" : ""}${isMinimized ? " minimized" : ""}`}
            onClick={handleAppClick}
        >
            <span>{app.name}</span>
            <FontAwesomeIcon icon={app.icon} />
            {isMinimized && <div className="minimize-indicator" />}
        </div>
    );
}
