import {
    faVolumeHigh,
    faVolumeLow,
    faVolumeOff,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function UtilitySoundControl() {
    const [volume, setVolume] = useState(() => {
        try {
            const saved = localStorage.getItem("volume");
            const numeric = saved !== null ? Number(saved) : 0;
            if (!Number.isFinite(numeric)) return 0;
            return Math.min(100, Math.max(0, numeric));
        } catch {
            return 0;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("volume", String(volume));
            window.dispatchEvent(
                new CustomEvent("volume-changed", { detail: volume })
            );
        } catch {
            // ignore
        }
    }, [volume]);

    useEffect(() => {
        const clamp = (n) => {
            const num = Number(n);
            if (!Number.isFinite(num)) return 0;
            return Math.min(100, Math.max(0, num));
        };

        const handleStorage = (e) => {
            if (e.key === "volume") {
                const next = clamp(e.newValue);
                setVolume(next);
            }
        };

        const handleCustom = (e) => {
            const next = clamp(e.detail);
            setVolume(next);
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("volume-changed", handleCustom);
        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("volume-changed", handleCustom);
        };
    }, []);

    return (
        <div className="popup" id="sound_control">
            <div className="content">
                <div className="sound_control">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={
                                volume >= 75
                                    ? faVolumeHigh
                                    : volume >= 45
                                    ? faVolumeLow
                                    : volume >= 1
                                    ? faVolumeOff
                                    : faVolumeXmark
                            }
                        />
                    </div>
                    <div className="slider">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            style={{ "--value": `${volume}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
