// Service de gestion des paramètres de l'application
// Fournit des méthodes pour interagir avec l'API des paramètres

import axios from 'axios';
import { authService } from './authService';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant un paramètre de l'application
 */
export interface Setting {
    id: number;            // Identifiant unique du paramètre
    key: string;           // Clé unique du paramètre
    value: string;         // Valeur du paramètre
    type: 'text' | 'number' | 'boolean' | 'json' | 'image';  // Type de données
    group: 'general' | 'social' | 'seo' | 'contact';  // Groupe de paramètres
    created_at: string;    // Date de création
    updated_at: string;    // Date de dernière mise à jour
}

// Types utilitaires pour la création et la mise à jour des paramètres
export interface SettingCreate extends Omit<Setting, 'id' | 'created_at' | 'updated_at'> {}
export interface SettingUpdate extends Partial<Omit<Setting, 'id' | 'created_at' | 'updated_at' | 'key'>> {}

/**
 * Service de gestion des paramètres
 * Fournit des méthodes pour récupérer, mettre à jour et gérer les paramètres de l'application
 */
const settingService = {
    /**
     * Récupère tous les paramètres
     * @returns Promise<Setting[]> Liste de tous les paramètres
     */
    async getAll(): Promise<Setting[]> {
        try {
            const response = await axios.get(`${API_URL}/settings`);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Récupère les paramètres d'un groupe spécifique
     * @param group Groupe de paramètres
     * @returns Promise<Setting[]> Liste des paramètres du groupe
     */
    async getByGroup(group: Setting['group']): Promise<Setting[]> {
        try {
            const response = await axios.get(`${API_URL}/settings/group/${group}`);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Récupère un paramètre par sa clé
     * @param key Clé du paramètre
     * @returns Promise<Setting> Paramètre correspondant
     */
    async getByKey(key: string): Promise<Setting> {
        try {
            const response = await axios.get(`${API_URL}/settings/${key}`);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour un paramètre
     * @param key Clé du paramètre
     * @param data Données de mise à jour
     * @returns Promise<Setting> Paramètre mis à jour
     */
    async update(key: string, data: SettingUpdate): Promise<Setting> {
        try {
            const response = await axios.put(`${API_URL}/settings/${key}`, data);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour plusieurs paramètres en une seule requête
     * @param settings Liste des paramètres à mettre à jour
     * @returns Promise<Setting[]> Paramètres mis à jour
     */
    async updateBulk(settings: { key: string; value: string }[]): Promise<Setting[]> {
        try {
            const response = await axios.put(`${API_URL}/settings/bulk`, { settings });
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Télécharge une image pour un paramètre
     * @param key Clé du paramètre
     * @param image Fichier image à télécharger
     * @returns Promise<{ url: string }> URL de l'image téléchargée
     */
    async uploadImage(key: string, image: File): Promise<{ url: string }> {
        try {
            const formData = new FormData();
            formData.append('image', image);
            
            const response = await axios.post(`${API_URL}/settings/${key}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Gère les erreurs de requête API
     * @param error Erreur capturée
     * @returns Error standardisée
     */
    handleError(error: any): Error {
        if (error.response) {
            const message = error.response?.data?.message || 'Une erreur est survenue';
            // Déconnexion automatique en cas d'erreur 401 (non autorisé)
            if (error.response.status === 401) {
                authService.logout();
            }
            return new Error(message);
        }
        if (error.request) {
            return new Error('Impossible de contacter le serveur');
        }
        return new Error('Une erreur est survenue lors de la requête');
    }
};

export default settingService;
