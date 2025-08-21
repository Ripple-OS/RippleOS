import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faPalette,
    faSave,
    faUndo,
    faCheck,
    faTimes,
    faPlus,
    faTrash,
    faCog,
} from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";
import "./Settings.css";

export default function Settings({ onClose, onMinimize, isMinimized = false }) {
    const [activeTab, setActiveTab] = useState("appearance");
    const [wallpaper, setWallpaper] = useState("os-wallpaper-1.png");
    const [theme, setTheme] = useState("dark");
    const [dockApps, setDockApps] = useState([]);
    const [availableApps, setAvailableApps] = useState([]);
    const [showAddAppModal, setShowAddAppModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState("");
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Load settings from localStorage on component mount
    useEffect(() => {
        loadSettings();
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                if (hasUnsavedChanges) {
                    saveSettings();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [hasUnsavedChanges]);

    const loadSettings = () => {
        // Load wallpaper setting
        const savedWallpaper =
            localStorage.getItem("rippleOS-wallpaper") || "os-wallpaper-1.png";
        setWallpaper(savedWallpaper);

        // Load theme setting
        const savedTheme = localStorage.getItem("rippleOS-theme") || "dark";
        setTheme(savedTheme);

        // Load dock apps setting
        const savedDockApps = localStorage.getItem("rippleOS-dockApps");
        if (savedDockApps) {
            setDockApps(JSON.parse(savedDockApps));
        } else {
            // Default dock apps
            const defaultDockApps = [
                "Display Apps",
                "TextEditor",
                "Settings",
                "Files Manager",
                "Chrome Browser",
                "Calendar",
                "Calculator",
            ];
            setDockApps(defaultDockApps);
        }

        // Load available apps
        const savedAvailableApps = localStorage.getItem(
            "rippleOS-availableApps"
        );
        if (savedAvailableApps) {
            setAvailableApps(JSON.parse(savedAvailableApps));
        } else {
            // Default available apps
            const defaultAvailableApps = [
                "Display Apps",
                "TextEditor",
                "Settings",
                "Files Manager",
                "Chrome Browser",
                "Calendar",
                "Calculator",
                "Gallery",
            ];
            setAvailableApps(defaultAvailableApps);
        }

        // Store original settings for comparison (commented out for now)
        // setOriginalSettings({
        //     wallpaper: savedWallpaper,
        //     theme: savedTheme,
        //     dockApps: savedDockApps ? JSON.parse(savedDockApps) : defaultDockApps,
        //     availableApps: savedAvailableApps ? JSON.parse(savedAvailableApps) : defaultAvailableApps
        // });
    };

    const saveSettings = () => {
        // Save wallpaper
        localStorage.setItem("rippleOS-wallpaper", wallpaper);

        // Save theme
        localStorage.setItem("rippleOS-theme", theme);

        // Save dock apps
        localStorage.setItem("rippleOS-dockApps", JSON.stringify(dockApps));

        // Save available apps
        localStorage.setItem(
            "rippleOS-availableApps",
            JSON.stringify(availableApps)
        );

        // Update wallpaper in the system
        document.documentElement.style.setProperty(
            "--wallpaper-image",
            `url(/src/assets/images/wallpapers/${wallpaper})`
        );

        // Update theme in the system
        document.documentElement.setAttribute("data-theme", theme);

        // Dispatch event to notify other components about settings change
        window.dispatchEvent(
            new CustomEvent("rippleOS-settings-changed", {
                detail: {
                    wallpaper,
                    theme,
                    dockApps,
                    availableApps,
                },
            })
        );

        setHasUnsavedChanges(false);

        // Show success message
        showNotification("Settings saved successfully!", "success");
    };

    const resetSettings = () => {
        loadSettings();
        setHasUnsavedChanges(false);
        showNotification("Settings reset to saved values", "info");
    };

    const handleWallpaperChange = (newWallpaper) => {
        setWallpaper(newWallpaper);
        setHasUnsavedChanges(true);

        // Preview wallpaper change
        document.documentElement.style.setProperty(
            "--wallpaper-image",
            `url(/src/assets/images/wallpapers/${newWallpaper})`
        );
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setHasUnsavedChanges(true);

        // Preview theme change
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleDockAppToggle = (appName) => {
        setDockApps((prev) => {
            const newDockApps = prev.includes(appName)
                ? prev.filter((app) => app !== appName)
                : [...prev, appName];
            setHasUnsavedChanges(true);
            return newDockApps;
        });
    };

    const handleAddAppToDock = () => {
        if (selectedApp && !dockApps.includes(selectedApp)) {
            setDockApps((prev) => [...prev, selectedApp]);
            setHasUnsavedChanges(true);
        }
        setShowAddAppModal(false);
        setSelectedApp("");
    };

    const handleRemoveAppFromDock = (appName) => {
        setDockApps((prev) => {
            const newDockApps = prev.filter((app) => app !== appName);
            setHasUnsavedChanges(true);
            return newDockApps;
        });
    };

    const moveDockApp = (index, direction) => {
        setDockApps((prev) => {
            const newDockApps = [...prev];
            if (direction === "up" && index > 0) {
                [newDockApps[index], newDockApps[index - 1]] = [
                    newDockApps[index - 1],
                    newDockApps[index],
                ];
            } else if (direction === "down" && index < newDockApps.length - 1) {
                [newDockApps[index], newDockApps[index + 1]] = [
                    newDockApps[index + 1],
                    newDockApps[index],
                ];
            }
            setHasUnsavedChanges(true);
            return newDockApps;
        });
    };

    const showNotification = (message, type = "info") => {
        // Create notification element
        const notification = document.createElement("div");
        notification.className = `settings-notification settings-notification-${type}`;
        notification.textContent = message;

        // Add to body
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    };

    const getWallpaperOptions = () => {
        // In a real app, you'd scan the wallpapers directory
        // For now, we'll use the available wallpaper with different labels
        return [
            { name: "os-wallpaper-1.png", label: "Default Wallpaper" },
            { name: "os-wallpaper-1.png", label: "Dark Theme" },
            { name: "os-wallpaper-1.png", label: "Light Theme" },
        ];
    };

    return (
        <Window
            title="Settings"
            onClose={onClose}
            onMinimize={onMinimize}
            isMinimized={isMinimized}
            defaultSize={{ width: 800, height: 600 }}
            minSize={{ width: 600, height: 400 }}
        >
            <div className="settings-app">
                {/* Header */}
                <div className="settings-header">
                    <h2>System Settings</h2>
                    <div className="settings-actions">
                        <button
                            className="btn btn-secondary"
                            onClick={resetSettings}
                            disabled={!hasUnsavedChanges}
                        >
                            <FontAwesomeIcon icon={faUndo} />
                            Reset
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={saveSettings}
                            disabled={!hasUnsavedChanges}
                        >
                            <FontAwesomeIcon icon={faSave} />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="settings-search">
                    <input
                        type="text"
                        placeholder="Search settings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Navigation Tabs */}
                <div className="settings-tabs">
                    <button
                        className={`settings-tab ${
                            activeTab === "appearance" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("appearance")}
                    >
                        <FontAwesomeIcon icon={faPalette} />
                        Appearance
                    </button>
                    <button
                        className={`settings-tab ${
                            activeTab === "dock" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("dock")}
                    >
                        <FontAwesomeIcon icon={faList} />
                        Dock & Apps
                    </button>
                    <button
                        className={`settings-tab ${
                            activeTab === "system" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("system")}
                    >
                        <FontAwesomeIcon icon={faCog} />
                        System
                    </button>
                </div>

                {/* Content */}
                <div className="settings-content">
                    {/* Appearance Tab */}
                    {activeTab === "appearance" && (
                        <div className="settings-section">
                            <h3>Theme</h3>
                            <div className="theme-options">
                                <div
                                    className={`theme-option ${
                                        theme === "dark" ? "selected" : ""
                                    }`}
                                    onClick={() => handleThemeChange("dark")}
                                >
                                    <div className="theme-preview dark-theme">
                                        <div className="theme-sample-header"></div>
                                        <div className="theme-sample-content"></div>
                                    </div>
                                    <span className="theme-label">
                                        Dark Theme
                                    </span>
                                    {theme === "dark" && (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="selected-icon"
                                        />
                                    )}
                                </div>
                                <div
                                    className={`theme-option ${
                                        theme === "light" ? "selected" : ""
                                    }`}
                                    onClick={() => handleThemeChange("light")}
                                >
                                    <div className="theme-preview light-theme">
                                        <div className="theme-sample-header"></div>
                                        <div className="theme-sample-content"></div>
                                    </div>
                                    <span className="theme-label">
                                        Light Theme
                                    </span>
                                    {theme === "light" && (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="selected-icon"
                                        />
                                    )}
                                </div>
                            </div>

                            <h3>Wallpaper</h3>
                            <div className="wallpaper-options">
                                {getWallpaperOptions().map((option) => (
                                    <div
                                        key={option.name}
                                        className={`wallpaper-option ${
                                            wallpaper === option.name
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleWallpaperChange(option.name)
                                        }
                                    >
                                        <div className="wallpaper-preview">
                                            <img
                                                src={`/src/assets/images/wallpapers/${option.name}`}
                                                alt={option.label}
                                            />
                                        </div>
                                        <span className="wallpaper-label">
                                            {option.label}
                                        </span>
                                        {wallpaper === option.name && (
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="selected-icon"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dock & Apps Tab */}
                    {activeTab === "dock" && (
                        <div className="settings-section">
                            <div className="dock-settings-header">
                                <h3>Dock Applications</h3>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddAppModal(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Add App
                                </button>
                            </div>

                            <div className="dock-apps-list">
                                {dockApps.map((appName, index) => (
                                    <div
                                        key={appName}
                                        className="dock-app-item"
                                    >
                                        <div className="dock-app-info">
                                            <span className="dock-app-number">
                                                {index + 1}
                                            </span>
                                            <span className="app-name">
                                                {appName}
                                            </span>
                                        </div>
                                        <div className="dock-app-actions">
                                            {index > 0 && (
                                                <button
                                                    className="btn btn-secondary btn-small"
                                                    onClick={() =>
                                                        moveDockApp(index, "up")
                                                    }
                                                    title="Move up"
                                                >
                                                    ↑
                                                </button>
                                            )}
                                            {index < dockApps.length - 1 && (
                                                <button
                                                    className="btn btn-secondary btn-small"
                                                    onClick={() =>
                                                        moveDockApp(
                                                            index,
                                                            "down"
                                                        )
                                                    }
                                                    title="Move down"
                                                >
                                                    ↓
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-danger btn-small"
                                                onClick={() =>
                                                    handleRemoveAppFromDock(
                                                        appName
                                                    )
                                                }
                                                title="Remove from dock"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="available-apps-section">
                                <h4>Available Applications</h4>
                                <div className="available-apps-grid">
                                    {availableApps.map((appName) => (
                                        <div
                                            key={appName}
                                            className={`available-app-item ${
                                                dockApps.includes(appName)
                                                    ? "in-dock"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleDockAppToggle(appName)
                                            }
                                        >
                                            <span className="app-name">
                                                {appName}
                                            </span>
                                            {dockApps.includes(appName) ? (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="in-dock-icon"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="add-icon"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* System Tab */}
                    {activeTab === "system" && (
                        <div className="settings-section">
                            <h3>System Preferences</h3>
                            <div className="preferences-grid">
                                <div className="preference-item">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            readOnly
                                            className="preference-checkbox"
                                        />
                                        <span className="preference-text">
                                            Auto-save settings
                                        </span>
                                    </label>
                                </div>
                                <div className="preference-item">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={false}
                                            readOnly
                                            className="preference-checkbox"
                                        />
                                        <span className="preference-text">
                                            Show notifications
                                        </span>
                                    </label>
                                </div>
                                <div className="preference-item">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            readOnly
                                            className="preference-checkbox"
                                        />
                                        <span className="preference-text">
                                            Remember window positions
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <h3>System Information</h3>
                            <div className="system-info">
                                <div className="info-item">
                                    <span className="info-label">
                                        OS Version:
                                    </span>
                                    <span className="info-value">
                                        RippleOS 1.0.0
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">
                                        Build Date:
                                    </span>
                                    <span className="info-value">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">
                                        Current Theme:
                                    </span>
                                    <span className="info-value">
                                        {theme.charAt(0).toUpperCase() +
                                            theme.slice(1)}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">
                                        Wallpaper:
                                    </span>
                                    <span className="info-value">
                                        {wallpaper}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">
                                        Dock Apps:
                                    </span>
                                    <span className="info-value">
                                        {dockApps.length} apps
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add App Modal */}
            {showAddAppModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Add App to Dock</h3>
                            <button
                                className="btn btn-icon"
                                onClick={() => setShowAddAppModal(false)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <select
                                value={selectedApp}
                                onChange={(e) => setSelectedApp(e.target.value)}
                                className="app-select"
                            >
                                <option value="">Select an app...</option>
                                {availableApps
                                    .filter((app) => !dockApps.includes(app))
                                    .map((app) => (
                                        <option key={app} value={app}>
                                            {app}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowAddAppModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddAppToDock}
                                disabled={!selectedApp}
                            >
                                Add to Dock
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Window>
    );
}
