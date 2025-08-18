import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faTrash,
    faExclamationTriangle,
    faFolder,
    faFile,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerDeletePopup({
    isOpen,
    onClose,
    onConfirm,
    onCancel,
    items = [],
}) {
    const popupRef = useRef(null);

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

    if (!isOpen) return null;

    const itemCount = items.length;
    const isSingleItem = itemCount === 1;
    const itemName = isSingleItem ? items[0]?.name : `${itemCount} items`;

    return (
        <div className="file-explorer-popup-overlay">
            <div className="file-explorer-popup delete-popup" ref={popupRef}>
                <div className="popup-header">
                    <div className="popup-title">
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className="popup-icon warning"
                        />
                        <span>Delete {isSingleItem ? "Item" : "Items"}</span>
                    </div>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="popup-close"
                        onClick={onClose}
                    />
                </div>

                <div className="popup-content">
                    <p className="delete-message">{`Are you sure you want to delete ${itemName}?`}</p>

                    {itemCount > 1 && (
                        <div className="delete-items-list">
                            <p>Items to be deleted:</p>
                            <ul>
                                {items.slice(0, 5).map((item, index) => (
                                    <li key={index}>
                                        <FontAwesomeIcon
                                            icon={
                                                item.type === "folder"
                                                    ? faFolder
                                                    : faFile
                                            }
                                            className="item-icon"
                                        />
                                        {item.name}
                                    </li>
                                ))}
                                {itemCount > 5 && (
                                    <li className="more-items">
                                        ... and {itemCount - 5} more items
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    <p className="delete-warning">
                        This action cannot be undone.
                    </p>
                </div>

                <div className="popup-actions">
                    <button
                        type="button"
                        className="popup-button cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="popup-button delete"
                        onClick={onConfirm}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
