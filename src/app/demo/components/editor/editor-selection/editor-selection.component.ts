import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy, OnInit,
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
    @Input() private currentDragEvents!: EventInput[];
    protected filteredDragEvents;
    private draggable!: Draggable;
    protected searchTerm: string = '';

    @Output() triggerSave = new EventEmitter<boolean>;
    @ViewChild('external') external!: ElementRef;

    constructor() {}

    protected triggerFinish(){
        this.triggerSave.emit(true);
    }

    filterEvents(): void {
        const term = this.searchTerm.toLowerCase();
        this.filteredDragEvents = this.currentDragEvents.filter(event =>
            event.title.toLowerCase().includes(term)
        );
    }


    ngOnInit(): void {
        this.filteredDragEvents = [...this.currentDragEvents];
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
                        computersNecessary: eventEl.getAttribute('data-hasComputers')
                    },
                };
            }
        });
    }

    ngOnDestroy(): void {
        this.draggable.destroy()
    }
}
