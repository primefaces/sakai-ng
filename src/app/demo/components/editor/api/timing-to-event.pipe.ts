import { Pipe, PipeTransform } from '@angular/core';
import {Timing} from "../../../../../assets/models/timing";
import {EventInput} from "@fullcalendar/core";
import {CourseColor} from "../../../../../assets/models/enums/lecture-color";
import {CalendarEventPipe} from "../../dashboard/api/calendar-event.pipe";

@Pipe({
  name: 'TimingToEvent',
  standalone: true
})
export class TimingToEventPipe implements PipeTransform {
  transform(existingEvents: EventInput[], timings: Timing[]): EventInput[] {
      const convertedTiming = timings.map(t => {
          return {
              title: t.timingType,
              daysOfWeek: CalendarEventPipe.weekDayToNumber(t.day),
              startTime: t.startTime,
              endTime: t.endTime,
              color: CourseColor[t.timingType as keyof typeof CourseColor],
              borderColor: CourseColor[t.timingType as keyof typeof CourseColor],
              display: 'background',
              editable: false,
          } as EventInput;
      });
      return existingEvents.concat(convertedTiming);
  }
}
