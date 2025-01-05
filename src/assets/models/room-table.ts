import {Timing} from "./timing";

export interface RoomTable {
  id: number;
  roomId: string;
  capacity: number;
  isComputersAvailable: boolean;
  timingConstraints: Timing[];
}
