import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFloppyDisk,
    faFolderOpen,
    faPlus,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";
import { fileSystemStorage } from "../FileExplorer/fileSystemStorage";
import FileExplorer from "../FileExplorer/FileExplorer";

export default function TextEditor({
    onClose,
    onMinimize,
    isMinimized = false,
    initialPath = null,
    fileName = null,
}) {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [currentName, setCurrentName] = useState(fileName);
    const [content, setContent] = useState("");
    const [isDirty, setIsDirty] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

    // Compute a friendly title
    const windowTitle = useMemo(() => {
        if (currentName) {
            return `${currentName}${isDirty ? " *" : ""}`;
        }
        return `Untitled${isDirty ? " *" : ""}`;
    }, [currentName, isDirty]);

    // Load content when opening an existing file
    useEffect(() => {
        if (initialPath && fileName) {
            try {
                const text =
                    fileSystemStorage.readFileContent(initialPath, fileName) ||
                    "";
                setCurrentPath(initialPath);
                setCurrentName(fileName);
                setContent(text);
                setIsDirty(false);
            } catch {
                // If reading failed, start new
                setCurrentPath(null);
                setCurrentName(null);
                setContent("");
                setIsDirty(false);
            }
        }
    }, [initialPath, fileName]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setIsDirty(true);
    };

    const ensureTxtExtension = (name) => {
        if (!name) return name;
        return name.toLowerCase().endsWith(".txt") ? name : `${name}.txt`;
    };

    const handleSave = () => {
        try {
            if (!currentName || !currentPath) {
                setIsSaveDialogOpen(true);
                return;
            }
            fileSystemStorage.writeFileContent(
                currentPath,
                currentName,
                content
            );
            setIsDirty(false);
        } catch (e) {
            alert(e?.message || "Failed to save file");
        }
    };

    const handleSaveAs = () => {
        setIsSaveDialogOpen(true);
    };

    const handleNew = () => {
        if (isDirty && !confirm("Discard unsaved changes?")) return;
        setCurrentPath(null);
        setCurrentName(null);
        setContent("");
        setIsDirty(false);
    };

    const handleSaveConfirm = (name, path) => {
        if (name && path) {
            const finalName = ensureTxtExtension(name);
            const created = fileSystemStorage.createFile(
                path,
                finalName,
                "text"
            );
            const createdName = created?.name || finalName;
            fileSystemStorage.writeFileContent(path, createdName, content);
            setCurrentPath(path);
            setCurrentName(createdName);
            setIsDirty(false);
        }
        setIsSaveDialogOpen(false);
    };

    if (isSaveDialogOpen) {
        return (
            <FileExplorer
                onClose={() => setIsSaveDialogOpen(false)}
                isSaveMode={true}
                onSaveConfirm={handleSaveConfirm}
                saveFileName={ensureTxtExtension(currentName || "Untitled.txt")}
            />
        );
    }

    return (
        <Window
            title={`Text Editor — ${windowTitle}`}
            onClose={onClose}
            onMinimize={onMinimize}
            isMinimized={isMinimized}
            defaultSize={{ width: 900, height: 600 }}
            minSize={{ width: 500, height: 300 }}
        >
            <div className="text-editor-app">
                {/* Clean Toolbar */}
                <div className="te-toolbar">
                    <div className="te-toolbar-left">
                        <button
                            className="te-btn primary"
                            title="New"
                            onClick={handleNew}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>New</span>
                        </button>
                        <button
                            className="te-btn success"
                            title="Save"
                            onClick={handleSave}
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            <span>Save</span>
                        </button>
                        <button
                            className="te-btn info"
                            title="Save As"
                            onClick={handleSaveAs}
                        >
                            <FontAwesomeIcon icon={faSave} />
                            <span>Save As</span>
                        </button>
                    </div>

                    <div className="te-toolbar-right">
                        <div className="te-meta">
                            <FontAwesomeIcon icon={faFolderOpen} />
                            <span className="te-meta-path">
                                {currentPath || "—"}
                            </span>
                            <span className="te-meta-sep">/</span>
                            <span className="te-meta-name">
                                {currentName || "Untitled.txt"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="te-editor">
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Start typing your text..."
                        spellCheck={false}
                    />
                </div>

                {/* Status Bar */}
                <div className="te-statusbar">
                    <div className="te-status-left">
                        <span className="te-status-item">
                            Lines: {content.split("\n").length}
                        </span>
                        <span className="te-status-item">
                            Chars: {content.length}
                        </span>
                        <span className="te-status-item">
                            Words:{" "}
                            {content.trim()
                                ? content.trim().split(/\s+/).length
                                : 0}
                        </span>
                    </div>
                    <div className="te-status-right">
                        {isDirty && (
                            <span className="te-status-item modified">
                                Modified
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
}
