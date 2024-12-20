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
    templateUrl: './generic-view.component.html'
})
export class GenericViewComponent implements OnInit, OnDestroy{
    protected readonly item: string; //'user' | 'course | 'room'
    private itemService!: ItemService<Item>;

    protected readonly headers: any[];
    protected selectedHeaders: any[];

    protected items!: Item[];
    protected selectedItems!: Item[];
    protected selectedItem! : Item;

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

    showCreateDialog(item: Item | null){
        const dialog = this.itemService.getItemDialog();
        const ref = this.dialogService.open(dialog, {
            header: `Create ${this.item.toUpperCase()}`,
            contentStyle: { overflow: 'auto' },
            width: '50%',
            baseZIndex: 10000,
            maximizable: false,
            data: { initialValue: item }
        })

        ref.onClose.subscribe((result) => {
            //if an item is set I want to update it
            if (result) this.saveItem(result, !!item)
        });
    }


    private loadItemList(): Item[] {
        return this.itemService.getAllItems();
    }

    private saveItem(item: Item, update: boolean): void {
        if(update){
            this.itemService.updateSingeItem(item);
        } else {
            this.itemService.createSingeItem(item);
            this.items.push(item);
        }
    }

    deleteSingeItem(item: Item):void{
        const allow = this.itemService.deleteSingleItem(item);
        if (allow) this.items = this.items.filter(i => i.id !== item.id)
    }

    deleteSelection(){
        const ableToDelete = this.itemService.deleteMultipleItem(this.selectedItems);
        if (ableToDelete){
            this.items = this.items.filter(i => !this.selectedItems.includes(i));
        }
    }

    ngOnInit(): void {
        this.layoutService.handleMenuBar(true);
        this.items = this.loadItemList();
    }

    ngOnDestroy(): void {
        this.layoutService.handleMenuBar(false);
    }
}
