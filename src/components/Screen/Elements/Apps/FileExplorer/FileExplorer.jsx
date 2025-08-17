import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";
import FileExplorerItem from "./FileExplorerItem";
import FileExplorerSidebar from "./FileExplorerSidebar";
import FileExplorerTopBar from "./FileExplorerTopBar";
import {
    NavigationHistory,
    getDirectoryContents,
    navigateToDirectory as navigateToDirectoryHelper,
} from "./fileSystemData";

export default function FileExplorer({ onClose }) {
    const [currentView, setCurrentView] = useState("list");
    const [activeSidebarItem, setActiveSidebarItem] = useState("Home");
    const [currentDirectory, setCurrentDirectory] = useState("Home");
    const [currentPath, setCurrentPath] = useState("Home");
    const [fileItems, setFileItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);

    const navigationHistory = useRef(new NavigationHistory());
    const selectionTimeoutRef = useRef(null);

    // Initialize with Home directory
    useEffect(() => {
        navigateToDirectory("Home");
    }, []);

    const navigateToDirectory = (path) => {
        const directoryData = getDirectoryContents(path);
        setCurrentDirectory(path);
        setCurrentPath(directoryData.path);
        setFileItems(directoryData.items);
        navigationHistory.current.push(path);
        // Clear selection when navigating to new directory
        setSelectedItems(new Set());
        setLastSelectedIndex(-1);
    };

    const handleSidebarItemClick = (itemId) => {
        setActiveSidebarItem(itemId);

        // Map sidebar items to their correct paths
        const pathMapping = {
            Home: "Home",
            Recent: "Recent",
            Starred: "Starred",
            Trash: "Trash",
            Documents: "Home/Documents",
            Downloads: "Home/Downloads",
            Pictures: "Home/Pictures",
            Music: "Home/Music",
            Videos: "Home/Videos",
        };

        const correctPath = pathMapping[itemId] || itemId;
        navigateToDirectory(correctPath);
    };

    const handleItemClick = (item, index, event) => {
        // Clear any pending selection timeout
        if (selectionTimeoutRef.current) {
            clearTimeout(selectionTimeoutRef.current);
        }

        // Handle double click
        if (event.detail === 2) {
            if (item.type === "folder") {
                const newPath = navigateToDirectoryHelper(
                    currentDirectory,
                    item.name
                );
                navigateToDirectory(newPath);
            } else {
                // Handle file double click (could open file, show preview, etc.)
                console.log("File double-clicked:", item.name);
            }
            return;
        }

        // Handle single click for selection
        handleItemSelection(item, index, event);
    };

    const handleItemSelection = (item, index, event) => {
        const newSelectedItems = new Set(selectedItems);

        if (event.shiftKey && lastSelectedIndex !== -1) {
            // Shift + click for range selection
            const start = Math.min(lastSelectedIndex, index);
            const end = Math.max(lastSelectedIndex, index);
            for (let i = start; i <= end; i++) {
                newSelectedItems.add(i);
            }
        } else {
            // Single click - select only this item
            newSelectedItems.clear();
            newSelectedItems.add(index);
            setLastSelectedIndex(index);
        }

        setSelectedItems(newSelectedItems);
    };

    const handleBack = () => {
        const previousPath = navigationHistory.current.back();
        if (previousPath) {
            const directoryData = getDirectoryContents(previousPath);
            setCurrentDirectory(previousPath);
            setCurrentPath(directoryData.path);
            setFileItems(directoryData.items);
        }
    };

    const handleForward = () => {
        const nextPath = navigationHistory.current.forward();
        if (nextPath) {
            const directoryData = getDirectoryContents(nextPath);
            setCurrentDirectory(nextPath);
            setCurrentPath(directoryData.path);
            setFileItems(directoryData.items);
        }
    };

    // Handle click outside to clear selection
    const handleContentPaneClick = (event) => {
        if (event.target.closest(".file-row, .grid-item")) {
            return; // Don't clear if clicking on an item
        }
        setSelectedItems(new Set());
        setLastSelectedIndex(-1);
    };

    return (
        <Window
            title="File Explorer"
            onClose={onClose}
            defaultSize={{ width: 1000, height: 700 }}
        >
            <div className="file-explorer">
                {/* Top Bar */}
                <FileExplorerTopBar
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    currentPath={currentPath}
                    onBack={handleBack}
                    onForward={handleForward}
                    canGoBack={navigationHistory.current.canGoBack()}
                    canGoForward={navigationHistory.current.canGoForward()}
                />

                {/* Main Content */}
                <div className="main-content">
                    {/* Sidebar */}
                    <FileExplorerSidebar
                        activeSidebarItem={activeSidebarItem}
                        onSidebarItemClick={handleSidebarItemClick}
                    />

                    {/* Content Pane */}
                    <div
                        className="content-pane"
                        onClick={handleContentPaneClick}
                    >
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
                                        <FileExplorerItem
                                            key={index}
                                            item={item}
                                            index={index}
                                            isSelected={selectedItems.has(
                                                index
                                            )}
                                            onItemClick={handleItemClick}
                                            viewMode="list"
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Grid View */
                            <div className="grid-view">
                                {fileItems.map((item, index) => (
                                    <FileExplorerItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        isSelected={selectedItems.has(index)}
                                        onItemClick={handleItemClick}
                                        viewMode="grid"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
}
