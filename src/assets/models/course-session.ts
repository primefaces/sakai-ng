import {Timing} from "./timing";
import {RoomTable} from "./room-table";

export class CourseSession {
  id!: number;
  name!: string;
  isAssigned?: boolean;
  isFixed?: boolean;
  duration?: number;
  timingConstraints?: Timing[];
  timing?: Timing;
  roomTable?: RoomTable;
}
