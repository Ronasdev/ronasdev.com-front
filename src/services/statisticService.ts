import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;


// Interfaces pour typer précisément nos données
export interface Statistic {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType;
  trend: 'up' | 'down';
}

export interface ChartDataPoint {
  name: string;
  visits: number;
  inscriptions: number;
}

export interface RecentActivity {
  id: number;
  type: 'inscription' | 'commentaire' | 'article';
  user: string;
  formation?: string;
  article?: string;
  title?: string;
  date: string;
}

export interface DashboardStats {
  userCount: number;
  userGrowth: number;
  articleCount: number;
  articleGrowth: number;
  formationCount: number;
  formationGrowth: number;
  commentCount: number;
  commentGrowth: number;
  monthlyData: ChartDataPoint[];
  recentActivities: RecentActivity[];
}

export const statisticService = {
  /**
   * Récupère les statistiques complètes du tableau de bord
   * @returns Promise<DashboardStats>
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
   * @returns Promise<ChartDataPoint[]>
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