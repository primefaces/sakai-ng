import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import {EventInput} from "@fullcalendar/core";
import {Draggable} from "@fullcalendar/interaction";

@Component({
  selector: 'app-editor-selection',
  templateUrl: './editor-selection.component.html',
})
export class EditorSelectionComponent implements AfterViewInit, OnDestroy{
    @Input() currentDragEvents!: EventInput[];
    draggable!: Draggable;

    @Output() triggerSave = new EventEmitter<void>;
    @ViewChild('external') external!: ElementRef;

    constructor() {}

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
