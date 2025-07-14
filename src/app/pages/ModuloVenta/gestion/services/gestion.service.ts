import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gestion, ApiResponse } from '../models/gestion';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.backend.host}/gestion`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getGestiones(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.anio) {
        params = params.set('anio', filters.anio);
    }
    if (filters.nombre_campania) {
        params = params.set('nombre_campania', filters.nombre_campania);
    }
    // Agregar parámetros de ordenamiento
    if (sortField) {
      params = params.set('sortField', sortField);
    }
    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, { params });
  }

  getIndex(): Observable<ApiResponse> { 
    const params = new HttpParams().set('estado',1);
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, { params });
  }

  createGestion(gestion: Partial<Gestion>): Observable<Gestion> {
    return this.http.post<Gestion>(`${this.apiUrl}/store`, gestion);
  }

  updateGestion(id: number, gestion: Partial<Gestion>): Observable<Gestion> {
    return this.http.post<Gestion>(`${this.apiUrl}/update/${id}`, gestion);
  }

  deleteGestion(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreGestion(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }
}
