import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad, ApiResponse } from '../models/unidad';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = `${environment.backend.host}/unidades`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getUnidades(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.nombre) {
        params = params.set('nombre', filters.nombre);
    }
    if (filters.nombre_corto) {
        params = params.set('nombre_corto', filters.nombre_corto);
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
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, { });
  }

  //getUnidad(id: number): Observable<Unidad> {
  //  return this.http.get<Unidad>(`${this.apiUrl}/${id}`);
  //}

  createUnidad(unidad: Partial<Unidad>): Observable<Unidad> {
    return this.http.post<Unidad>(`${this.apiUrl}/store`, unidad);
  }

  updateUnidad(id: number, unidad: Partial<Unidad>): Observable<Unidad> {
    return this.http.post<Unidad>(`${this.apiUrl}/update/${id}`, unidad);
  }

  deleteUnidad(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreUnidad(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }
}
