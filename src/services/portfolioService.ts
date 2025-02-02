// Fournit des méthodes pour interagir avec l'API des portfolios

import axios from 'axios';
import { authService } from './authService';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

export interface PortfolioProject {
    id: number;            // Identifiant unique du projet
    title: string;         // Titre du projet
    description: string;   // Description détaillée
    technologies: string[];// Technologies utilisées
    image: string;         // URL de l'image du projet
    link?: string;         // URL du projet (optionnel)
    github?: string;       // URL du repository GitHub (optionnel)
    status: 'active' | 'archived'; // Statut du projet
    created_at: string;    // Date de création
    updated_at: string;    // Date de dernière mise à jour
}

// Types utilitaires pour la création et la mise à jour de projets
export interface PortfolioProjectCreate extends Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'> {}
export interface PortfolioProjectUpdate extends Partial<PortfolioProjectCreate> {
    id?: number;
}

// Interface pour la réponse paginée
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    per_page: number;
}

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
     * Récupère des projets de portfolio paginés avec filtrage
     * @param page Numéro de page
     * @param perPage Nombre de projets par page
     * @param technologies Technologies à filtrer
     * @param searchQuery Requête de recherche
     * @returns Promise<PaginatedResponse<PortfolioProject>> Projets paginés
     */
    async getPaginatedProjects(
        page: number = 1, 
        perPage: number = 6, 
        technologies?: string[], 
        searchQuery?: string
    ): Promise<PaginatedResponse<PortfolioProject>> {
        try {
            // Construire les paramètres de requête
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: perPage.toString()
            });

            // Ajouter les technologies si spécifiées
            if (technologies && technologies.length > 0) {
                params.append('technologies', technologies.join(','));
            }

            // Ajouter la requête de recherche si spécifiée
            if (searchQuery && searchQuery.trim() !== '') {
                params.append('search', searchQuery);
            }

            // Effectuer la requête
            const response = await axios.get<PaginatedResponse<PortfolioProject>>(
                `${API_URL}/portfolio?${params.toString()}`
            );

            return response.data;
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
     * @param file Fichier image à télécharger
     * @returns Promise<{ url: string }> URL de l'image téléchargée
     */
    async uploadImage(file: File): Promise<{ url: string }> {
        // console.log("portfolio image: ", file);
        const token = localStorage.getItem('token');
        // console.log('Token: ', token);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // const response = await axios.post<{ url: string }>(`${API_URL}/portfolio/upload-image`, formData, {
            const response = await axios.post<{
                status: string,
                data: { url: string }
            }>(`${API_URL}/portfolio/1/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log("Image telechargée avec url: ", response);
            return response?.data?.data;
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
