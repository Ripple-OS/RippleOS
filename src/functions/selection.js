import { pathUtils } from "./pathUtils.js";

// Selection utilities
export const selectionUtils = {
    // Handle item selection logic
    handleItemSelection: (
        item,
        index,
        event,
        selectedItems,
        lastSelectedIndex,
        setSelectedItems,
        setLastSelectedIndex
    ) => {
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
    },

    // Handle item click (including double-click for navigation)
    handleItemClick: (
        item,
        index,
        event,
        currentDirectory,
        selectedItems,
        lastSelectedIndex,
        setSelectedItems,
        setLastSelectedIndex,
        navigateToDirectory,
        selectionTimeoutRef
    ) => {
        // Clear any pending selection timeout
        if (selectionTimeoutRef && selectionTimeoutRef.current) {
            clearTimeout(selectionTimeoutRef.current);
        }

        // Handle double click
        if (event.detail === 2) {
            if (currentDirectory === "Starred") {
                // Special handling for starred items - navigate to original location
                if (item.originalPath) {
                    if (item.type === "folder") {
                        // Navigate to the original folder location
                        const targetPath = pathUtils.navigateToDirectory(
                            item.originalPath,
                            item.name
                        );
                        navigateToDirectory(targetPath);
                    } else if (item.type === "text") {
                        // Open text file in TextEditor from original path
                        window.dispatchEvent(
                            new CustomEvent("open-text-editor", {
                                detail: {
                                    path: item.originalPath,
                                    name: item.name,
                                },
                            })
                        );
                    } else {
                        // For other files, navigate to the parent directory
                        navigateToDirectory(item.originalPath);
                    }
                }
            } else if (item.type === "folder") {
                const newPath = pathUtils.navigateToDirectory(
                    currentDirectory,
                    item.name
                );
                navigateToDirectory(newPath);
            } else if (item.type === "text") {
                // Open text file in TextEditor
                window.dispatchEvent(
                    new CustomEvent("open-text-editor", {
                        detail: { path: currentDirectory, name: item.name },
                    })
                );
            } else {
                // Non-text files: no-op for now
                // console.log("File double-clicked:", item.name);
            }
            return;
        }

        // Handle single click for selection
        selectionUtils.handleItemSelection(
            item,
            index,
            event,
            selectedItems,
            lastSelectedIndex,
            setSelectedItems,
            setLastSelectedIndex
        );
    },

    // Handle content pane click (clear selection)
    handleContentPaneClick: (event, setSelectedItems, setLastSelectedIndex) => {
        if (event.target.closest(".file-row, .grid-item")) {
            return; // Don't clear if clicking on an item
        }
        setSelectedItems(new Set());
        setLastSelectedIndex(-1);
    },

    // Handle context menu
    handleContextMenu: (
        event,
        index,
        selectedItems,
        setSelectedItems,
        setLastSelectedIndex,
        setContextMenuPosition,
        setIsContextMenuOpen
    ) => {
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
    },

    // Get selected items list
    getSelectedItemsList: (selectedItems, fileItems) => {
        return Array.from(selectedItems).map((index) => fileItems[index]);
    },

    // Clear selection
    clearSelection: (setSelectedItems, setLastSelectedIndex) => {
        setSelectedItems(new Set());
        setLastSelectedIndex(-1);
    },
};
