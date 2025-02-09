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
    categories?: string[];
    category_ids?: string;
    categories_names?: string;
    created_at?: string;
    updated_at?: string;
}
export interface GetAllArticleResponse {
    articles: Article[],
    pagination: {
        current_page: number;
        per_page: number;
        total_pages: number;
        total_articles: number;
    }
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
    async getAllArticles(page: number = 1, perPage: number = 10): Promise<GetAllArticleResponse> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<{ data: GetAllArticleResponse }>(`${API_URL}/articles`, {
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

            // console.log("Creation de l'article: ", data);
            // Convertir les données en FormData
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined) {
                    // // Ajouter une condition pour ne pas ajouter l'image existante
                    // if (key === 'featured_image' && typeof value === 'string') {
                    //     // Si c'est une URL, ne pas l'ajouter
                    //     return;
                    // }

                    if (key === 'category_ids' && Array.isArray(value)) {
                        // Convertir les IDs de catégories en chaîne
                        formData.append(key, value.join(','));
                    }
                    // else if (key === 'featured_image' && value instanceof File) {
                    //     // Ajouter uniquement les nouveaux fichiers
                    //     formData.append(key, value);
                    // } 
                    else {
                        formData.append(key, value);
                    }
                }
            });

            const response = await axios.post<{ data: Article }>(`${API_URL}/articles`, formData, {
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

            // Préparation des données
            const updateData = {
                title: data.title,
                content: data.content,
                excerpt: data.excerpt || '',
                status: data.status || 'draft',
                category_ids: data.category_ids,
                featured_image: data.featured_image
            };

            console.log("Données de mise à jour de l'article:", updateData);

            // Si une nouvelle image est présente, utiliser FormData
            // if (data?.featured_image instanceof File) {
            //     const formData = new FormData();

            //     // Ajouter tous les champs textuels
            //     Object.entries(updateData).forEach(([key, value]) => {
            //         if (value !== undefined) {
            //             formData.append(key, value as string);
            //         }
            //     });

            //     // Ajouter le fichier image
            //     formData.append('featured_image', data.featured_image);

            //     const response = await axios.put<{ data: Article }>(`${API_URL}/articles/${id}`, formData, {
            //         headers: {
            //             'Authorization': `Bearer ${token}`,
            //             'Content-Type': 'multipart/form-data'
            //         },
            //         timeout: 10000
            //     });

            //     console.log("Réponse de mise à jour de l'article (image):", response.data);
            //     return response.data.data;
            // } else {
            // Requête standard pour les mises à jour sans image
            const response = await axios.put<{ data: Article }>(`${API_URL}/articles/${id}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            });

            console.log("Réponse de mise à jour de l'article:", response.data);
            return response.data.data;
            // }
        } catch (error) {
            console.error('Erreur détaillée lors de la mise à jour de l\'article', error);

            // Log plus détaillé des erreurs
            if (axios.isAxiosError(error)) {
                console.error('Détails de l\'erreur Axios:', {
                    response: error.response?.data,
                    status: error.response?.status,
                    headers: error.response?.headers
                });
            }

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
