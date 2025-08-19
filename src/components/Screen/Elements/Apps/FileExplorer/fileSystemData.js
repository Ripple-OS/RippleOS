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
