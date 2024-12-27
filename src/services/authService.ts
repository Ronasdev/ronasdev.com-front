// Service d'authentification
// Gère les opérations liées à l'authentification et à la gestion des utilisateurs

import axios from 'axios';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

// Configuration globale d'Axios pour l'ajout automatique du token d'authentification
axios.interceptors.request.use(
    (config) => {
        // Ajoute le token d'authentification à chaque requête si disponible
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

/**
 * Interface représentant un utilisateur dans l'application
 */
export interface User {
    id: number;            // Identifiant unique de l'utilisateur
    name: string;          // Nom complet de l'utilisateur
    email: string;         // Adresse email
    role: string;          // Rôle de l'utilisateur (admin, utilisateur, etc.)
    avatar?: string;       // URL de l'avatar (optionnel)
    created_at: string;    // Date de création du compte
    updated_at: string;    // Date de dernière mise à jour
}

/**
 * Interface de réponse lors de l'authentification
 */
export interface AuthResponse {
    user: User;    // Informations de l'utilisateur
    token: string; // Token d'authentification
}

/**
 * Interface pour les identifiants de connexion
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Interface pour les données d'inscription
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

/**
 * Interface pour la demande de réinitialisation de mot de passe
 */
export interface PasswordResetRequest {
    email: string;
}

/**
 * Interface pour la confirmation de réinitialisation de mot de passe
 */
export interface PasswordResetConfirm {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

// Clés de stockage pour le token et l'utilisateur
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

/**
 * Service d'authentification avec méthodes pour la gestion des utilisateurs
 */
export const authService = {
    /**
     * Connexion de l'utilisateur
     * @param credentials Identifiants de connexion
     * @returns Réponse d'authentification avec utilisateur et token
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
            console.log("login data");
            console.dir(response);
            this.setToken(response.data.token);
            this.setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    /**
     * Inscription d'un nouvel utilisateur
     * @param data Données d'inscription
     * @returns Réponse d'authentification avec utilisateur et token
     */
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

    /**
     * Récupère l'utilisateur actuellement connecté
     * @returns Informations de l'utilisateur ou null si non connecté
     */
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

    /**
     * Met à jour le profil de l'utilisateur
     * @param userId Identifiant de l'utilisateur
     * @param data Données à mettre à jour
     * @returns Utilisateur mis à jour
     */
    async updateProfile(userId: number, data: Partial<User>): Promise<User> {
        try {
            const response = await axios.put<User>(`${API_URL}/users/${userId}`, data);
            this.setUser(response.data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    /**
     * Change le mot de passe de l'utilisateur
     * @param userId Identifiant de l'utilisateur
     * @param oldPassword Ancien mot de passe
     * @param newPassword Nouveau mot de passe
     */
    async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        try {
            await axios.put(`${API_URL}/users/${userId}/password`, {
                old_password: oldPassword,
                new_password: newPassword
            });
        } catch (error) {
            throw this.handleError(error);
        }
    },

    /**
     * Demande de réinitialisation de mot de passe
     * @param email Email de l'utilisateur
     */
    async requestPasswordReset(email: PasswordResetRequest): Promise<void> {
        try {
            await axios.post(`${API_URL}/auth/forgot-password`, email);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    /**
     * Réinitialise le mot de passe
     * @param data Données de réinitialisation de mot de passe
     */
    async resetPassword(data: PasswordResetConfirm): Promise<void> {
        try {
            await axios.post(`${API_URL}/auth/reset-password`, data);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    /**
     * Stocke le token d'authentification
     * @param token Token à stocker
     */
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    },

    /**
     * Récupère le token d'authentification
     * @returns Token ou null
     */
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Stocke les informations de l'utilisateur
     * @param user Utilisateur à stocker
     */
    setUser(user: User): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    /**
     * Récupère les informations de l'utilisateur
     * @returns Utilisateur ou null
     */
    getUser(): User | null {
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Déconnecte l'utilisateur
     * Supprime le token et les informations utilisateur
     */
    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    /**
     * Gère les erreurs d'authentification
     * @param error Erreur capturée
     * @returns Erreur standardisée
     */
    handleError(error: any): Error {
        if (error.response) {
            return new Error(error.response.data.message || 'Erreur lors de l\'authentification');
        }
        return new Error('Une erreur est survenue');
    }
};

export default authService;
