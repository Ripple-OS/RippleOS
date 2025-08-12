import React from "react";
import Clock from "./Clock/Clock";
import DisplayApps from "./Popups/DisplayApps";

export default function ScreenElements({ popups, setPopups }) {
    const handleScreenClick = (e) => {
        // Check if the click target is not within a popup
        if (!e.target.closest(".popup")) {
            setPopups((prev) =>
                prev.map((popup) =>
                    popup.name === "Display Apps"
                        ? { ...popup, toggled: false }
                        : popup
                )
            );
        }
    };

    return (
        <div className="screen_elements" onClick={handleScreenClick}>
            <Clock />
            {popups.find((popup) => popup.name === "Display Apps")?.toggled && (
                <DisplayApps />
            )}
        </div>
    );
}
