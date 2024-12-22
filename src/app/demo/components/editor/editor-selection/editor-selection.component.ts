import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {EventInput} from "@fullcalendar/core";
import {Draggable} from "@fullcalendar/interaction";

@Component({
  selector: 'app-editor-selection',
  templateUrl: './editor-selection.component.html',
})
export class EditorSelectionComponent implements AfterViewInit, OnDestroy{
    @ViewChild('external') external!: ElementRef;

    dragTableEvents: EventInput[] = [
        {id: '123', title: 'this is quite a long text but not long enough so i type even more', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 120}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 80}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
    ];

    draggable!: Draggable;

    constructor() {
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
                };
            }
        });
    }

    ngOnDestroy(): void {
        this.draggable.destroy()
    }
}
