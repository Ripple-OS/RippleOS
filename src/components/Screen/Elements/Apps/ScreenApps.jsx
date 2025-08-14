import React, { useState, useEffect } from "react";
import FileExplorer from "./FileExplorer/FileExplorer";

export default function ScreenApps() {
    const [openedApps, setOpenedApps] = useState({});

    // Load opened apps from localStorage on component mount
    useEffect(() => {
        const loadOpenedApps = () => {
            const stored = JSON.parse(
                localStorage.getItem("openedApps") || "{}"
            );
            setOpenedApps(stored);
        };

        loadOpenedApps();

        // Listen for app state changes
        const handleAppStateChange = (event) => {
            const { appName, isOpened } = event.detail;
            setOpenedApps((prev) => ({
                ...prev,
                [appName]: isOpened,
            }));
        };

        window.addEventListener("app-state-changed", handleAppStateChange);

        return () => {
            window.removeEventListener(
                "app-state-changed",
                handleAppStateChange
            );
        };
    }, []);

    const handleCloseApp = (appName) => {
        const updatedApps = { ...openedApps };
        updatedApps[appName] = false;
        setOpenedApps(updatedApps);
        localStorage.setItem("openedApps", JSON.stringify(updatedApps));

        // Dispatch event to notify other components
        window.dispatchEvent(
            new CustomEvent("app-state-changed", {
                detail: { appName, isOpened: false },
            })
        );
    };

    const renderApp = (appName) => {
        switch (appName) {
            case "Files Manager":
                return <FileExplorer onClose={() => handleCloseApp(appName)} />;
            case "Settings":
                return <div>Settings App (Coming Soon)</div>;
            case "Chrome Browser":
                return <div>Chrome Browser (Coming Soon)</div>;
            case "Calendar":
                return <div>Calendar App (Coming Soon)</div>;
            case "Calculator":
                return <div>Calculator App (Coming Soon)</div>;
            case "Gallery":
                return <div>Gallery App (Coming Soon)</div>;
            default:
                return null;
        }
    };

    return (
        <>
            {Object.entries(openedApps).map(([appName, isOpened]) => {
                if (isOpened) {
                    return <div key={appName}>{renderApp(appName)}</div>;
                }
                return null;
            })}
        </>
    );
}
