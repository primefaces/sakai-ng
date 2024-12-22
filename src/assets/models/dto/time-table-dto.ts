import { RoomTableDTO } from './room-table-dto';
import { CourseSession } from './course-session-dto';

export interface TimeTableDTO {
  id: number;
  semester: string;
  year: number;
  status: string;
  roomTables: RoomTableDTO[];
  courseSessions: CourseSession[];
  createdAt: string;  // Format: yyyy-MM-dd'T'HH:mm:ss
  updatedAt: string;  // Format: yyyy-MM-dd'T'HH:mm:ss
}
