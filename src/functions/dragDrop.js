import { pathUtils } from './pathUtils.js';

// Drag & Drop utilities
export const dragDropUtils = {
    // Handle item drag start
    handleItemDragStart: (event, item, index, selectedItems, fileItems, currentDirectory, dragDataRef) => {
        const itemsToMove =
            selectedItems.size > 0 && selectedItems.has(index)
                ? Array.from(selectedItems).map((i) => fileItems[i])
                : [item];
        
        dragDataRef.current = {
            items: itemsToMove,
            fromPath: currentDirectory,
        };
        
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ count: itemsToMove.length })
        );
        event.dataTransfer.effectAllowed = "move";
    },

    // Perform move items operation
    performMoveItems: (toPath, dragDataRef, currentDirectory, fileSystemStorage, setFileItems) => {
        if (!dragDataRef.current) return;
        
        const { items, fromPath } = dragDataRef.current;
        // Skip no-op
        if (toPath === fromPath) return;
        
        items.forEach((it) => {
            fileSystemStorage.moveItem(fromPath, toPath, it.name);
        });
        
        // Refresh
        const directoryData = fileSystemStorage.getDirectoryContents(currentDirectory);
        setFileItems(directoryData.items);
        dragDataRef.current = null;
    },

    // Handle item drop
    handleItemDrop: (event, targetItem, currentDirectory, dragDataRef, fileSystemStorage, setFileItems) => {
        event.preventDefault();
        if (targetItem.type !== "folder") return;
        
        const destPath = pathUtils.navigateToDirectory(currentDirectory, targetItem.name);
        dragDropUtils.performMoveItems(destPath, dragDataRef, currentDirectory, fileSystemStorage, setFileItems);
    },

    // Handle content drop (drop into current directory)
    handleContentDrop: (event, currentDirectory, dragDataRef, fileSystemStorage, setFileItems) => {
        event.preventDefault();
        // Drop into current directory
        dragDropUtils.performMoveItems(currentDirectory, dragDataRef, currentDirectory, fileSystemStorage, setFileItems);
    },

    // Handle content drag over
    handleContentDragOver: (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    },

    // Handle sidebar drop
    handleSidebarDrop: (event, sidebarItemId, dragDataRef, currentDirectory, fileSystemStorage, setFileItems) => {
        event.preventDefault();
        if (!dragDataRef.current) return;
        
        const targetPath = pathUtils.mapSidebarItemToPath(sidebarItemId);
        if (targetPath) {
            dragDropUtils.performMoveItems(targetPath, dragDataRef, currentDirectory, fileSystemStorage, setFileItems);
        }
    },

    // Handle sidebar drag over
    handleSidebarDragOver: (event, sidebarItemId) => {
        // Only allow drop on directory-type sidebar items
        const allowedItems = ["Home", "Documents", "Downloads", "Pictures", "Music", "Videos"];
        if (allowedItems.includes(sidebarItemId)) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        }
    },

    // Create drag data ref
    createDragDataRef: () => {
        return { current: null };
    },
};
