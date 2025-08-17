// LocalStorage keys
const STORAGE_KEYS = {
    FILE_SYSTEM: "rippleos_file_system",
    NAVIGATION_HISTORY: "rippleos_navigation_history",
};

// Default file system structure
const DEFAULT_FILE_SYSTEM = {
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

// File System Storage Service
export class FileSystemStorage {
    constructor() {
        this.initializeStorage();
    }

    // Initialize storage with default data if empty
    initializeStorage() {
        if (!localStorage.getItem(STORAGE_KEYS.FILE_SYSTEM)) {
            this.saveFileSystem(DEFAULT_FILE_SYSTEM);
        }
    }

    // Get file system data from localStorage
    getFileSystem() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.FILE_SYSTEM);
            return data ? JSON.parse(data) : DEFAULT_FILE_SYSTEM;
        } catch (error) {
            console.error(
                "Error loading file system from localStorage:",
                error
            );
            return DEFAULT_FILE_SYSTEM;
        }
    }

    // Save file system data to localStorage
    saveFileSystem(fileSystem) {
        try {
            localStorage.setItem(
                STORAGE_KEYS.FILE_SYSTEM,
                JSON.stringify(fileSystem)
            );
        } catch (error) {
            console.error("Error saving file system to localStorage:", error);
        }
    }

    // Get directory contents
    getDirectoryContents(path) {
        const fileSystem = this.getFileSystem();
        return (
            fileSystem[path] || {
                name: "Unknown",
                path: path,
                items: [],
            }
        );
    }

    // Generate unique name for folder
    generateUniqueFolderName(parentPath, baseName) {
        const fileSystem = this.getFileSystem();
        const parentItems = fileSystem[parentPath]?.items || [];

        let counter = 1;
        let uniqueName = baseName;

        while (parentItems.some((item) => item.name === uniqueName)) {
            uniqueName = `${baseName} (${counter})`;
            counter++;
        }

        return uniqueName;
    }

    // Create new folder
    createFolder(parentPath, folderName) {
        const fileSystem = this.getFileSystem();
        const uniqueName = this.generateUniqueFolderName(
            parentPath,
            folderName
        );
        const newPath =
            parentPath === "Home"
                ? `Home/${uniqueName}`
                : `${parentPath}/${uniqueName}`;

        // Create new folder
        const newFolder = {
            name: uniqueName,
            path: newPath.replace(/^Home\//, "Home / "),
            items: [],
        };

        // Add to file system
        fileSystem[newPath] = newFolder;

        // Add to parent directory
        if (fileSystem[parentPath]) {
            const now = new Date().toISOString().slice(0, 19).replace("T", " ");
            fileSystem[parentPath].items.push({
                name: uniqueName,
                type: "folder",
                size: "—",
                modified: now,
            });
        }

        this.saveFileSystem(fileSystem);
        return newFolder;
    }

    // Generate unique name for file
    generateUniqueFileName(parentPath, baseName) {
        const fileSystem = this.getFileSystem();
        const parentItems = fileSystem[parentPath]?.items || [];

        let counter = 1;
        let uniqueName = baseName;

        while (parentItems.some((item) => item.name === uniqueName)) {
            const lastDotIndex = baseName.lastIndexOf(".");
            if (lastDotIndex !== -1) {
                const nameWithoutExt = baseName.substring(0, lastDotIndex);
                const extension = baseName.substring(lastDotIndex);
                uniqueName = `${nameWithoutExt} (${counter})${extension}`;
            } else {
                uniqueName = `${baseName} (${counter})`;
            }
            counter++;
        }

        return uniqueName;
    }

    // Get file type based on extension
    getFileType(fileName) {
        const extension = fileName.toLowerCase().split(".").pop();

        switch (extension) {
            case "pdf":
                return "pdf";
            case "doc":
            case "docx":
                return "document";
            case "txt":
                return "text";
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "svg":
                return "image";
            case "mp3":
            case "wav":
            case "flac":
            case "aac":
                return "audio";
            case "mp4":
            case "avi":
            case "mov":
            case "mkv":
                return "video";
            case "zip":
            case "rar":
            case "7z":
            case "tar":
            case "gz":
                return "archive";
            case "iso":
                return "iso";
            case "rpm":
            case "deb":
                return "rpm";
            default:
                return "archive";
        }
    }

    // Create new file
    createFile(parentPath, fileName, fileType = null) {
        const fileSystem = this.getFileSystem();

        // Determine file type from extension if not provided
        const actualFileType = fileType || this.getFileType(fileName);
        const uniqueName = this.generateUniqueFileName(parentPath, fileName);

        // Add to parent directory
        if (fileSystem[parentPath]) {
            const now = new Date().toISOString().slice(0, 19).replace("T", " ");
            fileSystem[parentPath].items.push({
                name: uniqueName,
                type: actualFileType,
                size: "0 KB",
                modified: now,
            });
        }

        this.saveFileSystem(fileSystem);
        return {
            name: uniqueName,
            type: actualFileType,
            size: "0 KB",
            modified: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
    }

    // Delete item
    deleteItem(parentPath, itemName) {
        const fileSystem = this.getFileSystem();

        if (fileSystem[parentPath]) {
            fileSystem[parentPath].items = fileSystem[parentPath].items.filter(
                (item) => item.name !== itemName
            );
            this.saveFileSystem(fileSystem);
        }
    }

    // Move item (for cut operation)
    moveItem(fromPath, toPath, itemName) {
        const fileSystem = this.getFileSystem();

        // Find the item in source directory
        const sourceDir = fileSystem[fromPath];
        if (!sourceDir) return false;

        const item = sourceDir.items.find((item) => item.name === itemName);
        if (!item) return false;

        // Remove from source directory
        sourceDir.items = sourceDir.items.filter(
            (item) => item.name !== itemName
        );

        // Add to destination directory
        const destDir = fileSystem[toPath];
        if (destDir) {
            destDir.items.push(item);
        }

        this.saveFileSystem(fileSystem);
        return true;
    }

    // Rename item
    renameItem(parentPath, oldName, newName) {
        const fileSystem = this.getFileSystem();

        if (fileSystem[parentPath]) {
            const item = fileSystem[parentPath].items.find(
                (item) => item.name === oldName
            );
            if (item) {
                item.name = newName;
                item.modified = new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");
                this.saveFileSystem(fileSystem);
            }
        }
    }

    // Get navigation history
    getNavigationHistory() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.NAVIGATION_HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(
                "Error loading navigation history from localStorage:",
                error
            );
            return [];
        }
    }

    // Save navigation history
    saveNavigationHistory(history) {
        try {
            localStorage.setItem(
                STORAGE_KEYS.NAVIGATION_HISTORY,
                JSON.stringify(history)
            );
        } catch (error) {
            console.error(
                "Error saving navigation history to localStorage:",
                error
            );
        }
    }

    // Clear all data (for reset)
    clearAll() {
        localStorage.removeItem(STORAGE_KEYS.FILE_SYSTEM);
        localStorage.removeItem(STORAGE_KEYS.NAVIGATION_HISTORY);
        this.initializeStorage();
    }
}

// Export singleton instance
export const fileSystemStorage = new FileSystemStorage();
