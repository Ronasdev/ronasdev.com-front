// import { useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useApi } from '@/hooks/use-api';
// import articleService from '@/services/articleService';
// import formationService from '@/services/formationService';
// import commentService from '@/services/commentService';
// import {userService} from '@/services/userService';
// import {
//     Users,
//     FileText,
//     BookOpen,
//     MessageSquare,
//     TrendingUp,
//     Eye,
// } from 'lucide-react';

// export default function Dashboard() {
//     // Récupération des données
//     const { data: articles } = useApi('articles', () => articleService.getAll());
//     const { data: formations } = useApi('formations', () => formationService.getAll());
//     const { data: comments } = useApi('comments', () => commentService.getAll());
//     const { data: users } = useApi('users', () => userService.getAll());

//     // Statistiques
//     const stats = [
//         {
//             name: 'Articles',
//             value: articles?.length || 0,
//             icon: FileText,
//             trend: '+12%',
//             trendUp: true,
//         },
//         {
//             name: 'Formations',
//             value: formations?.length || 0,
//             icon: BookOpen,
//             trend: '+5%',
//             trendUp: true,
//         },
//         {
//             name: 'Commentaires',
//             value: comments?.length || 0,
//             icon: MessageSquare,
//             trend: '+18%',
//             trendUp: true,
//         },
//         {
//             name: 'Utilisateurs',
//             value: users?.length || 0,
//             icon: Users,
//             trend: '+7%',
//             trendUp: true,
//         },
//     ];

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
//                 <p className="text-muted-foreground">
//                     Bienvenue dans votre espace d'administration
//                 </p>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//                 {stats?.map((stat) => (
//                     <Card key={stat.name}>
//                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                             <CardTitle className="text-sm font-medium">
//                                 {stat.name}
//                             </CardTitle>
//                             <stat.icon className="h-4 w-4 text-muted-foreground" />
//                         </CardHeader>
//                         <CardContent>
//                             <div className="text-2xl font-bold">{stat.value}</div>
//                             <div className="flex items-center text-xs text-muted-foreground">
//                                 {stat.trendUp ? (
//                                     <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
//                                 ) : (
//                                     <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
//                                 )}
//                                 {stat.trend} depuis le mois dernier
//                             </div>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>

//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Articles récents</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             {articles?.slice(0, 5).map((article) => (
//                                 <div
//                                     key={article.id}
//                                     className="flex items-center space-x-4"
//                                 >
//                                     <div className="space-y-1">
//                                         <p className="text-sm font-medium">
//                                             {article.title}
//                                         </p>
//                                         <div className="flex items-center text-xs text-muted-foreground">
//                                             <Eye className="mr-1 h-3 w-3" />
//                                             {/* Ajouter le nombre de vues ici */}
//                                             <span>123 vues</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Formations récentes</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             {formations?.slice(0, 5).map((formation) => (
//                                 <div
//                                     key={formation.id}
//                                     className="flex items-center space-x-4"
//                                 >
//                                     <div className="space-y-1">
//                                         <p className="text-sm font-medium">
//                                             {formation.title}
//                                         </p>
//                                         <div className="flex items-center text-xs text-muted-foreground">
//                                             <Users className="mr-1 h-3 w-3" />
//                                             {/* Ajouter le nombre d'inscrits ici */}
//                                             <span>45 inscrits</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Derniers commentaires</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             {comments?.slice(0, 5).map((comment) => (
//                                 <div
//                                     key={comment.id}
//                                     className="flex items-center space-x-4"
//                                 >
//                                     <div className="space-y-1">
//                                         <p className="text-sm font-medium">
//                                             {comment.user?.name}
//                                         </p>
//                                         <p className="text-xs text-muted-foreground">
//                                             {comment.content.length > 50
//                                                 ? `${comment.content.slice(0, 50)}...`
//                                                 : comment.content}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }

// src/pages/admin/Dashboard.tsx
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

const Dashboard: React.FC = () => {
  // États pour stocker les données
  const [stats, setStats] = useState<Statistic[]>([]);
  const [chartData, setChartData] = useState([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  
  // États de chargement et d'erreur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Récupérer toutes les statistiques du tableau de bord
        const dashboardStats: DashboardStats = await statisticService.getDashboardStats();
        
        // Mapper les statistiques avec les icônes et les tendances
        const mappedStats: Statistic[] = [
          {
            title: "Utilisateurs",
            value: dashboardStats.userCount.toString(),
            change: `+${dashboardStats.userGrowth}%`,
            icon: Users,
            trend: dashboardStats.userGrowth > 0 ? "up" : "down"
          },
          {
            title: "Articles",
            value: dashboardStats.articleCount.toString(),
            change: `+${dashboardStats.articleGrowth}%`,
            icon: BookOpen,
            trend: dashboardStats.articleGrowth > 0 ? "up" : "down"
          },
          {
            title: "Formations",
            value: dashboardStats.formationCount.toString(),
            change: `+${dashboardStats.formationGrowth}%`,
            icon: GraduationCap,
            trend: dashboardStats.formationGrowth > 0 ? "up" : "down"
          },
          {
            title: "Commentaires",
            value: dashboardStats.commentCount.toString(),
            change: `+${dashboardStats.commentGrowth}%`,
            icon: MessageSquare,
            trend: dashboardStats.commentGrowth > 0 ? "up" : "down"
          }
        ];

        // Mettre à jour les états
        setStats(mappedStats);
        setChartData(dashboardStats.monthlyData);
        setRecentActivities(dashboardStats.recentActivities);
      } catch (err) {
        // Gestion des erreurs
        setError("Impossible de charger les statistiques");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Composant de chargement
  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-[50px] w-full" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );

  // Gestion des erreurs
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre plateforme
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-green-600"
                        : "text-destructive"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Visites et Inscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Visites et Inscriptions</CardTitle>
            <CardDescription>
              Statistiques des 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#8884d8"
                    name="Visites"
                  />
                  <Line
                    type="monotone"
                    dataKey="inscriptions"
                    stroke="#82ca9d"
                    name="Inscriptions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>
              Les dernières actions sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 rounded-lg border p-3"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    {activity.type === "inscription" ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : activity.type === "commentaire" ? (
                      <MessageSquare className="h-4 w-4 text-primary" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === "inscription"
                        ? `S'est inscrit à ${activity.formation}`
                        : activity.type === "commentaire"
                        ? `A commenté sur ${activity.article}`
                        : `A publié ${activity.title}`}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.date}
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
