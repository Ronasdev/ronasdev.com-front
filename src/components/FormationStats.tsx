import { motion } from "framer-motion";
import { Users, Calendar, BookOpen, Trophy } from "lucide-react";

interface FormationStatsProps {
  totalFormations: number;
  totalStudents: number;
  upcomingSessions: number;
  satisfactionRate: number;
}

const FormationStats = ({
  totalFormations,
  totalStudents,
  upcomingSessions,
  satisfactionRate,
}: FormationStatsProps) => {
  const stats = [
    {
      label: "Formations",
      value: totalFormations,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Étudiants formés",
      value: totalStudents,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Sessions à venir",
      value: upcomingSessions,
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Satisfaction",
      value: `${satisfactionRate}%`,
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
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
