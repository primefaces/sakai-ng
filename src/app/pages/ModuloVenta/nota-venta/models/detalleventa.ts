import {ProductoEnvase} from '../../../ModuloProducto/producto-envase/models/ProductoEnvase';

export interface DetalleNotaVenta {
  id: number;
  nota_venta_id: number;
  producto_envase_id: number;
  precio_asignado: number;
  cantidad: number;
  subtotal: number;
  dosis_recomendada: string | null;
  dosis_comercial: string | null;
  observacion: string | null;
  estado: boolean;
  producto_envase: ProductoEnvase;
}

export interface NotaVenta_Detalles {
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
  venta_credito: boolean;
  estado: boolean;
  firma: boolean;
  created_at: string;
  updated_at: string;
  detalles_venta: DetalleNotaVenta[];
}
