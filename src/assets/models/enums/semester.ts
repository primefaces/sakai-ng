export enum Semester {
    SS = "SS",
    WS = "WS"
}

export function getSemesterOptions(): Semester[] {
    return Object.values(Semester) as Semester[];
}
