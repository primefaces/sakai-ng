import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { Appointment, Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    templateUrl: './inputdemo.component.html'
})
export class InputDemoComponent implements OnInit, OnChanges {
    
    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    meetings: SelectItem[] = [];

    selectedMeeting: SelectItem = { value: '' };

    selectedAppointmentType: SelectItem = { value: '' };

    BTs: any[] = [];

    filteredBTs: any[] = [];

    selectedBTAdvanced: any[] = [];
    
    selectedMultiBT: any[] = [];

    selectedMulti: any[] = [];

    appointments: Appointment[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    scheduledMeetings: any[] = [];

    masterMeetings: any[] = [];

    supervisionClients: any[] = [];

    selectedClient: SelectItem = { value: '' };

    selectedDate: any;

    startTime: any;

    endTime: any;

    valueKnob = 20;

    invalidDate = false;

    disableSubmit = true;

    display = false;

    displayPopupMeeting: any;

    selectedPopUpBT: any;

    selectedPopUpAppointmentType: any;

    selectedPopUpStartTime: any;

    selectedPopUpEndTime: any;

    selectedPopUpDate: any;

    supervisor = "ADelgado@autismlearningpartners.com";
    
    selectedPopUpAppointmentWith: SelectItem = { value: '' };
    
    constructor(private countryService: CountryService, private productService: ProductService) { }

    ngOnInit() {

        this.getMeetings();

        this.getMasterMeetings();

        this.getSupervisors();

        this.getBTs();
    }
    
    ngOnChanges() {
        this.checkValidations();
        console.log("Changes Here");
    }

    showPopUp(meeting: any)
    {
        this.display=true;
        this.displayPopupMeeting = meeting;
        this.selectedPopUpBT = this.displayPopupMeeting.btName;
        this.selectedPopUpAppointmentType = this.displayPopupMeeting.appointmentType;
        this.selectedPopUpStartTime = this.displayPopupMeeting.startTime;
        this.selectedPopUpEndTime = this.displayPopupMeeting.endTime;
        this.selectedPopUpDate = this.displayPopupMeeting.date;
        this.selectedPopUpAppointmentWith = {
            label: this.displayPopupMeeting.appointmentWith,
            value: { name: this.displayPopupMeeting.appointmentWith}
          }
        console.log(meeting);
    }

    checkValidations()
    {
        if(this.invalidDate = this.startTime > this.endTime){
            this.disableSubmit = true;
            return;
        }
        this.disableSubmit = false;
    }

    getMasterMeetings(){
        this.productService.getAllMasterMeetings().subscribe(data => {
            console.log(data);
            this.masterMeetings = this.convertMasterMeetingsResponse(data);
          }, error => {
            console.error(error);
          });
    }
    convertMasterMeetingsResponse(response: any[]): any {
        return response.map((meeting, index) => ({
            label: meeting.name,
            value: { id: meeting.id, name: meeting.name, code: meeting._id }
        }));
      }

    getMeetings(){
        this.productService.getAllMeetings().subscribe(data => {
            console.log(data);
            this.scheduledMeetings = this.convertScheduledMeetingsResponse(data);
            }, error => {
            console.error(error);
            });
    }
    convertScheduledMeetingsResponse(response: any[]): any {
        return response.map((meeting, index) => (
            {
                _id: meeting._id,
                Title: meeting.Title,
                appointmentType: meeting.appointmentType,
                appointmentWith: meeting.appointmentWith,
                apointmentWithCRID: meeting.crId,
                btName: meeting.btName,
                btCRID: meeting.btCRID,
                timezone: meeting.timezone,
                date: meeting.date,
                startTime: meeting.startTime,
                endTime: meeting.endTime,
                supervisorName: meeting.supervisorName,
                supervisorCRID: meeting.supervisorCRID,
                supervisorEmail: meeting.supervisorEmail,
                recordedToBot: meeting.recordedToBot
              }
        ));
      }

    getBTs(){
        this.productService.getAllBTs(this.supervisor).subscribe(data => {
            console.log(data);
            this.BTs = data;
            //this.convertBTResponse(data);
          }, error => {
            console.error(error);
          });    
    }
    convertBTResponse(response: any[]): any {
        return response.map((bt, index) => ({
          label: bt.btName,
          value: { id: bt._id, name: bt.btName, crId: bt.crID, emailAddress: bt.emailAddress,
            region: bt.region, supervisorName: bt.supervisorName, supervisorCRID: bt.supervisorCRID,
            supervisorEmailAddress: bt.supervisorEmailAddress
        }
        }));
      }

    getSupervisors(){
        this.productService.getSupervisionClients().subscribe(data => {
            console.log(data);
            this.supervisionClients = this.convertSupervisionResponse(data);
          }, error => {
            console.error(error);
          });    
    }
      convertSupervisionResponse(response: any[]): any {
        return response.map((client, index) => ({
          label: client["Client Full Name"],
          value: { id: client._id, name: client["Client Full Name"], crId: client["CR ID"], clientName: client.ClientName, providertype: client["Provider Tyoe"]}
        }));
      }

    saveMeeting()
    {
        var meets: any = [];
        const date = new Date(this.selectedDate);
        const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
      
        const startTime = new Date(this.startTime);
        const formattedStartTime = `${(startTime.getHours() % 12 || 12)}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() >= 12 ? 'PM' : 'AM'}`;
      
        const endTime = new Date(this.endTime);
        const formattedEndTime = `${(endTime.getHours() % 12 || 12)}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() >= 12 ? 'PM' : 'AM'}`;
      
        this.selectedMultiBT.forEach(element => {
            meets.push({title: "Meeting",
            "appointmentType": this.selectedMeeting.name,
            "appointmentWith": this.selectedClient.name,
            "appointmentWithCRID": this.selectedClient.crId,
            "btName": element.btName,
            "btCRID": element.crID,
            "timezone": element.region,
            "date": formattedDate,
            "startTime": formattedStartTime,
            "endTime": formattedEndTime,
            "supervisorName": element.supervisorName,
            "supervisorCRID": element.supervisorCRID,
            "supervisorEmail": element.supervisorEmailAddress,
            "recordedToBot": "False"});
            });
        console.log("selectedMultiBT", this.selectedMultiBT, "Meets", meets,this.selectedMultiBT);
        this.productService.scheduleMeeting(meets).subscribe(data => {
            console.log(data);
            this.getMeetings();
            this.selectedDate = "";
            this.startTime = "";
            this.endTime = "";
            this.selectedMeeting = { value: '' };
            this.selectedClient = { value: '' };
            this.selectedMultiBT = [];
          }, error => {
            console.error(error);
          }); 
    }
    updateMeeting()
    {
        let formattedDate = this.selectedPopUpDate;
        if (this.selectedPopUpDate instanceof Date) {
            const date = new Date(this.selectedPopUpDate);
            formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
        }
        
        let formattedStartTime = this.selectedPopUpStartTime;
        if (this.selectedPopUpStartTime instanceof Date) {
            const startTime = new Date(this.selectedPopUpStartTime);
            formattedStartTime = `${(startTime.getHours() % 12 || 12)}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() >= 12 ? 'PM' : 'AM'}`;
        }

        let formattedEndTime = this.selectedPopUpEndTime;
        if(this.selectedPopUpEndTime instanceof Date)
        {
            const endTime = new Date(this.selectedPopUpEndTime);
            formattedEndTime = `${(endTime.getHours() % 12 || 12)}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() >= 12 ? 'PM' : 'AM'}`;    
        }
        
        var update = {
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            appointmentWith: this.selectedPopUpAppointmentWith.name,
            appointmentWithCRID: this.selectedPopUpAppointmentWith.crId,
            date: formattedDate
        };
        
        this.productService.updateMeeting(update, this.displayPopupMeeting._id).subscribe(data => {
            console.log(data);
            this.getMeetings();
            this.display = false;
          }, error => {
            console.error(error);
          });
    }
    filterCountry(event: any) {
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
    selectedState: any = null;

    compareTwoTimesM(){}
    
    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
}
