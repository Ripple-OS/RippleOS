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
            {
                name: "report.pdf",
                type: "pdf",
                size: "2.3 MB",
                modified: "2025-01-10 08:30",
            },
            {
                name: "presentation.pptx",
                type: "archive",
                size: "5.7 MB",
                modified: "2025-01-09 15:20",
            },
        ],
    },
    "Home/Downloads": {
        name: "Downloads",
        path: "Home / Downloads",
        items: [
            {
                name: "postman-linux-x64",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "balenaEtcher-linux-x64-2.1.4",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
            {
                name: "grub2-themes-2025-07-23",
                type: "folder",
                size: "—",
                modified: "2025-01-13 16:45",
            },
            {
                name: "SKyCore plugin versions",
                type: "folder",
                size: "—",
                modified: "2025-01-12 11:20",
            },
            {
                name: "postman-linux-x64.tar.gz",
                type: "archive",
                size: "156 MB",
                modified: "2025-01-15 14:25",
            },
            {
                name: "grub2-themes-2025-07-23.zip",
                type: "archive",
                size: "89 MB",
                modified: "2025-01-13 16:40",
            },
            {
                name: "balenaEtcher-linux-x64-2.1.4.zip",
                type: "archive",
                size: "234 MB",
                modified: "2025-01-14 09:10",
            },
            {
                name: "faktura_2025_08_001.pdf",
                type: "pdf",
                size: "2.3 MB",
                modified: "2025-01-10 08:30",
            },
            {
                name: "Win10_22H2_Polish_x64vl.iso",
                type: "iso",
                size: "4.2 GB",
                modified: "2025-01-08 15:20",
            },
            {
                name: "nautilus-dropbox-2025.05.20-1.fc42.x86_64.rpm",
                type: "rpm",
                size: "1.8 MB",
                modified: "2025-01-05 12:45",
            },
        ],
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
            {
                name: "screenshot.png",
                type: "archive",
                size: "1.2 MB",
                modified: "2025-01-10 08:30",
            },
            {
                name: "photo.jpg",
                type: "archive",
                size: "3.4 MB",
                modified: "2025-01-09 15:20",
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
            {
                name: "song.mp3",
                type: "archive",
                size: "4.1 MB",
                modified: "2025-01-10 08:30",
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
            {
                name: "video.mp4",
                type: "archive",
                size: "45.2 MB",
                modified: "2025-01-10 08:30",
            },
        ],
    },
    // Nested folders for Downloads
    "Home/Downloads/postman-linux-x64": {
        name: "postman-linux-x64",
        path: "Home / Downloads / postman-linux-x64",
        items: [
            {
                name: "Postman",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "resources",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:25",
            },
            {
                name: "postman.desktop",
                type: "archive",
                size: "0.2 KB",
                modified: "2025-01-15 14:20",
            },
        ],
    },
    "Home/Downloads/balenaEtcher-linux-x64-2.1.4": {
        name: "balenaEtcher-linux-x64-2.1.4",
        path: "Home / Downloads / balenaEtcher-linux-x64-2.1.4",
        items: [
            {
                name: "balena-etcher",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:15",
            },
            {
                name: "locales",
                type: "folder",
                size: "—",
                modified: "2025-01-14 09:10",
            },
            {
                name: "balena-etcher.desktop",
                type: "archive",
                size: "0.3 KB",
                modified: "2025-01-14 09:05",
            },
        ],
    },
    "Home/Downloads/grub2-themes-2025-07-23": {
        name: "grub2-themes-2025-07-23",
        path: "Home / Downloads / grub2-themes-2025-07-23",
        items: [
            {
                name: "themes",
                type: "folder",
                size: "—",
                modified: "2025-01-13 16:45",
            },
            {
                name: "install.sh",
                type: "archive",
                size: "15 KB",
                modified: "2025-01-13 16:40",
            },
            {
                name: "README.md",
                type: "archive",
                size: "8 KB",
                modified: "2025-01-13 16:35",
            },
        ],
    },
    "Home/Downloads/SKyCore plugin versions": {
        name: "SKyCore plugin versions",
        path: "Home / Downloads / SKyCore plugin versions",
        items: [
            {
                name: "v1.0.0",
                type: "folder",
                size: "—",
                modified: "2025-01-12 11:20",
            },
            {
                name: "v1.1.0",
                type: "folder",
                size: "—",
                modified: "2025-01-12 11:15",
            },
            {
                name: "v1.2.0",
                type: "folder",
                size: "—",
                modified: "2025-01-12 11:10",
            },
            {
                name: "changelog.txt",
                type: "archive",
                size: "2.1 KB",
                modified: "2025-01-12 11:05",
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
    // Nested folders for Pictures
    "Home/Pictures/Screenshots": {
        name: "Screenshots",
        path: "Home / Pictures / Screenshots",
        items: [
            {
                name: "screenshot_2025_01_15.png",
                type: "archive",
                size: "2.1 MB",
                modified: "2025-01-15 14:30",
            },
            {
                name: "screenshot_2025_01_14.png",
                type: "archive",
                size: "1.8 MB",
                modified: "2025-01-14 16:45",
            },
            {
                name: "screenshot_2025_01_13.png",
                type: "archive",
                size: "1.5 MB",
                modified: "2025-01-13 12:20",
            },
        ],
    },
    "Home/Pictures/Vacation": {
        name: "Vacation",
        path: "Home / Pictures / Vacation",
        items: [
            {
                name: "beach_photo.jpg",
                type: "archive",
                size: "4.2 MB",
                modified: "2025-01-10 08:30",
            },
            {
                name: "mountain_view.jpg",
                type: "archive",
                size: "3.8 MB",
                modified: "2025-01-09 15:20",
            },
            {
                name: "city_tour.jpg",
                type: "archive",
                size: "2.9 MB",
                modified: "2025-01-08 11:45",
            },
        ],
    },
    // Nested folders for Music
    "Home/Music/Playlists": {
        name: "Playlists",
        path: "Home / Music / Playlists",
        items: [
            {
                name: "Workout Mix",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Chill Vibes",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:25",
            },
            {
                name: "party_playlist.m3u",
                type: "archive",
                size: "0.5 KB",
                modified: "2025-01-15 14:20",
            },
        ],
    },
    "Home/Music/Albums": {
        name: "Albums",
        path: "Home / Music / Albums",
        items: [
            {
                name: "Artist 1",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Artist 2",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:25",
            },
            {
                name: "compilation.mp3",
                type: "archive",
                size: "8.5 MB",
                modified: "2025-01-15 14:20",
            },
        ],
    },
    // Nested folders for Videos
    "Home/Videos/Movies": {
        name: "Movies",
        path: "Home / Videos / Movies",
        items: [
            {
                name: "Action",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Comedy",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:25",
            },
            {
                name: "sample_movie.mp4",
                type: "archive",
                size: "156 MB",
                modified: "2025-01-15 14:20",
            },
        ],
    },
    "Home/Videos/Tutorials": {
        name: "Tutorials",
        path: "Home / Videos / Tutorials",
        items: [
            {
                name: "Programming",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:30",
            },
            {
                name: "Design",
                type: "folder",
                size: "—",
                modified: "2025-01-15 14:25",
            },
            {
                name: "tutorial_01.mp4",
                type: "archive",
                size: "89 MB",
                modified: "2025-01-15 14:20",
            },
        ],
    },
    Recent: {
        name: "Recent",
        path: "Recent",
        items: [
            {
                name: "recent_file.pdf",
                type: "pdf",
                size: "1.1 MB",
                modified: "2025-01-15 16:30",
            },
            {
                name: "recent_image.jpg",
                type: "archive",
                size: "2.3 MB",
                modified: "2025-01-15 15:45",
            },
        ],
    },
    Starred: {
        name: "Starred",
        path: "Starred",
        items: [
            {
                name: "important_doc.pdf",
                type: "pdf",
                size: "3.2 MB",
                modified: "2025-01-14 10:30",
            },
            {
                name: "favorite_photo.jpg",
                type: "archive",
                size: "1.8 MB",
                modified: "2025-01-13 14:20",
            },
        ],
    },
    Trash: {
        name: "Trash",
        path: "Trash",
        items: [
            {
                name: "deleted_file.txt",
                type: "archive",
                size: "0.5 MB",
                modified: "2025-01-14 12:30",
            },
        ],
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
