import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventarioProductoEnvase ,ApiResponse} from '../models/inventario';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = `${environment.backend.host}/producto_envase`;

  constructor(private http: HttpClient) {}

  getInventarioProductoEnvases(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());
    if (filters.producto) {params = params.set('producto', filters.producto);}
    if (filters.categoria) {params = params.set('categoria', filters.categoria);}
    if (filters.NotaVenta_id) {params = params.set('NotaVenta_id', filters.NotaVenta_id);}
    if (filters.NotaDevolucion_id) {params = params.set('NotaDevolucion_id', filters.NotaDevolucion_id);}
    if (filters.NotaCompra_id) {params = params.set('NotaCompra_id', filters.NotaCompra_id);}
    if (filters.estado) {params = params.set('estado',filters.estado);}
    console.log('filtros  =  ',params);
    // Agregar parámetros de ordenamiento
    if (sortField) { params = params.set('sortField', sortField);}
    if (sortOrder) { params = params.set('sortOrder', sortOrder);}
    return this.http.get<ApiResponse>(`${this.apiUrl}/inventario`, {params});
  }

  getIndex(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/inventario`, {});
  }

  GetInventarioCategoria(filters: any= {}): Observable<ApiResponse> {
    let params = new HttpParams()
    if (filters.producto) {params = params.set('producto', filters.producto);}
    if (filters.categoria) {params = params.set('categoria', filters.categoria);}

    return this.http.get<ApiResponse>(`${this.apiUrl}/inventario`, {params});
  }

  createInventarioProductoEnvase(producto_envase: Partial<InventarioProductoEnvase>): Observable<InventarioProductoEnvase> {
    return this.http.post<InventarioProductoEnvase>(`${this.apiUrl}/store`, producto_envase);
  }

  updateInventarioProductoEnvase(id: number, producto_envase: Partial<InventarioProductoEnvase>): Observable<InventarioProductoEnvase> {
    return this.http.post<InventarioProductoEnvase>(`${this.apiUrl}/update/${id}`, producto_envase);
  }

  deleteInventarioProductoEnvase(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreInventarioProductoEnvase(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`, {});
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
