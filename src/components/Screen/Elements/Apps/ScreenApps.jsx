import React, { useState, useEffect } from "react";
import FileExplorer from "./FileExplorer/FileExplorer";
import TextEditor from "./TextEditor/TextEditor";

export default function ScreenApps() {
    const [openedApps, setOpenedApps] = useState({});
    const [textEditorSession, setTextEditorSession] = useState(null);

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
            case "TextEditor":
                return (
                    <TextEditor
                        onClose={() => handleCloseApp(appName)}
                        initialPath={textEditorSession?.path || null}
                        fileName={textEditorSession?.name || null}
                    />
                );
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
