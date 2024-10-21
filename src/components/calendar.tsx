'use client'
import { useEffect, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendar() {
    const [date, setDate] = useState<Date>(new Date());
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient && <ReactCalendar onChange={(value: any) => setDate(value)} value={date} />
}