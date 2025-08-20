import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faEllipsisH,
    faChevronLeft,
    faChevronRight,
    faTh,
    faList,
    faSave,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import FileExplorerDropdown from "./FileExplorerDropdown";

export default function FileExplorerTopBar({
    currentView,
    setCurrentView,
    currentPath,
    onBack,
    onForward,
    canGoBack,
    canGoForward,
    onNewFolder,
    onNewFile,
    onCopy,
    onPaste,
    canPaste,
    isSaveMode = false,
    saveFileName = "",
    onSaveFileNameChange = null,
    onSaveConfirm = null,
    onSaveCancel = null,
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    const dropdownButtonRef = useRef(null);

    const handleDropdownToggle = (event) => {
        event.preventDefault();
        const buttonRect = dropdownButtonRef.current.getBoundingClientRect();
        setDropdownPosition({
            x: buttonRect.left,
            y: buttonRect.bottom + 5,
        });
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleNewFolder = () => {
        setIsDropdownOpen(false);
        onNewFolder();
    };

    const handleNewFile = () => {
        setIsDropdownOpen(false);
        onNewFile();
    };

    return (
        <div className="top-bar">
            <div className="left-section">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <span className="title">
                    {isSaveMode ? "Save File" : "Files"}
                </span>
                {!isSaveMode && (
                    <div className="dropdown-container" ref={dropdownButtonRef}>
                        <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="more-icon"
                            onClick={handleDropdownToggle}
                        />
                        <FileExplorerDropdown
                            isOpen={isDropdownOpen}
                            onClose={() => setIsDropdownOpen(false)}
                            onNewFolder={handleNewFolder}
                            onNewFile={handleNewFile}
                            onCopy={onCopy}
                            onPaste={onPaste}
                            canPaste={canPaste}
                            position={dropdownPosition}
                        />
                    </div>
                )}
            </div>

            <div className="center-section">
                <button
                    className="nav-button"
                    onClick={onBack}
                    disabled={!canGoBack}
                    style={{ opacity: canGoBack ? 1 : 0.5 }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    className="nav-button"
                    onClick={onForward}
                    disabled={!canGoForward}
                    style={{ opacity: canGoForward ? 1 : 0.5 }}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <span className="breadcrumb">{currentPath}</span>
            </div>

            <div className="right-section">
                {!isSaveMode ? (
                    <>
                        <button
                            className={`view-button ${
                                currentView === "grid" ? "active" : ""
                            }`}
                            onClick={() => setCurrentView("grid")}
                        >
                            <FontAwesomeIcon icon={faTh} />
                        </button>
                        <button
                            className={`view-button ${
                                currentView === "list" ? "active" : ""
                            }`}
                            onClick={() => setCurrentView("list")}
                        >
                            <FontAwesomeIcon icon={faList} />
                        </button>
                        <div className="dropdown-container">
                            <FontAwesomeIcon
                                icon={faEllipsisH}
                                className="more-icon"
                            />
                        </div>
                    </>
                ) : (
                    <div className="save-controls">
                        <input
                            type="text"
                            className="save-filename-input"
                            value={saveFileName}
                            onChange={(e) =>
                                onSaveFileNameChange?.(e.target.value)
                            }
                            placeholder="Enter filename..."
                        />
                        <button
                            className="save-button"
                            onClick={onSaveConfirm}
                            disabled={!saveFileName?.trim()}
                        >
                            <FontAwesomeIcon icon={faSave} />
                            <span>Save</span>
                        </button>
                        <button
                            className="cancel-button"
                            onClick={onSaveCancel}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            <span>Cancel</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
