// Service de gestion des statistiques
// Fournit des méthodes pour récupérer les données statistiques de l'application

import axios from 'axios';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface représentant une statistique générique
 * Utilisée pour afficher des métriques avec des tendances
 */
export interface Statistic {
  title: string;     // Titre de la statistique
  value: string;     // Valeur de la statistique
  change: string;    // Changement/variation
  icon: React.ComponentType;  // Icône représentant la statistique
  trend: 'up' | 'down';  // Tendance de la statistique
}

/**
 * Interface représentant un point de données pour un graphique
 * Utilisé pour les visualisations de données mensuelles
 */
export interface ChartDataPoint {
  name: string;      // Nom/libellé du point de données (ex: mois)
  visits: number;    // Nombre de visites
  inscriptions: number;  // Nombre d'inscriptions
}

/**
 * Interface représentant une activité récente
 * Capture différents types d'événements dans l'application
 */
export interface RecentActivity {
  id: number;        // Identifiant unique de l'activité
  type: 'inscription' | 'commentaire' | 'article';  // Type d'activité
  user: string;      // Nom de l'utilisateur
  formation?: string;  // Formation associée (optionnel)
  article?: string;    // Article associé (optionnel)
  title?: string;    // Titre de l'activité (optionnel)
  date: string;      // Date de l'activité
}

/**
 * Interface représentant les statistiques complètes du tableau de bord
 * Agrège différentes métriques et activités
 */
export interface DashboardStats {
  userCount: number;        // Nombre total d'utilisateurs
  userGrowth: number;       // Croissance des utilisateurs
  articleCount: number;     // Nombre total d'articles
  articleGrowth: number;    // Croissance des articles
  formationCount: number;   // Nombre total de formations
  formationGrowth: number; // Croissance des formations
  commentCount: number;     // Nombre total de commentaires
  commentGrowth: number;   // Croissance des commentaires
  monthlyData: ChartDataPoint[];     // Données mensuelles
  recentActivities: RecentActivity[]; // Activités récentes
}

/**
 * Service de gestion des statistiques
 * Fournit des méthodes pour récupérer des données statistiques
 */
export const statisticService = {
  /**
   * Récupère les statistiques complètes du tableau de bord
   * @returns Promise<DashboardStats> Statistiques détaillées
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Aucun token d\'authentification trouvé');
      }

      const response = await axios.get(
        `${API_URL}/statistics/dashboard`, 
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data;
      console.log("Récupération des statistiques getDashboardStats");
      console.dir(data);

      // Transformation des données pour correspondre à l'interface DashboardStats
      return {
        userCount: data.users?.total || 0,
        userGrowth: 10, // Valeur par défaut, à ajuster selon vos besoins
        articleCount: data.articles?.total || 0,
        articleGrowth: 10, // Valeur par défaut
        formationCount: data.formations?.total || 0,
        formationGrowth: 10, // Valeur par défaut
        commentCount: data.comments?.total || 0,
        commentGrowth: 10, // Valeur par défaut
        monthlyData: [
          // Exemple de données, à adapter selon vos besoins
          { name: 'Jan', visits: 400, inscriptions: 240 },
          { name: 'Fev', visits: 300, inscriptions: 139 },
          { name: 'Mar', visits: 200, inscriptions: 980 },
          { name: 'Avr', visits: 278, inscriptions: 390 },
          { name: 'Mai', visits: 189, inscriptions: 480 },
          { name: 'Juin', visits: 239, inscriptions: 380 },
        ],
        recentActivities: [
          ...(data.recent_articles || []).map(article => ({
            id: article.id,
            type: 'article',
            title: article.title,
            date: article.created_at,
            user: 'Admin'
          })),
          ...(data.recent_comments || []).map(comment => ({
            id: comment.id,
            type: 'commentaire',
            title: comment.article_title,
            user: comment.user_name,
            date: comment.created_at
          }))
        ]
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
      
      // Gestion plus détaillée des erreurs
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Le serveur a répondu avec un code d'erreur
          console.error('Détails de l\'erreur:', error.response.data);
          console.error('Code de statut:', error.response.status);
        } else if (error.request) {
          // La requête a été faite mais pas de réponse
          console.error('Pas de réponse reçue');
        } else {
          // Erreur lors de la configuration de la requête
          console.error('Erreur de configuration', error.message);
        }
      }

      // Retourne des valeurs par défaut en cas d'erreur
      return {
        userCount: 0,
        userGrowth: 0,
        articleCount: 0,
        articleGrowth: 0,
        formationCount: 0,
        formationGrowth: 0,
        commentCount: 0,
        commentGrowth: 0,
        monthlyData: [],
        recentActivities: []
      };
    }
  },

  /**
   * Récupère les statistiques détaillées par mois
   * @param year Année pour laquelle récupérer les statistiques
   * @returns Promise<ChartDataPoint[]> Points de données mensuelles
   */
  async getMonthlyStatistics(year: number): Promise<ChartDataPoint[]> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Aucun token d\'authentification trouvé');
      }

      const response = await axios.get(
        `${API_URL}/statistics/monthly?year=${year}`,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques mensuelles', error);
      return [];
    }
  }
};