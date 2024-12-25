// Service de gestion des portfolios
// Fournit des méthodes pour interagir avec l'API des portfolios

import axios from 'axios';
import { authService } from './authService';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant un projet de portfolio
 */
export interface PortfolioProject {
    id: number;            // Identifiant unique du projet
    title: string;         // Titre du projet
    description: string;   // Description détaillée
    technologies: string[];// Technologies utilisées
    image_url: string;     // URL de l'image du projet
    project_url?: string;  // URL du projet (optionnel)
    github_url?: string;   // URL du repository GitHub (optionnel)
    status: 'active' | 'archived'; // Statut du projet
    created_at: string;    // Date de création
    updated_at: string;    // Date de dernière mise à jour
}

// Types utilitaires pour la création et la mise à jour de projets
export interface PortfolioProjectCreate extends Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'> {}
export interface PortfolioProjectUpdate extends Partial<PortfolioProjectCreate> {}

/**
 * Service de gestion des portfolios
 * Fournit des méthodes CRUD et des opérations spécifiques
 */
const portfolioService = {
    /**
     * Récupère tous les projets de portfolio
     * @returns Promise<PortfolioProject[]> Liste de tous les projets
     */
    async getAll(): Promise<PortfolioProject[]> {
        try {
            const response = await axios.get<{ data: PortfolioProject[] }>(`${API_URL}/portfolio`);
            return response.data.data || [];
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Récupère un projet de portfolio par son ID
     * @param id Identifiant du projet
     * @returns Promise<PortfolioProject> Détails du projet
     */
    async getById(id: number): Promise<PortfolioProject> {
        try {
            const response = await axios.get<{ data: PortfolioProject }>(`${API_URL}/portfolio/${id}`);
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Crée un nouveau projet de portfolio
     * @param data Données du nouveau projet
     * @returns Promise<PortfolioProject> Projet créé
     */
    async create(data: PortfolioProjectCreate): Promise<PortfolioProject> {
        try {
            const response = await axios.post<{ data: PortfolioProject }>(`${API_URL}/portfolio`, data);
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour un projet de portfolio existant
     * @param id Identifiant du projet
     * @param data Nouvelles données du projet
     * @returns Promise<PortfolioProject> Projet mis à jour
     */
    async update(id: number, data: PortfolioProjectUpdate): Promise<PortfolioProject> {
        try {
            const response = await axios.put<{ data: PortfolioProject }>(`${API_URL}/portfolio/${id}`, data);
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Supprime un projet de portfolio
     * @param id Identifiant du projet à supprimer
     */
    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/portfolio/${id}`);
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Télécharge une image pour un projet de portfolio
     * @param id Identifiant du projet
     * @param image Fichier image à télécharger
     * @returns Promise<{ url: string }> URL de l'image téléchargée
     */
    async uploadImage(id: number, image: File): Promise<{ url: string }> {
        try {
            const formData = new FormData();
            formData.append('image', image);
            
            const response = await axios.post(`${API_URL}/portfolio/${id}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour le statut d'un projet de portfolio
     * @param id Identifiant du projet
     * @param status Nouveau statut du projet
     * @returns Promise<PortfolioProject> Projet avec le statut mis à jour
     */
    async updateStatus(id: number, status: PortfolioProject['status']): Promise<PortfolioProject> {
        try {
            const response = await axios.patch(`${API_URL}/portfolio/${id}/status`, { status });
            return response.data.data;
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
        } else if (error.request) {
            return new Error('Aucune réponse du serveur');
        }
        return new Error('Erreur de configuration de la requête');
    }
};

export default portfolioService;
