import { TimingDTO } from './timing-dto';
import {RoomTableDTO} from "./room-table-dto";

export interface CourseSessionDTO {
  id: number;
  name: string;
  assigned: boolean;
  fixed: boolean;
  duration: number;
  courseId: number;
  semester: number;
  studyType: string;
  numberOfParticipants: number;
  timingConstraints: TimingDTO[];
  timing: TimingDTO | null;
  roomTable: RoomTableDTO | null;
}
