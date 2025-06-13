import {
    AfterViewInit,
    Component, OnInit, signal,
    ViewChild, WritableSignal,
} from '@angular/core';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {TimeTable} from "../../../../assets/models/dto/time-table";
import {CourseSession} from "../../../../assets/models/dto/course-session-dto";
import {animate, style, transition, trigger} from "@angular/animations";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CalendarContextMenuComponent} from "./calendar-context-menu/calendar-context-menu.component";
import {DialogService} from "primeng/dynamicdialog";
import {CourseInfoDialog} from "../dialogs/course-info-dialog/course-info-dialog.component";
import {InvokerService} from "./commands/invoker.service";
import {ComplexInvokerService} from "./commands/complex-invoker.service";
import {ActivatedRoute} from "@angular/router";

class InfoBox{
    icon: string;
    header: string;
    value: any;
    color: string;
    highlight: any;
    fin: string;
    width: string;
}

@Component({
    templateUrl: './dashboard.component.html',
    animations: [
        trigger('slideDown', [
            transition(':enter', [
                style({ transform: 'translateY(-20px)', opacity: 0 }),
                animate('700ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ])
        ])
    ]
})
export class DashboardComponent implements OnInit, AfterViewInit{
    @ViewChild('cm') calendarContextMenu! : CalendarContextMenuComponent;
    @ViewChild("cal") calendar!: FullCalendarComponent;

    selectedTimeTable: TimeTable | null = null;
    currentSessions: Observable<CourseSession[]> = of([]);
    infos!: InfoBox[];

    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.isLoading.asObservable();

    constructor(
        private layoutService: LayoutService,
        private dialogService: DialogService,
        private complexInvoker: ComplexInvokerService,
        private invoker: InvokerService,
    ) {
        this.layoutService.changeStyle(true);
        this.complexInvoker.receiver = this;
        this.invoker.receiver = this;
    }

    readonly calendarOptions: WritableSignal<CalendarOptions> = signal({
        plugins: [
            interactionPlugin,
            timeGridPlugin,
            dayGridPlugin,
        ],
        headerToolbar: {
            left: '',
            center: '',
            right: ''
        },
        initialView: 'timeGridWeek',
        height: "70vh",
        dayHeaderFormat: {weekday: 'long'},
        weekends: false,
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        allDaySlot: false,
        eventOverlap: true,
        nowIndicator: false,
        slotEventOverlap: true,
        handleWindowResize: true,
        eventBackgroundColor: "#666666",
        eventBorderColor: "var(--sys-color-primary-blue)",
        eventTextColor: "var(--sys-color-primary-white)",
        slotMinTime: '08:00',
        slotMaxTime: '22:00',
        slotDuration: '00:15',
        slotLabelInterval: '00:30',
        eventClick: this.showClickDialog.bind(this),
        eventMouseEnter: this.handleMouseEnter.bind(this),
        eventMouseLeave: this.handleMouseLeave.bind(this),
        loading: (isLoading: boolean) => this.setLoading(isLoading)
    });

    public setNewTable(newTable: TimeTable){
        this.selectedTimeTable = newTable;
        localStorage.setItem('current-table', JSON.stringify(this.selectedTimeTable));
        this.updateInfoBoxes(this.selectedTimeTable.courseSessions);
        this.currentSessions = of(this.selectedTimeTable.courseSessions);
    }

    private clearCalendar(){
        this.calendar.getApi().removeAllEvents();
    }

    private showClickDialog(event: EventClickArg): void {
        const { clientX, clientY } = event.jsEvent;
        this.dialogService.open(CourseInfoDialog, {
            width: '400px', height: '450px',
            baseZIndex: 10000,
            modal: false,
            draggable: true,
            showHeader: false,
            data: {'event':event, 'calendar':this.calendar},
            style: {position: 'absolute', top: `${clientY}px`, left: `${clientX}px`,}
        })
    }

    private updateInfoBoxes(sessions: CourseSession[]){
        const assignedSessions = sessions.filter(s => s.assigned).length;
        const allSessions = sessions.length;
        this.infos[0].value = allSessions;
        this.infos[0].highlight = Math.round(assignedSessions/allSessions * 100).toFixed(1);

    }

    private setLoading(state: boolean) {
        this.isLoading.next(state);
    }

    handleMouseEnter(eventInfo: any) {
        const eventElement = eventInfo.el;
        eventElement.style.zIndex = '100';
        eventElement.classList.add('event-hover');
    }

    handleMouseLeave(eventInfo: any) {
        const eventElement = eventInfo.el;
        eventElement.style.zIndex = '';
        eventElement.classList.remove('event-hover');
    }

    ngOnInit(): void {
        this.infos = [
            {
                icon: 'pi pi-book text-green-500 text-xl',
                header: 'Courses', value: 152, color: 'bg-green-100',
                highlight: '24% ', fin: '% are assigned', width: 'lg:col-3 xl:col-3'
            },
            {
                icon: 'pi pi-check-circle text-orange-500 text-xl',
                header: 'Collisions', value: 5, color: 'bg-orange-100',
                highlight: '3', fin: ' Courses are affected', width: 'lg:col-3 xl:col-3'
            },
            {
                icon: 'pi pi-comments text-cyan-500 text-xl',
                header: 'Last Change',
                value: 'Course PS Lineare Algebra - Group 3 was moved to room 3W04', color: 'bg-cyan-100',
                highlight: 'Elias', fin: ' made the change', width: 'lg:col-6 xl:col-6'
            }
        ]
    }

    ngAfterViewInit(): void {
        this.clearCalendar();
        this.calendarContextMenu.calendarComponent = this.calendar;
    }
}
