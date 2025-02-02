// Service de gestion des commentaires
// Fournit des méthodes pour interagir avec l'API des commentaires

import axios from 'axios';  // Client HTTP pour les requêtes
import { authService } from './authService';  // Service d'authentification

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant un commentaire
 * Définit la structure complète d'un commentaire dans l'application
 */
export interface Comment {
    id: number;            // Identifiant unique du commentaire
    content: string;       // Contenu du commentaire
    user_id: number;       // Identifiant de l'utilisateur ayant posté le commentaire
    article_id: number;    // Identifiant de l'article associé
    status: string;        // Statut du commentaire (approuvé, en attente, etc.)
    created_at: string;    // Date de création
    updated_at: string;    // Date de dernière mise à jour
    user?: {               // Informations optionnelles de l'utilisateur
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    likes: number;               // Nombre de likes
    isLiked: boolean;            // État de like
    replies?: Comment[];         // Reponses au commentaire
}

// Types utilitaires pour la création et la mise à jour de commentaires
export interface CommentCreate extends Pick<Comment, 'content' | 'article_id'> {}
export interface CommentUpdate extends Pick<Comment, 'content'> {}

/**
 * Service de gestion des commentaires
 * Fournit des méthodes CRUD pour les commentaires
 */
const commentService = {
    /**
     * Récupère tous les commentaires
     * @returns Promise<Comment[]> Liste de tous les commentaires
     */
    async getAll(): Promise<Comment[]> {
        try {
            const response = await axios.get<{ data: Comment[] }>(`${API_URL}/comments`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("Récupération de tous les commentaires");
            console.dir(response);
            return response.data.data || [];
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    async getByArticle(articleId: number): Promise<Comment[]> {
        try {
          const response = await axios.get<{ data: Comment[] }>(
            `${API_URL}/articles/${articleId}/comments`
          );
          return response.data.data.map(comment => ({
            ...comment,
            author: {
              name: comment.user?.name || 'Utilisateur',
              avatar: comment.user?.avatar || '/avatars/default.jpg'
            }
          }));
        } catch (error) {
          throw this.handleError(error);
        }
      },

    /**
     * Récupère un commentaire par son ID
     * @param id Identifiant du commentaire
     * @returns Promise<Comment> Détails du commentaire
     */
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

    /**
     * Récupère les commentaires d'un article spécifique
     * @param articleId Identifiant de l'article
     * @returns Promise<Comment[]> Liste des commentaires de l'article
     */
    // async getByArticle(articleId: number): Promise<Comment[]> {
    //     try {
    //         const response = await axios.get<{ data: Comment[] }>(`${API_URL}/articles/${articleId}/comments`, {
    //             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //         });
    //         return response.data.data || [];
    //     } catch (error: any) {
    //         throw this.handleError(error);
    //     }
    // },

    /**
     * Crée un nouveau commentaire
     * @param data Données du nouveau commentaire
     * @returns Promise<Comment> Commentaire créé
     */
    // async create(data: CommentCreate): Promise<Comment> {
    //     try {
    //         const response = await axios.post<{ data: Comment }>(`${API_URL}/comments`, data, {
    //             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //         });
    //         return response.data.data;
    //     } catch (error: any) {
    //         throw this.handleError(error);
    //     }
    // },

    async create(data: { 
        content: string, 
        articleId: number, 
        parentId?: string 
      }): Promise<Comment> {
        try {
          const response = await axios.post<{ data: Comment }>(
            `${API_URL}/comments`, 
            {
              content: data.content,
              article_id: data.articleId,
              parent_id: data.parentId
            }
          );
          return {
            ...response.data.data,
            author: {
              name: response.data.data.user?.name || 'Utilisateur',
              avatar: response.data.data.user?.avatar || '/avatars/default.jpg'
            }
          };
        } catch (error) {
          throw this.handleError(error);
        }
      },
     /**
   * Ajoute un like à un commentaire
   * @param commentId Identifiant du commentaire à liker
   * @returns Promise<Comment> Commentaire mis à jour
   */
  async likeComment(commentId: number): Promise<Comment> {
    try {
      const response = await axios.post<{ data: Comment }>(
        `${API_URL}/comments/${commentId}/like`, 
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },
   /**
   * Signale un commentaire comme inapproprié
   * @param commentId Identifiant du commentaire à signaler
   * @param reason Raison du signalement (optionnel)
   * @returns Promise<void>
   */
   async reportComment(commentId: number, reason?: string): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/comments/${commentId}/report`,
        { reason },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Ajoute une réponse à un commentaire existant
   * @param parentId Identifiant du commentaire parent
   * @param data Données de la réponse
   * @returns Promise<Comment> Commentaire réponse créé
   */
  async replyToComment(parentId: number, data: CommentCreate): Promise<Comment> {
    try {
      const response = await axios.post<{ data: Comment }>(
        `${API_URL}/comments/${parentId}/reply`, 
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },
    /**
     * Met à jour un commentaire existant
     * @param id Identifiant du commentaire
     * @param data Nouvelles données du commentaire
     * @returns Promise<Comment> Commentaire mis à jour
     */
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

    /**
     * Supprime un commentaire
     * @param id Identifiant du commentaire à supprimer
     */
    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/comments/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error: any) {
            throw this.handleError(error);
        }
    },

    /**
     * Met à jour le statut d'un commentaire
     * @param id Identifiant du commentaire
     * @param status Nouveau statut du commentaire
     * @returns Promise<Comment> Commentaire avec le statut mis à jour
     */
    async updateStatus(id: number, status: Comment['status']): Promise<Comment> {
        try {
            const response = await axios.patch<{ data: Comment }>(`${API_URL}/comments/${id}/status`, 
                { status }, 
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );
            return response.data.data;
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
            // L'erreur vient de la réponse du serveur
            console.error('Erreur API:', error.response.data);
            return new Error(error.response.data.message || 'Erreur lors du traitement de la requête');
        } else if (error.request) {
            // La requête a été faite mais pas de réponse
            console.error('Pas de réponse du serveur');
            return new Error('Aucune réponse reçue du serveur');
        } else {
            // Erreur lors de la configuration de la requête
            console.error('Erreur de configuration:', error.message);
            return new Error('Erreur de configuration de la requête');
        }
    }
};

export default commentService;
