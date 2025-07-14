import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto ,ApiResponse} from '../models/producto';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.backend.host}/producto`;

  constructor(private http: HttpClient) {}

  getProductos(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());
    if (filters.nombre) { params = params.set('nombre', filters.nombre);}
    if (filters.descripcion) { params = params.set('descripcion', filters.descripcion);}
    if (filters.categoria) { params = params.set('categoria', filters.categoria);}
    if (filters.tipoproducto) { params = params.set('tipoproducto', filters.tipoproducto);}
   // console.log('parametros = ',params);
    // Agregar parámetros de ordenamiento
    if (sortField) { params = params.set('sortField', sortField);}
    if (sortOrder) { params = params.set('sortOrder', sortOrder);}
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, {params});
  }

  getIndex(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, {});
  }

  //getProducto(id: number): Observable<Producto> {
  //  return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  //}

  createProducto(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/store`, producto);
  }

  updateProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/update/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreProducto(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`, {});
  }
}