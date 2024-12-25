// Service de gestion des articles
// Fournit des méthodes pour interagir avec l'API des articles

import axios from 'axios';
import { authService } from './authService';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant un article dans l'application
 */
export interface Article {
    id: number;            // Identifiant unique de l'article
    title: string;         // Titre de l'article
    slug: string;          // Version URL-friendly du titre
    content: string;       // Contenu complet de l'article
    excerpt: string;       // Résumé court de l'article
    featured_image: string;// URL de l'image de couverture
    status: 'draft' | 'published';  // Statut de publication
    category: string;      // Catégorie de l'article
    author_id: number;     // Identifiant de l'auteur
    created_at: string;    // Date de création
    updated_at: string;    // Date de dernière mise à jour
}

// Types utilitaires pour la création et la mise à jour d'articles
export interface ArticleCreate extends Omit<Article, 'id' | 'created_at' | 'updated_at' | 'author_id'> {}
export interface ArticleUpdate extends Partial<ArticleCreate> {}

/**
 * Service de gestion des articles
 * Fournit des méthodes CRUD et des opérations spécifiques
 */
const articleService = {
    /**
     * Récupère tous les articles
     * @returns Promise<Article[]> Liste de tous les articles
     */
    async getAll(): Promise<Article[]> {
        try {
            const response = await axios.get(`${API_URL}/articles`);
            console.log("Récupération de tous les articles");
            console.dir(response);
            return response?.data?.data || [];
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Récupère un article par son ID
     * @param id Identifiant de l'article
     * @returns Promise<Article> Détails de l'article
     */
    async getById(id: number): Promise<Article> {
        try {
            const response = await axios.get(`${API_URL}/articles/${id}`);
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Crée un nouvel article
     * @param data Données du nouvel article
     * @returns Promise<Article> Article créé
     */
    async create(data: ArticleCreate): Promise<Article> {
        try {
            const response = await axios.post(`${API_URL}/articles`, data);
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour un article existant
     * @param id Identifiant de l'article
     * @param data Nouvelles données de l'article
     * @returns Promise<Article> Article mis à jour
     */
    async update(id: number, data: ArticleUpdate): Promise<Article> {
        try {
            const response = await axios.put(`${API_URL}/articles/${id}`, data);
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Supprime un article
     * @param id Identifiant de l'article à supprimer
     */
    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/articles/${id}`);
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour le statut de publication d'un article
     * @param id Identifiant de l'article
     * @param status Nouveau statut de publication
     * @returns Promise<Article> Article avec le statut mis à jour
     */
    async updateStatus(id: number, status: Article['status']): Promise<Article> {
        try {
            const response = await axios.patch(`${API_URL}/articles/${id}/status`, { status });
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Télécharge une image pour un article
     * @param id Identifiant de l'article
     * @param image Fichier image à télécharger
     * @returns Promise<{ url: string }> URL de l'image téléchargée
     */
    async uploadImage(id: number, image: File): Promise<{ url: string }> {
        try {
            const formData = new FormData();
            formData.append('image', image);
            
            const response = await axios.post(`${API_URL}/articles/${id}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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

export default articleService;
