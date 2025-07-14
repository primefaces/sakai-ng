import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuracion} from '../models/configuracion';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private apiUrl = `${environment.backend.host}/configuracion`;

  constructor(private http: HttpClient) {}

  updateConfiguracion(configuracion: Partial<Configuracion>): Observable<Configuracion> {
    return this.http.post<Configuracion>(`${this.apiUrl}/update`, configuracion);
  }

  showConfiguracion(): Observable<Configuracion> {
    return this.http.get<Configuracion>(`${this.apiUrl}/show`);
  }

  logobase64(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/logobase64`);
  }

}
