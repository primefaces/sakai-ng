import {Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {Subscription} from "rxjs";
import {CalendarOptions} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
})
export class EditorComponent {
    @ViewChild("cal") calendar!: FullCalendarComponent;
    menuToggleSub!: Subscription;

    readonly calendarOptions: WritableSignal<CalendarOptions> = signal({
        plugins: [
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
        ],
        headerToolbar: {
            left: '',
            center: '',
            right: ''
        },
        initialView: 'timeGridWeek',
        weekends: false,
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        allDaySlot: false,
        height: "85vh",
        eventBackgroundColor: "#666666",
        eventBorderColor: "#050505",
        eventTextColor: "var(--system-color-primary-white)",
        slotMinTime: '08:00',
        slotMaxTime: '22:00',
        slotDuration: '00:15',
        slotLabelInterval: '00:30',
        dayHeaderFormat: {weekday: 'long'},
        eventOverlap: true,
        slotEventOverlap: true,
        nowIndicator: false,
        handleWindowResize: true
        //eventClick: this.showHoverDialog.bind(this),
    });
}
