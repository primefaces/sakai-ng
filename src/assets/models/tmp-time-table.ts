import {Room} from "./room";
import {Course} from "./course";
import {Semester} from "./enums/semester";
import {Status} from "./enums/status";

export class TmpTimeTable {
  currentPageIndex: number = 0;
  id!: number;
  semester?: Semester;
  year?: number;
  name?: string;
  status: Status = Status.NEW;
  courseTable: Course[] = [];
  roomTables: Room[] = [];
}
