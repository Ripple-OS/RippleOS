import React from "react";
import Clock from "./Clock/Clock";
import DisplayApps from "./Popups/DisplayApps";
import UtilitySoundControl from "./Popups/UtilitySoundControl";
import { _closeEveryPopup } from "../../../functions/_closeEveryPopup";
import ScreenApps from "./Apps/ScreenApps";

export default function ScreenElements({ popups, setPopups }) {
    const handleScreenClick = (e) => {
        // Check if the click target is not within a popup
        if (!e.target.closest(".popup")) {
            _closeEveryPopup(undefined, setPopups)
        }
    };

    return (
        <div className="screen_elements" onClick={handleScreenClick}>
            <Clock />
            {popups.find((popup) => popup.name === "Display Apps")?.toggled && (
                <DisplayApps />
            )}
            {popups.find((popup) => popup.name === "Sound Control")
                ?.toggled && <UtilitySoundControl />}
            <ScreenApps />
        </div>
    );
}
