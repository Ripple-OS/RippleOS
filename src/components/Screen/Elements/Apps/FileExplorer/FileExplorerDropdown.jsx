import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolder,
    faFile,
    faChevronDown,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function FileExplorerDropdown({ 
    isOpen, 
    onClose, 
    onNewFolder, 
    onNewFile,
    position = { x: 0, y: 0 }
}) {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="file-explorer-dropdown"
            ref={dropdownRef}
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 1000
            }}
        >
            <div className="dropdown-header">
                <span>New</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            
            <div className="dropdown-item" onClick={onNewFolder}>
                <FontAwesomeIcon icon={faFolder} className="dropdown-icon" />
                <span>New Folder</span>
            </div>
            
            <div className="dropdown-item" onClick={onNewFile}>
                <FontAwesomeIcon icon={faFile} className="dropdown-icon" />
                <span>New File</span>
            </div>
        </div>
    );
}
