import { faChrome } from "@fortawesome/free-brands-svg-icons";
import {
    faCalculator,
    faCalendar,
    faFolderOpen,
    faGear,
    faImages,
    faList,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const defaultApps = [
    {
        name: "Display Apps",
        icon: faList,
        action: "",
        primary: true,
        defaultDock: true,
    },
    {
        name: "TextEditor",
        icon: faFileAlt,
        action: "",
        primary: false,
        defaultDock: true,
        opened: false,
    },
    {
        name: "Settings",
        icon: faGear,
        action: "",
        primary: false,
        defaultDock: true,
        opened: false,
    },
    {
        name: "Files Manager",
        icon: faFolderOpen,
        action: "",
        primary: false,
        defaultDock: true,
        opened: false,
    },
    {
        name: "Chrome Browser",
        icon: faChrome,
        action: "",
        primary: false,
        defaultDock: true,
        opened: false,
    },
    {
        name: "Calendar",
        icon: faCalendar,
        action: "",
        primary: false,
        defaultDock: true,
        opened: false,
    },
    {
        name: "Calculator",
        icon: faCalculator,
        action: "",
        primary: false,
        defaultDock: true,
        opened: false,
    },
    {
        name: "Gallery",
        icon: faImages,
        action: "",
        primary: false,
        defaultDock: false,
        opened: false,
    },
];

export { defaultApps };
