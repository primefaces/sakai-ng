
import {TimingDTO} from "./timing-dto";

export class RoomDTO {
  id!: string;
  capacity!: number;
  computersAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  timingConstraints?: TimingDTO[];
}
