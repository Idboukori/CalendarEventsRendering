export const getTopFromStart = (start: string, containerHeight: number): number => {
    const [hours, minutes] = start.split(':').map(Number);
    const totalMinutes = (hours - 9) * 60 + minutes;
    const pixelPerMinute = containerHeight / (12 * 60);
    return totalMinutes * pixelPerMinute;
};

export const getHeightFromDuration = (duration: number, containerHeight: number): number => {
    const pixelPerMinute = containerHeight / (12 * 60);
    return duration * pixelPerMinute;
};
