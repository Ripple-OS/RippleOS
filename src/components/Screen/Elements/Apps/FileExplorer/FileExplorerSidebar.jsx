import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faClock,
    faStar,
    faTrash,
    faFolder,
    faDownload,
    faMusic,
    faImage,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerSidebar({ 
    activeSidebarItem, 
    onSidebarItemClick 
}) {
    const sidebarItems = [
        { id: "Home", icon: faHome, label: "Home" },
        { id: "Recent", icon: faClock, label: "Recent" },
        { id: "Starred", icon: faStar, label: "Starred" },
        { id: "Trash", icon: faTrash, label: "Trash" },
        { id: "Documents", icon: faFolder, label: "Documents" },
        { id: "Downloads", icon: faDownload, label: "Downloads" },
        { id: "Music", icon: faMusic, label: "Music" },
        { id: "Pictures", icon: faImage, label: "Pictures" },
        { id: "Videos", icon: faVideo, label: "Videos" },
    ];

    return (
        <div className="sidebar">
            {sidebarItems.map((item) => (
                <div
                    key={item.id}
                    className={`sidebar-item ${
                        activeSidebarItem === item.id ? "active" : ""
                    }`}
                    onClick={() => onSidebarItemClick(item.id)}
                >
                    <FontAwesomeIcon
                        icon={item.icon}
                        className="sidebar-icon"
                    />
                    <span className="sidebar-label">{item.label}</span>
                </div>
            ))}
        </div>
    );
}
