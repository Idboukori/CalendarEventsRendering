import React, { useRef, useState, useEffect } from 'react';
import { CalendarEvent } from '../types/event';
import { groupOverlappingEvents } from '../utils/groupOverlappingEvents';
import { getTopFromStart, getHeightFromDuration } from '../utils/time';

type Props = {
    events: CalendarEvent[];
};

const EventCalendar: React.FC<Props> = ({ events }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number>(1200);
    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    const positionedEvents = groupOverlappingEvents(events);

    return (
        <div className="calendar-wrapper">
            <div className="hour-labels">
                {Array.from({ length: 13 }, (_, i) => {
                    const hour = 9 + i;
                    const top = (i / 12) * 100;
                    return (
                        <div
                            key={hour}
                            className="hour-label"
                            style={{ top: `${top}%` }}
                        >
                            {hour}:00
                        </div>
                    );
                })}
            </div>


            <div className="calendar-body" ref={containerRef}>
                {positionedEvents.map(event => {
                    const top = getTopFromStart(event.start, containerHeight);
                    const height = getHeightFromDuration(event.duration, containerHeight);
                    const widthPercent = 100 / event.totalColumns;
                    const leftPercent = event.column * widthPercent;

                    return (
                        <div
                            key={event.id}
                            id={`event-${event.id}`}
                            className="event"
                            style={{
                                top,
                                height,
                                width: `${widthPercent}%`,
                                left: `${leftPercent}%`,
                            }}
                        >
                            {event.id}
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default EventCalendar;
