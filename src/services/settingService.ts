import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

export interface Setting {
    id: number;
    key: string;
    value: string;
    type: 'text' | 'number' | 'boolean' | 'json' | 'image';
    group: 'general' | 'social' | 'seo' | 'contact';
    created_at: string;
    updated_at: string;
}

export interface SettingCreate extends Omit<Setting, 'id' | 'created_at' | 'updated_at'> {}
export interface SettingUpdate extends Partial<Omit<Setting, 'id' | 'created_at' | 'updated_at' | 'key'>> {}

const settingService = {
    async getAll(): Promise<Setting[]> {
        try {
            const response = await axios.get(`${API_URL}/settings`);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async getByGroup(group: Setting['group']): Promise<Setting[]> {
        try {
            const response = await axios.get(`${API_URL}/settings/group/${group}`);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async getByKey(key: string): Promise<Setting> {
        try {
            const response = await axios.get(`${API_URL}/settings/${key}`);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async update(key: string, data: SettingUpdate): Promise<Setting> {
        try {
            const response = await axios.put(`${API_URL}/settings/${key}`, data);
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async updateBulk(settings: { key: string; value: string }[]): Promise<Setting[]> {
        try {
            const response = await axios.put(`${API_URL}/settings/bulk`, { settings });
            return response?.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

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

export default settingService;
