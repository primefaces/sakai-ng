//export interface Categoria {
//  id: number;
//  nombre: string;
//  estado: boolean;
//}
  
//export interface TipoProducto {
//  id: number;
//  nombre: string;
//  estado: boolean;
//}

import { TipoProducto } from '../../tipo-producto/models/TipoProducto';
import { Categoria } from '../../categoria/models/categoria';
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  dosis: string;
  estado: boolean;
  categoria: Categoria;
  tipo_producto: TipoProducto;
}
  
export interface ApiResponse {
  current_page: number;
  data: Producto[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}