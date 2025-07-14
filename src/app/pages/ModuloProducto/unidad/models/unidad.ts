//export interface Unidad {
//    id: number;
//    nombre: string;
//    nombre_corto: string;
//    estado: number; // 1 = Activo, 0 = Inactivo
//}
//export interface Column {
//  field: string;
//  header: string;
//  customExportHeader?: string;
//}
//
//export interface ExportColumn {
//  title: string;
//  dataKey: string;
//}

export interface Unidad {
  id: number;
  nombre: string;
  nombre_corto: string;
  estado: Boolean;
  created_at: string;
  updated_at: string;
}
  
export interface ApiResponse {
  current_page: number;
  data: Unidad[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}