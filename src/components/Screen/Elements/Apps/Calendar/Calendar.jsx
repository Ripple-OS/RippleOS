import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faPlus,
    faCalendarAlt,
    faClock,
    faMapMarkerAlt,
    faEdit,
    faTrash,
    faCheck,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";
import "./Calendar.css";

export default function Calendar({ onClose, onMinimize, isMinimized = false }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState("month"); // 'month', 'week', 'day'
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showEventForm, setShowEventForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location: "",
        color: "#007bff",
    });
    const [isInitialized, setIsInitialized] = useState(false);

    // Load events from localStorage on component mount
    useEffect(() => {
        const savedEvents = localStorage.getItem("calendarEvents");
        if (savedEvents) {
            const parsedEvents = JSON.parse(savedEvents);

            // Migrate existing events from ISO format to toDateString format
            const migratedEvents = parsedEvents.map((event) => {
                if (event.date && event.date.includes("-")) {
                    // This is an old ISO format date, convert it
                    const date = new Date(event.date);
                    return {
                        ...event,
                        date: date.toDateString(),
                    };
                }
                return event;
            });

            setEvents(migratedEvents);
        }
        setIsInitialized(true);
    }, []);

    // Save events to localStorage whenever events change (but not on initial load)
    useEffect(() => {
        // Only save if component has been initialized and events have changed
        if (isInitialized) {
            localStorage.setItem("calendarEvents", JSON.stringify(events));
        }
    }, [events, isInitialized]);

    // Get current month/year for navigation
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Navigation functions
    const goToPrevious = useCallback(() => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (view === "month") {
                newDate.setMonth(prev.getMonth() - 1);
            } else if (view === "week") {
                newDate.setDate(prev.getDate() - 7);
            } else if (view === "day") {
                newDate.setDate(prev.getDate() - 1);
            }
            return newDate;
        });
    }, [view]);

    const goToNext = useCallback(() => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (view === "month") {
                newDate.setMonth(prev.getMonth() + 1);
            } else if (view === "week") {
                newDate.setDate(prev.getDate() + 7);
            } else if (view === "day") {
                newDate.setDate(prev.getDate() + 1);
            }
            return newDate;
        });
    }, [view]);

    const goToToday = useCallback(() => {
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    }, []);

    // Generate calendar data
    const generateMonthData = useCallback(() => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const totalDays = 42; // 6 weeks * 7 days

        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }

        return days;
    }, [currentMonth, currentYear]);

    const generateWeekData = useCallback(() => {
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - day);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            days.push(date);
        }
        return days;
    }, [currentDate]);

    // Event management
    const addEvent = useCallback(() => {
        if (!selectedDate) return;

        const newEvent = {
            id: Date.now(),
            ...formData,
            date: selectedDate.toDateString(),
            startTime: formData.startTime || "09:00",
            endTime: formData.endTime || "10:00",
        };

        setEvents((prev) => [...prev, newEvent]);
        setShowEventForm(false);
        setFormData({
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            location: "",
            color: "#007bff",
        });
    }, [formData, selectedDate]);

    const updateEvent = useCallback(() => {
        if (!editingEvent) return;

        const updatedEvent = {
            ...editingEvent,
            ...formData,
        };

        setEvents((prev) =>
            prev.map((event) =>
                event.id === editingEvent.id ? updatedEvent : event
            )
        );

        setShowEventForm(false);
        setEditingEvent(null);
        setFormData({
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            location: "",
            color: "#007bff",
        });
    }, [editingEvent, formData]);

    const deleteEvent = useCallback((eventId) => {
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
    }, []);

    const editEvent = useCallback((event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            startTime: event.startTime,
            endTime: event.endTime,
            location: event.location,
            color: event.color,
        });
        setShowEventForm(true);
    }, []);

    // Get events for a specific date
    const getEventsForDate = useCallback(
        (date) => {
            const dateStr = date.toDateString();
            const filteredEvents = events.filter(
                (event) => event.date === dateStr
            );

            // Debug logging for date matching
            if (events.length > 0) {
                console.log("Looking for events on:", dateStr);
                console.log(
                    "Available events:",
                    events.map((e) => ({ date: e.date, title: e.title }))
                );
                console.log("Found events:", filteredEvents.length);
            }

            return filteredEvents;
        },
        [events]
    );

    // Format date for display
    const formatDate = useCallback((date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year:
                date.getFullYear() !== new Date().getFullYear()
                    ? "numeric"
                    : undefined,
        });
    }, []);

    const formatTime = useCallback((time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }, []);

    // Render month view
    const renderMonthView = () => {
        const days = generateMonthData();
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return (
            <div className="calendar-month-view">
                <div className="calendar-weekdays">
                    {weekDays.map((day) => (
                        <div key={day} className="calendar-weekday">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calendar-grid">
                    {days.map((date, index) => {
                        const isCurrentMonth = date.getMonth() === currentMonth;
                        const isToday =
                            date.toDateString() === new Date().toDateString();
                        const isSelected =
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString();
                        const dayEvents = getEventsForDate(date);

                        return (
                            <div
                                key={index}
                                className={`calendar-day ${
                                    !isCurrentMonth ? "other-month" : ""
                                } ${isToday ? "today" : ""} ${
                                    isSelected ? "selected" : ""
                                }`}
                                onClick={() => setSelectedDate(date)}
                            >
                                <div className="calendar-day-number">
                                    {date.getDate()}
                                </div>
                                {dayEvents.length > 0 && (
                                    <div className="calendar-day-events">
                                        {dayEvents.slice(0, 3).map((event) => (
                                            <div
                                                key={event.id}
                                                className="calendar-day-event-indicator"
                                                style={{
                                                    backgroundColor:
                                                        event.color,
                                                }}
                                                title={event.title}
                                            />
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <div className="calendar-day-event-more">
                                                +{dayEvents.length - 3}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Render week view
    const renderWeekView = () => {
        const days = generateWeekData();

        return (
            <div className="calendar-week-view">
                <div className="calendar-week-header">
                    {days.map((date, index) => {
                        const isToday =
                            date.toDateString() === new Date().toDateString();
                        const dayEvents = getEventsForDate(date);

                        return (
                            <div key={index} className="calendar-week-day">
                                <div
                                    className={`calendar-week-day-header ${
                                        isToday ? "today" : ""
                                    }`}
                                >
                                    <div className="calendar-week-day-name">
                                        {date.toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })}
                                    </div>
                                    <div className="calendar-week-day-number">
                                        {date.getDate()}
                                    </div>
                                </div>
                                <div className="calendar-week-day-events">
                                    {dayEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="calendar-week-event"
                                            style={{
                                                backgroundColor: event.color,
                                            }}
                                            onClick={() => editEvent(event)}
                                        >
                                            <div className="calendar-week-event-time">
                                                {formatTime(event.startTime)}
                                            </div>
                                            <div className="calendar-week-event-title">
                                                {event.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Render day view
    const renderDayView = () => {
        const dayEvents = getEventsForDate(currentDate);
        const hours = Array.from({ length: 24 }, (_, i) => i);

        // Debug: Check if events are found
        if (dayEvents.length > 0) {
            console.log("Day view events found:", dayEvents);
        }

        return (
            <div className="calendar-day-view">
                <div className="calendar-day-timeline">
                    {hours.map((hour) => {
                        // Filter events that fall within this hour slot
                        const hourEvents = dayEvents
                            .filter((event) => {
                                if (!event.startTime) return false;

                                const startHour = parseInt(
                                    event.startTime.split(":")[0]
                                );
                                const endHour = event.endTime
                                    ? parseInt(event.endTime.split(":")[0])
                                    : startHour;

                                // Event starts in this hour, ends in this hour, or spans across this hour
                                return (
                                    (startHour <= hour && endHour >= hour) ||
                                    startHour === hour
                                );
                            })
                            .sort((a, b) => {
                                // Sort events by start time within the hour
                                const aStart = parseInt(
                                    a.startTime.split(":")[1]
                                );
                                const bStart = parseInt(
                                    b.startTime.split(":")[1]
                                );
                                return aStart - bStart;
                            });

                        return (
                            <div key={hour} className="calendar-day-hour">
                                <div className="calendar-day-hour-label">
                                    {hour === 0
                                        ? "12 AM"
                                        : hour === 12
                                        ? "12 PM"
                                        : hour > 12
                                        ? `${hour - 12} PM`
                                        : `${hour} AM`}
                                </div>
                                <div className="calendar-day-hour-content">
                                    {hourEvents.map((event) => {
                                        // Calculate event position and height based on time
                                        const startHour = parseInt(
                                            event.startTime.split(":")[0]
                                        );
                                        const startMinute = parseInt(
                                            event.startTime.split(":")[1]
                                        );
                                        const endHour = event.endTime
                                            ? parseInt(
                                                  event.endTime.split(":")[0]
                                              )
                                            : startHour;
                                        const endMinute = event.endTime
                                            ? parseInt(
                                                  event.endTime.split(":")[1]
                                              )
                                            : startMinute + 60;

                                        // Calculate position within the hour (0-60 minutes)
                                        const startPosition = startMinute;
                                        const duration =
                                            (endHour - startHour) * 60 +
                                            (endMinute - startMinute);

                                        return (
                                            <div
                                                key={event.id}
                                                className="calendar-day-event"
                                                style={{
                                                    backgroundColor:
                                                        event.color,
                                                    position: "absolute",
                                                    top: `${startPosition}px`,
                                                    left: "8px",
                                                    right: "8px",
                                                    minHeight: `${Math.max(
                                                        duration,
                                                        30
                                                    )}px`,
                                                    zIndex: 1,
                                                    fontSize: "11px",
                                                }}
                                                onClick={() => editEvent(event)}
                                            >
                                                <div className="calendar-day-event-time">
                                                    {formatTime(
                                                        event.startTime
                                                    )}{" "}
                                                    -{" "}
                                                    {formatTime(event.endTime)}
                                                </div>
                                                <div className="calendar-day-event-title">
                                                    {event.title}
                                                </div>
                                                {event.location && (
                                                    <div className="calendar-day-event-location">
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faMapMarkerAlt
                                                            }
                                                        />{" "}
                                                        {event.location}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Render event form
    const renderEventForm = () => {
        if (!showEventForm) return null;

        return (
            <div className="calendar-event-form-overlay">
                <div className="calendar-event-form">
                    <div className="calendar-event-form-header">
                        <h3>{editingEvent ? "Edit Event" : "Add New Event"}</h3>
                        <button
                            className="calendar-event-form-close"
                            onClick={() => {
                                setShowEventForm(false);
                                setEditingEvent(null);
                                setFormData({
                                    title: "",
                                    description: "",
                                    startTime: "",
                                    endTime: "",
                                    location: "",
                                    color: "#007bff",
                                });
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <div className="calendar-event-form-content">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Event title"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Event description"
                                rows="3"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Time</label>
                                <input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            startTime: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>End Time</label>
                                <input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            endTime: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        location: e.target.value,
                                    }))
                                }
                                placeholder="Event location"
                            />
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <div className="color-picker">
                                {[
                                    "#007bff",
                                    "#28a745",
                                    "#dc3545",
                                    "#ffc107",
                                    "#6f42c1",
                                    "#fd7e14",
                                    "#e83e8c",
                                    "#6c757d",
                                ].map((color) => (
                                    <button
                                        key={color}
                                        className={`color-option ${
                                            formData.color === color
                                                ? "selected"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                color,
                                            }))
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="calendar-event-form-actions">
                        {editingEvent && (
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    deleteEvent(editingEvent.id);
                                    setShowEventForm(false);
                                    setEditingEvent(null);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        )}

                        <div className="form-actions-right">
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setShowEventForm(false);
                                    setEditingEvent(null);
                                    setFormData({
                                        title: "",
                                        description: "",
                                        startTime: "",
                                        endTime: "",
                                        location: "",
                                        color: "#007bff",
                                    });
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={editingEvent ? updateEvent : addEvent}
                                disabled={!formData.title}
                            >
                                {editingEvent ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} />{" "}
                                        Update
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPlus} /> Add
                                        Event
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render selected date events
    const renderSelectedDateEvents = () => {
        if (!selectedDate) return null;

        const dayEvents = getEventsForDate(selectedDate);

        return (
            <div className="calendar-selected-date">
                <div className="calendar-selected-date-header">
                    <h3>{formatDate(selectedDate)}</h3>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowEventForm(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add Event
                    </button>
                </div>

                {dayEvents.length === 0 ? (
                    <div className="calendar-no-events">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <p>No events scheduled for this date</p>
                    </div>
                ) : (
                    <div className="calendar-events-list">
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className="calendar-event-item"
                                style={{ borderLeftColor: event.color }}
                            >
                                <div className="calendar-event-item-header">
                                    <div className="calendar-event-item-time">
                                        <FontAwesomeIcon icon={faClock} />
                                        {formatTime(event.startTime)} -{" "}
                                        {formatTime(event.endTime)}
                                    </div>
                                    <div className="calendar-event-item-actions">
                                        <button
                                            className="btn btn-sm btn-icon"
                                            onClick={() => editEvent(event)}
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-icon btn-danger"
                                            onClick={() =>
                                                deleteEvent(event.id)
                                            }
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>

                                <div className="calendar-event-item-title">
                                    {event.title}
                                </div>

                                {event.description && (
                                    <div className="calendar-event-item-description">
                                        {event.description}
                                    </div>
                                )}

                                {event.location && (
                                    <div className="calendar-event-item-location">
                                        <FontAwesomeIcon
                                            icon={faMapMarkerAlt}
                                        />
                                        {event.location}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Window
            title="Calendar"
            onClose={onClose}
            onMinimize={onMinimize}
            isMinimized={isMinimized}
            defaultSize={{ width: 900, height: 700 }}
            minSize={{ width: 600, height: 500 }}
        >
            <div className="calendar-app">
                {/* Header */}
                <div className="calendar-header">
                    <div className="calendar-navigation">
                        <button className="btn btn-icon" onClick={goToPrevious}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="btn btn-icon" onClick={goToToday}>
                            Today
                        </button>
                        <button className="btn btn-icon" onClick={goToNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className="calendar-title">
                        {view === "month" && (
                            <h2>
                                {currentDate.toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h2>
                        )}
                        {view === "week" && (
                            <h2>Week of {formatDate(generateWeekData()[0])}</h2>
                        )}
                        {view === "day" && (
                            <h2>
                                {currentDate.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </h2>
                        )}
                    </div>

                    <div className="calendar-view-controls">
                        <button
                            className={`btn ${
                                view === "month"
                                    ? "btn-primary"
                                    : "btn-secondary"
                            }`}
                            onClick={() => setView("month")}
                        >
                            Month
                        </button>
                        <button
                            className={`btn ${
                                view === "week"
                                    ? "btn-primary"
                                    : "btn-secondary"
                            }`}
                            onClick={() => setView("week")}
                        >
                            Week
                        </button>
                        <button
                            className={`btn ${
                                view === "day" ? "btn-primary" : "btn-secondary"
                            }`}
                            onClick={() => setView("day")}
                        >
                            Day
                        </button>
                    </div>
                </div>

                {/* Main Calendar Content */}
                <div className="calendar-content">
                    <div className="calendar-main">
                        {view === "month" && renderMonthView()}
                        {view === "week" && renderWeekView()}
                        {view === "day" && renderDayView()}
                    </div>

                    {/* Sidebar */}
                    <div className="calendar-sidebar">
                        {renderSelectedDateEvents()}
                    </div>
                </div>

                {/* Event Form Modal */}
                {renderEventForm()}
            </div>
        </Window>
    );
}
