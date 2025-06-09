import { CalendarEvent } from '../types/event';

type TimedEvent = CalendarEvent & {
    startMin: number;
    endMin: number;
};

export type PositionedEvent = TimedEvent & {
    group: number;
    column: number;
    totalColumns: number;
};

export const groupOverlappingEvents = (events: CalendarEvent[]): PositionedEvent[] => {
    const withTime = events.map(event => {
        const [h, m] = event.start.split(':').map(Number);
        const startMin = (h * 60 + m) - (9 * 60);
        const endMin = startMin + event.duration;
        return { ...event, startMin, endMin };
    });

    const positioned: PositionedEvent[] = [];
    let groupId = 0;

    while (withTime.length > 0) {
        const group: TimedEvent[] = [];
        const toProcess = [withTime.shift()!];

        while (toProcess.length > 0) {
            const current = toProcess.pop()!;
            group.push(current);

            for (let i = withTime.length - 1; i >= 0; i--) {
                const ev = withTime[i];
                if (ev.startMin < current.endMin && current.startMin < ev.endMin) {
                    toProcess.push(ev);
                    withTime.splice(i, 1);
                }
            }
        }

        group.sort((a, b) => a.startMin - b.startMin);

        const columns: TimedEvent[][] = [];

        const localPositioned: PositionedEvent[] = [];

        for (const event of group) {
            let placed = false;
            for (let col = 0; col < columns.length; col++) {
                const last = columns[col][columns[col].length - 1];
                if (last.endMin <= event.startMin) {
                    columns[col].push(event);
                    localPositioned.push({ ...event, group: groupId, column: col, totalColumns: 0 }); // temporaire
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                columns.push([event]);
                localPositioned.push({ ...event, group: groupId, column: columns.length - 1, totalColumns: 0 }); // temporaire
            }
        }

        const totalCols = columns.length;
        const updated = localPositioned.map(ev => ({
            ...ev,
            totalColumns: totalCols,
        }));

        positioned.push(...updated);
        groupId++;
    }

    return positioned;
};
