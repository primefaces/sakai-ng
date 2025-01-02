import {
    Component, OnDestroy, signal,
    ViewChild, WritableSignal,
} from '@angular/core';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {CalendarOptions, EventInput} from "@fullcalendar/core";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {Subscription} from "rxjs";
import {LayoutService} from "../../../layout/service/app.layout.service";

class InfoBox{
    icon: string;
    header: string;
    value: any;
    color: string;
    highlight: string;
    fin: string;
    width: string;
}


@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnDestroy {
    infos!: InfoBox[];

    ngOnInit(): void {
        this.infos = [
            {
                icon: 'pi pi-book text-green-500 text-xl',
                header: 'Courses', value: 152, color: 'bg-green-100',
                highlight: '24% ', fin: 'are assigned', width: 'lg:col-3 xl:col-3'
            },
            {
                icon: 'pi pi-check-circle text-orange-500 text-xl',
                header: 'Collisions', value: 5, color: 'bg-orange-100',
                highlight: '3 ', fin: 'Courses are affected', width: 'lg:col-3 xl:col-3'
            },
            {
                icon: 'pi pi-comments text-cyan-500 text-xl',
                header: 'Last Change',
                value: 'Course PS Lineare Algebra - Group 3 was moved to room 3W04',
                color: 'bg-cyan-100',
                highlight: 'Elias ',
                fin: 'made the change',
                width: 'lg:col-6 xl:col-6'
            }
        ]
    }
    @ViewChild("cal") calendar!: FullCalendarComponent;
    courseSessions: EventInput[];
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
        height: "70vh",
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
        handleWindowResize: true,
        //eventClick: this.showHoverDialog.bind(this),
    });


    constructor(
        private layoutService: LayoutService,
    ) {
        this.layoutService.changeStyle(true);
    }

    ngOnDestroy(): void {
        if (this.menuToggleSub) this.menuToggleSub.unsubscribe();
    }
}
