// Page de tableau de bord administratif
// Affiche des statistiques globales, graphiques et activités récentes

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { statisticService, DashboardStats, Statistic, RecentActivity } from "@/services/statisticService";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Composant de tableau de bord administratif
 * 
 * Fonctionnalités principales :
 * - Afficher des statistiques globales
 * - Visualiser l'évolution mensuelle des métriques
 * - Présenter les activités récentes
 * 
 * @returns {JSX.Element} Page de tableau de bord
 */
const Dashboard = () => {
  // États pour stocker les données du tableau de bord
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  /**
   * Charge les statistiques du tableau de bord au montage du composant
   */
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const stats = await statisticService.getDashboardStats();
        setDashboardStats(stats);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  /**
   * Génère les statistiques principales à afficher
   * @returns {Statistic[]} Liste des statistiques
   */
  const generateMainStatistics = (): Statistic[] => {
    if (!dashboardStats) return [];

    return [
      {
        title: "Utilisateurs",
        value: dashboardStats.userCount.toString(),
        change: `+${dashboardStats.userGrowth}%`,
        icon: Users,
        trend: dashboardStats.userGrowth >= 0 ? 'up' : 'down',
      },
      {
        title: "Articles",
        value: dashboardStats.articleCount.toString(),
        change: `+${dashboardStats.articleGrowth}%`,
        icon: BookOpen,
        trend: dashboardStats.articleGrowth >= 0 ? 'up' : 'down',
      },
      {
        title: "Formations",
        value: dashboardStats.formationCount.toString(),
        change: `+${dashboardStats.formationGrowth}%`,
        icon: GraduationCap,
        trend: dashboardStats.formationGrowth >= 0 ? 'up' : 'down',
      },
      {
        title: "Commentaires",
        value: dashboardStats.commentCount.toString(),
        change: `+${dashboardStats.commentGrowth}%`,
        icon: MessageSquare,
        trend: dashboardStats.commentGrowth >= 0 ? 'up' : 'down',
      },
    ];
  };

  // Génération des statistiques
  const mainStatistics = generateMainStatistics();

  return (
    <div className="space-y-6">
      {/* En-tête du tableau de bord */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre plateforme
        </p>
      </div>

      {/* Section des statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? // Squelettes de chargement
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          : // Statistiques réelles
            mainStatistics.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div
                    className={`flex items-center text-xs ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change} depuis le mois dernier
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Section des graphiques et activités */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Graphique mensuel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Évolution mensuelle</CardTitle>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                {[2023, 2024].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <CardDescription>
              Visites et inscriptions mensuelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={dashboardStats?.monthlyData || []}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="inscriptions"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle>Dernières activités</CardTitle>
            <CardDescription>
              Actions récentes sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats?.recentActivities
                .slice(0, 5)
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type === "inscription"
                          ? `Inscrit à ${activity.formation}`
                          : activity.type === "commentaire"
                          ? `A commenté ${activity.article}`
                          : `A publié ${activity.article}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
