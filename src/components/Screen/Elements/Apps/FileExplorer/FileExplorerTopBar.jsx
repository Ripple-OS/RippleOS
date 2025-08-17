import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faEllipsisH,
    faChevronLeft,
    faChevronRight,
    faTh,
    faList,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerTopBar({ 
    currentView, 
    setCurrentView, 
    currentPath,
    onBack,
    onForward,
    canGoBack,
    canGoForward
}) {
    return (
        <div className="top-bar">
            <div className="left-section">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                />
                <span className="title">Files</span>
                <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="more-icon"
                />
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
                <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="more-icon"
                />
            </div>
        </div>
    );
}
