// Service de gestion des articles de blog

import axios from 'axios';
import { authService } from './authService';
import { blogPosts } from '../data/blogPosts';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

// Interface représentant un article de blog
export interface BlogPost {
    id: number;                 // Identifiant unique de l'article
    title: string;              // Titre de l'article
    slug: string;               // URL amicale de l'article
    excerpt: string;            // Extrait court de l'article
    content: string;            // Contenu complet de l'article
    featured_image?: string;    // Image à la une
    status: 'draft' | 'published'; // Statut de publication
    author_id: number;          // ID de l'auteur
    author_name?: string;       // Nom de l'auteur
    created_at: string;         // Date de création
    updated_at: string;         // Date de dernière mise à jour
    categories?: string[];      // Catégories de l'article
    category_ids?: number[];    // IDs des catégories
    read_time?: number;         // Temps de lecture estimé
    comment_count?: number;     // Nombre de commentaires
}

// Interface pour la réponse paginée
export interface PaginatedBlogResponse {
    data: BlogPost[];
    total: number;
    page: number;
    per_page: number;
}

// Interface pour les paramètres de filtrage
export interface BlogFilterParams {
    page?: number;
    per_page?: number;
    category_id?: number;
    searchQuery?: string;
    status?: 'draft' | 'published';
    sortOrder?: 'newest' | 'oldest';
}

const blogService = {
    /**
     * Récupère tous les articles de blog avec pagination et filtrage
     * @param params Paramètres de filtrage et pagination
     * @returns Promise<PaginatedBlogResponse> Liste paginée des articles
     */
    async getPosts(params: BlogFilterParams = {}): Promise<{ 
        posts: BlogPost[], 
        totalPages: number, 
        currentPage: number 
    }> {
        try {
            // Construire les paramètres de requête
            const queryParams = new URLSearchParams();
            
            // Ajouter les paramètres de pagination
            queryParams.append('page', (params.page || 1).toString());
            queryParams.append('per_page', (params.per_page || 6).toString());

            // Ajouter les filtres optionnels
            if (params.category_id) {
                queryParams.append('category_id', params.category_id.toString());
            }
            if (params.searchQuery) {
                queryParams.append('search', params.searchQuery);
            }
            if (params.status) {
                queryParams.append('status', params.status);
            }
            if (params.sortOrder) {
                queryParams.append('sort_order', params.sortOrder);
            }

            // Effectuer la requête
            const response = await axios.get<PaginatedBlogResponse>(
                `${API_URL}/articles?${queryParams.toString()}`
            );
          

            // Transformer les données pour correspondre à l'interface BlogPost
            const posts: BlogPost[] = response?.data?.data?.map((post: any) => ({
                id: post?.id,
                title: post?.title,
                slug: post?.slug,
                excerpt: post?.excerpt,
                content: post?.content,
                featured_image: post?.featured_image || '',
                status: post?.status,
                author_id: post?.author_id,
                author_name: post?.author_name || 'Auteur inconnu',
                created_at: post?.created_at,
                updated_at: post?.updated_at,
                // categories: post?.categories ? post?.categories.split(',') : [],
                categories: post?.categories ? post?.categories : [],
                category_ids: post?.category_ids,
                read_time: post?.read_time || 5,
                comment_count: post?.comment_count || 0
            }));
            console.log("Récupération de tous les articles: ", response.data);
            return {
                posts,
                // totalPages: Math.ceil(response.data.total / (params.per_page || 6)),
                totalPages: Math.ceil(response.data.total / (response.data.per_page || 6)),
                currentPage: response.data.page
                // per_page: response.data.per_page
            };
        } catch (error: any) {
            console.error('Erreur lors de la récupération des articles', error);
            // Fallback aux données statiques en cas d'erreur
            // return {
            //     posts: blogPosts,
            //     totalPages: Math.ceil(blogPosts.length / 10),
            //     currentPage: 1
            // };
        }
    },

    /**
     * Récupère un article de blog par son ID ou son slug
     * @param idOrSlug ID ou slug de l'article
     * @returns Promise<BlogPost> Détails de l'article
     */
    async getPostById(idOrSlug: number | string): Promise<BlogPost> {
        try {
            const response = await axios.get<{ data: BlogPost }>(
                `${API_URL}/articles/${idOrSlug}`
            );
            return response.data.data;
        } catch (error: any) {
            console.error('Erreur lors de la récupération des détails de l\'article', error);
            // Fallback à un article statique si nécessaire
            const fallbackPost = blogPosts.find(p => 
                p.slug === idOrSlug || p.id.toString() === idOrSlug.toString()
            );
            
            if (fallbackPost) {
                return {
                    ...fallbackPost,
                    content: fallbackPost.excerpt
                };
            }

            throw error;
        }
    },

    /**
     * Crée un nouvel article de blog
     * @param postData Données de l'article à créer
     * @returns Promise<BlogPost> Article créé
     */
    async createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
        try {
            const response = await axios.post<{ data: BlogPost }>(
                `${API_URL}/articles`, 
                postData
            );
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour un article de blog existant
     * @param id ID de l'article
     * @param postData Données à mettre à jour
     * @returns Promise<BlogPost> Article mis à jour
     */
    async updatePost(id: number, postData: Partial<BlogPost>): Promise<BlogPost> {
        try {
            const response = await axios.put<{ data: BlogPost }>(
                `${API_URL}/articles/${id}`, 
                postData
            );
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Supprime un article de blog
     * @param id ID de l'article à supprimer
     */
    async deletePost(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/articles/${id}`);
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Télécharge une image pour un article
     * @param file Fichier image à télécharger
     * @returns Promise<{ url: string }> URL de l'image téléchargée
     */
    async uploadImage(file: File): Promise<{ url: string }> {
        const formData = new FormData();
        formData.append('featured_image', file);

        try {
            const response = await axios.post<{ url: string }>(
                `${API_URL}/articles/upload-image`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
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

export default blogService;
