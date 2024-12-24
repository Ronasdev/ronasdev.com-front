import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

export interface Comment {
    id: number;
    content: string;
    user_id: number;
    article_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
}

export interface CommentCreate extends Pick<Comment, 'content' | 'article_id'> {}
export interface CommentUpdate extends Pick<Comment, 'content'> {}

const commentService = {
    async getAll(): Promise<Comment[]> {
        try {
            const response = await axios.get<{ data: Comment[] }>(`${API_URL}/comments`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("commentService get all");
            console.dir(response);
            return response.data.data || [];
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async getById(id: number): Promise<Comment> {
        try {
            const response = await axios.get<{ data: Comment }>(`${API_URL}/comments/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async getByArticle(articleId: number): Promise<Comment[]> {
        try {
            const response = await axios.get<{ data: Comment[] }>(`${API_URL}/articles/${articleId}/comments`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data || [];
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async create(data: CommentCreate): Promise<Comment> {
        try {
            const response = await axios.post<{ data: Comment }>(`${API_URL}/comments`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async update(id: number, data: CommentUpdate): Promise<Comment> {
        try {
            const response = await axios.put<{ data: Comment }>(`${API_URL}/comments/${id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/comments/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async updateStatus(id: number, status: Comment['status']): Promise<Comment> {
        try {
            const response = await axios.patch<{ data: Comment }>(
                `${API_URL}/comments/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

     handleError(error: any): Error {
        if (error.response) {
            const message = error.response.data?.message || 'Une erreur est survenue';
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

export default commentService;
