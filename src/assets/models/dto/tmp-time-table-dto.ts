import {Semester} from "../enums/semester";
import {Status} from "../enums/status";
import {Room} from "../room";
import {Course} from "../course";

export class TmpTimeTableDTO {
  name?: string;
  semester?: Semester;
  year?: number;
  status: Status | string = Status.NEW;
  courses!: Course[];
  rooms!: Room[];
}
