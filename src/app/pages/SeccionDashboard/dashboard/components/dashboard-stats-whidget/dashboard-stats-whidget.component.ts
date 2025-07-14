import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard, DashboardCompra } from '../../models/dashboard';

@Component({
  selector: 'app-dashboard-stats-whidget',
  standalone: false,
  templateUrl: './dashboard-stats-whidget.component.html',
  styleUrl: './dashboard-stats-whidget.component.scss'
})
export class DashboardStatsWhidgetComponent {
  dashboardData: Dashboard = {} as Dashboard ; 
  dashboardDataCompra: DashboardCompra = {} as DashboardCompra ; 

 constructor(
  private dashboardService: DashboardService
  
 ){
  this.obtenerEstadoDiario();
  this.obtenerEstadoDiarioCompra();
 }

 obtenerEstadoDiario(){
  this.dashboardService.EstadoDiario().subscribe(
    (response) => {
      this.dashboardData = response;
      console.log(this.dashboardData);
    },
    (error) => {
      console.error('Error al obtener el estado diario:', error);
    }
  );
 }

 obtenerEstadoDiarioCompra(){
  this.dashboardService.EstadoDiarioCompra().subscribe(
    (response) => {
      this.dashboardDataCompra = response;
      console.log(this.dashboardDataCompra);
    },
    (error) => {
      console.error('Error al obtener el estado diario:', error);
    }
  );
 }
}
