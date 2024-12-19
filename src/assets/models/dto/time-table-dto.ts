import { RoomTableDTO } from './room-table-dto';
import { CourseSessionDTO } from './course-session-dto';

export interface TimeTableDTO {
  id: number;
  semester: string;
  year: number;
  status: string;
  roomTables: RoomTableDTO[];
  courseSessions: CourseSessionDTO[];
  createdAt: string;  // Format: yyyy-MM-dd'T'HH:mm:ss
  updatedAt: string;  // Format: yyyy-MM-dd'T'HH:mm:ss
}
