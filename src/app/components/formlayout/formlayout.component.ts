import { Component } from '@angular/core';

@Component({
    templateUrl: './formlayout.component.html'
})
export class FormLayoutComponent {

    selectedState:any;
    
    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
}
