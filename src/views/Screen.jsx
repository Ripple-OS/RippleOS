import React, { useState } from "react";
import desktop_wallpaper_1 from "../assets/images/wallpapers/os-wallpaper-1.png";
import ScreenBottom from "../components/Screen/BottomNavigationBar/ScreenBottom";
import ScreenElements from "../components/Screen/Elements/ScreenElements";

export default function Screen() {
    const [popups, setPopups] = useState([
        {
            name: "Display Apps",
            toggled: false,
        },
    ]);

    return (
        <main style={{ backgroundImage: `url(${desktop_wallpaper_1})` }}>
            <ScreenElements popups={popups} setPopups={setPopups} />
            <ScreenBottom setPopups={setPopups} />
        </main>
    );
}
