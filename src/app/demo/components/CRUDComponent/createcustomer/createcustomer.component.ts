import { Component } from '@angular/core';

@Component({
  templateUrl: './createcustomer.component.html',
})
export class CreatecustomerComponent  {

  selectedState: any = null;

  states: any[] = [
      {name: 'Arizona', code: 'Arizona'},
      {name: 'California', value: 'California'},
      {name: 'Florida', code: 'Florida'},
      {name: 'Ohio', code: 'Ohio'},
      {name: 'Washington', code: 'Washington'}
  ];

  dropdownItems = [
      { name: 'Chennai', code: 'Option 1' },
      { name: 'Madurai', code: 'Option 2' },
      { name: 'Dindigul', code: 'Option 3' }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;

}
