import { Pipe, PipeTransform } from '@angular/core';
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";
import {EventInput} from "@fullcalendar/core";

type Call = 'editor' | 'dashboard';

@Pipe({
  name: 'SessionToEvent',
  standalone: true
})
export class CalendarEventPipe implements PipeTransform {
  transform(values: CourseSession[], call: Call): EventInput[] {
      return values.map(s => CalendarEventPipe.toEvent(s, call));
  }

  static toEvent(session: CourseSession, call: Call): EventInput{
      return {
          id: session.id.toString(),
          title: session.name,
          description: session.roomTable?.roomId,
          daysOfWeek: this.weekDayToNumber(session.timing?.day!),
          startTime: session.timing?.startTime ?? '',
          endTime: session.timing?.endTime ?? '',
          editable: this.getValueBasedOnPage(session, call),
          backgroundColor: this.getColorBasedOnPage(session, call),
          durationEditable: false,
          droppable: true,
          extendedProps: {
              'type': session.name.slice(0, 2),
              'semester': session.semester,
              'studyType': session.studyType,
              'assigned': session.assigned,
              'duration': this.convertDurationToHours(session.duration),
              'nrOfParticipants': session.numberOfParticipants
          }
      };
  }

  static getValueBasedOnPage(session: CourseSession, call: Call): boolean {
    return (call == 'dashboard') ? false : !session.fixed;
  }

  static getColorBasedOnPage(session: CourseSession, call: Call): string {
    if (session.fixed && call == 'editor') return  '#7a4444';
    else return '#666666';
  }

  static weekDayToNumber(day: string): string[] {
      switch (day) {
          case 'SUNDAY': return ['0'];
          case 'MONDAY': return ['1'];
          case 'TUESDAY': return ['2'];
          case 'WEDNESDAY': return ['3'];
          case 'THURSDAY': return ['4'];
          case 'FRIDAY': return ['5'];
          case 'SATURDAY': return ['6'];
          default: return ['-1'];
      }
  }

  static convertDurationToHours(duration: number): string {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = mins.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}`;
  }
}
