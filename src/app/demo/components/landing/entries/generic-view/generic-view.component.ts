import {Component, OnInit} from '@angular/core';
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
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

type Item = Course | Room | Userx;

@Component({
    selector: 'app-user-view',
    templateUrl: './generic-view.component.html'
})
export class GenericViewComponent implements OnInit{
    protected readonly item: string; //'user' | 'course | 'room'
    private itemService!: ItemService<Item>;

    protected filterFields: string[] = [];
    protected readonly headers: any[];
    protected selectedHeaders: any[];
    protected nrOfSkeletons: number;

    protected items!: Item[];
    protected selectedItems!: Item[];

    protected loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    protected loading$: Observable<boolean> = this.loadingSub.asObservable();

    constructor(
        private messageService: MessageService,
        private layoutService: LayoutService,
        private dialogService: DialogService,
        protected router: Router,
        private http: HttpClient,
    ) {
        this.item = this.getItemType();
        this.itemService = this.assign();
        this.headers = this.getSpecificHeaders();
        this.filterFields = this.getGlobalFilterFields();
        this.nrOfSkeletons = this.headers.length;
    }

    getItemType(): string{
        return this.router.url.split('/')[2].slice(0, -4);
    }

    assign(): ItemService<Item> {
        switch (this.item) {
            case 'user':
                return new UserService(this.http);
            case 'course':
                return new CourseService(this.http);
            case 'room':
                return new RoomService(this.http);
            default:
                throw new Error(`Unsupported item type: ${this.item}`);
        }
    }

    private getGlobalFilterFields(){
        return this.itemService.getTableHeader();
    };

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
            data: { initialValue: { ...item } } //copy the object so changes are not shown on table
        })

        ref.onClose.subscribe((result) => {
            //if an item is set I want to update it
            if (result) this.saveItem(result, !!item).then();
        });
    }


    private async loadItemList(): Promise<Item[]> {
        this.loadingSub.next(true);
        return firstValueFrom(this.itemService.getAllItems());
    }

    private async saveItem(item: Item, update: boolean): Promise<void> {
        if(update){
            const updatedItem = await this.itemService.updateSingeItem(item);
            const oldItemIdx = this.items.findIndex(i => i.id = updatedItem['id'])
            this.items[oldItemIdx] = updatedItem;
            this.messageService.add({
                severity: 'success',
                summary: `UPDATED ${this.item.toUpperCase()}`,
            });
        } else {
            const newItem = await this.itemService.createSingeItem(item);
            this.items.push(newItem);
            this.messageService.add({
                severity: 'success',
                summary: `ADDED NEW ${this.item.toUpperCase()}`,
            });
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

    async ngOnInit() {
        this.layoutService.changeStyle(false);
        this.items = await this.loadItemList();
        this.loadingSub.next(false);
    }

    protected readonly Array = Array;
}
