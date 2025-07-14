import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DetalleNotaDevolucion } from '../models/detalledevolucion';

@Injectable({
  providedIn: 'root'
})
export class DetalleDevolucionService {
  private apiUrl = `${environment.backend.host}/detalle_devolucion`; // Ajusta según la API

  constructor(private http: HttpClient) {}

  AddDetalleNotaDevolucion(detalle_devolucion: Partial<DetalleNotaDevolucion>): Observable<void> {
    const params = {
      nota_devolucion_id: detalle_devolucion.nota_devolucion_id,
      producto_envase_id: detalle_devolucion.producto_envase_id,
      precio_asignado: detalle_devolucion.precio_asignado,
      cantidad: detalle_devolucion.cantidad,
      observacion: detalle_devolucion.observacion
    };

    return this.http.post<void>(`${this.apiUrl}/add`, params);
  }

  UpdateDetalleNotaDevolucion(detalle_devolucion: Partial<DetalleNotaDevolucion>): Observable<void> {
    const params = {
      precio_asignado: detalle_devolucion.precio_asignado,
      cantidad: detalle_devolucion.cantidad,
      observacion: detalle_devolucion.observacion
    };
    return this.http.post<void>(`${this.apiUrl}/update/${detalle_devolucion.id}`, params);
  }

  DeleteDetalleNotaDevolucion(detalle_devolucion: Partial<DetalleNotaDevolucion>): Observable<void> {
    const params = {
      id : detalle_devolucion.id
    }
    return this.http.post<void>(`${this.apiUrl}/delete`,params);
  }

  restoreNotaVenta(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/restore/${id}`);
  }
}
