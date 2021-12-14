import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Customer, Representative} from '../domain/customer';
import {CustomerService} from '../service/customerservice';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {Table} from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api'

@Component({
    templateUrl: './tabledemo.component.html',
    styleUrls: ['./tabledemo.scss'],
    styles: [`
        :host ::ng-deep .p-datatable-gridlines p-progressBar {
            width: 100%;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {

    customers1: Customer[];

    customers2: Customer[];

    customers3: Customer[];

    selectedCustomers1: Customer[];

    selectedCustomer: Customer;

    representatives: Representative[];

    statuses: any[];

    products: Product[];

    rowGroupMetadata: any;

    expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    @ViewChild('dt') table: Table;

    constructor(private customerService: CustomerService, private productService: ProductService, private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            {name: 'Amy Elsner', image: 'amyelsner.png'},
            {name: 'Anna Fali', image: 'annafali.png'},
            {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
            {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
            {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
            {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
            {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
            {name: 'Onyama Limba', image: 'onyamalimba.png'},
            {name: 'Stephen Shaw', image: 'stephenshaw.png'},
            {name: 'XuXue Feng', image: 'xuxuefeng.png'}
        ];

        this.statuses = [
            {label: 'Unqualified', value: 'unqualified'},
            {label: 'Qualified', value: 'qualified'},
            {label: 'New', value: 'new'},
            {label: 'Negotiation', value: 'negotiation'},
            {label: 'Renewal', value: 'renewal'},
            {label: 'Proposal', value: 'proposal'}
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData.representative.name;

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData.representative.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }
   
    expandAll() {
        if(!this.isExpanded){
          this.products.forEach(product => this.expandedRows[product.name] = true);
          
        } else {
          this.expandedRows={};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
}
