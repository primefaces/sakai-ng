import LocalTime from "ts-time/LocalTime";

export class Timing {
  id!: number;
  timingType!: string;
  startTime?: LocalTime;
  endTime?: LocalTime;
  day?: string;
}
