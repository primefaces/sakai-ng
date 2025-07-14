import { Gestion } from "../../../ModuloVenta/gestion/models/gestion";
export interface Configuracion {
    id_gestion: number,
    nombre_empresa: string,
    nit: string,
    telefono: string,
    direccion: string,
    razon_social: string,
    email: string,
    frase: string,
    logo: string,
    gestion: Gestion,
}