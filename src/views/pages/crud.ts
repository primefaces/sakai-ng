import {Component, inject, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import {Table, TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {SelectModule} from 'primeng/select';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import { Product, ProductService } from '@/src/service/product.service';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule
  ],
  template: `<div class="grid">
    <div class="col-12">
      <div class="card px-6 py-6">
        <p-toast></p-toast>
        <p-toolbar styleClass="mb-4">
          <ng-template #left>
            <div class="my-2">
              <button pButton pRipple severity="success" class="mr-2" (click)="openNew()">
                <i pButtonIcon class="pi plus mr-2"></i>
                <span pButtonLabel>New</span>
              </button>
              <button pButton pRipple severity="danger" (click)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length">
                <i pButtonIcon class="pi pi-trash mr-2"></i>
                <span pButtonLabel>Delete</span>
              </button>
            </div>
          </ng-template>

          <ng-template #right>
            <p-fileupload mode="basic" accept="image/*" [maxFileSize]="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block"></p-fileupload>
            <button pButton pRipple severity="help" (click)="dt.exportCSV()">
              <i pButtonIcon class="pi upload"></i>
              <span pButtonLabel>Export</span>
            </button>
          </ng-template>
        </p-toolbar>

        <p-table #dt [value]="products" [columns]="cols" responsiveLayout="scroll" [rows]="10" [globalFilterFields]="['name','country.name','representative.name','status']" [paginator]="true" [rowsPerPageOptions]="[10,20,30]" [showCurrentPageReport]="true" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" [(selection)]="selectedProducts" selectionMode="multiple" [rowHover]="true" dataKey="id">
          <ng-template #caption>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">Manage Products</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..."  class="w-full sm:w-auto"/>
                        </span>
            </div>
          </ng-template>
          <ng-template #header>
            <tr>
              <th style="width: 3rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
              </th>
              <th pSortableColumn="code">Code <p-sortIcon field="code"></p-sortIcon></th>
              <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
              <th>Image</th>
              <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
              <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
              <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
              <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
              <th></th>
            </tr>
          </ng-template>
          <ng-template #body let-product>
            <tr>
              <td>
                <p-tableCheckbox [value]="product"></p-tableCheckbox>
              </td>
              <td style="width:14%; min-width:10rem;"><span class="p-column-title">Code</span>
                {{product.code || product.id}}
              </td>
              <td style="width:14%; min-width:10rem;">
                <span class="p-column-title">Name</span>
                {{product.name}}
              </td>
              <td style="width:14%; min-width:10rem;"><span class="p-column-title">Image</span>
                <img [src]="'assets/demo/images/product/' + product.image" [alt]="product.name" width="100" class="shadow-4" />
              </td>
              <td style="width:14%; min-width:8rem;">
                <span class="p-column-title">Price</span>
                {{product.price | currency:'USD'}}
              </td>
              <td style="width:14%; min-width:10rem;">
                <span class="p-column-title">Category</span>
                {{product.category}}
              </td>
              <td style="width:14%; min-width: 10rem;"><span class="p-column-title">Reviews</span>
                <p-rating [ngModel]="product.rating" [readonly]="true"></p-rating>
              </td>
              <td style="width:14%; min-width: 10rem;"><span class="p-column-title">Status</span>
                <span [class]="'product-badge status-' + (product.inventoryStatus ? product.inventoryStatus.toLowerCase() : '')">{{product.inventoryStatus}}</span>
              </td>
              <td>
                <div class="flex">
                  <button pButton pRipple severity="success" [rounded]="true" class="mr-2" (click)="editProduct(product)">
                    <i pButtonIcon class="pi pi-pencil"></i>
                  </button>
                  <button pButton pRipple severity="warn" [rounded]="true" (click)="deleteProduct(product)">
                    <i pButtonIcon class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <p-dialog [(visible)]="productDialog" [style]="{width: '450px'}" header="Product Details" [modal]="true" class="p-fluid">
        <ng-template #content>
          <img [src]="'assets/demo/images/product/' + product.image" [alt]="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" *ngIf="product.image">
          <div class="field">
            <label for="name">Name</label>
            <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus [ngClass]="{'ng-invalid ng-dirty' : submitted && !product.name}"/>
            <small class="ng-dirty ng-invalid" *ngIf="submitted && !product.name">Name is required.</small>
          </div>
          <div class="field">
            <label for="description">Description</label>
            <textarea id="description" pTextarea [(ngModel)]="product.description" required rows="3" cols="20"></textarea>
          </div>
          <div class="field">
            <label for="status">Inventory Status</label>
            <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" optionValue="label" [options]="statuses" placeholder="Select">
              <ng-template #selectedItem>
                <span *ngIf="product && product.inventoryStatus" [class]="'product-badge status-' + product.inventoryStatus.toString().toLowerCase()">{{product.inventoryStatus}}</span>
              </ng-template>
              <ng-template let-option #item>
                <span [class]="'product-badge status-' + option.value">{{option.label}}</span>
              </ng-template>
            </p-select>
          </div>

          <div class="field">
            <label class="mb-3">Category</label>
            <div class="formgrid grid">
              <div class="field-radiobutton col-6">
                <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="product.category"></p-radiobutton>
                <label for="category1">Accessories</label>
              </div>
              <div class="field-radiobutton col-6">
                <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="product.category"></p-radiobutton>
                <label for="category2">Clothing</label>
              </div>
              <div class="field-radiobutton col-6">
                <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="product.category"></p-radiobutton>
                <label for="category3">Electronics</label>
              </div>
              <div class="field-radiobutton col-6">
                <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="product.category"></p-radiobutton>
                <label for="category4">Fitness</label>
              </div>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="price">Price</label>
              <p-inputnumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US"></p-inputnumber>
            </div>
            <div class="field col">
              <label for="quantity">Quantity</label>
              <p-inputnumber id="quantity" [(ngModel)]="product.quantity"></p-inputnumber>
            </div>
          </div>
        </ng-template>

        <ng-template #footer>
          <button pButton pRipple [text]="true" (click)="hideDialog()">
            <i pButtonIcon class="pi times mr-2"></i>
            <span pButtonLabel>Cancel</span>
          </button>
          <button pButton pRipple [text]="true" (click)="saveProduct()">
            <i pButtonIcon class="pi pi-check mr-2"></i>
            <span pButtonLabel>Save</span>
          </button>
        </ng-template>
      </p-dialog>

      <p-dialog [(visible)]="deleteProductDialog" header="Confirm" [modal]="true" [style]="{width:'450px'}">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
          <span *ngIf="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
        </div>
        <ng-template #footer>
          <button pButton pRipple [text]="true" (click)="deleteProductDialog = false">
            <i pButtonIcon class="pi pi-times mr-2"></i>
            <span pButtonLabel>No</span>
          </button>
          <button pButton pRipple [text]="true" (click)="confirmDelete()">
            <i pButtonIcon class="pi pi-check mr-2"></i>
            <span pButtonLabel>Yes</span>
          </button>
        </ng-template>
      </p-dialog>

      <p-dialog [(visible)]="deleteProductsDialog" header="Confirm" [modal]="true" [style]="{width:'450px'}">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
          <span>Are you sure you want to delete selected products?</span>
        </div>
        <ng-template #footer>
          <button pButton pRipple [text]="true" (click)="deleteProductsDialog = false">
            <i pButtonIcon class="pi pi-times mr-2"></i>
            <span pButtonLabel>No</span>
          </button>
          <button pButton pRipple [text]="true" (click)="confirmDeleteSelected()">
            <i pButtonIcon class="pi pi-check mr-2"></i>
            <span pButtonLabel>Yes</span>
          </button>
        </ng-template>
      </p-dialog>
    </div>
  </div>
  `,
  providers: [MessageService]
})
export class Crud implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  private messageService = inject(MessageService);

  private productService = inject(ProductService);

  ngOnInit() {
    this.productService.getProducts().then(data => this.products = data);

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter(val => val.id !== this.product.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.product = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.code = this.createId();
        this.product.image = 'product-placeholder.svg';
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
