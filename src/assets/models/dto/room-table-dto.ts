import {TimingDTO} from "./timing-dto";

export class RoomTableDTO {
  id!: number;
  roomId!: string;
  capacity?: number;
  isComputersAvailable?: boolean;
  timingConstraints?: TimingDTO[];

}
