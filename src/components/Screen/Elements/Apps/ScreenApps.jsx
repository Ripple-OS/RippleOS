import React, { useState, useEffect } from "react";
import FileExplorer from "./FileExplorer/FileExplorer";
import TextEditor from "./TextEditor/TextEditor";
import Calculator from "./Calculator/Calculator";
import Calendar from "./Calendar/Calendar";

export default function ScreenApps() {
    const [openedApps, setOpenedApps] = useState({});
    const [minimizedApps, setMinimizedApps] = useState({});
    const [textEditorSession, setTextEditorSession] = useState(null);

    // Load opened apps from localStorage on component mount
    useEffect(() => {
        const loadOpenedApps = () => {
            const stored = JSON.parse(
                localStorage.getItem("openedApps") || "{}"
            );
            setOpenedApps(stored);

            const storedMinimized = JSON.parse(
                localStorage.getItem("minimizedApps") || "{}"
            );
            setMinimizedApps(storedMinimized);
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

        // Listen for app minimize/restore changes
        const handleAppMinimizeChange = (event) => {
            const { appName, isMinimized } = event.detail;
            setMinimizedApps((prev) => {
                const updated = {
                    ...prev,
                    [appName]: isMinimized,
                };
                localStorage.setItem("minimizedApps", JSON.stringify(updated));
                return updated;
            });
        };

        window.addEventListener("app-state-changed", handleAppStateChange);
        window.addEventListener(
            "app-minimize-changed",
            handleAppMinimizeChange
        );

        const handleOpenTextEditor = (e) => {
            const { path, name } = e.detail || {};
            setTextEditorSession({ path, name });
            // Ensure TextEditor app is opened
            setOpenedApps((prev) => {
                const next = { ...prev, TextEditor: true };
                localStorage.setItem("openedApps", JSON.stringify(next));
                return next;
            });
        };
        window.addEventListener("open-text-editor", handleOpenTextEditor);

        return () => {
            window.removeEventListener(
                "app-state-changed",
                handleAppStateChange
            );
            window.removeEventListener(
                "app-minimize-changed",
                handleAppMinimizeChange
            );
            window.removeEventListener(
                "open-text-editor",
                handleOpenTextEditor
            );
        };
    }, []);

    const handleCloseApp = (appName) => {
        const updatedApps = { ...openedApps };
        updatedApps[appName] = false;
        setOpenedApps(updatedApps);
        localStorage.setItem("openedApps", JSON.stringify(updatedApps));

        // Also clear minimized state when closing
        const updatedMinimized = { ...minimizedApps };
        delete updatedMinimized[appName];
        setMinimizedApps(updatedMinimized);
        localStorage.setItem("minimizedApps", JSON.stringify(updatedMinimized));

        // Dispatch event to notify other components
        window.dispatchEvent(
            new CustomEvent("app-state-changed", {
                detail: { appName, isOpened: false },
            })
        );
    };

    const handleMinimizeApp = (appName) => {
        const isMinimized = !minimizedApps[appName];
        setMinimizedApps((prev) => {
            const updated = {
                ...prev,
                [appName]: isMinimized,
            };
            localStorage.setItem("minimizedApps", JSON.stringify(updated));
            return updated;
        });

        // Dispatch event to notify dock and other components
        window.dispatchEvent(
            new CustomEvent("app-minimize-changed", {
                detail: { appName, isMinimized },
            })
        );
    };

    const renderApp = (appName) => {
        const isMinimized = minimizedApps[appName] || false;

        switch (appName) {
            case "Files Manager":
                return (
                    <FileExplorer
                        onClose={() => handleCloseApp(appName)}
                        onMinimize={() => handleMinimizeApp(appName)}
                        isMinimized={isMinimized}
                    />
                );
            case "TextEditor":
                return (
                    <TextEditor
                        onClose={() => handleCloseApp(appName)}
                        onMinimize={() => handleMinimizeApp(appName)}
                        isMinimized={isMinimized}
                        initialPath={textEditorSession?.path || null}
                        fileName={textEditorSession?.name || null}
                    />
                );
            case "Settings":
                return <div>Settings App (Coming Soon)</div>;
            case "Chrome Browser":
                return <div>Chrome Browser (Coming Soon)</div>;
            case "Calendar":
                return (
                    <Calendar
                        onClose={() => handleCloseApp(appName)}
                        onMinimize={() => handleMinimizeApp(appName)}
                        isMinimized={isMinimized}
                    />
                );
            case "Calculator":
                return (
                    <Calculator
                        onClose={() => handleCloseApp(appName)}
                        onMinimize={() => handleMinimizeApp(appName)}
                        isMinimized={isMinimized}
                    />
                );
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
