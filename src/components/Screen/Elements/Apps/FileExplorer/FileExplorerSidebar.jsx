import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faClock,
    faStar,
    faFolder,
    faDownload,
    faMusic,
    faImage,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerSidebar({
    activeSidebarItem,
    onSidebarItemClick,
    onSidebarDrop,
    onSidebarDragOver,
}) {
    const [dragOverItem, setDragOverItem] = useState(null);

    const sidebarItems = [
        { id: "Home", icon: faHome, label: "Home", canDrop: true },
        { id: "Recent", icon: faClock, label: "Recent", canDrop: false },
        { id: "Starred", icon: faStar, label: "Starred", canDrop: false },
        { id: "Documents", icon: faFolder, label: "Documents", canDrop: true },
        { id: "Downloads", icon: faDownload, label: "Downloads", canDrop: true },
        { id: "Music", icon: faMusic, label: "Music", canDrop: true },
        { id: "Pictures", icon: faImage, label: "Pictures", canDrop: true },
        { id: "Videos", icon: faVideo, label: "Videos", canDrop: true },
    ];

    const handleDragOver = (event, item) => {
        if (item.canDrop && onSidebarDragOver) {
            onSidebarDragOver(event, item.id);
            if (event.defaultPrevented) {
                setDragOverItem(item.id);
            }
        }
    };

    const handleDragLeave = (event) => {
        // Only clear drag over state if we're actually leaving the item
        // Check if we're leaving for a child element
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
        
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setDragOverItem(null);
        }
    };

    const handleDrop = (event, item) => {
        if (item.canDrop && onSidebarDrop) {
            onSidebarDrop(event, item.id);
        }
        setDragOverItem(null);
    };

    return (
        <div className="sidebar">
            {sidebarItems.map((item) => (
                <div
                    key={item.id}
                    className={`sidebar-item ${
                        activeSidebarItem === item.id ? "active" : ""
                    } ${
                        dragOverItem === item.id ? "drag-over" : ""
                    }`}
                    onClick={() => onSidebarItemClick(item.id)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item)}
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
