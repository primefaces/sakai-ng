export interface Cultivo {
  id: number;
  nombre: string;
  estado: boolean;
}
  
export interface ApiResponse {
  current_page: number;
  data: Cultivo[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}