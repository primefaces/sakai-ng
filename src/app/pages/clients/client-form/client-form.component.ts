import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'client-form',
    imports: [FormsModule, SelectModule, DatePickerModule, InputTextModule, ButtonModule, FluidModule, AutoCompleteModule],
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
    make = '';
    model = '';
    year: any;
    color = '';
    vehicleTypes = [
        { label: 'Small Car', value: 'Small Car' },
        { label: 'Sedan', value: 'Sedan' },
        { label: 'SUV', value: 'SUV' },
        { label: 'Pickup', value: 'PickUp' },
        { label: 'Coupe', value: 'Coupe' },
        { label: 'Motorcycle', value: 'Motorcycle' },
        { label: 'Van', value: 'Van' },
        { label: 'Truck', value: 'Truck' },
        { label: 'Other', value: 'Other' }
    ];
    type = [];
    regNo = '';
    ownerName = '';
    contactNumber = '';
    client = {
        name: '',
        make: '',
        model: '',
        year: '',
        color: '',
        type: '',
        regNo: '',
        ownerName: '',
        contactNumber: ''
    };
    filteredMakes: string[] = [];
    filteredModels: string[] = [];
    models: string[] = [];
    makes = [
        { make: 'Toyota', models: ['Corolla', 'Camry', 'Yaris', 'Prius', 'Land Cruiser', 'Fortuner', 'Hilux', 'Hiace'] },
        { make: 'Honda', models: ['Civic', 'Accord', 'City', 'Jazz', 'HR-V', 'CR-V', 'BR-V', 'Brio'] },
        { make: 'Suzuki', models: ['Swift', 'Ciaz', 'Vitara', 'Jimny', 'Alto', 'Celerio', 'Ertiga', 'APV'] },
        { make: 'Nissan', models: ['Almera', 'Sylphy', 'X-Trail', 'Patrol', 'Navara', 'Urvan', 'GT-R', '370Z'] },
        { make: 'Mitsubishi', models: ['Mirage', 'Lancer', 'Xpander', 'Montero Sport', 'Strada', 'Pajero', 'Adventure', 'L300'] },
        { make: 'Ford', models: ['Mustang', 'Explorer', 'Ranger', 'Everest', 'EcoSport', 'Escape', 'Expedition', 'F-150'] },
        { make: 'Chevrolet', models: ['Camaro', 'Spark', 'Sonic', 'Cruze', 'Malibu', 'Trax', 'Trailblazer', 'Colorado'] },
        { make: 'Kia', models: ['Picanto', 'Rio', 'Forte', 'Optima', 'Soul', 'Sportage', 'Sorento', 'Grand Carnival'] },
        { make: 'Hyundai', models: ['Accent', 'Elantra', 'Sonata', 'Kona', 'Tucson', 'Santa Fe', 'Grand Starex', 'H-100'] },
        { make: 'BMW', models: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i8'] },
        { make: 'Mercedes-Benz', models: ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS', 'GLA', 'GLC', 'GLE', 'GLS', 'G-Class', 'SLC', 'SL', 'AMG GT'] },
        { make: 'Audi', models: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'] },
        { make: 'Volkswagen', models: ['Polo', 'Golf', 'Jetta', 'Passat', 'Tiguan', 'Touareg', 'Arteon', 'Caddy', 'Caravelle', 'Multivan'] },
        { make: 'Subaru', models: ['Impreza', 'Legacy', 'WRX', 'BRZ', 'XV', 'Forester', 'Outback', 'Ascent'] },
        { make: 'Volvo', models: ['S60', 'S90', 'V40', 'V60', 'V90', 'XC40', 'XC60', 'XC90'] },
        { make: 'Peugeot', models: ['108', '208', '308', '508', '2008', '3008', '5008', 'Traveller'] },
        { make: 'Renault', models: ['Kwid', 'Clio', 'Captur', 'Duster', 'Koleos', 'Megane', 'Talisman', 'Twizy', 'Zoe'] },
        { make: 'Land Rover', models: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Range Rover Sport', 'Range Rover'] },
        { make: 'Jaguar', models: ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'] },
        { make: 'Porsche', models: ['911', '718', 'Panamera', 'Macan', 'Cayenne', 'Taycan'] },
        { make: 'Mini', models: ['3-Door', '5-Door', 'Convertible', 'Clubman', 'Countryman', 'Paceman', 'John Cooper Works'] },
        { make: 'Lexus', models: ['IS', 'ES', 'GS', 'LS', 'RC', 'LC', 'UX', 'NX', 'RX', 'GX', 'LX'] },
        { make: 'Infiniti', models: ['Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX60', 'QX70', 'QX80'] },
        { make: 'Acura', models: ['ILX', 'TLX', 'RLX', 'RDX', 'MDX', 'NSX'] },
        { make: 'Mazda', models: ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-8', 'CX-9', 'MX-5', 'RX-8'] },
        { make: 'Jeep', models: ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator'] },
        { make: 'Dodge', models: ['Challenger', 'Charger', 'Durango', 'Journey'] },
        { make: 'Chrysler', models: ['300', 'Pacifica', 'Voyager'] },
        { make: 'Fiat', models: ['500', '500X', '500L', '124 Spider', 'Tipo', 'Doblo', 'Panda', 'Qubo', 'Talento', 'Fullback'] },
        { make: 'Alfa Romeo', models: ['Giulietta', 'Giulia', 'Stelvio', '4C'] },
        { make: 'Maserati', models: ['Ghibli', 'Quattroporte', 'Levante', 'GranTurismo', 'GranCabrio'] },
        { make: 'Bentley', models: ['Continental GT', 'Flying Spur', 'Mulsanne', 'Bentayga'] },
        { make: 'Rolls-Royce', models: ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan'] },
        { make: 'Lamborghini', models: ['Huracan', 'Aventador', 'Urus'] },
        { make: 'Ferrari', models: ['Portofino', 'Roma', 'F8 Tributo', '812 Superfast', 'GTC4Lusso', 'SF90 Stradale'] },
        { make: 'McLaren', models: ['GT', '570S', '720S', '675LT', '600LT', 'Senna'] },
        { make: 'Bugatti', models: ['Chiron', 'Veyron'] },
        { make: 'Koenigsegg', models: ['Jesko', 'Regera', 'Agera RS'] },
        { make: 'Pagani', models: ['Huayra', 'Zonda'] },
        { make: 'Tesla', models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster', 'Cybertruck'] },
        { make: 'Lotus', models: ['Elise', 'Exige', 'Evora'] },
        { make: 'Smart', models: ['Fortwo', 'Forfour', 'Roadster'] },
        { make: 'Genesis', models: ['G70', 'G80', 'G90'] },
        { make: 'Datsun', models: ['Go', 'Go+', 'Cross'] },
        { make: 'Mahindra', models: ['Scorpio', 'XUV500', 'Thar', 'KUV100', 'TUV300', 'Marazzo', 'Alturas G4', 'e2o'] },
        { make: 'Tata', models: ['Nano', 'Tiago', 'Tigor', 'Altroz', 'Nexon', 'Harrier', 'Safari', 'Sumo', 'Hexa'] },
        { make: 'Isuzu', models: ['D-Max', 'MU-X'] },
        { make: 'SsangYong', models: ['Tivoli', 'Korando', 'Rexton', 'Rodius', 'Musso'] },
        { make: 'Geely', models: ['Coolray', 'Azkarra', 'Okavango', 'Emgrand', 'LC', 'Panda', 'GC9', 'JL', 'JLX', 'JLX-C'] },
        { make: 'Chery', models: ['Tiggo', 'Arrizo', 'QQ', 'Orinoco', 'Fulwin', 'A1', 'A3', 'A5', 'A9', 'A13', 'A19', 'A21', 'A25', 'A35', 'A44', 'A55', 'A66', 'A88', 'A100', 'A200', 'A500', 'A520', 'A600', 'A800', 'A900', 'A1100'] },
        { make: 'BYD', models: ['Tang', 'Song', 'Yuan', 'Qin', 'Han', 'F3', 'F5', 'F6', 'F7', 'F8', 'F9', 'F0', 'F1', 'F2', 'F3R', 'F6DM', 'G3', 'G5', 'G6', 'G9', 'G6R', 'G6PHEV'] },
        { make: 'Great Wall', models: ['Haval', 'Wingle', 'Coolbear', 'Deer', 'Hover', 'Pegasus', 'Peri', 'Safe', 'Sailor', 'Sing', 'Socool', 'Voleex', 'Wey', 'X200', 'X240', 'Xylo', 'Zotye'] },
        { make: 'JAC', models: ['S2', 'S3', 'S4'] }
    ];

    searchMake(event: any) {
        const query = event.query.toLowerCase();

        // Filter makes based on the search query
        this.filteredMakes = this.makes.map((item) => item.make).filter((make) => make.toLowerCase().includes(query));
    }

    onMakeSelected() {
        // Find the selected make
        this.models = [];
        this.client.model = '';
        const selectedMake = this.makes.find((item) => item.make === this.client.make);
        console.log('selectedMake: ', selectedMake);

        // Set the models of the selected make

        if (selectedMake) {
            this.models = selectedMake?.models;
        }
    }

    searchModel(event: any) {
        const query = event.query.toLowerCase();

        // Filter models based on the search query
        this.filteredModels = this.models.filter((model) => model.toLowerCase().includes(query));
    }
}
