import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria ,ApiResponse} from '../models/categoria';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${environment.backend.host}/categoria`;

  constructor(private http: HttpClient) {}

  getCategorias(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());
    if (filters.nombre) {
      params = params.set('nombre', filters.nombre);
    }
    
    // Agregar parámetros de ordenamiento
    if (sortField) { params = params.set('sortField', sortField);}
    if (sortOrder) { params = params.set('sortOrder', sortOrder);}
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, {params});
  }

  getIndex(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, {});
  }

  //getCategoria(id: number): Observable<Categoria> {
  //  return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  //}

  createCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/store`, categoria);
  }

  updateCategoria(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/update/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreCategoria(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`, {});
  }
}
