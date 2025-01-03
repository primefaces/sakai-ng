import { RoomTable } from './room-table';
import { CourseSession } from './course-session-dto';

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
