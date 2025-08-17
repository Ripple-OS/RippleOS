import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar as faStarRegular,
    faFolder,
    faFileArchive,
    faFilePdf,
    faCompactDisc,
    faBox,
    faFile,
    faFileWord,
    faFileAlt,
    faImage,
    faMusic,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerItem({
    item,
    index,
    isSelected,
    onItemClick,
    onContextMenu,
    viewMode = "list",
}) {
    const getFileIcon = (type) => {
        switch (type) {
            case "folder":
                return faFolder;
            case "archive":
                return faFileArchive;
            case "pdf":
                return faFilePdf;
            case "document":
                return faFileWord;
            case "text":
                return faFileAlt;
            case "image":
                return faImage;
            case "audio":
                return faMusic;
            case "video":
                return faVideo;
            case "iso":
                return faCompactDisc;
            case "rpm":
                return faBox;
            default:
                return faFile;
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
            case "document":
                return "#2e5aa8";
            case "text":
                return "#95a5a6";
            case "image":
                return "#e74c3c";
            case "audio":
                return "#9b59b6";
            case "video":
                return "#e67e22";
            case "iso":
                return "#ffffff";
            case "rpm":
                return "#e74c3c";
            default:
                return "#95a5a6";
        }
    };

    const handleClick = (event) => {
        onItemClick(item, index, event);
    };

    const handleContextMenu = (event) => {
        onContextMenu(event, index);
    };

    if (viewMode === "list") {
        return (
            <div
                className={`file-row ${isSelected ? "selected" : ""}`}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
            >
                <div className="file-icon">
                    <FontAwesomeIcon
                        icon={getFileIcon(item.type)}
                        style={{
                            color: getFileIconColor(item.type),
                        }}
                    />
                </div>
                <div className="file-name">{item.name}</div>
                <div className="file-size">{item.size}</div>
                <div className="file-modified">{item.modified}</div>
                <div className="file-actions">
                    <FontAwesomeIcon
                        icon={faStarRegular}
                        className="star-icon"
                    />
                </div>
            </div>
        );
    }

    // Grid view
    return (
        <div
            className={`grid-item ${isSelected ? "selected" : ""}`}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
        >
            <div className="grid-item-icon">
                <FontAwesomeIcon
                    icon={getFileIcon(item.type)}
                    style={{
                        color: getFileIconColor(item.type),
                    }}
                />
            </div>
            <div className="grid-item-name">{item.name}</div>
            <div className="grid-item-details">
                <span className="grid-item-size">{item.size}</span>
                <span className="grid-item-modified">{item.modified}</span>
            </div>
            <div className="grid-item-actions">
                <FontAwesomeIcon icon={faStarRegular} className="star-icon" />
            </div>
        </div>
    );
}
