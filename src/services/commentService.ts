// Service de gestion des commentaires
import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

// Types pour les commentaires
export interface Author {
    name: string;
    avatar: string;
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    author: Author;
    likes_count: number;
    is_liked: boolean;
    replies?: Comment[];
}

export interface CommentCreate {
    content: string;
    article_id: number;
    parent_id?: number;
}

export interface CommentResponse {
    status: string;
    data: Comment;
}

export interface CommentsResponse {
    status: string;
    data: Comment[];
}

export interface LikeResponse {
    status: string;
    data: {
        likes_count: number;
        is_liked: boolean;
    };
}

const commentService = {
    /**
     * Récupère tous les commentaires d'un article
     */
    async getByArticle(articleId: number): Promise<Comment[]> {
        try {
            const response = await axios.get<CommentsResponse>(
                `${API_URL}/articles/${articleId}/comments`
            );
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires:', error);
            throw error;
        }
    },

    /**
     * Crée un nouveau commentaire
     */
    async create(data: CommentCreate): Promise<Comment> {
        try {
            const token = authService.getToken();
            const response = await axios.post<CommentResponse>(
                `${API_URL}/comments`,
                data,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la création du commentaire:', error);
            throw error;
        }
    },

    /**
     * Répond à un commentaire existant
     */
    async replyToComment(parentId: number, data: CommentCreate): Promise<Comment> {
        try {
            const token = authService.getToken();
            const response = await axios.post<CommentResponse>(
                `${API_URL}/comments`,
                {
                    ...data,
                    parent_id: parentId
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la réponse au commentaire:', error);
            throw error;
        }
    },

    /**
     * Like ou unlike un commentaire
     */
    async toggleLike(commentId: number): Promise<LikeResponse['data']> {
        try {
            const token = authService.getToken();
            const response = await axios.post<LikeResponse>(
                `${API_URL}/comments/${commentId}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors du like/unlike:', error);
            throw error;
        }
    },

    /**
     * Signale un commentaire
     */
    async reportComment(commentId: number, reason?: string): Promise<void> {
        try {
            const token = authService.getToken();
            await axios.post(
                `${API_URL}/comments/${commentId}/report`,
                { reason },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
        } catch (error) {
            console.error('Erreur lors du signalement:', error);
            throw error;
        }
    }
};

export default commentService;
