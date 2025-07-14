
import { Cliente } from '../../../ModuloVenta/cliente/models/cliente';
import { User } from '../../../ModuloAuth/auth/models/user';
import { Gestion } from '../../../ModuloVenta/gestion/models/gestion';
import { Proveedor } from '../../../ModuloCompra/proveedor/models/proveedor';
  
export interface NotaDevolucion {
  id: number;
  codigo: string;
  cliente_id: number;
  proveedor_id: number;
  user_id: number;
  gestion_id: number;
  cultivo_id: number;
  codigo_factura: string;
  codigo_alterno: string | null;
  nota_alterna: boolean;
  motivo: string | null;
  fecha: Date;
  monto_total: string;
  lugar: string | null;
  recibido: string | null;
  estado: boolean;
  firma: boolean;
  cliente: Cliente;
  proveedor: Proveedor;
  user: User;
  gestion: Gestion;
 
}

export interface ApiResponse {
  current_page: number;
  data: NotaDevolucion[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
  