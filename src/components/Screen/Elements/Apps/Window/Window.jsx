import { faExpand, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

export default function Window({
    title,
    children,
    onClose,
    defaultPosition = { x: 100, y: 100 },
    defaultSize = { width: 600, height: 400 },
    minSize = { width: 300, height: 200 },
}) {
    const [position, setPosition] = useState(defaultPosition);
    const [size] = useState(defaultSize);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
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

    const handleMouseMove = (e) => {
        if (!isDragging || isMaximized) return;

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
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add global mouse event listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, dragOffset, isMaximized]);

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
                        onClick={handleMaximize}
                        className="control-button maximize"
                        title={isMaximized ? "Restore" : "Maximize"}
                    >
                        <FontAwesomeIcon icon={faExpand} />
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
        </div>
    );
}
