const _closeEveryPopup = (popupName, setPopups) => {
    if (popupName) {
        setPopups((prev) =>
            prev.map((popup) =>
                popup.name === popupName ? popup : { ...popup, toggled: false }
            )
        );
    } else {
        setPopups((prev) =>
            prev.map((popup) => ({ ...popup, toggled: false }))
        );
    }
    if (popupName) _openPopup(popupName, setPopups)
}

const _openPopup = (popupName, setPopups) => {
    setPopups((prev) =>
        prev.map((popup) =>
            popup.name === popupName
                ? { ...popup, toggled: !popup.toggled }
                : popup
        )
    )
}

export { _closeEveryPopup }