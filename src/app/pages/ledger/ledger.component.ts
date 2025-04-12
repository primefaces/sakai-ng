import { Component } from '@angular/core';
import { GetDataService, Ledger } from '../service/ledger.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
import { collectionGroup, getDocs } from '@angular/fire/firestore';
@Component({
  selector: 'app-ledger',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    ListboxModule,
  ],
  providers: [GetDataService],
  templateUrl: './ledger.component.html',
  styleUrl: './ledger.component.scss'
})
export class LedgerComponent {
  stats!: any[]; 
  stat!: Ledger;
  submitted: boolean = false;
  statDialog: boolean=false;
  givingForm!: FormGroup<{ attendanceChildren: FormControl<string | null>; attendanceAdults: FormControl<string | null>; tithe: FormControl<string | null>; offeringSeed: FormControl<string | null>; firstFruit: FormControl<string | null>; missionsMinistry: FormControl<string | null>; compassionSeed: FormControl<string | null>; cafeOffering: FormControl<string | null>; crossCulture: FormControl<string | null>; businessTithe: FormControl<string | null>; projectRelocate: FormControl<string | null>; buildingFund: FormControl<string | null>; youthOffering: FormControl<string | null>; leviteTithe: FormControl<string | null>; champions: FormControl<string | null>; prisonsOfCompassion: FormControl<string | null>; musicOfCompassion: FormControl<string | null>; other: FormControl<string | null>; }>;
  focId: any;
  constructor(  private getData: GetDataService ) {  }
  

 focValues: any[] = [
  { name: 'Marondera', id: 'MaronderaFocId' },
  { name: 'Mahusekwa', id: 'MahusekwaFocId' },
  { name: 'Murehwa', id: 'MurehwaFocId' }
];

 focValue: any = null;
 filterDate: string = '';

  hideDialog() {
    this.statDialog = false;
    this.submitted = false;
 }
  async saveStat() {
   console.log(this.stat);
   this.stat.location = this.focId
   let docId = this.createCollectionId(new Date())
   this.stat.date = docId
   try { await this.getData.submitReport(this.stat).then((data) => {
    console.log(data); 
    
   })
   this.getAllData()
  }
   catch (error) {  
    console.error("Error adding document: ", error);
    }

  //  try {
  //   await this.getData.addDataToCol(this.stat, `stats/${docId}`) 
  //   // await this.getData.addDataToCol(this.stat, `offering/${docId}/logs/${this.focId}`) 
  //   console.log('Data sent');
    
  //  }
  // catch (error) {
  //   console.error("Error adding document: ", error);
  // }

   
}
createCollectionId(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;  // 23-march-2025
}
  openNew() {
    this.stat = {} as Ledger;
    this.submitted = false;
    this.statDialog = true;
  }
  async ngOnInit() {
     this.getData.getAll('offering').subscribe((data) => {
       console.log(data);
      //  this.stats = data
     });
   this.getAllData()
  }
  
  async getAllData(){
    await this.getData.getAllReports().then((data) => {
      console.log(data);
      
      this.stats=data
    });
  }

  async getFilteredData(){
    await this.getData.getFilteredReports(this.focValue, this.filterDate).then((data) => {
      console.log(this.focValue);
      console.log(this.filterDate);
      this.stats=data
    });
  }

  
  
  initForm() {
    this.givingForm = new FormGroup({
      attendanceChildren: new FormControl('', ),
      attendanceAdults: new FormControl('', ),
      tithe: new FormControl('', ),
      offeringSeed: new FormControl('', ),
      firstFruit: new FormControl("", ),
      missionsMinistry: new FormControl('', ),
      compassionSeed: new FormControl('', ),
      cafeOffering: new FormControl('', ),
      crossCulture: new FormControl('', ),
      businessTithe: new FormControl('', ),
      projectRelocate: new FormControl('', ),
      buildingFund: new FormControl('', ),
      youthOffering: new FormControl('', ),
      leviteTithe: new FormControl('', ),
      champions: new FormControl('', ),
      prisonsOfCompassion: new FormControl('', ),
      musicOfCompassion: new FormControl('', ),
      other: new FormControl('', ),
    });
  }
}
