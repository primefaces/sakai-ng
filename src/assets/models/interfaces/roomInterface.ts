import {Timing} from "../timing";
import {RoomTable} from "../room-table";

export interface RoomInterface {
  id: string;
  capacity?: number;
  computersAvailable?: boolean;
  timingConstraints?: Timing[];
  tmpCalendarTimes?: any[];
  roomTables?: RoomTable[];
  createDate?: Date;
  updateDate?: Date;
}
