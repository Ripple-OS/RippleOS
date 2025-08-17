import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";
import FileExplorerItem from "./FileExplorerItem";
import FileExplorerSidebar from "./FileExplorerSidebar";
import FileExplorerTopBar from "./FileExplorerTopBar";
import FileExplorerInputPopup from "./FileExplorerInputPopup";
import FileExplorerContextMenu from "./FileExplorerContextMenu";
import FileExplorerDeletePopup from "./FileExplorerDeletePopup";
import {
    NavigationHistory,
    navigateToDirectory as navigateToDirectoryHelper,
} from "./fileSystemData";
import { fileSystemStorage } from "./fileSystemStorage";

export default function FileExplorer({ onClose }) {
    const [currentView, setCurrentView] = useState("list");
    const [activeSidebarItem, setActiveSidebarItem] = useState("Home");
    const [currentDirectory, setCurrentDirectory] = useState("Home");
    const [currentPath, setCurrentPath] = useState("Home");
    const [fileItems, setFileItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);
    const [isInputPopupOpen, setIsInputPopupOpen] = useState(false);
    const [inputPopupType, setInputPopupType] = useState("file");
    const [inputPopupTitle, setInputPopupTitle] = useState("Create New");
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
    });
    const [clipboard, setClipboard] = useState({
        items: [],
        action: null,
        sourcePath: null,
    }); // 'copy' or 'cut'
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [deleteItems, setDeleteItems] = useState([]);

    const navigationHistory = useRef(new NavigationHistory());
    const selectionTimeoutRef = useRef(null);

    // Initialize with Home directory
    useEffect(() => {
        navigateToDirectory("Home");
    }, []);

    const navigateToDirectory = (path) => {
        const directoryData = fileSystemStorage.getDirectoryContents(path);
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
            const directoryData =
                fileSystemStorage.getDirectoryContents(previousPath);
            setCurrentDirectory(previousPath);
            setCurrentPath(directoryData.path);
            setFileItems(directoryData.items);
        }
    };

    const handleForward = () => {
        const nextPath = navigationHistory.current.forward();
        if (nextPath) {
            const directoryData =
                fileSystemStorage.getDirectoryContents(nextPath);
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

    // Create new folder
    const handleNewFolder = () => {
        setInputPopupType("folder");
        setInputPopupTitle("Create New Folder");
        setIsInputPopupOpen(true);
    };

    // Create new file
    const handleNewFile = () => {
        setInputPopupType("file");
        setInputPopupTitle("Create New File");
        setIsInputPopupOpen(true);
    };

    // Handle popup submission
    const handlePopupSubmit = (name) => {
        try {
            if (inputPopupType === "folder") {
                fileSystemStorage.createFolder(currentDirectory, name);
            } else {
                fileSystemStorage.createFile(currentDirectory, name);
            }
            // Refresh current directory
            const directoryData =
                fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);
        } catch (error) {
            alert(error.message);
        }
    };

    // Clipboard functions
    const handleCopy = () => {
        const selectedItemsList = Array.from(selectedItems).map(
            (index) => fileItems[index]
        );
        setClipboard({
            items: selectedItemsList,
            action: "copy",
            sourcePath: null,
        });
        setIsContextMenuOpen(false);
    };

    const handleCut = () => {
        const selectedItemsList = Array.from(selectedItems).map(
            (index) => fileItems[index]
        );
        setClipboard({
            items: selectedItemsList,
            action: "cut",
            sourcePath: currentDirectory,
        });
        setIsContextMenuOpen(false);
    };

    const handlePaste = () => {
        if (clipboard.items.length === 0) return;

        try {
            clipboard.items.forEach((item) => {
                if (clipboard.action === "copy") {
                    // Copy logic - create duplicate
                    if (item.type === "folder") {
                        fileSystemStorage.createFolder(
                            currentDirectory,
                            item.name
                        );
                    } else {
                        fileSystemStorage.createFile(
                            currentDirectory,
                            item.name,
                            item.type
                        );
                    }
                } else if (clipboard.action === "cut") {
                    // Cut logic - move item
                    if (
                        clipboard.sourcePath &&
                        clipboard.sourcePath !== currentDirectory
                    ) {
                        // Move the item from source to destination
                        fileSystemStorage.moveItem(
                            clipboard.sourcePath,
                            currentDirectory,
                            item.name
                        );
                    } else {
                        // If same directory, just create a copy
                        if (item.type === "folder") {
                            fileSystemStorage.createFolder(
                                currentDirectory,
                                item.name
                            );
                        } else {
                            fileSystemStorage.createFile(
                                currentDirectory,
                                item.name,
                                item.type
                            );
                        }
                    }
                }
            });

            // Clear clipboard after paste
            setClipboard({ items: [], action: null, sourcePath: null });

            // Refresh current directory
            const directoryData =
                fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);
        } catch (error) {
            alert(error.message);
        }
    };

    // Context menu functions
    const handleContextMenu = (event, index = null) => {
        event.preventDefault();

        if (index !== null) {
            // Right-click on specific item
            if (!selectedItems.has(index)) {
                setSelectedItems(new Set([index]));
                setLastSelectedIndex(index);
            }
        }

        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setIsContextMenuOpen(true);
    };

    const handleDelete = () => {
        const selectedItemsList = Array.from(selectedItems).map(
            (index) => fileItems[index]
        );

        setDeleteItems(selectedItemsList);
        setIsDeletePopupOpen(true);
        setIsContextMenuOpen(false);
    };

    const handleDeleteConfirm = () => {
        try {
            deleteItems.forEach((item) => {
                fileSystemStorage.deleteItem(currentDirectory, item.name);
            });

            // Refresh current directory
            const directoryData =
                fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);

            // Clear selection
            setSelectedItems(new Set());
            setLastSelectedIndex(-1);
        } catch (error) {
            alert(error.message);
        }
        setIsDeletePopupOpen(false);
        setDeleteItems([]);
    };

    const handleDeleteCancel = () => {
        setIsDeletePopupOpen(false);
        setDeleteItems([]);
    };

    const handleRename = () => {
        // For now, just show a simple prompt
        const selectedIndex = Array.from(selectedItems)[0];
        if (selectedIndex !== undefined) {
            const item = fileItems[selectedIndex];
            const newName = prompt("Enter new name:", item.name);
            if (newName && newName.trim() && newName !== item.name) {
                try {
                    fileSystemStorage.renameItem(
                        currentDirectory,
                        item.name,
                        newName.trim()
                    );
                    const directoryData =
                        fileSystemStorage.getDirectoryContents(
                            currentDirectory
                        );
                    setFileItems(directoryData.items);
                } catch (error) {
                    alert(error.message);
                }
            }
        }
        setIsContextMenuOpen(false);
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
                    onNewFolder={handleNewFolder}
                    onNewFile={handleNewFile}
                    onCopy={handleCopy}
                    onPaste={handlePaste}
                    canPaste={clipboard.items.length > 0}
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
                        onContextMenu={(event) => handleContextMenu(event)}
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
                                            onContextMenu={handleContextMenu}
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
                                        onContextMenu={handleContextMenu}
                                        viewMode="grid"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Input Popup */}
            <FileExplorerInputPopup
                isOpen={isInputPopupOpen}
                onClose={() => setIsInputPopupOpen(false)}
                onSubmit={handlePopupSubmit}
                type={inputPopupType}
                title={inputPopupTitle}
            />

            {/* Context Menu */}
            <FileExplorerContextMenu
                isOpen={isContextMenuOpen}
                onClose={() => setIsContextMenuOpen(false)}
                position={contextMenuPosition}
                onCopy={handleCopy}
                onPaste={handlePaste}
                onCut={handleCut}
                onDelete={handleDelete}
                onRename={handleRename}
                canPaste={clipboard.items.length > 0}
                hasSelection={selectedItems.size > 0}
            />

            {/* Delete Confirmation Popup */}
            <FileExplorerDeletePopup
                isOpen={isDeletePopupOpen}
                onClose={() => setIsDeletePopupOpen(false)}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                items={deleteItems}
            />
        </Window>
    );
}
