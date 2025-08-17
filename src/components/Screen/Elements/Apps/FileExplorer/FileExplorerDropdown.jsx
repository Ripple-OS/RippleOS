import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolder,
    faFile,
    faChevronDown,
    faPlus,
    faCopy,
    faPaste,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerDropdown({
    isOpen,
    onClose,
    onNewFolder,
    onNewFile,
    onCopy,
    onPaste,
    canPaste = false,
    position = { x: 0, y: 0 },
}) {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="file-explorer-dropdown"
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                zIndex: 1000,
            }}
        >
            <div className="dropdown-header">
                <span>New</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>

            <div className="dropdown-item" onClick={onNewFolder}>
                <FontAwesomeIcon icon={faFolder} className="dropdown-icon" />
                <span>New Folder</span>
            </div>

            <div className="dropdown-item" onClick={onNewFile}>
                <FontAwesomeIcon icon={faFile} className="dropdown-icon" />
                <span>New File</span>
            </div>

            <div className="dropdown-separator"></div>

            <div className="dropdown-item" onClick={onCopy}>
                <FontAwesomeIcon icon={faCopy} className="dropdown-icon" />
                <span>Copy</span>
            </div>

            <div
                className="dropdown-item"
                onClick={onPaste}
                style={{ opacity: canPaste ? 1 : 0.5 }}
            >
                <FontAwesomeIcon icon={faPaste} className="dropdown-icon" />
                <span>Paste</span>
            </div>
        </div>
    );
}
