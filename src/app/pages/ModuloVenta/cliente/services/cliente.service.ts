import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ApiResponse } from '../models/cliente';
import { environment } from '../../../../../environments/environment';
import { EstadoCuenta ,EstadoCuentaDevolucion} from '../models/EstadoCuenta';
import { NotaVenta_Detalles } from '../../nota-venta/models/detalleventa';
import { NotaDevolucion_Detalles } from '../../../ModuloDevolucion/nota-devolucion/models/detalledevolucion';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.backend.host}/cliente`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getClientes(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.nombre) { params = params.set('nombre', filters.nombre);}
    if (filters.paterno) { params = params.set('paterno', filters.paterno);}
    if (filters.materno) { params = params.set('materno', filters.materno);}
    if (filters.telefono) { params = params.set('telefono', filters.telefono);}
    if (filters.direccion) { params = params.set('direccion', filters.direccion);}
    if (filters.ci) { params = params.set('ci', filters.ci);}
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

  createCliente(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/store`, cliente);
  }

  updateCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/update/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreCliente(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }

  ShowByCodigo(codigo : number): Observable<Cliente> {  
    return this.http.get<Cliente>(`${this.apiUrl}/show/${codigo}`);
  }

  EstadoClienteNotaVenta(id: number,id_gestion: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${this.apiUrl}/estado_cuenta/${id}/${id_gestion}`);
  }
  
  EstadoClienteNotaDevolucion(id: number,id_gestion: number): Observable<EstadoCuentaDevolucion> {
    return this.http.get<EstadoCuentaDevolucion>(`${this.apiUrl}/estado_cuenta_devolucion/${id}/${id_gestion}`);
  }

  EstadoCuentaPDF(id: number,id_gestion: number): Observable<NotaVenta_Detalles[]> {
    return this.http.get<NotaVenta_Detalles[]>(`${this.apiUrl}/estado_cuenta_pdf/${id}/${id_gestion}`);
  }

  EstadoCuentaPDFDevolucion(id: number,id_gestion: number): Observable<NotaDevolucion_Detalles[]> {
    return this.http.get<NotaDevolucion_Detalles[]>(`${this.apiUrl}/estado_cuenta_pdf_devolucion/${id}/${id_gestion}`);
  }
}