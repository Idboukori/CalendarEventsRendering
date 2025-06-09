import { groupOverlappingEvents } from '../groupOverlappingEvents';
import { CalendarEvent } from '../../types/event';

describe('groupOverlappingEvents', () => {
    it('groupe correctement les événements qui se chevauchent', () => {
        const input: CalendarEvent[] = [
            { id: 1, start: '10:00', duration: 60 },
            { id: 2, start: '10:30', duration: 60 },
            { id: 3, start: '11:00', duration: 30 },
        ];

        const result = groupOverlappingEvents(input);

        expect(result).toHaveLength(3);
        expect(result.every(ev => ev.totalColumns === 2)).toBe(true);

        const columns = result.map(ev => ev.column);
        expect(columns).toContain(0);
        expect(columns).toContain(1);
    });

    it('groupe les événements indépendants séparément', () => {
        const input: CalendarEvent[] = [
            { id: 1, start: '09:00', duration: 30 },
            { id: 2, start: '10:00', duration: 30 },
        ];

        const result = groupOverlappingEvents(input);

        expect(result[0].group).not.toBe(result[1].group);
    });
});
