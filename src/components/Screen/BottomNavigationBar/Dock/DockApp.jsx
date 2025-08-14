import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { _closeEveryPopup } from "../../../../functions/_closeEveryPopup";

export default function DockApp({ app, setPopups }) {
    const handleAppClick = () => {
        if (app.name === "Display Apps") {
            _closeEveryPopup("Display Apps", setPopups);
        } else {
            // Toggle app opened state in localStorage
            const openedApps = JSON.parse(
                localStorage.getItem("openedApps") || "{}"
            );
            const isCurrentlyOpened = openedApps[app.name] || false;

            // Toggle the state
            openedApps[app.name] = !isCurrentlyOpened;
            localStorage.setItem("openedApps", JSON.stringify(openedApps));

            // Dispatch custom event to notify other components
            window.dispatchEvent(
                new CustomEvent("app-state-changed", {
                    detail: { appName: app.name, isOpened: !isCurrentlyOpened },
                })
            );
        }
    };

    // Check if app is opened and add "opened" class
    const isOpened = JSON.parse(localStorage.getItem("openedApps") || "{}")[app.name] || false;

    return (
        <div
            className={`dock_app${app.primary ? " primary" : ""}${isOpened ? " opened" : ""}`}
            onClick={handleAppClick}
        >
            <span>{app.name}</span>
            <FontAwesomeIcon icon={app.icon} />
        </div>
    );
}
