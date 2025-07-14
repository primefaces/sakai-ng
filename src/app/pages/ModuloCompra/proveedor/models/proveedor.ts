export interface Proveedor {
    id: number;
    codigo: string;
    image: string | null;
    razon_social: string;
    direccion: string;
    correo: string;
    telefono: string;
    estado: boolean;
}

export interface ApiResponse {
  current_page: number;
  data: Proveedor[];
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