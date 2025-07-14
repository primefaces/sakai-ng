export interface Gestion {
  id: number;
  anio: number;
  nombre_campania: string;
  gestion_actual: boolean;
  estado: boolean;
}

export interface ApiResponse {
  current_page: number;
  data: Gestion[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}