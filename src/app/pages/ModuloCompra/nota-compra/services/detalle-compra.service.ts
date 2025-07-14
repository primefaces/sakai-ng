import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaCompra, ApiResponse } from '../models/notacompra';
import { ProductoEnvase } from '../../../ModuloProducto/producto-envase/models/ProductoEnvase';
import { environment } from '../../../../../environments/environment';
import { DetalleNotaCompra } from '../models/detallecompra';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  private apiUrl = `${environment.backend.host}/detalle_compra`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  AddDetalleNotaCompra(detalle_venta: Partial<DetalleNotaCompra>): Observable<void> {
    const params = {
      nota_compra_id: detalle_venta.nota_compra_id,
      producto_envase_id: detalle_venta.producto_envase_id,
      precio_asignado: detalle_venta.precio_asignado,
      cantidad: detalle_venta.cantidad,
      observacion: detalle_venta.observacion
    };

    return this.http.post<void>(`${this.apiUrl}/add`, params);
  }

  UpdateDetalleNotaCompra(detalle_venta: Partial<DetalleNotaCompra>): Observable<void> {
    const params = {
      precio_asignado: detalle_venta.precio_asignado,
      cantidad: detalle_venta.cantidad,
      observacion: detalle_venta.observacion
    };
    return this.http.post<void>(`${this.apiUrl}/update/${detalle_venta.id}`, params);
  }

  DeleteDetalleNotaCompra(detalle_venta: Partial<DetalleNotaCompra>): Observable<void> {
    const params = {
      id : detalle_venta.id
    }
    return this.http.post<void>(`${this.apiUrl}/delete`,params);
  }

  restoreNotaCompra(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }
}
