import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';


interface expandedRows {
    [key: string]: boolean;
}

interface roles {
    rol?: string;
    numusu?: number;
    fecreacion?: string;
    usucreacion?: string;
    status?: string;
}

@Component({
    //selector: "app-consultausuario",
    templateUrl: './ListaOficiales.component.html',
    styleUrl: './ListaOficiales.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class ListaOficialesDemoComponent implements OnInit {

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    userHasAdminRole: boolean = false;

    items: MenuItem[];

    rols: roles[] = [];

    filteredRols: roles[] = [];

    selectedOption: string = "opcion1";

    newRolDialog: boolean = false;
    newRol: roles = {};

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService) { }

    ngOnInit() {

        this.items = [
            { label: 'Perfil', icon: 'pi pi-user', command: () => this.viewProfile() },
            { label: 'Configuración', icon: 'pi pi-cog', command: () => this.settings() },
            { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
          ];


        this.rols = [
            {rol: "Administrador",numusu:1,fecreacion:"15-09-24",usucreacion:"Mario Garcia Lopez",status:"Activo"},
            {rol: "Profesor",numusu:1341,fecreacion:"12-09-24",usucreacion:"Maria Tereza Lozano",status:"Inactivo"},
            {rol: "Director de Departamento",numusu:2354,fecreacion:"05-09-24",usucreacion:"Maria Tereza Lozano",status:"Activo"},
            {rol: "Coordinador",numusu:1,fecreacion:"25-08-24",usucreacion:"Mario Garcia Lopez",status:"Eliminado"}
        ];

        this.filteredRols = this.rols;

    }

    filterByStatus() {
        if (this.selectedOption === 'opcion1') {
            this.filteredRols = this.rols;
        } else if (this.selectedOption === 'opcion2') {
            this.filteredRols = this.rols.filter(rol => rol.status === 'Activo' || rol.status === 'Inactivo');
        }
    }

    viewProfile() {
        // lógica para ver el perfil
    }

    settings() {
        // lógica para configuración
    }

    logout() {
        // lógica para cerrar sesión
    }

    showNewRolDialog() {
        this.newRol = {};
        this.newRolDialog = true;
    }

    hideNewRolDialog() {
        this.newRolDialog = false;
    }

    NewRol() {
        this.rols.push(this.newRol);
        this.filterByStatus();
        this.newRolDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
        this.selectedOption = 'opcion1';
        this.filterByStatus();
    }

    toggleAdminRole() {//Boton de prueba para cambiar entre pantalla administrador y usuario normal
        this.userHasAdminRole = !this.userHasAdminRole;
      }

}
