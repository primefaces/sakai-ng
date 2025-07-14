export interface AuthResponse {
    token: string;
    user?: any; // Puedes definir mejor el tipo según lo que devuelva tu API
}