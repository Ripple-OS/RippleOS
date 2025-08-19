// Navigation history management
export class NavigationHistory {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
    }

    push(path) {
        // Remove any forward history when navigating to a new path
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(path);
        this.currentIndex = this.history.length - 1;
    }

    back() {
        if (this.canGoBack()) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    forward() {
        if (this.canGoForward()) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }

    canGoBack() {
        return this.currentIndex > 0;
    }

    canGoForward() {
        return this.currentIndex < this.history.length - 1;
    }

    getCurrentPath() {
        return this.history[this.currentIndex] || null;
    }
}

// Navigation utilities
export const navigationUtils = {
    // Handle back navigation
    handleBack: (navigationHistory, fileSystemStorage, setCurrentDirectory, setCurrentPath, setFileItems) => {
        const previousPath = navigationHistory.back();
        if (previousPath) {
            const directoryData = fileSystemStorage.getDirectoryContents(previousPath);
            setCurrentDirectory(previousPath);
            setCurrentPath(directoryData.path);
            setFileItems(directoryData.items);
        }
    },

    // Handle forward navigation
    handleForward: (navigationHistory, fileSystemStorage, setCurrentDirectory, setCurrentPath, setFileItems) => {
        const nextPath = navigationHistory.forward();
        if (nextPath) {
            const directoryData = fileSystemStorage.getDirectoryContents(nextPath);
            setCurrentDirectory(nextPath);
            setCurrentPath(directoryData.path);
            setFileItems(directoryData.items);
        }
    },

    // Navigate to directory
    navigateToDirectory: (path, navigationHistory, fileSystemStorage, setCurrentDirectory, setCurrentPath, setFileItems, setSelectedItems, setLastSelectedIndex) => {
        const directoryData = fileSystemStorage.getDirectoryContents(path);
        setCurrentDirectory(path);
        setCurrentPath(directoryData.path);
        setFileItems(directoryData.items);
        navigationHistory.push(path);
        // Clear selection when navigating to new directory
        setSelectedItems(new Set());
        setLastSelectedIndex(-1);
    },

    // Handle sidebar item click
    handleSidebarItemClick: (itemId, setActiveSidebarItem, navigateToDirectory, navigationHistory, fileSystemStorage, setCurrentDirectory, setCurrentPath, setFileItems, setSelectedItems, setLastSelectedIndex) => {
        setActiveSidebarItem(itemId);

        // Map sidebar items to their correct paths
        const pathMapping = {
            Home: "Home",
            Recent: "Recent",
            Starred: "Starred",
            Documents: "Home/Documents",
            Downloads: "Home/Downloads",
            Pictures: "Home/Pictures",
            Music: "Home/Music",
            Videos: "Home/Videos",
        };

        const correctPath = pathMapping[itemId] || itemId;
        navigateToDirectory(correctPath, navigationHistory, fileSystemStorage, setCurrentDirectory, setCurrentPath, setFileItems, setSelectedItems, setLastSelectedIndex);
    },
};
