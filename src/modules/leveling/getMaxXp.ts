export function getMaxXp(level: number): number {
    return Math.round(600*Math.log(3*level));
}