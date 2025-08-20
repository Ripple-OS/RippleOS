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
import FileExplorerRenamePopup from "./FileExplorerRenamePopup";
import { fileSystemStorage } from "./fileSystemStorage";
import {
    NavigationHistory,
    navigationUtils,
    selectionUtils,
    clipboardUtils,
    dragDropUtils,
    fileSystemUtils,
    starringUtils,
} from "../../../../../functions/fileExplorer";

export default function FileExplorer({
    onClose,
    isSaveMode = false,
    onSaveConfirm = null,
    saveFileName = "",
}) {
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
    const [clipboard, setClipboard] = useState(
        clipboardUtils.createInitialClipboard()
    );
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [deleteItems, setDeleteItems] = useState([]);
    const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
    const [renameItem, setRenameItem] = useState(null);
    const [saveFileNameInput, setSaveFileNameInput] = useState(saveFileName);
    // eslint-disable-next-line no-unused-vars
    const [starredItemsChanged, setStarredItemsChanged] = useState(0); // Force re-render when starred items change

    const navigationHistory = useRef(new NavigationHistory());
    const selectionTimeoutRef = useRef(null);
    const dragDataRef = useRef(null);

    // Initialize with Home directory
    useEffect(() => {
        navigationUtils.navigateToDirectory(
            "Home",
            navigationHistory.current,
            fileSystemStorage,
            setCurrentDirectory,
            setCurrentPath,
            setFileItems,
            setSelectedItems,
            setLastSelectedIndex
        );
    }, []);

    // Update save filename when prop changes
    useEffect(() => {
        if (isSaveMode && saveFileName) {
            setSaveFileNameInput(saveFileName);
        }
    }, [isSaveMode, saveFileName]);

    // Navigation handlers
    const handleBack = () => {
        navigationUtils.handleBack(
            navigationHistory.current,
            fileSystemStorage,
            setCurrentDirectory,
            setCurrentPath,
            setFileItems
        );
    };

    const handleForward = () => {
        navigationUtils.handleForward(
            navigationHistory.current,
            fileSystemStorage,
            setCurrentDirectory,
            setCurrentPath,
            setFileItems
        );
    };

    const handleSidebarItemClick = (itemId) => {
        // In save mode, only allow navigation to actual folders, not Recent/Starred
        if (isSaveMode && (itemId === "Recent" || itemId === "Starred")) {
            return;
        }

        navigationUtils.handleSidebarItemClick(
            itemId,
            setActiveSidebarItem,
            navigationUtils.navigateToDirectory,
            navigationHistory.current,
            fileSystemStorage,
            setCurrentDirectory,
            setCurrentPath,
            setFileItems,
            setSelectedItems,
            setLastSelectedIndex
        );
    };

    // Selection handlers
    const handleItemClick = (item, index, event) => {
        selectionUtils.handleItemClick(
            item,
            index,
            event,
            currentDirectory,
            selectedItems,
            lastSelectedIndex,
            setSelectedItems,
            setLastSelectedIndex,
            (path) =>
                navigationUtils.navigateToDirectory(
                    path,
                    navigationHistory.current,
                    fileSystemStorage,
                    setCurrentDirectory,
                    setCurrentPath,
                    setFileItems,
                    setSelectedItems,
                    setLastSelectedIndex
                ),
            selectionTimeoutRef
        );
    };

    const handleContentPaneClick = (event) => {
        selectionUtils.handleContentPaneClick(
            event,
            setSelectedItems,
            setLastSelectedIndex
        );
    };

    const handleContextMenu = (event, index = null) => {
        selectionUtils.handleContextMenu(
            event,
            index,
            selectedItems,
            setSelectedItems,
            setLastSelectedIndex,
            setContextMenuPosition,
            setIsContextMenuOpen
        );
    };

    // Drag & Drop handlers
    const handleItemDragStart = (event, item, index) => {
        dragDropUtils.handleItemDragStart(
            event,
            item,
            index,
            selectedItems,
            fileItems,
            currentDirectory,
            dragDataRef
        );
    };

    const handleItemDrop = (event, targetItem) => {
        dragDropUtils.handleItemDrop(
            event,
            targetItem,
            currentDirectory,
            dragDataRef,
            fileSystemStorage,
            setFileItems
        );
    };

    const handleContentDrop = (event) => {
        dragDropUtils.handleContentDrop(
            event,
            currentDirectory,
            dragDataRef,
            fileSystemStorage,
            setFileItems
        );
    };

    const handleContentDragOver = (event) => {
        dragDropUtils.handleContentDragOver(event);
    };

    const handleSidebarDrop = (event, sidebarItemId) => {
        dragDropUtils.handleSidebarDrop(
            event,
            sidebarItemId,
            dragDataRef,
            currentDirectory,
            fileSystemStorage,
            setFileItems
        );
    };

    const handleSidebarDragOver = (event, sidebarItemId) => {
        dragDropUtils.handleSidebarDragOver(event, sidebarItemId);
    };

    // File system handlers
    const handleNewFolder = () => {
        fileSystemUtils.handleNewFolder(
            setInputPopupType,
            setInputPopupTitle,
            setIsInputPopupOpen
        );
    };

    const handleNewFile = () => {
        fileSystemUtils.handleNewFile(
            setInputPopupType,
            setInputPopupTitle,
            setIsInputPopupOpen
        );
    };

    const handlePopupSubmit = (name) => {
        fileSystemUtils.handlePopupSubmit(
            name,
            inputPopupType,
            currentDirectory,
            fileSystemStorage,
            setFileItems
        );
    };

    const handleDelete = () => {
        fileSystemUtils.handleDelete(
            selectedItems,
            fileItems,
            setDeleteItems,
            setIsDeletePopupOpen,
            setIsContextMenuOpen
        );
    };

    const handleDeleteConfirm = () => {
        fileSystemUtils.handleDeleteConfirm(
            deleteItems,
            currentDirectory,
            fileSystemStorage,
            setFileItems,
            setSelectedItems,
            setLastSelectedIndex,
            setIsDeletePopupOpen,
            setDeleteItems
        );
    };

    const handleDeleteCancel = () => {
        fileSystemUtils.handleDeleteCancel(
            setIsDeletePopupOpen,
            setDeleteItems
        );
    };

    const handleRename = () => {
        fileSystemUtils.handleRename(
            selectedItems,
            fileItems,
            setRenameItem,
            setIsRenamePopupOpen,
            setIsContextMenuOpen
        );
    };

    const handleRenameConfirm = (newName) => {
        fileSystemUtils.handleRenameConfirm(
            newName,
            renameItem,
            currentDirectory,
            fileSystemStorage,
            setFileItems
        );
    };

    // Clipboard handlers
    const handleCopy = () => {
        clipboardUtils.handleCopy(
            selectedItems,
            fileItems,
            currentDirectory,
            setClipboard,
            setIsContextMenuOpen
        );
    };

    const handleCut = () => {
        clipboardUtils.handleCut(
            selectedItems,
            fileItems,
            currentDirectory,
            setClipboard,
            setIsContextMenuOpen
        );
    };

    const handlePaste = () => {
        clipboardUtils.handlePaste(
            clipboard,
            currentDirectory,
            fileSystemStorage,
            setClipboard,
            setFileItems
        );
    };

    // Starring handlers
    const handleStarClick = (item, index) => {
        starringUtils.handleStarClick(
            item,
            index,
            currentDirectory,
            fileSystemStorage,
            setStarredItemsChanged,
            setFileItems
        );
    };

    // Helper function to check if an item is starred
    const isItemStarred = (item) => {
        return starringUtils.isItemStarred(
            item,
            currentDirectory,
            fileSystemStorage
        );
    };

    // Save mode handlers
    const handleSaveConfirm = () => {
        if (isSaveMode && onSaveConfirm && saveFileNameInput.trim()) {
            onSaveConfirm(saveFileNameInput.trim(), currentDirectory);
        }
    };

    const handleSaveCancel = () => {
        if (isSaveMode && onSaveConfirm) {
            onSaveConfirm(null, null);
        }
    };

    return (
        <Window
            title={isSaveMode ? "Save File" : "File Explorer"}
            onClose={onClose}
            defaultSize={{ width: 1000, height: 700 }}
        >
            <div className={`file-explorer ${isSaveMode ? "save-mode" : ""}`}>
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
                    canPaste={clipboardUtils.canPaste(clipboard)}
                    isSaveMode={isSaveMode}
                    saveFileName={saveFileNameInput}
                    onSaveFileNameChange={setSaveFileNameInput}
                    onSaveConfirm={handleSaveConfirm}
                    onSaveCancel={handleSaveCancel}
                />

                {/* Main Content */}
                <div className="main-content">
                    {/* Sidebar */}
                    <FileExplorerSidebar
                        activeSidebarItem={activeSidebarItem}
                        onSidebarItemClick={handleSidebarItemClick}
                        onSidebarDrop={handleSidebarDrop}
                        onSidebarDragOver={handleSidebarDragOver}
                    />

                    {/* Content Pane */}
                    <div
                        className="content-pane"
                        onClick={handleContentPaneClick}
                        onContextMenu={(event) => handleContextMenu(event)}
                        onDragOver={handleContentDragOver}
                        onDrop={handleContentDrop}
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
                                            onItemDragStart={
                                                handleItemDragStart
                                            }
                                            onItemDrop={(e) =>
                                                handleItemDrop(e, item)
                                            }
                                            isStarred={isItemStarred(item)}
                                            onStarClick={handleStarClick}
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
                                        onItemDragStart={handleItemDragStart}
                                        onItemDrop={(e) =>
                                            handleItemDrop(e, item)
                                        }
                                        isStarred={isItemStarred(item)}
                                        onStarClick={handleStarClick}
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
                canPaste={clipboardUtils.canPaste(clipboard)}
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

            {/* Rename Popup */}
            <FileExplorerRenamePopup
                isOpen={isRenamePopupOpen}
                onClose={() => setIsRenamePopupOpen(false)}
                onConfirm={handleRenameConfirm}
                item={renameItem}
            />
        </Window>
    );
}
