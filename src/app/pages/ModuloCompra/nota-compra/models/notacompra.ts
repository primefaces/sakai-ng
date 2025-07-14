
import { User } from '../../../ModuloAuth/auth/models/user';
import { Gestion } from '../../../ModuloVenta/gestion/models/gestion';
import { Proveedor } from '../../proveedor/models/proveedor';

  
export interface NotaCompra {
  id: number;
  codigo: string;
  user_id: number;
  gestion_id: number;
  proveedor_id: number;
  codigo_factura: string;
  codigo_alterno: string | null;
  nota_alterna: boolean;
  motivo: string | null;
  fecha: Date;
  monto_total: string;
  lugar: string | null;
  recibido: string | null;
  compra_credito: boolean;
  estado: boolean;
  firma: boolean;
  user: User;
  gestion: Gestion;
  proveedor: Proveedor;
}

export interface ApiResponse {
  current_page: number;
  data: NotaCompra[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
  