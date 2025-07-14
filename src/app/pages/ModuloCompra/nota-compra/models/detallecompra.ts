import {ProductoEnvase} from '../../../ModuloProducto/producto-envase/models/ProductoEnvase';

export interface DetalleNotaCompra {
  id: number;
  nota_compra_id: number;
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

export interface NotaCompra_Detalles {
  id: number;
  codigo: string;
  user_id: number;
  gestion_id: number;
  proveedor_id: number;
  codigo_factura: string;
  codigo_alterno: string | null;
  nota_alterna: boolean;
  motivo: string | null;
  fecha: string;
  monto_total: string;
  lugar: string | null;
  recibido: string | null;
  compra_credito: boolean;
  estado: boolean;
  firma: boolean;
  detalles_compra: DetalleNotaCompra[];
}
