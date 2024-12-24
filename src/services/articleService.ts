import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    status: 'draft' | 'published';
    category: string;
    author_id: number;
    created_at: string;
    updated_at: string;
}

export interface ArticleCreate extends Omit<Article, 'id' | 'created_at' | 'updated_at' | 'author_id'> {}
export interface ArticleUpdate extends Partial<ArticleCreate> {}

const articleService = {
    async getAll(): Promise<Article[]> {
        try {
            const response = await axios.get(`${API_URL}/articles`);
            console.log("article get all");
            console.dir(response);
            return response?.data?.data || [];
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async getById(id: number): Promise<Article> {
        try {
            const response = await axios.get(`${API_URL}/articles/${id}`);
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async create(data: ArticleCreate): Promise<Article> {
        try {
            const response = await axios.post(`${API_URL}/articles`, data);
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async update(id: number, data: ArticleUpdate): Promise<Article> {
        try {
            const response = await axios.put(`${API_URL}/articles/${id}`, data);
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/articles/${id}`);
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async updateStatus(id: number, status: Article['status']): Promise<Article> {
        try {
            const response = await axios.patch(`${API_URL}/articles/${id}/status`, { status });
            return response?.data?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

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

     handleError(error: any): Error {
        if (error.response) {
            const message = error.response?.data?.message || 'Une erreur est survenue';
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

export default articleService;
