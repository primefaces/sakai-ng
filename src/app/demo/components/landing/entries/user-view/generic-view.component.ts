import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../../../../layout/service/app.layout.service";
import {Router} from "@angular/router";
import {Course} from "../../../../../../assets/models/course";
import {Room} from "../../../../../../assets/models/room";
import {Userx} from "../../../../../../assets/models/userx";
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {UserService} from "../api/user.service";
import {CourseService} from "../api/course.service";
import {RoomService} from "../api/room.service";
import {DialogService} from "primeng/dynamicdialog";
import {Observable, of} from "rxjs";

type Item = Course | Room | Userx;

@Component({
  selector: 'app-user-view',
  templateUrl: './generic-view.component.html',
  styleUrl: './generic-view.component.scss'
})
export class GenericViewComponent implements OnInit, OnDestroy{
    protected readonly item: string; //'user' | 'course | 'room'
    private itemService!: ItemService<Item>;

    protected readonly headers: any[];
    protected selectedHeaders: any[];
    protected items: Item[] = [new Course()];

    protected selectedItem: Item | null = null;
    protected newItem: Item | null = null;

    protected loading: Observable<boolean> = of(false);

    constructor(
        private layoutService: LayoutService,
        private dialogService: DialogService,
        protected router: Router
    ) {
        this.item = this.getItemType();
        this.itemService = this.assign();
        this.headers = this.getSpecificHeaders();
    }

    showCreateDialog(){
        const dialog = this.itemService.getItemDialog();
        this.dialogService.open(dialog, {
            header: `Create ${this.item.toUpperCase()}`,
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: false
        })
    }

    getItemType(): string{
        return this.router.url.split('/')[2].slice(0, -4);
    }

    assign(): ItemService<Item> {
        switch (this.item) {
            case 'user':
                return new UserService();
            case 'course':
                return new CourseService();
            case 'room':
                return new RoomService();
            default:
                throw new Error(`Unsupported item type: ${this.item}`);
        }
    }

    private getSpecificHeaders(){
        const newHeaders = this.itemService.getTableHeader()
        this.selectedHeaders = newHeaders;
        return newHeaders;
    };

    ngOnInit(): void {
        this.layoutService.handleMenuBar(true);
    }

    ngOnDestroy(): void {
        this.layoutService.handleMenuBar(false);
    }
}
