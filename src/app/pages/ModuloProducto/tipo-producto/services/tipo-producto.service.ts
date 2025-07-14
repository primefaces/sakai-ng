import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto ,ApiResponse} from '../models/TipoProducto';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private apiUrl = `${environment.backend.host}/tipo_producto`;

  constructor(private http: HttpClient) {}

  getTipoProductos(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
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
  

  //getTipoProducto(id: number): Observable<TipoProducto> {
  //  return this.http.get<TipoProducto>(`${this.apiUrl}/${id}`);
  //}

  createTipoProducto(tipoProducto: Partial<TipoProducto>): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(`${this.apiUrl}/store`, tipoProducto);
  }

  updateTipoProducto(id: number, tipoProducto: Partial<TipoProducto>): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(`${this.apiUrl}/update/${id}`, tipoProducto);
  }

  deleteTipoProducto(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreTipoProducto(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`, {});
  }
}