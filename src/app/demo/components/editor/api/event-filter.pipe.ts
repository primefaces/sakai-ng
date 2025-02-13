import { Pipe, PipeTransform } from '@angular/core';
import {EventInput} from "@fullcalendar/core";

@Pipe({
  name: 'EventFilter',
  standalone: true
})
export class EventFilterPipe implements PipeTransform {

  transform(value: EventInput[], place: 'drag' | 'shown'): EventInput[] {
    switch (place){
        case "shown": return value.filter((v:EventInput) => v.extendedProps['assigned']);
        case "drag": return value.filter((v: EventInput) => !v.extendedProps['assigned'])
    }
  }
}
