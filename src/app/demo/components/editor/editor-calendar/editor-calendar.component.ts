import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    signal,
    ViewChild,
    WritableSignal
} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarOptions, EventInput, EventMountArg} from "@fullcalendar/core";
import interactionPlugin, {DropArg} from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {MenuItem, MessageService} from "primeng/api";
import {RoomTable} from "../../../../../assets/models/room-table";
import {Observable, Subscription} from "rxjs";
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";

@Component({
  selector: 'app-editor-calendar',
  templateUrl: './editor-calendar.component.html',
})
export class EditorCalendarComponent implements OnInit, OnDestroy{
    @ViewChild("cal") calendar!: FullCalendarComponent;
    @Output() setDirtyBool = new EventEmitter<boolean>();
    @Input() allEvents: EventInput[] = [];

    @Input() selectedRoom$!: Observable<RoomTable>;
    roomSub: Subscription;
    room: RoomTable;

    items: MenuItem[] = [];
    private rightClickEvent: EventMountArg | null;

    protected calendarOptions: WritableSignal<CalendarOptions> = signal({
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
        dragScroll: true,
        height: '70vh',
        eventBackgroundColor: '#666666',
        eventBorderColor: '#050505',
        eventTextColor: 'var(--sys-color-primary-white)',
        slotMinTime: '08:00:00',
        slotMaxTime: '22:00:00',
        slotDuration: '00:15:00',
        slotLabelInterval: '00:30:00',
        dayHeaderFormat: {weekday: 'long'},
        eventOverlap: true,
        slotEventOverlap: true,
        nowIndicator: false,
        drop: this.drop.bind(this),
        eventReceive: this.eventReceive.bind(this),
        eventChange: this.eventChange.bind(this),
        eventAllow: this.eventAllow.bind(this),
        eventDidMount: this.eventDidMound.bind(this),
    });

    constructor(
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.roomSub = this.selectedRoom$?.subscribe(r => {
            this.clearCalendar();
            this.room = r
        })
    }

    private drop(arg: DropArg) {
        const participants = Number(arg.draggedEl.getAttribute('data-participants'));
        const needsComputers = Boolean(arg.draggedEl.getAttribute('data-hasComputers'));

        if(this.checkNrOfParticipants(participants)){
            this.messageService.add({
                severity: 'error', life: 5000,
                summary: 'ROOM CAPACITY  COLLISION',
                detail: `The selected course (${arg.draggedEl.getAttribute('data-title')}) has to many participants (${participants}) for the selected room(${this.room?.capacity})`});
        } else if (this.checkIfComputersNeeded(needsComputers)){
            this.messageService.add({
                severity: 'error', life: 5000,
                summary: 'COMPUTER  COLLISION',
                detail: `The selected course (${arg.draggedEl.getAttribute('data-title')}) needs computers which are not supported by the current room`});
        } else {
            const draggedElement = arg.draggedEl;

            if (draggedElement && draggedElement.parentNode) {
                draggedElement.parentNode.removeChild(draggedElement);
            }
            this.setDirtyBool.emit(true);
        }
    }

    private eventReceive(args: any){
        const participants = args.event.extendedProps['nrOfParticipants'];
        const needsComputers = args.event.extendedProps['computersNecessary'];

        if(this.checkNrOfParticipants(participants) || this.checkIfComputersNeeded(needsComputers)){
            args.revert();
        } else {
            this.setDirtyBool.emit(true);
        }
    }

    private checkNrOfParticipants(nrOfParticipants: number):boolean{
        const roomCapacity = this.room.capacity;
        return (nrOfParticipants >= roomCapacity);
    }

    private checkIfComputersNeeded(needsComputers: boolean): boolean {
        //TODO fix allow drop of course
        console.log('needs a computer: ', needsComputers);
        const hasComputers = this.room.computersAvailable;

        console.log('has a computer: ', hasComputers);
        console.log('allow drop: ', !(!hasComputers && needsComputers));
        return !(!hasComputers && needsComputers);

    }

    private eventChange(){
        this.setDirtyBool.emit(true);
    }

    private eventAllow(args: any): boolean {
        const startHour = args.start.getHours();
        const startMinutes = args.start.getMinutes();

        const isBefore815AM = startHour < 8 || (startHour === 8 && startMinutes < 15);
        const isAfter10PM = args.end.getHours() >= 22;

        return !isBefore815AM && !isAfter10PM;
    }

    private eventDidMound(arg: EventMountArg){
        arg.el.addEventListener("contextmenu", (jsEvent)=>{
            jsEvent.preventDefault()
            this.rightClickEvent = arg;
        })
    }

    private clearCalendar(){
        this.calendar?.getApi().removeAllEvents();
    }

    getItemMenuOptions() : void {
        this.items = [{label: 'add new Course', icon: 'pi pi-book', command: () => {} /*this.addNewCourse()*/ }];
        if(!this.rightClickEvent?.event.id){
            return;
        }

        const session = this.findSession()
        this.items.push(
            { label: session!.fixed ? 'free Course' : 'fix Course', icon: session!.fixed ? 'pi pi-unlock':'pi pi-lock', command: () => { /*this.changeSessionBlockState()*/ }},
            { label: 'unassign Course', icon: 'pi pi-reply', command: () => { /*this.unassignCourse()*/ } },
            { label: 'remove Group', icon: 'pi pi-delete-left', command: ()=> { /*this.deleteCourse()*/}}
        )

        const tmp = session!.name.slice(0, 2);
        this.items.push((tmp == 'PS' || tmp == 'SL') ?
            { label: 'add Group', icon: 'pi pi-plus-circle', command: ()=> { /*this.addCourseWithPsCharacter()*/ } }
            : { label: 'split Course', icon: 'pi pi-arrow-up-right-and-arrow-down-left-from-center', disabled: true }
        )
    }

    onMenuHide(){
        this.rightClickEvent = null;
    }

    private findSession():CourseSession  | undefined{
        //return this.timeTable.courseSessions.find(s => s.id.toString() === this.rightClickEvent!.event.id.toString());
        return undefined;
    }

    ngOnDestroy(): void {
        if(this.roomSub) this.roomSub.unsubscribe();
    }
}
