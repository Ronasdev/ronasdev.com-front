import axios from 'axios';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

export interface Category {
    id?: number;
    name: string;
    slug?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CategoryResponse {
    status: string;
    data: Category | Category[];
}

export const categoryService = {
    /**
     * Récupère toutes les catégories
     * @returns Promise<Category[]> Liste de toutes les catégories
     */
    async getAllCategories(): Promise<Category[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<{data: Category[]}>(`${API_URL}/categories`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error);
            throw error;
        }
    },

    /**
     * Crée une nouvelle catégorie
     * @param data Données de la nouvelle catégorie
     * @returns Promise<Category> Catégorie créée
     */
    async createCategory(data: Partial<Category>): Promise<Category> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post<{data: Category}>(`${API_URL}/categories`, data, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la création de la catégorie', error);
            throw error;
        }
    },

    /**
     * Met à jour une catégorie existante
     * @param id Identifiant de la catégorie
     * @param data Nouvelles données de la catégorie
     * @returns Promise<Category> Catégorie mise à jour
     */
    async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put<{data: Category}>(`${API_URL}/categories/${id}`, data, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la catégorie', error);
            throw error;
        }
    },

    /**
     * Supprime une catégorie
     * @param id Identifiant de la catégorie à supprimer
     */
    async deleteCategory(id: number): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/categories/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error);
            throw error;
        }
    }
};

export default categoryService;
