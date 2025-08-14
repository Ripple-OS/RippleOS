import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faEllipsisH,
    faChevronLeft,
    faChevronRight,
    faTh,
    faList,
    faHome,
    faClock,
    faStar,
    faTrash,
    faFolder,
    faDownload,
    faMusic,
    faImage,
    faVideo,
    faFileArchive,
    faFilePdf,
    faCompactDisc,
    faBox,
    faChevronDown,
    faStar as faStarRegular,
} from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";

export default function FileExplorer({ onClose }) {
    const [currentView, setCurrentView] = useState("list");
    const [currentPath] = useState("Home / Downloads");
    const [activeSidebarItem, setActiveSidebarItem] = useState("Downloads");

    const sidebarItems = [
        { id: "Home", icon: faHome, label: "Home" },
        { id: "Recent", icon: faClock, label: "Recent" },
        { id: "Starred", icon: faStar, label: "Starred" },
        { id: "Trash", icon: faTrash, label: "Trash" },
        // { id: "Network", icon: faNetworkWired, label: "Network" },
        { id: "Documents", icon: faFolder, label: "Documents" },
        { id: "Downloads", icon: faDownload, label: "Downloads" },
        { id: "Music", icon: faMusic, label: "Music" },
        { id: "Pictures", icon: faImage, label: "Pictures" },
        { id: "Videos", icon: faVideo, label: "Videos" },
        // { id: "Computer", icon: faDesktop, label: "Computer" },
        // { id: "Volume", icon: faHdd, label: "210 GB Volume" },
    ];

    const fileItems = [
        {
            name: "postman-linux-x64",
            type: "folder",
            size: "—",
            modified: "2025-01-15 14:30",
        },
        {
            name: "balenaEtcher-linux-x64-2.1.4",
            type: "folder",
            size: "—",
            modified: "2025-01-14 09:15",
        },
        {
            name: "grub2-themes-2025-07-23",
            type: "folder",
            size: "—",
            modified: "2025-01-13 16:45",
        },
        {
            name: "SKyCore plugin versions",
            type: "folder",
            size: "—",
            modified: "2025-01-12 11:20",
        },
        {
            name: "postman-linux-x64.tar.gz",
            type: "archive",
            size: "156 MB",
            modified: "2025-01-15 14:25",
        },
        {
            name: "grub2-themes-2025-07-23.zip",
            type: "archive",
            size: "89 MB",
            modified: "2025-01-13 16:40",
        },
        {
            name: "balenaEtcher-linux-x64-2.1.4.zip",
            type: "archive",
            size: "234 MB",
            modified: "2025-01-14 09:10",
        },
        {
            name: "faktura_2025_08_001.pdf",
            type: "pdf",
            size: "2.3 MB",
            modified: "2025-01-10 08:30",
        },
        {
            name: "Win10_22H2_Polish_x64vl.iso",
            type: "iso",
            size: "4.2 GB",
            modified: "2025-01-08 15:20",
        },
        {
            name: "nautilus-dropbox-2025.05.20-1.fc42.x86_64.rpm",
            type: "rpm",
            size: "1.8 MB",
            modified: "2025-01-05 12:45",
        },
    ];

    const getFileIcon = (type) => {
        switch (type) {
            case "folder":
                return faFolder;
            case "archive":
                return faFileArchive;
            case "pdf":
                return faFilePdf;
            case "iso":
                return faCompactDisc;
            case "rpm":
                return faBox;
            default:
                return faFolder;
        }
    };

    const getFileIconColor = (type) => {
        switch (type) {
            case "folder":
                return "#ffd700";
            case "archive":
                return "#ff6b35";
            case "pdf":
                return "#4a90e2";
            case "iso":
                return "#ffffff";
            case "rpm":
                return "#e74c3c";
            default:
                return "#ffd700";
        }
    };

    return (
        <Window
            title="File Explorer"
            onClose={onClose}
            defaultSize={{ width: 1000, height: 700 }}
        >
            <div className="file-explorer">
                {/* Top Bar */}
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
                        <button className="nav-button">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="nav-button">
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

                {/* Main Content */}
                <div className="main-content">
                    {/* Sidebar */}
                    <div className="sidebar">
                        {sidebarItems.map((item) => (
                            <div
                                key={item.id}
                                className={`sidebar-item ${
                                    activeSidebarItem === item.id
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => setActiveSidebarItem(item.id)}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="sidebar-icon"
                                />
                                <span className="sidebar-label">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Content Pane */}
                    <div className="content-pane">
                        {currentView === "list" ? (
                            <>
                                {/* Column Headers */}
                                <div className="column-headers">
                                    <div className="header-name">
                                        Name
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="sort-icon"
                                        />
                                    </div>
                                    <div className="header-size">
                                        Size
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="sort-icon"
                                        />
                                    </div>
                                    <div className="header-modified">
                                        Modified
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="sort-icon"
                                        />
                                    </div>
                                    <div className="header-actions"></div>
                                </div>

                                {/* File List */}
                                <div className="file-list">
                                    {fileItems.map((item, index) => (
                                        <div key={index} className="file-row">
                                            <div className="file-icon">
                                                <FontAwesomeIcon
                                                    icon={getFileIcon(
                                                        item.type
                                                    )}
                                                    style={{
                                                        color: getFileIconColor(
                                                            item.type
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <div className="file-name">
                                                {item.name}
                                            </div>
                                            <div className="file-size">
                                                {item.size}
                                            </div>
                                            <div className="file-modified">
                                                {item.modified}
                                            </div>
                                            <div className="file-actions">
                                                <FontAwesomeIcon
                                                    icon={faStarRegular}
                                                    className="star-icon"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Grid View */
                            <div className="grid-view">
                                {fileItems.map((item, index) => (
                                    <div key={index} className="grid-item">
                                        <div className="grid-item-icon">
                                            <FontAwesomeIcon
                                                icon={getFileIcon(item.type)}
                                                style={{
                                                    color: getFileIconColor(
                                                        item.type
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="grid-item-name">
                                            {item.name}
                                        </div>
                                        <div className="grid-item-details">
                                            <span className="grid-item-size">
                                                {item.size}
                                            </span>
                                            <span className="grid-item-modified">
                                                {item.modified}
                                            </span>
                                        </div>
                                        <div className="grid-item-actions">
                                            <FontAwesomeIcon
                                                icon={faStarRegular}
                                                className="star-icon"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
}
