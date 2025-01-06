import {Timing} from "./timing";

export interface RoomTable {
  id: number;
  roomId: string;
  capacity: number;
  computersAvailable: boolean;
  timingConstraints: Timing[];
}
