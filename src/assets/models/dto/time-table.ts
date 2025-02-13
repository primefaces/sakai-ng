import { CourseSession } from './course-session-dto';
import {RoomTable} from "../room-table";

export interface TimeTable {
  id: number;
  name: string;
  semester: string;
  year: number;
  status: string;
  roomTables: RoomTable[];
  courseSessions?: CourseSession[];
  createdAt: string;
  updatedAt: string;
}
