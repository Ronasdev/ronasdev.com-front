/**
 * Composant FormationStats
 * 
 * @description Affiche des statistiques dynamiques sur les formations
 * 
 * Caractéristiques principales :
 * - Présentation de statistiques clés
 * - Animations d'entrée avec Framer Motion
 * - Icônes et couleurs distinctives
 * - Mise en page responsive
 * 
 * @param {Object} props - Propriétés du composant
 * @param {number} props.totalFormations - Nombre total de formations
 * @param {number} props.totalStudents - Nombre total d'étudiants
 * @param {number} props.upcomingSessions - Nombre de sessions à venir
 * @param {number} props.satisfactionRate - Taux de satisfaction en pourcentage
 * 
 * @returns {JSX.Element} Tableau de bord des statistiques de formation
 */
import { motion } from "framer-motion";
import { Users, Calendar, BookOpen, Trophy } from "lucide-react";

// Interface des propriétés du composant
interface FormationStatsProps {
  totalFormations: number;      // Nombre total de formations
  totalStudents: number;        // Nombre total d'étudiants
  upcomingSessions: number;     // Nombre de sessions à venir
  satisfactionRate: number;     // Taux de satisfaction
}

// Interface pour la configuration des statistiques
interface StatConfig {
  label: string;                // Libellé de la statistique
  value: number | string;       // Valeur de la statistique
  icon: React.ComponentType;    // Icône associée
  color: string;                // Classe de couleur
}

/**
 * Composant de visualisation des statistiques de formation
 * 
 * Transforme les données brutes en une grille de statistiques visuellement attrayante
 * avec des animations d'entrée et des icônes représentatives.
 */
const FormationStats = ({
  totalFormations,
  totalStudents,
  upcomingSessions,
  satisfactionRate,
}: FormationStatsProps) => {
  // Configuration des statistiques à afficher
  // Chaque statistique est personnalisée avec un libellé, une valeur, une icône et une couleur
  const stats: StatConfig[] = [
    {
      label: "Formations",
      value: totalFormations,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",  // Couleurs pour les formations
    },
    {
      label: "Étudiants formés",
      value: totalStudents,
      icon: Users,
      color: "bg-green-100 text-green-600",  // Couleurs pour les étudiants
    },
    {
      label: "Sessions à venir",
      value: upcomingSessions,
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",  // Couleurs pour les sessions
    },
    {
      label: "Satisfaction",
      value: `${satisfactionRate}%`,
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-600",  // Couleurs pour la satisfaction
    },
  ];

  return (
    // Grille de statistiques responsive avec gap et colonnes adaptatives
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        // Carte de statistique animée avec Framer Motion
        // Animation progressive basée sur l'index
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}    // Animation d'entrée : opacité et translation
          animate={{ opacity: 1, y: 0 }}     // État final : opacité et position
          transition={{ 
            duration: 0.3,     // Durée de l'animation
            delay: index * 0.1  // Délai progressif entre chaque carte
          }}  
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            {/* Informations textuelles de la statistique */}
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            
            {/* Icône avec fond coloré dynamique */}
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FormationStats;
