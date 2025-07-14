import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaCompra, ApiResponse } from '../models/notacompra';
import { DetalleNotaCompra } from '../models/detallecompra';
import { environment } from '../../../../../environments/environment';
import { EstadoCuenta } from '../models/estadoCuenta';

@Injectable({
  providedIn: 'root'
})
export class NotaCompraService {
  private apiUrl = `${environment.backend.host}/nota_compra`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getNotaCompras(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.fecha) {params = params.set('fecha', filters.fecha);}
    if (filters.gestion) {params = params.set('gestion', filters.gestion);}
    if (filters.Proveedor) {params = params.set('proveedor', filters.Proveedor);}

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

  getDetallesNota(nota_compra: Partial<NotaCompra>): Observable<DetalleNotaCompra[]> { 
    return this.http.get<DetalleNotaCompra[]>(`${this.apiUrl}/detalle/${nota_compra.id}`, { });
  }

  CompletarFirmaNotaCompra(nota_compra: Partial<NotaCompra>): Observable<void> { 
    return this.http.get<void>(`${this.apiUrl}/firma/${nota_compra.id}`, { });
  }

  AnularNotaCompra(nota_compra: Partial<NotaCompra>, motivo: string = 'no se pudo obtener el motivo'): Observable<void> {
    const codigo = nota_compra.codigo_factura;
    const params = new HttpParams().set('codigo_factura', codigo || '').set('motivo', motivo);
    return this.http.post<void>(`${this.apiUrl}/anular_nota`, params);
  }

  createNotaCompra(nota_compra: Partial<NotaCompra>): Observable<NotaCompra> {
    const params = {
      ...nota_compra,
      fecha: nota_compra.fecha 
      ? new Date(nota_compra.fecha.getTime() - (nota_compra.fecha.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0]
      : null,  // Formato YYYY-MM-DD
    }
    return this.http.post<NotaCompra>(`${this.apiUrl}/store`, params);
  }

  updateNotaCompra(id: number, nota_compra: Partial<NotaCompra>): Observable<NotaCompra> {
    const params = {
      ...nota_compra,
      fecha: nota_compra.fecha 
      ? new Date(nota_compra.fecha).toISOString().split('T')[0] 
      : null, // Formato YYYY-MM-DD
    }
    return this.http.post<NotaCompra>(`${this.apiUrl}/update/${id}`, params);
  }

  deleteNotaCompra(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreNotaCompra(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }

  EstadoClienteNotaCompra(id: number,id_gestion: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${this.apiUrl}/estado_cuenta/${id}/${id_gestion}`);
  }
}
