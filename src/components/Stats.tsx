import { motion } from "framer-motion";
import { Users, Code, Award, BookOpen } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "100+",
      label: "Étudiants formés",
    },
    {
      icon: <Code className="w-8 h-8" />,
      value: "30+",
      label: "Projets réalisés",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "5+",
      label: "Années d'expérience",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: "10+",
      label: "Cours créés",
    },
  ];

  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-secondary-dark mb-2">
                {stat.value}
              </h3>
              <p className="text-secondary-light">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;