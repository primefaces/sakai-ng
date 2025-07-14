import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaVenta, ApiResponse } from '../models/notaventa';
import { ProductoEnvase } from '../../../ModuloProducto/producto-envase/models/ProductoEnvase';
import { environment } from '../../../../../environments/environment';
import { DetalleNotaVenta } from '../models/detalleventa';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  private apiUrl = `${environment.backend.host}/detalle_venta`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  AddDetalleNotaVenta(detalle_venta: Partial<DetalleNotaVenta>): Observable<void> {
    const params = {
      nota_venta_id: detalle_venta.nota_venta_id,
      producto_envase_id: detalle_venta.producto_envase_id,
      precio_asignado: detalle_venta.precio_asignado,
      cantidad: detalle_venta.cantidad,
      dosis_recomendada: detalle_venta.dosis_recomendada,
      observacion: detalle_venta.observacion
    };

    return this.http.post<void>(`${this.apiUrl}/add`, params);
  }

  UpdateDetalleNotaVenta(detalle_venta: Partial<DetalleNotaVenta>): Observable<void> {
    const params = {
      precio_asignado: detalle_venta.precio_asignado,
      cantidad: detalle_venta.cantidad,
      dosis_recomendada: detalle_venta.dosis_recomendada,
      observacion: detalle_venta.observacion
    };
    return this.http.post<void>(`${this.apiUrl}/update/${detalle_venta.id}`, params);
  }

  DeleteDetalleNotaVenta(detalle_venta: Partial<DetalleNotaVenta>): Observable<void> {
    const params = {
      id : detalle_venta.id
    }
    return this.http.post<void>(`${this.apiUrl}/delete`,params);
  }

  restoreNotaVenta(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }
}
