import { selectionUtils } from './selection.js';

// File System utilities
export const fileSystemUtils = {
    // Create new folder
    handleNewFolder: (setInputPopupType, setInputPopupTitle, setIsInputPopupOpen) => {
        setInputPopupType("folder");
        setInputPopupTitle("Create New Folder");
        setIsInputPopupOpen(true);
    },

    // Create new file
    handleNewFile: (setInputPopupType, setInputPopupTitle, setIsInputPopupOpen) => {
        setInputPopupType("file");
        setInputPopupTitle("Create New File");
        setIsInputPopupOpen(true);
    },

    // Handle popup submission (create folder or file)
    handlePopupSubmit: (name, inputPopupType, currentDirectory, fileSystemStorage, setFileItems) => {
        try {
            if (inputPopupType === "folder") {
                fileSystemStorage.createFolder(currentDirectory, name);
            } else {
                fileSystemStorage.createFile(currentDirectory, name);
            }
            // Refresh current directory
            const directoryData = fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);
        } catch (error) {
            alert(error.message);
        }
    },

    // Handle delete operation
    handleDelete: (selectedItems, fileItems, setDeleteItems, setIsDeletePopupOpen, setIsContextMenuOpen) => {
        const selectedItemsList = selectionUtils.getSelectedItemsList(selectedItems, fileItems);
        setDeleteItems(selectedItemsList);
        setIsDeletePopupOpen(true);
        setIsContextMenuOpen(false);
    },

    // Handle delete confirmation
    handleDeleteConfirm: (deleteItems, currentDirectory, fileSystemStorage, setFileItems, setSelectedItems, setLastSelectedIndex, setIsDeletePopupOpen, setDeleteItems) => {
        try {
            deleteItems.forEach((item) => {
                // Permanent recursive deletion (Trash removed)
                fileSystemStorage.deleteItem(currentDirectory, item.name);
            });

            // Refresh current directory
            const directoryData = fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);

            // Clear selection
            selectionUtils.clearSelection(setSelectedItems, setLastSelectedIndex);
        } catch (error) {
            alert(error.message);
        }
        setIsDeletePopupOpen(false);
        setDeleteItems([]);
    },

    // Handle delete cancellation
    handleDeleteCancel: (setIsDeletePopupOpen, setDeleteItems) => {
        setIsDeletePopupOpen(false);
        setDeleteItems([]);
    },

    // Handle rename operation
    handleRename: (selectedItems, fileItems, setRenameItem, setIsRenamePopupOpen, setIsContextMenuOpen) => {
        const selectedIndex = Array.from(selectedItems)[0];
        if (selectedIndex !== undefined) {
            const item = fileItems[selectedIndex];
            setRenameItem(item);
            setIsRenamePopupOpen(true);
        }
        setIsContextMenuOpen(false);
    },

    // Handle rename confirmation
    handleRenameConfirm: (newName, renameItem, currentDirectory, fileSystemStorage, setFileItems) => {
        try {
            fileSystemStorage.renameItem(
                currentDirectory,
                renameItem.name,
                newName
            );
            const directoryData = fileSystemStorage.getDirectoryContents(currentDirectory);
            setFileItems(directoryData.items);
        } catch (error) {
            alert(error.message);
        }
    },

    // Refresh current directory
    refreshDirectory: (currentDirectory, fileSystemStorage, setFileItems) => {
        const directoryData = fileSystemStorage.getDirectoryContents(currentDirectory);
        setFileItems(directoryData.items);
    },
};
