import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cultivo, ApiResponse } from '../models/cultivo';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {
  private apiUrl = `${environment.backend.host}/cultivo`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getCultivos(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.nombre) {
        params = params.set('nombre', filters.nombre);
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

  createCultivo(cultivo: Partial<Cultivo>): Observable<Cultivo> {
    return this.http.post<Cultivo>(`${this.apiUrl}/store`, cultivo);
  }

  updateCultivo(id: number, cultivo: Partial<Cultivo>): Observable<Cultivo> {
    return this.http.post<Cultivo>(`${this.apiUrl}/update/${id}`, cultivo);
  }

  deleteCultivo(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreCultivo(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }
}
