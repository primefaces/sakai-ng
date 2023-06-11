import { Component, OnInit } from '@angular/core';
import { SelectItem, SharedModule } from 'primeng/api';
import { DataView, DataViewModule } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    templateUrl: './listdemo.component.html',
    standalone: true,
    imports: [DataViewModule, SharedModule, DropdownModule, InputTextModule, RatingModule, FormsModule, ButtonModule, PickListModule, OrderListModule]
})
export class ListDemoComponent implements OnInit {

    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

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

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
    
}
