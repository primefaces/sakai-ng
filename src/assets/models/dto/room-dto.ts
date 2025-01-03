
import {Timing} from "./timing";

export class RoomDTO {
  id!: string;
  capacity!: number;
  computersAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  timingConstraints?: Timing[];
}
