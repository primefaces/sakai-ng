import {Timing} from "./timing";
import {RoomInterface} from "./interfaces/roomInterface";
import {EventImpl} from "@fullcalendar/core/internal";

export class Room implements RoomInterface {
  id!: string;
  capacity!: number;
  computersAvailable?: boolean;
  timingConstraints?: Timing[];
  tmpEvents?: EventImpl[];

  static getTableColumns(): any[] {
    return [
      {field: 'id', header: 'Id'},
      {field: 'capacity', header: 'Capacity'},
      {field: 'computersAvailable', header: 'Room has PCs'}
    ]
  }

  static getFilterFields(): string[]{
      return ['id'];
  };
}
