export interface Categoria {
    id: number;
    nombre: string;
    estado: Boolean;
    //created_at: string;
    //updated_at: string;
}

export interface ApiResponse {
  current_page: number;
  data: Categoria[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}