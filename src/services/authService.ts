import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configuration d'Axios avec l'intercepteur pour le token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirm {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
            this.setToken(response.data.token);
            this.setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
            this.setToken(response.data.token);
            this.setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            const token = this.getToken();
            if (!token) return null;

            const response = await axios.get<User>(`${API_URL}/auth/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.setUser(response.data);
            return response.data;
        } catch (error) {
            this.logout();
            throw this.handleError(error);
        }
    },

    async updateProfile(userId: number, data: Partial<User>): Promise<User> {
        try {
            const response = await axios.put<User>(`${API_URL}/users/${userId}`, data, {
                headers: { Authorization: `Bearer ${this.getToken()}` }
            });
            this.setUser(response.data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        try {
            await axios.post(
                `${API_URL}/users/${userId}/change-password`,
                { old_password: oldPassword, new_password: newPassword },
                { headers: { Authorization: `Bearer ${this.getToken()}` } }
            );
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async requestPasswordReset(email: PasswordResetRequest): Promise<void> {
        try {
            await axios.post(`${API_URL}/auth/forgot-password`, email);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async resetPassword(data: PasswordResetConfirm): Promise<void> {
        try {
            await axios.post(`${API_URL}/auth/reset-password`, data);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    setUser(user: User): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    getUser(): User | null {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    handleError(error: any): Error {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message;
            return new Error(message);
        }
        return error instanceof Error ? error : new Error('Une erreur est survenue');
    }
};
