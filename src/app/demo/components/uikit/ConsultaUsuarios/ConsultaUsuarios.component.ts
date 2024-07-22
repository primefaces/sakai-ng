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

interface usuario {
    id?: number;
    name?: string;
    email?: string;
    roles?: string[];
    campus?: string[];
    sede?: string;
}

interface roles {
    label?: string;
    value?: string;
}

interface campus {
    label?: string;
    value?: string;
}

interface sede {
    label?: string;
    value?: string;
}

@Component({
    //selector: "app-consultausuario",
    templateUrl: './ConsultaUsuarios.component.html',
    styleUrl: './ConsultaUsuarios.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class ConsultaUsuariosDemoComponent implements OnInit {

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

    loading: boolean = false;

    userHasAdminRole: boolean = false;

    items: MenuItem[];

    rols: roles[] = [];

    camp: campus[] = [];

    sed: sede[] = [];

    usuarios: usuario[];

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService) { }

    ngOnInit() {

        this.items = [
            { label: 'Perfil', icon: 'pi pi-user', command: () => this.viewProfile() },
            { label: 'Configuración', icon: 'pi pi-cog', command: () => this.settings() },
            { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
          ];


        this.usuarios = [
            { id: 100633131 , name: 'Mario Peralta' , email: "Mario-Peralta@gmail.com", roles:["Administrador", "Coordinador"], campus:["Monterrey", "CDMX"], sede:"Sede1"},
            { id: 102352342 , name: 'Anna Fali',  email: "Mario-Peralta@gmail.com", roles:["Administrador", "Coordinador"], campus:["Toluca"], sede:"Sede2"},
            { id: 100652123 , name: 'Asiya Javayant',  email: "Mario-Peralta@gmail.com", roles:["Administrador"], campus:["Santa Fe"], sede:"Sede3"},
            { id: 101235431 , name: 'Bernardo Dominic',  email: "Mario-Peralta@gmail.com", roles:["Coordinador"], campus:["Monterrey", "CDMX"], sede:"Sede4"},
            { id: 105412453 , name: 'Ioni Bowcher',  email: "Mario-Peralta@gmail.com", roles:["Director de Departamento"], campus:["Monterrey", "CDMX"], sede:"Sede1"},
            { id: 111111111 , name: 'Ivan Magalhaes',  email: "Mario-Peralta@gmail.com", roles:["Profesor"], campus:["Santa Fe"], sede:"Sede2"},
            { id: 104123123 , name: 'Onyama Limba',  email: "Mario-Peralta@gmail.com", roles:["Profesor"], campus:["Monterrey", "CDMX"], sede:"Sede3"},
            { id: 101245121 , name: 'Stephen Shaw',  email: "Mario-Peralta@gmail.com", roles:["Director de Departamento"], campus:["Toluca"], sede:"Sede4"},
            { id: 165433343 , name: 'XuXue Feng',  email: "Mario-Peralta@gmail.com", roles:["Profesor"], campus:["Santa Fe"], sede:"Sede2"}
        ];

        this.rols = [
            {label: "Administrador", value: "Administrador"},
            {label: "Profesor", value: "Profesor"},
            {label: "Director de Departamento", value: "Director de Departamento"},
            {label: "Coordinador", value: "Coordinador"}
        ];

        this.camp = [
            {label: "Monterrey", value: "Monterrey"},
            {label: "Santa Fe", value: "Santa Fe"},
            {label: "CDMX", value: "CDMX"},
            {label: "Toluca", value: "Toluca"}
        ];

        this.sed = [
            {label: "Sede1", value: "Sede1"},
            {label: "Sede2", value: "Sede2"},
            {label: "Sede3", value: "Sede3"},
            {label: "Sede4", value: "Sede4"}
        ];

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

    NuevoUsuario() {
        // lógica para agregar usuario
    }

    AsignarRol(event: any, usuario: usuario) {
        usuario.roles = event.value;
      }

    AsignarCampus(event: any, usuario: usuario){
        usuario.campus = event.value;
    }

    AsignarSede(event: any, usuario: usuario){
        usuario.sede = event.value;
    }

    editarCliente(){
        // lógica para editar usuario
    }

    borrarCliente(){
        // lógica para borrar usuario
    }

    formatCampus(as: string[]): string {
        return as.map(c => 'Campus ' + c).join(', ');
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    toggleAdminRole() {//Boton de prueba para cambiar entre pantalla administrador y usuario normal
        this.userHasAdminRole = !this.userHasAdminRole;
      }

}
