import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBackspace,
    faEquals,
    faPlus,
    faMinus,
    faTimes,
    faDivide,
    faPercent,
    faPlusMinus,
} from "@fortawesome/free-solid-svg-icons";
import Window from "../Window/Window";
import './Calculator.css';

export default function Calculator({
    onClose,
    onMinimize,
    isMinimized = false,
}) {
    const [display, setDisplay] = useState("0");
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [history, setHistory] = useState([]);

    // Handle number input
    const inputNumber = useCallback((num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? String(num) : display + num);
        }
    }, [display, waitingForOperand]);

    // Handle decimal point
    const inputDecimal = useCallback(() => {
        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
        } else if (display.indexOf(".") === -1) {
            setDisplay(display + ".");
        }
    }, [display, waitingForOperand]);

    // Clear all
    const clear = useCallback(() => {
        setDisplay("0");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    }, []);

    // Clear entry
    const clearEntry = useCallback(() => {
        setDisplay("0");
    }, []);

    // Backspace
    const backspace = useCallback(() => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay("0");
        }
    }, [display]);

    // Toggle sign
    const toggleSign = useCallback(() => {
        if (display !== "0") {
            setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
        }
    }, [display]);

    // Percentage
    const percentage = useCallback(() => {
        const value = parseFloat(display);
        if (!isNaN(value)) {
            setDisplay(String(value / 100));
        }
    }, [display]);

    // Perform calculation
    const calculate = useCallback((firstOperand, secondOperand, operation) => {
        switch (operation) {
            case "+":
                return firstOperand + secondOperand;
            case "-":
                return firstOperand - secondOperand;
            case "×":
                return firstOperand * secondOperand;
            case "÷":
                return secondOperand !== 0 ? firstOperand / secondOperand : NaN;
            default:
                return secondOperand;
        }
    }, []);

    // Handle operations
    const performOperation = useCallback((nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            // Add to history
            const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
            setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 entries

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    }, [display, previousValue, operation, calculate]);

    // Handle equals
    const performEquals = useCallback(() => {
        const inputValue = parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation);
            
            // Add to history
            const historyEntry = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
            setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);

            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    }, [display, previousValue, operation, calculate]);

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;

            // Prevent default behavior for calculator keys
            if (/[0-9+\-*/=.%]/.test(key) || key === "Enter" || key === "Escape" || key === "Backspace") {
                event.preventDefault();
            }

            if (/[0-9]/.test(key)) {
                inputNumber(parseInt(key));
            } else if (key === ".") {
                inputDecimal();
            } else if (key === "+") {
                performOperation("+");
            } else if (key === "-") {
                performOperation("-");
            } else if (key === "*") {
                performOperation("×");
            } else if (key === "/") {
                performOperation("÷");
            } else if (key === "=" || key === "Enter") {
                performEquals();
            } else if (key === "Escape") {
                clear();
            } else if (key === "Backspace") {
                backspace();
            } else if (key === "%") {
                percentage();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [inputNumber, inputDecimal, performOperation, performEquals, clear, backspace, percentage]);

    // Format display value
    const formatDisplay = (value) => {
        if (value.length > 12) {
            const num = parseFloat(value);
            if (!isNaN(num)) {
                return num.toExponential(6);
            }
        }
        return value;
    };

    return (
        <Window
            title="Calculator"
            onClose={onClose}
            onMinimize={onMinimize}
            isMinimized={isMinimized}
            defaultSize={{ width: 350, height: 500 }}
            minSize={{ width: 320, height: 450 }}
        >
            <div className="calculator-app">
                {/* Display */}
                <div className="calc-display">
                    <div className="calc-display-main">
                        {formatDisplay(display)}
                    </div>
                    {operation && previousValue !== null && (
                        <div className="calc-display-operation">
                            {previousValue} {operation}
                        </div>
                    )}
                </div>

                {/* History */}
                {history.length > 0 && (
                    <div className="calc-history">
                        <div className="calc-history-title">History</div>
                        <div className="calc-history-list">
                            {history.slice(0, 3).map((entry, index) => (
                                <div key={index} className="calc-history-item">
                                    {entry}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Button Grid */}
                <div className="calc-buttons">
                    {/* First Row */}
                    <button className="calc-btn secondary" onClick={clear}>
                        AC
                    </button>
                    <button className="calc-btn secondary" onClick={clearEntry}>
                        CE
                    </button>
                    <button className="calc-btn secondary" onClick={percentage}>
                        <FontAwesomeIcon icon={faPercent} />
                    </button>
                    <button className="calc-btn operator" onClick={() => performOperation("÷")}>
                        <FontAwesomeIcon icon={faDivide} />
                    </button>

                    {/* Second Row */}
                    <button className="calc-btn number" onClick={() => inputNumber(7)}>
                        7
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(8)}>
                        8
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(9)}>
                        9
                    </button>
                    <button className="calc-btn operator" onClick={() => performOperation("×")}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    {/* Third Row */}
                    <button className="calc-btn number" onClick={() => inputNumber(4)}>
                        4
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(5)}>
                        5
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(6)}>
                        6
                    </button>
                    <button className="calc-btn operator" onClick={() => performOperation("-")}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>

                    {/* Fourth Row */}
                    <button className="calc-btn number" onClick={() => inputNumber(1)}>
                        1
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(2)}>
                        2
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(3)}>
                        3
                    </button>
                    <button className="calc-btn operator" onClick={() => performOperation("+")}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>

                    {/* Fifth Row */}
                    <button className="calc-btn secondary" onClick={toggleSign}>
                        <FontAwesomeIcon icon={faPlusMinus} />
                    </button>
                    <button className="calc-btn number" onClick={() => inputNumber(0)}>
                        0
                    </button>
                    <button className="calc-btn number" onClick={inputDecimal}>
                        .
                    </button>
                    <button className="calc-btn equals" onClick={performEquals}>
                        <FontAwesomeIcon icon={faEquals} />
                    </button>

                    {/* Backspace Button */}
                    <button className="calc-btn secondary backspace" onClick={backspace}>
                        <FontAwesomeIcon icon={faBackspace} />
                    </button>
                </div>

                {/* Status Bar */}
                <div className="calc-statusbar">
                    <div className="calc-status-left">
                        <span className="calc-status-item">
                            Standard Calculator
                        </span>
                    </div>
                    <div className="calc-status-right">
                        {history.length > 0 && (
                            <span className="calc-status-item">
                                {history.length} calculation{history.length !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
}
