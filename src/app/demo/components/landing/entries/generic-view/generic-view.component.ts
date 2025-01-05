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
import {ConfirmationService, MessageService} from "primeng/api";

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
        private confirmationService: ConfirmationService
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
        update ? this.updateItem(item) : this.saveNewItem(item);
    }

    private saveNewItem(item: Course | Room | Userx) {
        this.itemService.createSingeItem(item)
            .then(newItem => {
                this.items.push(newItem);
                this.messageService.add({
                    severity: 'success',
                    summary: `ADDED NEW ${this.item.toUpperCase()}`,
                });
            })
            .catch(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Reject',
                        detail: `We had problems by editing the ${this.item}`,
                        life: 3000
                    });
                }
            );
    }

    private updateItem(item: Item) {
        this.itemService.updateSingeItem(item)
            .then(updatedItem => {
                const oldItemIdx = this.items.findIndex(i => i.id = updatedItem['id'])
                this.items[oldItemIdx] = updatedItem;
                this.messageService.add({
                    severity: 'success',
                    summary: `UPDATED ${this.item.toUpperCase()}`,
                });
            })
            .catch(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Reject',
                        detail: `We had problems by editing the ${this.item}`,
                        life: 3000
                    });
                }
            );
    }

    protected deleteSingeItem(event: Event, item: Item):void{
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Are you sure you want to delete the ${this.item}?`,
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.itemService.deleteSingleItem(item)
                    .then(() => {
                        this.items = this.items.filter(i => i.id !== item.id)
                        this.messageService.add({
                            severity: 'info',
                            summary: `DELETED ${this.item.toUpperCase()}`,
                            detail: `The selected ${this.item} was deleted`,
                            life: 3000 });
                    })
                    .catch(() => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Reject',
                            detail: `We had problems by deleting the ${this.item}`,
                            life: 3000 });
                    });

            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'REJECT',
                    detail: 'You have rejected',
                    life: 3000 });
            }
        });
    }

    protected deleteSelection(){
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selection?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.itemService.deleteMultipleItem(this.selectedItems)
                    .then(() => {
                            this.items = this.items.filter(i => !this.selectedItems.includes(i))
                            this.messageService.add({
                                severity: 'warning',
                                summary: 'Confirmed',
                                detail: 'Request submitted',
                                life: 3000
                            });
                        }
                    );

            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Rejected',
                    detail: 'Process incomplete',
                    life: 3000 });
            },
            key: 'positionDialog'
        });
    }

    async ngOnInit() {
        this.layoutService.changeStyle(false);
        this.items = await this.loadItemList();
        this.loadingSub.next(false);
    }

    protected readonly Array = Array;
}
