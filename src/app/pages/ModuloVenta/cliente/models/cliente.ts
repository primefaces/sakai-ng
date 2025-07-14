export interface Cliente {
  id: number;
  image: string | null; 
  codigo: string;
  nombre: string;
  paterno: string;
  materno: string;
  ci: string;
  direccion: string | null;
  telefono: string | null;
  estado: boolean;
}

export interface ApiResponse2 {
  current_page: number;
  data: Cliente[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface ApiResponse {
  current_page: number;
  data: Cliente[];
  total: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  first_page_url: string;
  from: number;
  to: number;
  path: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}