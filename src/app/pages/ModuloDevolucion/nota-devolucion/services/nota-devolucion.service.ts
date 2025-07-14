import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaDevolucion, ApiResponse } from '../models/notadevolucion';
import { DetalleNotaDevolucion } from '../models/detalledevolucion';
import { environment } from '../../../../../environments/environment';
import { EstadoCuenta } from '../models/estadoCuenta';

@Injectable({
  providedIn: 'root'
})
export class NotaDevolucionService {
  private apiUrl = `${environment.backend.host}/nota_devolucion`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  getNotaDevolucions(page: number = 1, perPage: number = 10,filters: any = {}, sortField: string = '', sortOrder: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    if (filters.fecha) {params = params.set('fecha', filters.fecha);}
    if (filters.gestion) {params = params.set('gestion', filters.gestion);}
    if (filters.cliente) {params = params.set('cliente', filters.cliente);}
    if (filters.proveedor) {params = params.set('proveedor', filters.proveedor);}
    if (filters.optionNota) {params = params.set('optionNota', filters.optionNota);}

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

  getDetallesNota(nota_devolucion: Partial<NotaDevolucion>): Observable<DetalleNotaDevolucion[]> { 
    return this.http.get<DetalleNotaDevolucion[]>(`${this.apiUrl}/detalle/${nota_devolucion.id}`, { });
  }

  CompletarFirmaNotaDevolucion(nota_devolucion: Partial<NotaDevolucion>): Observable<void> { 
    return this.http.get<void>(`${this.apiUrl}/firma/${nota_devolucion.id}`, { });
  }

  AnularNotaDevolucion(nota_devolucion: Partial<NotaDevolucion>, motivo: string = 'no se pudo obtener el motivo'): Observable<void> {
    const codigo = nota_devolucion.codigo_factura;
    const params = new HttpParams().set('codigo_factura', codigo || '').set('motivo', motivo);
    return this.http.post<void>(`${this.apiUrl}/anular_nota`, params);
  }

  createNotaDevolucion(nota_devolucion: Partial<NotaDevolucion>): Observable<NotaDevolucion> {
    const params = {
      ...nota_devolucion,
      fecha: nota_devolucion.fecha 
      ? new Date(nota_devolucion.fecha.getTime() - (nota_devolucion.fecha.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0]
      : null// Formato YYYY-MM-DD
    }
    return this.http.post<NotaDevolucion>(`${this.apiUrl}/store`, params);
  }

  updateNotaDevolucion(id: number, nota_devolucion: Partial<NotaDevolucion>): Observable<NotaDevolucion> {
    const params = {
      ...nota_devolucion,
      fecha: nota_devolucion.fecha 
      ? new Date(nota_devolucion.fecha).toISOString().split('T')[0] 
      : null, // Formato YYYY-MM-DD
    }
    return this.http.post<NotaDevolucion>(`${this.apiUrl}/update/${id}`, params);
  }

  deleteNotaDevolucion(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/destroy/${id}`);
  }

  restoreNotaDevolucion(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }

  EstadoClienteNotaDevolucion(id: number,id_gestion: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${this.apiUrl}/estado_cuenta/${id}/${id_gestion}`);
  }
}
