import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor, ApiResponse } from '../models/proveedor';
import { EstadoCuenta ,EstadoCuentaDevolucion} from '../models/EstadoCuenta';
import { environment } from '../../../../../environments/environment';
import { NotaCompra_Detalles } from '../../nota-compra/models/detallecompra';
import { NotaDevolucion_Detalles } from '../../../ModuloDevolucion/nota-devolucion/models/detalledevolucion';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = `${environment.backend.host}/proveedor`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getProveedores(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.razon_social) { params = params.set('razon_social', filters.razon_social);}
    if (filters.correo) { params = params.set('correo', filters.correo);}
    if (filters.telefono) { params = params.set('telefono', filters.telefono);}
    if (filters.direccion) { params = params.set('direccion', filters.direccion);}
    if (filters.codigo) { params = params.set('codigo', filters.codigo);}
    if (filters.estado) {params = params.set('estado',filters.estado);}
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

  createProveedor(proveedor: Partial<Proveedor>): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/store`, proveedor);
  }

  updateProveedor(id: number, proveedor: Partial<Proveedor>): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/update/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreProveedor(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }

  ShowByCodigo(codigo : number): Observable<Proveedor> {  
    return this.http.get<Proveedor>(`${this.apiUrl}/show/${codigo}`);
  }

  EstadoProveedorNotaCompra(id: number,id_gestion: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${this.apiUrl}/estado_cuenta/${id}/${id_gestion}`);
  }
  
  EstadoProveedorNotaDevolucion(id: number,id_gestion: number): Observable<EstadoCuentaDevolucion> {
    return this.http.get<EstadoCuentaDevolucion>(`${this.apiUrl}/estado_cuenta_devolucion/${id}/${id_gestion}`);
  }

  EstadoCuentaPDF(id: number,id_gestion: number): Observable<NotaCompra_Detalles[]> {
    return this.http.get<NotaCompra_Detalles[]>(`${this.apiUrl}/estado_cuenta_pdf/${id}/${id_gestion}`);
  }

  EstadoCuentaPDFDevolucion(id: number,id_gestion: number): Observable<NotaDevolucion_Detalles[]> {
    return this.http.get<NotaDevolucion_Detalles[]>(`${this.apiUrl}/estado_cuenta_pdf_devolucion/${id}/${id_gestion}`);
  }

}