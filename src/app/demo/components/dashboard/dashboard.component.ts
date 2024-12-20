import {Component, OnInit, signal, WritableSignal,} from '@angular/core';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {CalendarOptions} from "@fullcalendar/core";

class InfoBox {
    icon: string
    header: string
    value: any
    highlight: string
    fin: string
    color: string
}

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
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
        //eventClick: this.showHoverDialog.bind(this),
    });

    infos!: InfoBox[];

    constructor(
    ) {
    }

    ngOnInit(): void {
        this.infos = [
            {
                icon: 'pi pi-shopping-cart text-blue-500 text-xl',
                header: 'Orders', value : 152, color: 'bg-blue-100',
                highlight : '24 new ', fin: 'since last visit'
            },
            {
                icon: 'pi pi-map-marker text-orange-500 text-xl',
                header: 'Revenue', value : '$2.100', color: 'bg-orange-100',
                highlight : '%52+ ', fin: 'since last week'
            },
            {
                icon: 'pi pi-inbox text-cyan-500 text-xl',
                header: 'Customers', value : 28441, color: 'bg-cyan-100',
                highlight : '520 ', fin: 'newly registered'
            },
            {
                icon: 'pi pi-inbox text-purple-500 text-xl',
                header: 'Comments', value : '152 Unread', color: 'bg-purple-100',
                highlight : '85 ', fin: 'responded'
            }
        ]
    }

}
