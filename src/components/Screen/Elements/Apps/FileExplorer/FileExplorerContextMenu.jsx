import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faPaste,
    faCut,
    faTrash,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerContextMenu({
    isOpen,
    onClose,
    position,
    onCopy,
    onPaste,
    onCut,
    onDelete,
    onRename,
    canPaste,
    hasSelection,
}) {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="file-explorer-context-menu"
            ref={menuRef}
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                zIndex: 10000,
            }}
        >
            <div
                className="context-menu-item"
                onClick={onCopy}
                style={{ opacity: hasSelection ? 1 : 0.5 }}
            >
                <FontAwesomeIcon icon={faCopy} className="context-menu-icon" />
                <span>Copy</span>
            </div>

            <div
                className="context-menu-item"
                onClick={onCut}
                style={{ opacity: hasSelection ? 1 : 0.5 }}
            >
                <FontAwesomeIcon icon={faCut} className="context-menu-icon" />
                <span>Cut</span>
            </div>

            <div
                className="context-menu-item"
                onClick={onPaste}
                style={{ opacity: canPaste ? 1 : 0.5 }}
            >
                <FontAwesomeIcon icon={faPaste} className="context-menu-icon" />
                <span>Paste</span>
            </div>

            <div className="context-menu-separator"></div>

            <div
                className="context-menu-item"
                onClick={onRename}
                style={{ opacity: hasSelection ? 1 : 0.5 }}
            >
                <FontAwesomeIcon icon={faEdit} className="context-menu-icon" />
                <span>Rename</span>
            </div>

            <div
                className="context-menu-item"
                onClick={onDelete}
                style={{ opacity: hasSelection ? 1 : 0.5 }}
            >
                <FontAwesomeIcon icon={faTrash} className="context-menu-icon" />
                <span>Delete</span>
            </div>
        </div>
    );
}
