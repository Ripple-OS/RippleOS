// File system data structure
export const fileSystemData = {
    Home: {
        name: "Home",
        path: "Home",
        items: [
            {
                name: "Documents",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Downloads",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
            {
                name: "Pictures",
                type: "folder",
                size: "—",
                modified: "2025-01-13 16:45",
            },
            {
                name: "Music",
                type: "folder",
                size: "—",
                modified: "2025-01-12 11:20",
            },
            {
                name: "Videos",
                type: "folder",
                size: "—",
                modified: "2025-01-11 08:30",
            },
        ],
    },
    "Home/Documents": {
        name: "Documents",
        path: "Home / Documents",
        items: [
            {
                name: "Work",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Personal",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
        ],
    },
    "Home/Downloads": {
        name: "Downloads",
        path: "Home / Downloads",
        items: [],
    },
    "Home/Pictures": {
        name: "Pictures",
        path: "Home / Pictures",
        items: [
            {
                name: "Screenshots",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Vacation",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
        ],
    },
    "Home/Music": {
        name: "Music",
        path: "Home / Music",
        items: [
            {
                name: "Playlists",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Albums",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
        ],
    },
    "Home/Videos": {
        name: "Videos",
        path: "Home / Videos",
        items: [
            {
                name: "Movies",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Tutorials",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
        ],
    },
    // Nested folders for Documents
    "Home/Documents/Work": {
        name: "Work",
        path: "Home / Documents / Work",
        items: [
            {
                name: "Projects",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Reports",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:25",
            },
            {
                name: "meeting_notes.txt",
                type: "archive",
                size: "1.5 KB",
                modified: "2025-01-15 14:20",
            },
        ],
    },
    "Home/Documents/Personal": {
        name: "Personal",
        path: "Home / Documents / Personal",
        items: [
            {
                name: "Finance",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
            {
                name: "Health",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:10",
            },
            {
                name: "personal_notes.txt",
                type: "archive",
                size: "0.8 KB",
                modified: "2025-01-14 09:05",
            },
        ],
    },
    Recent: {
        name: "Recent",
        path: "Recent",
        items: [],
    },
    Starred: {
        name: "Starred",
        path: "Starred",
        items: [],
    },
};

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

// Helper function to get directory contents
export function getDirectoryContents(path) {
    return (
        fileSystemData[path] || {
            name: "Unknown",
            path: path,
            items: [],
        }
    );
}

// Helper function to navigate to a directory
export function navigateToDirectory(currentPath, targetName) {
    if (currentPath === "Home") {
        return `Home/${targetName}`;
    }
    return `${currentPath}/${targetName}`;
}

// Helper function to get parent directory
export function getParentDirectory(path) {
    if (path === "Home") {
        return "Home";
    }
    const parts = path.split("/");
    if (parts.length <= 2) {
        return "Home";
    }
    return parts.slice(0, -1).join("/");
}
