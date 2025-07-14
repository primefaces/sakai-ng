import { Component } from '@angular/core';
import { UtilsService } from '../../../../../../shared/utils.service';

@Component({
  selector: 'app-dashboard-principal',
  standalone: false,
  templateUrl: './dashboard-principal.component.html',
  styleUrl: './dashboard-principal.component.scss',
  providers: [UtilsService],
})
export class DashboardPrincipalComponent {

}
