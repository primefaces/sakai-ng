import { Producto } from '../../../ModuloProducto/producto/models/producto';
import { Unidad} from '../../../ModuloProducto/unidad/models/unidad';

export interface InventarioProductoEnvase {
  id: number;
  codigo: string | null;
  image: string | null; // Base64 se almacena como string
  producto_id: number | null;
  unidad_id: number | null;
  cantidad: number;
  precio_estimado: number;
  margen_minimo: number;
  margen_standar: number;
  margen_maximo: number;
  estado: boolean;
  sumTotalProductoVendido: number;
  sumTotalProductoComprado: number;
  stockActual: number;
  producto: Producto;
  unidad: Unidad;
}

export interface ApiResponse {
  current_page: number;
  data: InventarioProductoEnvase[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  total: number;
}