import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-provinces',
  imports: [
     ToolbarModule,
     ButtonModule,
     DialogModule,
  ],
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent {
 
  statDialog: boolean=false;
  submitted: boolean = false;
  public saveStat() {

  }

  public hideDialog(){
    this.statDialog = false;
    this.submitted = false;
  }
}
