import {ProductoEnvase} from '../../../ModuloProducto/producto-envase/models/ProductoEnvase';

export interface DetalleNotaDevolucion {
  id: number;
  nota_devolucion_id: number;
  producto_envase_id: number;
  precio_asignado: number;
  cantidad: number;
  subtotal: number;
  observacion: string | null;
  estado: boolean;
  producto_envase: ProductoEnvase;
}

export interface NotaDevolucion_Detalles {
  id: number;
  codigo: string;
  cliente_id: number;
  user_id: number;
  gestion_id: number;
  cultivo_id: number;
  codigo_factura: string;
  codigo_alterno: string | null;
  nota_alterna: boolean;
  motivo: string | null;
  fecha: string;
  monto_total: string;
  lugar: string | null;
  recibido: string | null;
  estado: boolean;
  firma: boolean;
  created_at: string;
  updated_at: string;
  detalles_devolucion: DetalleNotaDevolucion[];
}
