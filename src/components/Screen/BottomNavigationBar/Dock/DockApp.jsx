import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { _closeEveryPopup } from "../../../../functions/_closeEveryPopup";

export default function DockApp({ app, setPopups }) {
    return (
        <div
            className={`dock_app${app.primary ? " primary" : ""}`}
            onClick={() => _closeEveryPopup("Display Apps", setPopups)}
        >
            <span>{app.name}</span>
            <FontAwesomeIcon icon={app.icon} />
        </div>
    );
}
