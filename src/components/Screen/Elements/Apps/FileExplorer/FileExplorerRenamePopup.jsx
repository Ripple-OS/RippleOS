import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faFolder, faFile } from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerRenamePopup({
    isOpen,
    onClose,
    onConfirm,
    item = null,
}) {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        if (isOpen && item) {
            setInputValue(item.name);
            setError("");
        }
    }, [isOpen, item]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.addEventListener("mousedown", handleClickOutside);
            // Focus input after a short delay to ensure popup is rendered
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }, 100);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            setError("Name cannot be empty");
            return;
        }

        if (trimmedValue === item.name) {
            onClose();
            return;
        }

        if (trimmedValue.includes("/") || trimmedValue.includes("\\")) {
            setError("Name cannot contain / or \\");
            return;
        }

        if (trimmedValue.length > 255) {
            setError("Name is too long (max 255 characters)");
            return;
        }

        onConfirm(trimmedValue);
        onClose();
    };

    if (!isOpen || !item) return null;

    return (
        <div className="file-explorer-popup-overlay">
            <div className="file-explorer-popup rename-popup" ref={popupRef}>
                <div className="popup-header">
                    <div className="popup-title">
                        <FontAwesomeIcon
                            icon={item.type === "folder" ? faFolder : faFile}
                            className="popup-icon"
                        />
                        <span>Rename {item.type === "folder" ? "Folder" : "File"}</span>
                    </div>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="popup-close"
                        onClick={onClose}
                    />
                </div>

                <form className="popup-form" onSubmit={handleSubmit}>
                    <div className="popup-input-group">
                        <label className="popup-label">New name:</label>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className={`popup-input ${error ? "error" : ""}`}
                            placeholder={`Enter new name for ${item.name}...`}
                            autoComplete="off"
                        />
                        {error && <div className="popup-error">{error}</div>}
                    </div>

                    <div className="popup-actions">
                        <button
                            type="button"
                            className="popup-button cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="popup-button create"
                            disabled={!inputValue.trim() || inputValue.trim() === item.name}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                            Rename
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
