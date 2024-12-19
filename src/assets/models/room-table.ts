import {Timing} from "./timing";

export class RoomTable {
  id!: number;
  roomId?: string;
  capacity?: number;
  isComputersAvailable?: boolean;
  timingConstraints?: Timing[];
}
