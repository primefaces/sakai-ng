import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard,DashboardCompra} from '../models/dashboard';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.backend.host}/dashboard`;

  constructor(private http: HttpClient) {}

  EstadoDiario(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/estado_general_Diario`);
  }

  EstadoMensual(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/estado_general_Diario`);
  }

  EstadoRango(fecha_inicial : Date,fecha_final : Date ): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/estado_general_Diario/${fecha_inicial}/${fecha_final}`);
  }

  EstadoDiarioCompra(): Observable<DashboardCompra> {
    return this.http.get<DashboardCompra>(`${this.apiUrl}/estado_general_Diario_Compra`);
  }

  EstadoMensualCompra(): Observable<DashboardCompra> {
    return this.http.get<DashboardCompra>(`${this.apiUrl}/estado_general_Diario_Compra`);
  }

  EstadoRangoCompra(fecha_inicial : Date,fecha_final : Date ): Observable<DashboardCompra> {
    return this.http.get<DashboardCompra>(`${this.apiUrl}/estado_general_Diario_Compra/${fecha_inicial}/${fecha_final}`);
  }
 
}
