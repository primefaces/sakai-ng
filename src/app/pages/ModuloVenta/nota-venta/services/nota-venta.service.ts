import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaVenta, ApiResponse } from '../models/notaventa';
import { DetalleNotaVenta } from '../models/detalleventa';
import { environment } from '../../../../../environments/environment';
import { EstadoCuenta } from '../models/estadoCuenta';

@Injectable({
  providedIn: 'root'
})
export class NotaVentaService {
  private apiUrl = `${environment.backend.host}/nota_venta`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getNotaVentas(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.fecha) {params = params.set('fecha', filters.fecha);}
    if (filters.gestion) {params = params.set('gestion', filters.gestion);}
    if (filters.cliente) {params = params.set('cliente', filters.cliente);}

    // Agregar parámetros de ordenamiento
    if (sortField) {
      params = params.set('sortField', sortField);
    }
    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }

    //console.log('filtros recibidos = ',filters);
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, { params });
  }

  getIndex(): Observable<ApiResponse> { 
    return this.http.get<ApiResponse>(`${this.apiUrl}/index`, { });
  }

  getDetallesNota(nota_venta: Partial<NotaVenta>): Observable<DetalleNotaVenta[]> { 
    return this.http.get<DetalleNotaVenta[]>(`${this.apiUrl}/detalle/${nota_venta.id}`, { });
  }

  CompletarFirmaNotaVenta(nota_venta: Partial<NotaVenta>): Observable<void> { 
    return this.http.get<void>(`${this.apiUrl}/firma/${nota_venta.id}`, { });
  }

  AnularNotaVenta(nota_venta: Partial<NotaVenta>, motivo: string = 'no se pudo obtener el motivo'): Observable<void> {
    const codigo = nota_venta.codigo_factura;
    const params = new HttpParams().set('codigo_factura', codigo || '').set('motivo', motivo);
    return this.http.post<void>(`${this.apiUrl}/anular_nota`, params);
  }

  createNotaVenta(nota_venta: Partial<NotaVenta>): Observable<NotaVenta> {
    const params = {
      ...nota_venta,
      fecha: nota_venta.fecha 
      ? new Date(nota_venta.fecha.getTime() - (nota_venta.fecha.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0]
      : null, // Formato YYYY-MM-DD
    }
    
    console.log('params a enviar fecha = ',params['fecha']);
    return this.http.post<NotaVenta>(`${this.apiUrl}/store`, params);
  }

  updateNotaVenta(id: number, nota_venta: Partial<NotaVenta>): Observable<NotaVenta> {
    const params = {
      ...nota_venta,
      fecha: nota_venta.fecha 
      ? new Date(nota_venta.fecha).toISOString().split('T')[0] 
      : null, // Formato YYYY-MM-DD
    }
    return this.http.post<NotaVenta>(`${this.apiUrl}/update/${id}`, params);
  }

  deleteNotaVenta(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreNotaVenta(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }

  EstadoClienteNotaVenta(id: number,id_gestion: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${this.apiUrl}/estado_cuenta/${id}/${id_gestion}`);
  }
}
