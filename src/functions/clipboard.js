import { selectionUtils } from './selection.js';

// Clipboard utilities
export const clipboardUtils = {
    // Handle copy operation
    handleCopy: (selectedItems, fileItems, currentDirectory, setClipboard, setIsContextMenuOpen) => {
        const selectedItemsList = selectionUtils.getSelectedItemsList(selectedItems, fileItems);
        setClipboard({
            items: selectedItemsList,
            action: "copy",
            sourcePath: currentDirectory,
        });
        setIsContextMenuOpen(false);
    },

    // Handle cut operation
    handleCut: (selectedItems, fileItems, currentDirectory, setClipboard, setIsContextMenuOpen) => {
        const selectedItemsList = selectionUtils.getSelectedItemsList(selectedItems, fileItems);
        setClipboard({
            items: selectedItemsList,
            action: "cut",
            sourcePath: currentDirectory,
        });
        setIsContextMenuOpen(false);
    },

    // Handle paste operation
    handlePaste: (clipboard, currentDirectory, fileSystemStorage, setClipboard, setFileItems) => {
        if (clipboard.items.length === 0) return;

        try {
            clipboard.items.forEach((item) => {
                if (clipboard.action === "copy") {
                    // Copy logic - use new copyItem method that preserves folder contents
                    fileSystemStorage.copyItem(
                        clipboard.sourcePath || currentDirectory,
                        currentDirectory,
                        item.name
                    );
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
                        // If same directory, treat cut->paste as no-op
                    }
                }
            });

            // Clear clipboard after paste
            setClipboard({ items: [], action: null, sourcePath: null });

            // Refresh current directory
            const directoryData = fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);
        } catch (error) {
            alert(error.message);
        }
    },

    // Create initial clipboard state
    createInitialClipboard: () => ({
        items: [],
        action: null,
        sourcePath: null,
    }),

    // Check if paste is available
    canPaste: (clipboard) => {
        return clipboard.items.length > 0;
    },
};
