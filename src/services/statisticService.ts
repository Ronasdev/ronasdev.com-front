// Service de gestion des statistiques
// Fournit des méthodes pour récupérer les données statistiques de l'application

import axios from 'axios';
import React from 'react';

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
      const response = await axios.get<{ data: DashboardStats }>(
        `${API_URL}/statistics/dashboard`, 
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
      throw error;
    }
  },

  /**
   * Récupère les statistiques détaillées par mois
   * @param year Année pour laquelle récupérer les statistiques
   * @returns Promise<ChartDataPoint[]> Points de données mensuelles
   */
  async getMonthlyStatistics(year: number): Promise<ChartDataPoint[]> {
    try {
      const response = await axios.get<{ data: ChartDataPoint[] }>(
        `${API_URL}/statistics/monthly?year=${year}`,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques mensuelles', error);
      throw error;
    }
  }
};