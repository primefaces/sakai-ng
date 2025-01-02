import { Component } from '@angular/core';
import { ProductService } from '@/src/app/demo/service/product.service';
import { Product } from '@/src/app/demo/api/product';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone:true,
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule],
    template: `
        <div class="flex flex-col">
            <div class="card">
                <div class="font-semibold text-xl">DataView</div>
                <p-dataview [value]="products" [layout]="layout">
                    <ng-template #header>
                        <div class="flex justify-end">
                            <p-select-button [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                                <ng-template #option let-option>
                                    <i [ngClass]="{'pi pi-bars': option === 'list', 'pi pi-table': option === 'grid'}"></i>
                                </ng-template>
                            </p-select-button>
                        </div>
                    </ng-template>

                    <ng-template #list let-items>
                        <div class="flex flex-col">
                            <div *ngFor="let item of items; let i = index">
                                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                                     [ngClass]="{ 'border-t border-surface': i !== 0 }">
                                    <div class="md:w-40 relative">
                                        <img class="block xl:block mx-auto rounded w-full"
                                             [src]="https://primefaces.org/cdn/primevue/images/product/{{item.image}}"
                                             [alt]="item.name" />
                                        <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)"
                                             class="absolute dark:!bg-surface-900" [style]="left: 4px; top: 4px"></p-tag>
                                    </div>
                                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                            <div>
                                                <span
                                                    class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                            </div>
                                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                                <div
                                                    class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                    style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                                >
                                                    <span
                                                        class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col md:items-end gap-8">
                                            <span class="text-xl font-semibold">{{ item.price }}</span>
                                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                                <p-button icon="pi pi-heart" [outlined]="true"></p-button>
                                                <p-button icon="pi pi-shopping-cart" label="Buy Now"
                                                        [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                                                        styleClass="flex-auto md:flex-initial whitespace-nowrap"></p-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>

                    <ng-template #grid let-items>
                        <div class="grid grid-cols-12 gap-4">
                            <div *ngFor="let item of items; let i = index">
                                 class="col-span-12 sm:col-span-6 lg:col-span-4 p-2">
                                <div
                                    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                    <div class="bg-surface-50 flex justify-center rounded p-4">
                                        <div class="relative mx-auto">
                                            <img class="rounded w-full"
                                                 [src]="https://primefaces.org/cdn/primevue/images/product/{{item.image}}"
                                                 [alt]="item.name" style="max-width: 300px" />
                                            <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)"
                                                 class="absolute dark:!bg-surface-900"
                                                 [style]="left: 4px; top: 4px"></p-tag>
                                        </div>
                                    </div>
                                    <div class="pt-6">
                                        <div class="flex flex-row justify-between items-start gap-2">
                                            <div>
                                                <span
                                                    class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                                <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                                            </div>
                                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                                <div
                                                    class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                    style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                                >
                                                    <span
                                                        class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-6 mt-6">
                                            <span class="text-2xl font-semibold">{{ item.price }}</span>
                                            <div class="flex gap-2">
                                                <p-button icon="pi pi-shopping-cart" label="Buy Now"
                                                        [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                                                        class="flex-auto whitespace-nowrap"></p-button>
                                                <p-button icon="pi pi-heart" [outlined]="true"></p-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                </p-dataview>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <div class="lg:w-2/3">
                    <div class="card">
                        <div class="font-semibold text-xl mb-4">PickList</div>
                        <p-pick-list [source]="sourceCities"  [target]="targetCities" breakpoint="1400px">
                            <ng-template #item let-item>
                                {{ item.name }}
                            </ng-template>
                        </p-pick-list>
                    </div>
                </div>

                <div class="lg:w-1/3">
                    <div class="card">
                        <div class="font-semibold text-xl mb-4">OrderList</div>
                        <p-orderList [value]="orderCities" header="Cities" [dragdrop]="true"
                                     [listStyle]="{'height':'250px'}">
                            <ng-template let-city #item>
                                <div>{{ city.name }}</div>
                            </ng-template>
                        </p-orderList>
                    </div>
                </div>
            </div>
        </div>`,
})
export class ListDoc {

    layout: 'list' | 'grid' = 'list';

    options = ['list', 'grid'];

    products: Product[] = [];

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

    }


    getSeverity(product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }
}
