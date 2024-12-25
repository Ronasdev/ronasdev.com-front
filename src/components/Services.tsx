// Composant de présentation des services professionnels
// Utilise Framer Motion pour des animations d'entrée dynamiques

import { motion } from "framer-motion";
import { Code, BookOpen, Users, Smartphone, Globe, Database, Cloud, GitBranch, Terminal } from "lucide-react";

/**
 * Composant Services
 * Présente une liste de services professionnels avec des animations
 * 
 * @returns {JSX.Element} Section des services
 */
const Services = () => {
  // Configuration statique des services proposés
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Développement Web Frontend",
      description: "Applications web modernes avec React, Next.js et  Vue.js . Focus sur l'expérience utilisateur et la performance.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Développement Backend",
      description: "APIs robustes et évolutives avec PHP, Node.js et Laravel. Architecture microservices.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Développement Mobile",
      description: "Applications mobiles natives et cross-platform avec React Native et Java.",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud & DevOps",
      description: "Déploiement et maintenance sur AWS et Docker. CI/CD pipelines.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Formation",
      description: "Cours pratiques en développement fullstack, du débutant au niveau avancé.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consulting",
      description: "Conseils et accompagnement technique pour vos projets digitaux.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SEO & Performance",
      description: "Optimisation pour les moteurs de recherche et amélioration des performances web.",
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Gestion de Projet",
      description: "Méthodologies Agile/Scrum, planification et suivi de projets techniques.",
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Architecture Logicielle",
      description: "Conception d'architectures scalables et maintenables, patterns de conception.",
    },
  ];

  return (
    // Section avec fond blanc et padding vertical
    <section className="py-20 bg-white">
      {/* Conteneur avec largeur maximale et centrage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section avec animations */}
        <div className="text-center mb-12">
          {/* Titre animé */}
          <motion.h2 
            className="text-3xl font-bold text-secondary-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Mes Services
          </motion.h2>
          {/* Sous-titre animé */}
          <motion.p 
            className="text-secondary-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Des solutions sur mesure pour répondre à vos besoins digitaux
          </motion.p>
        </div>

        {/* Grille de services responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapping des services avec animations individuelles */}
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              // Animation d'entrée avec délai progressif
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              // Carte de service avec effet de survol
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Icône du service */}
              <div className="text-primary mb-6 flex justify-center">{service.icon}</div>
              
              {/* Titre du service */}
              <h3 className="text-xl font-semibold text-secondary-dark mb-4 text-center">
                {service.title}
              </h3>
              
              {/* Description du service */}
              <p className="text-secondary-light text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;