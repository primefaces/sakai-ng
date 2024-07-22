import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    //selector: "app-permisosroles",
    templateUrl: './pantalla1.component.html',
    styleUrl: './pantalla1.component.scss'
})
export class pantalla1DemoComponent {


    roles: SelectItem[] = [];
    selectedDrop: any;

    valCheck: string[] = [];

    ngOnInit() {
        this.roles = [
            { label: 'Administrador', value: { id: 1, code: ['Consultas'] } },
            { label: 'Coordinador', value: { id: 2, code: ['Reportes'] } },
            { label: 'Profesor', value: { id: 3, code: ['Roles y Usuarios'] } },
            { label: 'Director de Departamento', value: { id: 4, code: ['Reportes', 'Consultas'] } }
        ];
    }

    SaveChanges() {
        if (this.selectedDrop) {
            const roleIndex = this.roles.findIndex(role => role.value.id === this.selectedDrop.id);
            if (roleIndex !== -1) {
                this.roles[roleIndex].value.code = [...this.valCheck];
                console.log('Updated roles:', this.roles);
            }
        }
    }


    onRoleChange(event: any) {
        this.valCheck = event.value.code;
    }

}
