import { faExpand, faXmark, faMinus, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

export default function Window({
    title,
    children,
    onClose,
    onMinimize,
    isMinimized = false,
    defaultPosition = null,
    defaultSize = { width: 600, height: 400 },
    minSize = { width: 300, height: 200 },
}) {
    const [position, setPosition] = useState(() => {
        if (defaultPosition) return defaultPosition;

        // Calculate center position
        const centerX = (window.innerWidth - defaultSize.width) / 2;
        const centerY = (window.innerHeight - defaultSize.height) / 2;

        return {
            x: Math.max(0, centerX),
            y: Math.max(0, centerY),
        };
    });
    const [size, setSize] = useState(defaultSize);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState("");
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const windowRef = useRef(null);

    const handleMaximize = () => {
        const newMaximizedState = !isMaximized;
        setIsMaximized(newMaximizedState);
        
        // Dispatch event to notify other components about maximize state change
        window.dispatchEvent(
            new CustomEvent("window-maximize-changed", {
                detail: { 
                    windowTitle: title,
                    isMaximized: newMaximizedState 
                },
            })
        );
    };

    // Mouse event handlers for dragging
    const handleMouseDown = (e) => {
        if (isMaximized) return;

        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsDragging(true);
        e.preventDefault();
    };

    // Mouse event handlers for resizing
    const handleResizeMouseDown = (e, direction) => {
        if (isMaximized) return;

        const rect = windowRef.current.getBoundingClientRect();
        setResizeDirection(direction);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: rect.width,
            height: rect.height,
        });
        setIsResizing(true);
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseMove = (e) => {
        if (isMaximized) return;

        if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            // Get viewport bounds instead of parent bounds
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const windowRect = windowRef.current.getBoundingClientRect();

            // Constrain to viewport bounds with some padding
            const maxX = viewportWidth - windowRect.width;
            const maxY = viewportHeight - windowRect.height;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            });
        }

        if (isResizing) {
            const deltaX = e.clientX - resizeStart.x;
            const deltaY = e.clientY - resizeStart.y;
            let newWidth = resizeStart.width;
            let newHeight = resizeStart.height;
            let newX = position.x;
            let newY = position.y;

            // Handle different resize directions
            if (resizeDirection.includes("e")) {
                newWidth = Math.max(minSize.width, resizeStart.width + deltaX);
            }
            if (resizeDirection.includes("w")) {
                const widthChange = Math.min(
                    deltaX,
                    resizeStart.width - minSize.width
                );
                newWidth = resizeStart.width - widthChange;
                newX = position.x + widthChange;
            }
            if (resizeDirection.includes("s")) {
                newHeight = Math.max(
                    minSize.height,
                    resizeStart.height + deltaY
                );
            }
            if (resizeDirection.includes("n")) {
                const heightChange = Math.min(
                    deltaY,
                    resizeStart.height - minSize.height
                );
                newHeight = resizeStart.height - heightChange;
                newY = position.y + heightChange;
            }

            // Constrain to viewport with better boundary checking
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Ensure window doesn't go off-screen horizontally
            if (newX < 0) {
                newWidth += newX; // Reduce width by the amount we went off-screen
                newX = 0;
            }
            if (newX + newWidth > viewportWidth) {
                newWidth = viewportWidth - newX;
            }

            // Ensure window doesn't go off-screen vertically
            if (newY < 0) {
                newHeight += newY; // Reduce height by the amount we went off-screen
                newY = 0;
            }
            if (newY + newHeight > viewportHeight) {
                newHeight = viewportHeight - newY;
            }

            // Ensure minimum size constraints are still met
            newWidth = Math.max(minSize.width, newWidth);
            newHeight = Math.max(minSize.height, newHeight);

            // Final boundary check to prevent negative positions
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + newWidth > viewportWidth)
                newX = viewportWidth - newWidth;
            if (newY + newHeight > viewportHeight)
                newY = viewportHeight - newHeight;

            setSize({ width: newWidth, height: newHeight });
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeDirection("");
    };

    // Add global mouse event listeners
    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDragging,
        isResizing,
        dragOffset,
        resizeStart,
        resizeDirection,
        isMaximized,
    ]);

    // Don't render window if minimized
    if (isMinimized) {
        return null;
    }

    return (
        <div
            ref={windowRef}
            className={`window ${isMaximized ? "maximized" : ""} ${
                isDragging ? "dragging" : ""
            }`}
            style={{
                width: isMaximized ? "100vw" : size.width,
                height: isMaximized ? "100vh" : size.height,
                minWidth: minSize.width,
                minHeight: minSize.height,
                left: isMaximized ? 0 : position.x,
                top: isMaximized ? 0 : position.y,
            }}
        >
            {/* Window Header */}
            <div
                className={`window-header ${isMaximized ? "maximized" : ""}`}
                onMouseDown={handleMouseDown}
            >
                <div className="window-title">{title}</div>

                <div className="window-controls">
                    <button
                        onClick={onMinimize}
                        className="control-button minimize"
                        title="Minimize"
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    
                    <button
                        onClick={handleMaximize}
                        className="control-button maximize"
                        title={isMaximized ? "Restore" : "Maximize"}
                    >
                        <FontAwesomeIcon icon={isMaximized ? faWindowRestore : faExpand} />
                    </button>

                    <button
                        onClick={onClose}
                        className="control-button close"
                        title="Close"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="window-content">{children}</div>

            {/* Resize Handles */}
            {!isMaximized && (
                <>
                    <div
                        className="resize-handle resize-n"
                        onMouseDown={(e) => handleResizeMouseDown(e, "n")}
                    />
                    <div
                        className="resize-handle resize-s"
                        onMouseDown={(e) => handleResizeMouseDown(e, "s")}
                    />
                    <div
                        className="resize-handle resize-e"
                        onMouseDown={(e) => handleResizeMouseDown(e, "e")}
                    />
                    <div
                        className="resize-handle resize-w"
                        onMouseDown={(e) => handleResizeMouseDown(e, "w")}
                    />
                    <div
                        className="resize-handle resize-ne"
                        onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
                    />
                    <div
                        className="resize-handle resize-nw"
                        onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
                    />
                    <div
                        className="resize-handle resize-se"
                        onMouseDown={(e) => handleResizeMouseDown(e, "se")}
                    />
                    <div
                        className="resize-handle resize-sw"
                        onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
                    />
                </>
            )}
        </div>
    );
}
