import React, { useEffect, useState } from 'react'

export default function Clock() {
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setCurrentDate(new Date()), 5000);
        return () => clearInterval(interval);
    }, [])

  return (
    <div className="clock">
        <span>{currentDate.getHours().toString().padStart(2, '0')}:{currentDate.getMinutes().toString().padStart(2, '0')}</span>
        <span>{currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
    </div>
  )
}
