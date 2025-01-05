import { Pipe, PipeTransform } from '@angular/core';
import {EventInput} from "@fullcalendar/core";

@Pipe({
  name: 'EventFilter',
  standalone: true
})
export class EventFilterPipe implements PipeTransform {

  transform(value: EventInput[], place: 'drag' | 'shown'): EventInput[] {
    switch (place){
        case "drag": return value.filter(v => !v.extendedProps['assigned']);
        case "shown": return value.filter(v => v.extendedProps['assigned']);
    }
  }
}
