import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFolder, faFile } from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerInputPopup({
    isOpen,
    onClose,
    onSubmit,
    type = "file", // "file" or "folder"
    title = "Create New",
}) {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setInputValue("");
            setError("");
            // Focus input after a short delay to ensure popup is rendered
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

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
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            setError("Name cannot be empty");
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

        onSubmit(trimmedValue);
        onClose();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (error) {
            setError("");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="file-explorer-popup-overlay">
            <div className="file-explorer-popup" ref={popupRef}>
                <div className="popup-header">
                    <div className="popup-title">
                        <FontAwesomeIcon
                            icon={type === "folder" ? faFolder : faFile}
                            className="popup-icon"
                        />
                        <span>{title}</span>
                    </div>
                    <button className="popup-close" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="popup-input-group">
                        <label htmlFor="name-input" className="popup-label">
                            {type === "folder" ? "Folder name:" : "File name:"}
                        </label>
                        <input
                            ref={inputRef}
                            id="name-input"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className={`popup-input ${error ? "error" : ""}`}
                            placeholder={`Enter ${type} name...`}
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
                            disabled={!inputValue.trim()}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
