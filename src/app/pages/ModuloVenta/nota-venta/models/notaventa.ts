
import { Cliente } from '../../cliente/models/cliente';
import { User } from '../../../ModuloAuth/auth/models/user';
import { Gestion } from '../../gestion/models/gestion';
import { Cultivo } from '../../cultivo/models/cultivo';

//export interface User {
//  id: number;
//  name: string;
//  email: string;
//  estado: boolean;
//}
  
//export interface Gestion {
//  id: number;
//  anio: number;
//  nombre_campania: string;
//  gestion_actual: boolean;
//  estado: boolean;
//}
 
//export interface Cultivo {
//  id: number;
//  nombre: string;
//  estado: boolean;
//}
  
export interface NotaVenta {
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
  fecha: Date;
  monto_total: string;
  lugar: string | null;
  recibido: string | null;
  venta_credito: boolean;
  estado: boolean;
  firma: boolean;
  cliente: Cliente;
  user: User;
  gestion: Gestion;
  cultivo: Cultivo;
}

export interface ApiResponse {
  current_page: number;
  data: NotaVenta[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
  