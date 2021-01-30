export function getMaxXp(level: number): number {
    return Math.round(2000*Math.log(3*level));
}