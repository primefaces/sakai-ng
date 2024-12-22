import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {EventInput} from "@fullcalendar/core";
import {Draggable} from "@fullcalendar/interaction";

@Component({
  selector: 'app-editor-selection',
  templateUrl: './editor-selection.component.html',
})
export class EditorSelectionComponent implements AfterViewInit, OnDestroy{
    dragTableEvents: EventInput[] = [
        {id: '123', title: 'eliakas das dnasoid asdn asdnasd pnn dasd nasd', extendedProps: {duration: 180}} as EventInput,
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
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
        {id: '123', title: 'eli', extendedProps: {duration: 180}} as EventInput,
    ];

    draggable!: Draggable;
    @ViewChild('external') external!: ElementRef;


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
