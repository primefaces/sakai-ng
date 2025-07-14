export interface Role {
 id: number;
 name: string;
 description: string;
}
export interface User {
    id: number;
    image: string;
    name: string;
    email: string;
    token?: string; // Se usa para autenticación con tokens (Sanctum)
    roles: Role[]; 
}