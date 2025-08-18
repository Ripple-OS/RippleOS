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
    "Home/Documents/Work": {
        name: "Work",
        path: "Home / Documents / Work",
        items: [
            {
                name: "project1.pdf",
                type: "pdf",
                size: "1.2 MB",
                modified: "2025-01-15 14:30",
            },
            {
                name: "meeting-notes.txt",
                type: "text",
                size: "0.1 MB",
                modified: "2025-01-14 09:15",
            },
        ],
    },
    "Home/Documents/Personal": {
        name: "Personal",
        path: "Home / Documents / Personal",
        items: [
            {
                name: "resume.pdf",
                type: "pdf",
                size: "0.8 MB",
                modified: "2025-01-13 16:45",
            },
            {
                name: "diary.txt",
                type: "text",
                size: "0.2 MB",
                modified: "2025-01-12 11:20",
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
                name: "nautilus-dropbox-2025-05.20-1.fc42.x86_64.rpm",
                type: "rpm",
                size: "1.8 MB",
                modified: "2025-01-05 12:45",
            },
        ],
    },
    "Home/Downloads/postman-linux-x64": {
        name: "postman-linux-x64",
        path: "Home / Downloads / postman-linux-x64",
        items: [
            {
                name: "postman",
                type: "archive",
                size: "120 MB",
                modified: "2025-01-15 14:25",
            },
            {
                name: "README.md",
                type: "text",
                size: "0.1 MB",
                modified: "2025-01-15 14:25",
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
    "Home/Pictures/Screenshots": {
        name: "Screenshots",
        path: "Home / Pictures / Screenshots",
        items: [
            {
                name: "desktop-2025-01-15.png",
                type: "image",
                size: "0.8 MB",
                modified: "2025-01-15 14:30",
            },
            {
                name: "error-log.png",
                type: "image",
                size: "0.4 MB",
                modified: "2025-01-14 09:15",
            },
        ],
    },
    "Home/Pictures/Vacation": {
        name: "Vacation",
        path: "Home / Pictures / Vacation",
        items: [
            {
                name: "beach-sunset.jpg",
                type: "image",
                size: "2.1 MB",
                modified: "2025-01-13 16:45",
            },
            {
                name: "mountain-view.jpg",
                type: "image",
                size: "1.8 MB",
                modified: "2025-01-12 11:20",
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
        // Lazily create missing directory nodes for premade folders
        if (!fileSystem[path]) {
            this.ensureDirectoryExists(path, fileSystem);
            this.saveFileSystem(fileSystem);
        }
        return fileSystem[path];
    }

    // Helper method to construct proper paths for nested folders
    constructPath(parentPath, folderName) {
        // Handle special case for Home directory
        if (parentPath === "Home") {
            return `Home/${folderName}`;
        }

        // For all other paths, just concatenate with slash
        // This handles nested paths like "Home/Documents/Work" correctly
        return `${parentPath}/${folderName}`;
    }

    // Ensure directory node exists (and parent linkage), mutate provided fileSystem
    ensureDirectoryExists(path, fileSystem = null) {
        const fs = fileSystem || this.getFileSystem();
        if (fs[path]) return fs[path];

        // Derive name and parent path
        if (path === "Home") {
            fs["Home"] = fs["Home"] || {
                name: "Home",
                path: "Home",
                items: [],
            };
            if (!fileSystem) this.saveFileSystem(fs);
            return fs["Home"];
        }

        const parts = path.split("/");
        const name = parts.pop();
        const parentPath = parts.join("/") || "Home";

        // Ensure parent exists first
        this.ensureDirectoryExists(parentPath, fs);

        // Create directory node
        fs[path] = {
            name,
            path: path.replace(/^Home\//, "Home / "),
            items: [],
        };

        // Ensure parent lists this folder
        const parent = fs[parentPath];
        if (parent) {
            const existsInParent = parent.items.some((i) => i.name === name);
            if (!existsInParent) {
                const now = new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");
                parent.items.push({
                    name,
                    type: "folder",
                    size: "—",
                    modified: now,
                });
            }
        }

        if (!fileSystem) this.saveFileSystem(fs);
        return fs[path];
    }

    // Generate unique name for any item (files or folders)
    generateUniqueName(parentPath, baseName) {
        const fileSystem = this.getFileSystem();
        return this.generateUniqueNameInFs(fileSystem, parentPath, baseName);
    }

    // In-memory variant to avoid repeated localStorage reads during batch operations
    generateUniqueNameInFs(fileSystem, parentPath, baseName) {
        const parentItems = fileSystem[parentPath]?.items || [];
        let counter = 1;
        let uniqueName = baseName;
        while (parentItems.some((item) => item.name === uniqueName)) {
            uniqueName = `${baseName} (${counter})`;
            counter++;
        }
        return uniqueName;
    }

    // Generate unique name for folder
    generateUniqueFolderName(parentPath, baseName) {
        return this.generateUniqueName(parentPath, baseName);
    }

    // Create new folder
    createFolder(parentPath, folderName) {
        const fileSystem = this.getFileSystem();
        const uniqueName = this.generateUniqueFolderName(
            parentPath,
            folderName
        );
        const newPath = this.constructPath(parentPath, uniqueName);

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
        // Ensure parent directory exists (handles premade/nested)
        const parentDir = this.ensureDirectoryExists(parentPath, fileSystem);

        // Determine file type from extension if not provided
        const actualFileType = fileType || this.getFileType(fileName);
        const uniqueName = this.generateUniqueFileName(parentPath, fileName);

        // Add to parent directory
        if (parentDir) {
            const now = new Date().toISOString().slice(0, 19).replace("T", " ");
            parentDir.items.push({
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

    // Delete item (recursively for folders)
    deleteItem(parentPath, itemName) {
        const fileSystem = this.getFileSystem();

        if (!fileSystem[parentPath]) return;

        const item = fileSystem[parentPath].items.find(
            (it) => it.name === itemName
        );
        if (!item) return;

        // If folder: recursively delete its subtree and remove folder node
        if (item.type === "folder") {
            const folderPath = this.constructPath(parentPath, itemName);
            if (fileSystem[folderPath] && fileSystem[folderPath].items) {
                for (const subItem of [...fileSystem[folderPath].items]) {
                    this.deleteItem(folderPath, subItem.name);
                }
            }
            delete fileSystem[folderPath];
        }

        // Remove entry from parent directory
        fileSystem[parentPath].items = fileSystem[parentPath].items.filter(
            (it) => it.name !== itemName
        );

        this.saveFileSystem(fileSystem);
    }

    // Copy item with all contents (recursive for folders) — batched single save
    copyItem(fromPath, toPath, itemName) {
        const fileSystem = this.getFileSystem();
        const ok = this.copyItemInternal(
            fileSystem,
            fromPath,
            toPath,
            itemName
        );
        if (ok) this.saveFileSystem(fileSystem);
        return ok;
    }

    copyItemInternal(fileSystem, fromPath, toPath, itemName) {
        // Ensure both source and destination directory nodes exist (default dirs too)
        this.ensureDirectoryExists(fromPath, fileSystem);
        this.ensureDirectoryExists(toPath, fileSystem);
        const sourceDir = fileSystem[fromPath];
        if (!sourceDir) return false;
        const item = sourceDir.items.find((it) => it.name === itemName);
        if (!item) return false;

        // Prevent copying a folder into itself or a descendant
        if (item.type === "folder") {
            const sourceFolderPath = this.constructPath(fromPath, itemName);
            if (
                toPath === sourceFolderPath ||
                toPath.startsWith(sourceFolderPath + "/")
            ) {
                return false;
            }
        }

        const uniqueName = this.generateUniqueNameInFs(
            fileSystem,
            toPath,
            itemName
        );
        const copiedItem = {
            ...item,
            name: uniqueName,
            modified: new Date().toISOString().slice(0, 19).replace("T", " "),
        };

        if (item.type === "folder") {
            const sourceFolderPath = this.constructPath(fromPath, itemName);
            const destFolderPath = this.constructPath(toPath, uniqueName);

            this.ensureDirectoryExists(destFolderPath, fileSystem);

            const sourceFolder = fileSystem[sourceFolderPath];
            if (sourceFolder && Array.isArray(sourceFolder.items)) {
                const children = [...sourceFolder.items];
                for (const subItem of children) {
                    this.copyItemInternal(
                        fileSystem,
                        sourceFolderPath,
                        destFolderPath,
                        subItem.name
                    );
                }
            }
        }

        const destDir = this.ensureDirectoryExists(toPath, fileSystem);
        if (destDir && !destDir.items.some((i) => i.name === copiedItem.name)) {
            destDir.items.push(copiedItem);
        }

        return true;
    }

    // Move item (for cut operation) - supports folders recursively
    moveItem(fromPath, toPath, itemName) {
        const fileSystem = this.getFileSystem();

        // Ensure dirs exist and find the item in source directory
        this.ensureDirectoryExists(fromPath, fileSystem);
        this.ensureDirectoryExists(toPath, fileSystem);
        const sourceDir = fileSystem[fromPath];
        if (!sourceDir) return false;

        const item = sourceDir.items.find((item) => item.name === itemName);
        if (!item) return false;

        // If it's a folder, update its subtree keys recursively
        if (item.type === "folder") {
            const oldFolderPath = this.constructPath(fromPath, itemName);
            const newFolderPath = this.constructPath(toPath, itemName);

            // Prevent moving into itself/descendant
            if (
                newFolderPath === oldFolderPath ||
                newFolderPath.startsWith(oldFolderPath + "/")
            ) {
                return false;
            }

            const renameSubtree = (oldBase, newBase) => {
                const keys = Object.keys(fileSystem).filter(
                    (k) => k === oldBase || k.startsWith(`${oldBase}/`)
                );
                // Sort longest-first to avoid intermediate overwrites
                keys.sort((a, b) => b.length - a.length);
                for (const key of keys) {
                    const newKey = key.replace(oldBase, newBase);
                    const node = fileSystem[key];
                    fileSystem[newKey] = {
                        ...node,
                        path: node.path.replace(
                            oldBase
                                .replace(/^Home\//, "Home / ")
                                .replaceAll("/", " / "),
                            newBase
                                .replace(/^Home\//, "Home / ")
                                .replaceAll("/", " / ")
                        ),
                    };
                    if (newKey !== key) delete fileSystem[key];
                }
            };

            if (fileSystem[oldFolderPath]) {
                renameSubtree(oldFolderPath, newFolderPath);
            } else {
                // If folder node not present yet, create an empty structure
                fileSystem[newFolderPath] = {
                    name: itemName,
                    path: newFolderPath,
                    items: [],
                };
            }
        }

        // Remove from source directory
        sourceDir.items = sourceDir.items.filter(
            (item) => item.name !== itemName
        );

        // Add to destination directory (ensure unique name when moving within same parent)
        const destDir = this.ensureDirectoryExists(toPath, fileSystem);
        if (destDir) {
            const finalName = this.generateUniqueName(toPath, item.name);
            if (finalName !== item.name) {
                // If name collided, update folder subtree names too
                if (item.type === "folder") {
                    const currentBase = this.constructPath(toPath, item.name);
                    const renamedBase = this.constructPath(toPath, finalName);
                    const keys = Object.keys(fileSystem).filter(
                        (k) =>
                            k === currentBase || k.startsWith(`${currentBase}/`)
                    );
                    keys.sort((a, b) => b.length - a.length);
                    for (const key of keys) {
                        const newKey = key.replace(currentBase, renamedBase);
                        const node = fileSystem[key];
                        fileSystem[newKey] = {
                            ...node,
                            path: node.path.replace(
                                currentBase
                                    .replace(/^Home\//, "Home / ")
                                    .replaceAll("/", " / "),
                                renamedBase
                                    .replace(/^Home\//, "Home / ")
                                    .replaceAll("/", " / ")
                            ),
                        };
                        if (newKey !== key) delete fileSystem[key];
                    }
                }
                item.name = finalName;
            }
            destDir.items.push(item);
        }

        this.saveFileSystem(fileSystem);
        return true;
    }

    // Trash functionality removed (permanent deletions only)

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

    // Force reload of default file system (useful for testing)
    reloadDefaultFileSystem() {
        localStorage.removeItem(STORAGE_KEYS.FILE_SYSTEM);
        this.initializeStorage();
    }
}

// Export singleton instance
export const fileSystemStorage = new FileSystemStorage();
