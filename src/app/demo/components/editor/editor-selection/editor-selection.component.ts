import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {EventInput} from "@fullcalendar/core";
import {Draggable} from "@fullcalendar/interaction";

@Component({
  selector: 'app-editor-selection',
  templateUrl: './editor-selection.component.html',
})
export class EditorSelectionComponent implements OnInit, AfterViewInit, OnDestroy{
    @Input() currentDragEvents!: EventInput[];
    @Output() triggerSave = new EventEmitter<void>;
    @ViewChild('external') external!: ElementRef;

    dragTableEvents: EventInput[] = [
        {id: '123', title: 'this is quite a long text but not long enough so i type even more', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'participants: 20, computersNecessary: false', extendedProps: {duration: 120, computersNecessary: false, nrOfParticipants: 20}} as EventInput,
        {id: '123', title: 'participants: 0, computersNecessary: true', extendedProps: {duration: 180, computersNecessary: true, nrOfParticipants: 0}} as EventInput,
    ];

    draggable!: Draggable;

    constructor() {
    }

    ngOnInit(): void {
    }

    protected triggerFinish(){
        this.triggerSave.emit();
    }

    ngAfterViewInit(): void {
        this.draggable = new Draggable(this.external.nativeElement, {
            itemSelector: '.drag-event',
            eventData: (eventEl) => {
                return {
                    id: eventEl.getAttribute('data-id'),
                    title: eventEl.getAttribute('data-title'),
                    duration: eventEl.getAttribute('data-duration'),
                    editable: true,
                    extendedProps: {
                        nrOfParticipants: eventEl.getAttribute('data-participants'),
                        computersNecessary: eventEl.getAttribute('data-needscomputers')
                    },
                };
            }
        });
    }

    ngOnDestroy(): void {
        this.draggable.destroy()
    }
}
