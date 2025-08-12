import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DockApp({ app, setPopups }) {
    return (
        <div
            className={`dock_app${app.primary ? " primary" : ""}`}
            onClick={() =>
                app.name === "Display Apps" &&
                setPopups((prev) =>
                    prev.map((popup) =>
                        popup.name === "Display Apps"
                            ? { ...popup, toggled: !popup.toggled }
                            : popup
                    )
                )
            }
        >
            <span>{app.name}</span>
            <FontAwesomeIcon icon={app.icon} />
        </div>
    );
}
