// Service de gestion des articles
// Fournit des méthodes pour interagir avec l'API des articles

import axios from 'axios';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Service de gestion des articles
 * Fournit des méthodes CRUD et des opérations spécifiques
 */
export interface Article {
    id?: number;
    title: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published' | 'archived';
    author_id?: number;
    featured_image?: string | null;
    categories?: number[];
    category_ids?: string;
    categories_names?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ArticleResponse {
    status: string;
    data: Article | Article[];
}

export const articleService = {
    /**
     * Récupère tous les articles
     * @param page Numéro de page
     * @param perPage Nombre d'articles par page
     * @returns Promise<Article[]> Liste de tous les articles
     */
    async getAllArticles(page: number = 1, perPage: number = 10): Promise<Article[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<{data: Article[]}>(`${API_URL}/articles`, {
                params: { page, per_page: perPage },
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des articles', error);
            throw error;
        }
    },

    /**
     * Crée un nouvel article
     * @param data Données du nouvel article
     * @returns Promise<Article> Article créé
     */
    async createArticle(data: Partial<Article>): Promise<Article> {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            console.log("Creation de l'article: ", data);
            // Convertir les données en FormData
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (key === 'category_ids' && Array.isArray(value)) {
                        // Convertir les IDs de catégories en chaîne
                        formData.append(key, value.join(','));
                    } else {
                        formData.append(key, value);
                    }
                }
            });


            const response = await axios.post<{data: Article}>(`${API_URL}/articles`, formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'article', error);
            throw error;
        }
    },

    /**
     * Met à jour un article existant
     * @param id Identifiant de l'article
     * @param data Nouvelles données de l'article
     * @returns Promise<Article> Article mis à jour
     */
    async updateArticle(id: number, data: Partial<Article>): Promise<Article> {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            // Convertir les données en FormData
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (key === 'category_ids' && Array.isArray(value)) {
                        // Convertir les IDs de catégories en chaîne
                        formData.append(key, value.join(','));
                    } else {
                        formData.append(key, value);
                    }
                }
            });

            const response = await axios.put<{data: Article}>(`${API_URL}/articles/${id}`, formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article', error);
            throw error;
        }
    },

    /**
     * Supprime un article
     * @param id Identifiant de l'article à supprimer
     */
    async deleteArticle(id: number): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/articles/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'article', error);
            throw error;
        }
    },

    /**
     * Télécharge une image pour un article
     * @param file Fichier image à télécharger
     * @returns Promise<string> URL de l'image téléchargée
     */
    uploadImage: async (file: File): Promise<string> => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token: ', token);
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post<{
                status: string, 
                data: { url: string }
            }>(`${API_URL}/articles/01/image`, formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Image telechargée avec url: ', response);
            if (response.data.status === 'success') {
                return response.data.data.url;
            } else {
                throw new Error('Échec du téléchargement de l\'image');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image', error);
            throw error;
        }
    },
};

// Ajout de l'export par défaut
export default articleService;
