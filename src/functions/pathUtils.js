// Path manipulation utilities
export const pathUtils = {
    // Helper function to navigate to a directory
    navigateToDirectory: (currentPath, targetName) => {
        if (currentPath === "Home") {
            return `Home/${targetName}`;
        }
        return `${currentPath}/${targetName}`;
    },

    // Helper function to get parent directory
    getParentDirectory: (path) => {
        if (path === "Home") {
            return "Home";
        }
        const parts = path.split("/");
        if (parts.length <= 2) {
            return "Home";
        }
        return parts.slice(0, -1).join("/");
    },

    // Helper method to construct proper paths for nested folders
    constructPath: (parentPath, folderName) => {
        // Handle special case for Home directory
        if (parentPath === "Home") {
            return `Home/${folderName}`;
        }

        // For all other paths, just concatenate with slash
        // This handles nested paths like "Home/Documents/Work" correctly
        return `${parentPath}/${folderName}`;
    },

    // Convert internal path to display path
    toDisplayPath: (path) => {
        return path.replace(/^Home\//, "Home / ");
    },

    // Get sidebar path mapping
    getSidebarPathMapping: () => ({
        Home: "Home",
        Recent: "Recent",
        Starred: "Starred",
        Documents: "Home/Documents",
        Downloads: "Home/Downloads",
        Pictures: "Home/Pictures",
        Music: "Home/Music",
        Videos: "Home/Videos",
    }),

    // Map sidebar item to correct path
    mapSidebarItemToPath: (itemId) => {
        const pathMapping = pathUtils.getSidebarPathMapping();
        return pathMapping[itemId] || itemId;
    },
};
