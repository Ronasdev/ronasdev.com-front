// Service de gestion des utilisateurs
// Fournit des méthodes pour interagir avec l'API de gestion des utilisateurs

import axios from 'axios';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant un utilisateur dans l'application
 * Définit la structure complète des données utilisateur
 */
export interface User {
    id: number;          // Identifiant unique de l'utilisateur
    name: string;        // Nom de l'utilisateur
    email: string;       // Email de l'utilisateur
    role: string;        // Rôle de l'utilisateur (admin, user, etc.)
    avatar?: string;     // URL de l'avatar (optionnel)
    created_at?: string; // Date de création du compte (optionnel)
    updated_at?: string; // Date de dernière mise à jour (optionnel)
}

/**
 * Service de gestion des utilisateurs
 * Fournit des méthodes CRUD pour la manipulation des utilisateurs
 */
export const userService = {
    /**
     * Récupère tous les utilisateurs
     * @returns Promise<User[]> Liste de tous les utilisateurs
     */
    async getAll(): Promise<User[]> {
        try {
            const response = await axios.get<{ data: User[] }>(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` }
            });
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },

    /**
     * Récupère un utilisateur par son identifiant
     * @param id Identifiant de l'utilisateur
     * @returns Promise<User | null> Utilisateur trouvé ou null
     */
    async getById(id: number): Promise<User | null> {
        try {
            const response = await axios.get<{ data: User }>(`${API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            return null;
        }
    },

    /**
     * Crée un nouvel utilisateur
     * @param data Données partielles de l'utilisateur
     * @returns Promise<User | null> Utilisateur créé ou null
     */
    async create(data: Partial<User>): Promise<User | null> {
        try {
            const response = await axios.post<{ data: User }>(`${API_URL}/users`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    },

    /**
     * Met à jour les informations d'un utilisateur
     * @param id Identifiant de l'utilisateur
     * @param data Données partielles à mettre à jour
     * @returns Promise<User | null> Utilisateur mis à jour ou null
     */
    async update(id: number, data: Partial<User>): Promise<User | null> {
        try {
            const response = await axios.put<{ data: User }>(`${API_URL}/users/${id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            return null;
        }
    },

    /**
     * Supprime un utilisateur
     * @param id Identifiant de l'utilisateur à supprimer
     * @returns Promise<boolean> Succès de la suppression
     */
    async delete(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return true;
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            return false;
        }
    },

    /**
     * Met à jour le rôle d'un utilisateur
     * @param id Identifiant de l'utilisateur
     * @param role Nouveau rôle de l'utilisateur
     * @returns Promise<User | null> Utilisateur avec le rôle mis à jour ou null
     */
    async updateRole(id: number, role: string): Promise<User | null> {
        try {
            const response = await axios.patch<{ data: User }>(
                `${API_URL}/users/${id}/role`,
                { role },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error updating user role ${id}:`, error);
            return null;
        }
    }
};
