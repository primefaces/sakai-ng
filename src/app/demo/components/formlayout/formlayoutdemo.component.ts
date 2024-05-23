import { Component } from '@angular/core';

@Component({
    templateUrl: './formlayoutdemo.component.html',
    
})
export class FormLayoutDemoComponent {

    selectedState: any = null;

    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];

    dropdownItems = [
        { name: 'Administrador', code: 'a' },
        { name: 'Desenvolvedor', code: 'd' }
    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

    password!: string;

}
