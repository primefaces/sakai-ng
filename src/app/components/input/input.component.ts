import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { NodeService } from '../../service/nodeservice';
import { SelectItem } from 'primeng/api';

@Component({
    templateUrl: './input.component.html',
    styles: [`:host ::ng-deep .p-multiselect {
		min-width: 15rem;
	}

	:host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
		min-width: 20rem;
	}

	:host ::ng-deep .multiselect-custom .p-multiselect-label,  {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;

	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value {
		padding: .25rem .5rem;
		border-radius: 3px;
		display: inline-flex;
		margin-right: .5rem;
		background-color: var(--primary-color);
		color: var(--primary-color-text);
	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
		width: 17px;
	}

	:host ::ng-deep .multiselect-custom .country-item {
		display: flex;
		align-items: center;
	}

	:host ::ng-deep .multiselect-custom .country-item img.flag {
		width: 18px;
		margin-right: .5rem;
	}

	:host ::ng-deep .multiselect-custom .country-placeholder {
		padding: 0.25rem;
	}

    `]
})
export class InputComponent implements OnInit{
    countries: any[];

    filteredCountries: any[];

    selectedCountryAdvanced: any[];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string;

    valCheck: string[] = [];

    valSwitch: boolean;

    cities: SelectItem[];

    selectedList: SelectItem;

    selectedDrop: SelectItem;

    selectedMulti: string[] = [];

    treeSelectNodes: any[];

    selectedNode: SelectItem;

    valToggle = false;

    paymentOptions: any[];

    valSelect1: string;

    valSelect2: string;

    valueKnob = 20;

    selectedDate:any;

    constructor(private countryService: CountryService, private nodeService: NodeService) {}

    ngOnInit() {
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.cities = [
            {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
            {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
        ];

        this.paymentOptions = [
            {name: 'Option 1', value: 1},
            {name: 'Option 2', value: 2},
            {name: 'Option 3', value: 3}
        ];

        this.nodeService.getFiles().then(files => this.treeSelectNodes = files)
    }

    filterCountry(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
