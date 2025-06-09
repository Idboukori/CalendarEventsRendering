import React from 'react';
import { render, screen } from '@testing-library/react';
import EventCalendar from '../EventCalendar';
import { CalendarEvent } from '../../types/event';

const testEvents: CalendarEvent[] = [
    { id: 42, start: '10:00', duration: 60 },
];

describe('EventCalendar', () => {
    it("affiche l'événement avec le bon ID", () => {
        render(<EventCalendar events={testEvents} />);
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('affiche tous les événements passés en props', () => {
        const events = [
            { id: 1, start: '09:00', duration: 30 },
            { id: 2, start: '10:00', duration: 45 },
            { id: 3, start: '11:15', duration: 15 },
        ];
        render(<EventCalendar events={events} />);
        events.forEach(e => {
            expect(screen.getByText(e.id.toString())).toBeInTheDocument();
        });
    });
});
