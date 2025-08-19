// Starring functionality utilities

export const starringUtils = {
    // Handle star click for items
    handleStarClick: (item, index, currentDirectory, fileSystemStorage, setStarredItemsChanged, setFileItems) => {
        if (currentDirectory === 'Starred') {
            // In starred directory, remove from starred when clicked
            const result = fileSystemStorage.unstarItem(item.originalPath, item.name);
            if (result) {
                // Refresh the starred items view
                const directoryData = fileSystemStorage.getDirectoryContents('Starred');
                setFileItems(directoryData.items);
                setStarredItemsChanged(prev => prev + 1);
            }
        } else {
            // In regular directories, toggle star status
            const result = fileSystemStorage.toggleStarItem(currentDirectory, item.name);
            if (result === 'starred' || result === 'unstarred') {
                // Trigger re-render by updating starred items counter
                setStarredItemsChanged(prev => prev + 1);
            }
        }
    },

    // Check if an item is starred
    isItemStarred: (item, currentDirectory, fileSystemStorage) => {
        // In Starred directory, all items are shown as starred
        if (currentDirectory === 'Starred') {
            return true;
        }
        return fileSystemStorage.isItemStarred(currentDirectory, item.name);
    },

    // Handle item click in Starred directory (navigate to original location)
    handleStarredItemClick: (item, index, event, navigationUtils, navigationHistory, fileSystemStorage, setCurrentDirectory, setCurrentPath, setFileItems, setSelectedItems, setLastSelectedIndex) => {
        if (event.detail === 2) { // Double click
            if (item.originalPath && item.type === 'folder') {
                // Navigate to the original folder location
                const targetPath = fileSystemStorage.constructPath(item.originalPath, item.name);
                navigationUtils.navigateToDirectory(
                    targetPath,
                    navigationHistory,
                    fileSystemStorage,
                    setCurrentDirectory,
                    setCurrentPath,
                    setFileItems,
                    setSelectedItems,
                    setLastSelectedIndex
                );
            } else if (item.originalPath) {
                // For files, navigate to the parent directory and select the file
                navigationUtils.navigateToDirectory(
                    item.originalPath,
                    navigationHistory,
                    fileSystemStorage,
                    setCurrentDirectory,
                    setCurrentPath,
                    setFileItems,
                    setSelectedItems,
                    setLastSelectedIndex
                );
                // TODO: Implement file selection highlighting after navigation
            }
        }
    }
};
