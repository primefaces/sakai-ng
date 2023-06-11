import { Component, OnInit, inject } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './floatlabeldemo.component.html',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        InputMaskModule,
        InputNumberModule,
        DropdownModule,
        MultiSelectModule,
        InputTextareaModule,
    ],
})
export class FloatLabelDemoComponent implements OnInit {

    private countryService = inject(CountryService);

    countries: any[] = [];

    cities: any[] = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];

    filteredCountries: any[] = [];

    value1: any;

    value2: any;

    value3: any;

    value4: any;

    value5: any;

    value6: any;

    value7: any;

    value8: any;

    value9: any;

    value10: any;

    value11: any;

    value12: any;

    ngOnInit() {
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
    }

    searchCountry(event: any) {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        const query = event.query;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
