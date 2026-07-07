export interface AuthRole {
    role_id: string;
    role_name: string;
    permissions?: string[];
}

export interface AuthUser {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: AuthRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: AuthUser;
    token: string;
}
