import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '@/src/app/demo/api/product';
import { ProductService } from '@/src/app/demo/service/product.service';

@Component({
    standalone:true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        RippleModule,
    ],
    template: `<div class="card">
        <h5>Recent Sales</h5>
        <p-table [value]="products" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template pTemplate="header">
                <tr>
                    <th>Image</th>
                    <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                    <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                    <th>View</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr>
                    <td style="width: 15%; min-width: 5rem;">
                        <img src="assets/demo/images/product/{{product.image}}" class="shadow-4" alt="{{product.name}}" width="50">
                    </td>
                    <td style="width: 35%; min-width: 7rem;">{{product.name}}</td>
                    <td style="width: 35%; min-width: 8rem;">{{product.price | currency:'USD'}}</td>
                    <td style="width: 15%;">
                        <button pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
})
export class RecentSalesWidget {
    products!: Product[];


    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
    }
}
