import {Component, OnInit} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {getDegreeOptions} from "../../../../../assets/models/enums/study-type";
import {EventImpl} from "@fullcalendar/core/internal";
import {MenuItem} from "primeng/api";

type FilterType = 'type' | 'semester' | 'studyType';

@Component({
  selector: 'app-calendar-context-menu',
  templateUrl: './calendar-context-menu.component.html',
})
export class CalendarContextMenuComponent implements OnInit{
    private _calendarComponent!: FullCalendarComponent;
    contextItems: MenuItem[] = [];

    tmpRenderSelection : EventImpl[] = [];
    tmpColorSelection : EventImpl[] = [];

    constructor(
    ) { }

    removeType(type: FilterType, value: string) {
        const events = this._calendarComponent.getApi().getEvents();
        let newItems: EventImpl[];

        switch (type) {
            case "semester":
            case "studyType": {
                newItems = events.filter(e => e.extendedProps[type].toString() !== value);
                break;
            }
            case "type": {
                newItems = events.filter(e => e.extendedProps[type].toString() === value);
                break;
            }
        }

        if (newItems && newItems.length) {
            this.tmpRenderSelection = this.tmpRenderSelection.concat(newItems);
            newItems.forEach(e => e.setProp('display', 'none'));
        }
    }


    showAllEvents(){
        this.tmpRenderSelection.forEach(e => {
            e.setProp('display','auto');
        });

        this.tmpRenderSelection = [];
    }

    colorEventType(type: string, color: string){
        let newItems = this._calendarComponent.getApi().getEvents()
            .filter(e => e.extendedProps['type'] === type);

        this.tmpColorSelection = this.tmpColorSelection.concat(newItems);
        newItems.forEach(e => e.setProp('backgroundColor', color));
    }

    clearEvents(){
        this.tmpColorSelection
            .forEach(e => {
                e.setProp('backgroundColor', '#666666');
            });

        this.tmpColorSelection = [];
    }

    resetAllChanges(){
        this.clearEvents();
        this.showAllEvents();
    }

    ngOnInit(): void {
        this.contextItems = [
            {
                label: 'Remove Groups',
                icon: 'pi pi-filter',
                items: [
                    {
                        label: 'VO',
                        command: () => this.removeType('type', 'VO') },
                    { label: 'VU',
                        command: () => this.removeType('type', 'VU') },
                    { label: 'PS',
                        command: () => this.removeType('type', 'PS') },
                    { label: 'SE',
                        command: () => this.removeType('type', 'SE') },
                    { label: 'SL',
                        command: () => this.removeType('type', 'SL')},
                    { label: 'PR',
                        command: () => this.removeType('type', 'PR') },
                    { label: 'Clear',
                        icon: 'pi pi-trash',
                        command: () => this.showAllEvents()
                    },
                ],
            },
            {
                label: 'Highlight Groups',
                icon: 'pi pi-filter-fill',
                items: [
                    {
                        label: 'VO',
                        command: () => this.colorEventType('VO', '#C36049') },
                    { label: 'VU',
                        command: () => this.colorEventType('VU', '#985F53') },
                    { label: 'PS',
                        command: () => this.colorEventType('PS', '#ED5432') },
                    { label: 'SE',
                        command: () => this.colorEventType('SE', '#6E544E') },
                    { label: 'SL',
                        command: () => this.colorEventType('SL', '#433C3B')},
                    { label: 'PR',
                        command: () => this.colorEventType('PR', '#332927') },
                    { label: 'Clear',
                        icon: 'pi pi-trash',
                        command: () => this.clearEvents()
                    },
                ],
            },
            {
                label: 'Semester Filter',
                icon: 'pi pi-flag',
                items: [
                    ...Array.from({ length: 6 }, (_, i) => ({
                        label: (i + 1).toString(),
                        command: () => this.removeType('semester', String(i + 1))
                    }))
                ]
            },
            {
                label: 'Study Type Filter',
                icon: 'pi pi-flag-fill',
                items: [
                    ...getDegreeOptions()
                        .map(value => ({
                            label: value,
                            command: () => this.removeType('studyType', value.toString())
                        }))
                ]
            },
            {
                label: 'Reset',
                icon: 'pi pi-sync',
                command: () => this.resetAllChanges()
            }
        ];
    }

    set calendarComponent(value: FullCalendarComponent) {
        this._calendarComponent = value;
    }
}
