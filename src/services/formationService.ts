// Service de gestion des formations
// Fournit des méthodes pour interagir avec l'API des formations

import axios from 'axios';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant une formation dans l'application
 */
export interface Formation {
    id: number;            // Identifiant unique de la formation
    title: string;         // Titre de la formation
    description: string;   // Description détaillée
    price: number;         // Prix de la formation
    duration: string;      // Durée de la formation
    level: string;         // Niveau de difficulté
    status: string;        // Statut de la formation
    image?: string;        // URL de l'image de la formation (optionnel)
    created_at: string;    // Date de création
    updated_at: string;    // Date de dernière mise à jour
}

/**
 * Service de gestion des formations
 * Fournit des méthodes CRUD et des opérations spécifiques
 */
const formationService = {
    /**
     * Récupère toutes les formations
     * @returns Promise<Formation[]> Liste de toutes les formations
     */
    async getAll(): Promise<Formation[]> {
        try {
            const response = await axios.get<{ data: Formation[] }>(`${API_URL}/formations`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("Récupération de toutes les formations");
            console.dir(response);
            return response.data.data || [];
        } catch (error) {
            console.error('Erreur lors de la récupération des formations:', error);
            return [];
        }
    },

    /**
     * Récupère une formation par son ID
     * @param id Identifiant de la formation
     * @returns Promise<Formation | null> Détails de la formation ou null si non trouvée
     */
    async getById(id: number): Promise<Formation | null> {
        try {
            const response = await axios.get<{ data: Formation }>(`${API_URL}/formations/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la formation ${id}:`, error);
            return null;
        }
    },

    /**
     * Crée une nouvelle formation
     * @param data Données partielles de la formation
     * @returns Promise<Formation | null> Formation créée ou null en cas d'erreur
     */
    async create(data: Partial<Formation>): Promise<Formation | null> {
        try {
            const response = await axios.post<{ data: Formation }>(`${API_URL}/formations`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la création de la formation:', error);
            return null;
        }
    },

    /**
     * Met à jour une formation existante
     * @param id Identifiant de la formation
     * @param data Données partielles à mettre à jour
     * @returns Promise<Formation | null> Formation mise à jour ou null en cas d'erreur
     */
    async update(id: number, data: Partial<Formation>): Promise<Formation | null> {
        try {
            const response = await axios.put<{ data: Formation }>(`${API_URL}/formations/${id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la formation ${id}:`, error);
            return null;
        }
    },

    /**
     * Supprime une formation
     * @param id Identifiant de la formation à supprimer
     * @returns Promise<boolean> True si suppression réussie, false sinon
     */
    async delete(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/formations/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return true;
        } catch (error) {
            console.error(`Erreur lors de la suppression de la formation ${id}:`, error);
            return false;
        }
    },

    /**
     * Met à jour le statut d'une formation
     * @param id Identifiant de la formation
     * @param status Nouveau statut
     * @returns Promise<Formation | null> Formation avec le statut mis à jour ou null en cas d'erreur
     */
    async updateStatus(id: number, status: string): Promise<Formation | null> {
        try {
            const response = await axios.patch<{ data: Formation }>(
                `${API_URL}/formations/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data.data;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du statut de la formation ${id}:`, error);
            return null;
        }
    }
};

export default formationService;