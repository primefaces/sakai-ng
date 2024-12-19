import {Semester} from "../enums/semester";
import {Status} from "../enums/status";
import {RoomDTO} from "./room-dto";
import {CourseDTO} from "./course-dto";

export class TmpTimeTableDTO {
  name?: string;
  semester?: Semester;
  year?: number;
  status: Status | string = Status.NEW;
  courses!: CourseDTO[];
  rooms!: RoomDTO[];
}
