import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'UI Components',
                items: [
                    { label: 'Consulta Usuarios', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/ConsultaUsuarios'] },
                    { label: 'Lista Oficiales', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/ListaOficiales'] },
                    { label: 'Permisos de Roles', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/pantalla1'] }
                ]
            }
        ];
    }
}
