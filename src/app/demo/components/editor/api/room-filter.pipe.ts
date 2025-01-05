import { Pipe, PipeTransform } from '@angular/core';
import {EventInput} from "@fullcalendar/core";

@Pipe({
  name: 'RoomFilter',
  standalone: true
})
export class RoomFilterPipe implements PipeTransform {
  transform(events: EventInput[], roomId: string): EventInput[] {
      console.log('events: ',events);
      console.log('room ID: ', roomId);
      return events.filter(e => e['description'] == roomId);
  }

}
