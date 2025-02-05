import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormationCard from "../components/FormationCard";
import FormationFilterBar from "../components/FormationFilterBar";
import FormationStats from "../components/FormationStats";
import FormationRegistration from "../components/FormationRegistration";
import { Formation } from "../types/formation";
import { useTheme } from "@/components/theme-provider";
import axios from "axios";
import { useToast } from "../components/ui/use-toast";

// Données des formations
const formations: Formation[] = [
  {
    id: "react-advanced",
    title: "React Avancé",
    description: "Maîtrisez les concepts avancés de React et construisez des applications performantes",
    price: 400,
    duration: "4 mois",
    startDate: "2025-01-15",
    maxParticipants: 12,
    level: "Avancé",
    topics: [
      "Hooks personnalisés",
      "Performance et optimisation",
      "Tests unitaires et d'intégration",
      "State management avancé",
      "Server-Side Rendering",
    ],
    prerequisites: [
      "Bonnes connaissances en JavaScript",
      "Expérience avec React",
      "Familiarité avec Git",
    ],
    objectives: [
      "Créer des hooks personnalisés complexes",
      "Optimiser les performances d'une application React",
      "Mettre en place une suite de tests complète",
      "Maîtriser les patterns avancés",
    ],
    category: "Frontend",
    instructor: {
      name: "Alexandre Dupont",
      title: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 4.8,
    totalReviews: 124,
    language: "Français",
    certification: true,
    online: false,
    status: "upcoming",
  },
  {
    id: "typescript-fundamentals",
    title: "TypeScript Fondamentaux",
    description: "Découvrez TypeScript et améliorez la qualité de votre code JavaScript",
    price: 300,
    duration: "3 mois",
    startDate: "2025-02-01",
    maxParticipants: 15,
    level: "Intermédiaire",
    topics: [
      "Types de base et interfaces",
      "Génériques",
      "Décorateurs",
      "Modules et namespaces",
      "Configuration et tooling",
    ],
    prerequisites: [
      "Bonnes connaissances en JavaScript",
      "Familiarité avec ES6+",
    ],
    objectives: [
      "Comprendre le système de types de TypeScript",
      "Utiliser les fonctionnalités avancées",
      "Configurer un projet TypeScript",
      "Migrer un projet JS vers TS",
    ],
    category: "Frontend",
    instructor: {
      name: "Alexandre Dupont",
      title: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 4.8,
    totalReviews: 124,
    language: "Français",
    certification: true,
    online: false,
    status: "upcoming",
  },
  {
    id: "nextjs-fullstack",
    title: "Next.js Full-Stack",
    description: "Développez des applications web complètes avec Next.js 14 et les dernières fonctionnalités",
    price: 600,
    duration: "5 mois",
    startDate: "2025-03-10",
    maxParticipants: 10,
    level: "Avancé",
    topics: [
      "App Router et Server Components",
      "Streaming et Suspense",
      "API Routes et Middleware",
      "Authentication et Authorization",
      "Déploiement sur Vercel",
      "Performance et SEO",
    ],
    prerequisites: [
      "Maîtrise de React",
      "Connaissance de TypeScript",
      "Expérience en développement Full-Stack",
    ],
    objectives: [
      "Construire des applications Next.js modernes",
      "Implémenter des fonctionnalités full-stack",
      "Optimiser les performances et le SEO",
      "Déployer et monitorer en production",
    ],
    category: "Fullstack",
    instructor: {
      name: "Alexandre Dupont",
      title: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 4.8,
    totalReviews: 124,
    language: "Français",
    certification: true,
    online: false,
    status: "upcoming",
  },
  {
    id: "tailwind-mastery",
    title: "Tailwind CSS Mastery",
    description: "Créez des interfaces modernes et responsives avec Tailwind CSS",
    price: 150,
    duration: "2 mois",
    startDate: "2025-01-20",
    maxParticipants: 20,
    level: "Intermédiaire",
    topics: [
      "Configuration avancée",
      "Composants réutilisables",
      "Animations et transitions",
      "Dark mode et thèmes",
      "Plugins personnalisés",
    ],
    prerequisites: [
      "Connaissances en HTML/CSS",
      "Bases en JavaScript",
    ],
    objectives: [
      "Maîtriser l'écosystème Tailwind",
      "Créer des designs responsifs",
      "Optimiser la maintenabilité",
      "Développer des thèmes personnalisés",
    ],
    category: "Frontend",
    instructor: {
      name: "Alexandre Dupont",
      title: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 4.8,
    totalReviews: 124,
    language: "Français",
    certification: true,
    online: false,
    status: "upcoming",
  },
  {
    id: "node-backend",
    title: "Node.js Backend Professionnel",
    description: "Construisez des APIs robustes et scalables avec Node.js et Express",
    price: 400,
    duration: "4 mois",
    startDate: "2025-02-15",
    maxParticipants: 15,
    level: "Avancé",
    topics: [
      "Architecture REST et GraphQL",
      "Sécurité et authentification",
      "Base de données et ORM",
      "Tests et documentation",
      "Déploiement et CI/CD",
      "Monitoring et logging",
    ],
    prerequisites: [
      "JavaScript avancé",
      "Bases des APIs REST",
      "Git et ligne de commande",
    ],
    objectives: [
      "Concevoir des APIs scalables",
      "Implémenter la sécurité",
      "Gérer les performances",
      "Mettre en place un pipeline CI/CD",
    ],
    category: "Backend",
    instructor: {
      name: "Alexandre Dupont",
      title: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 4.8,
    totalReviews: 124,
    language: "Français",
    certification: true,
    online: false,
    status: "upcoming",
  },
  {
    id: "vue-enterprise",
    title: "Vue.js pour l'Entreprise",
    description: "Développez des applications d'entreprise robustes avec Vue 3 et son écosystème",
    price: 400,
    duration: "4 mois",
    startDate: "2025-04-01",
    maxParticipants: 12,
    level: "Avancé",
    topics: [
      "Composition API",
      "TypeScript avec Vue",
      "State Management avec Pinia",
      "Tests avec Vitest",
      "Performance et optimisation",
      "Micro-frontends",
    ],
    prerequisites: [
      "Expérience avec Vue.js",
      "TypeScript basique",
      "Connaissances en architecture front-end",
    ],
    objectives: [
      "Architecturer des applications Vue.js",
      "Implémenter des patterns avancés",
      "Optimiser les performances",
      "Gérer des projets d'entreprise",
    ],
    category: "Frontend",
    instructor: {
      name: "Alexandre Dupont",
      title: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 4.8,
    totalReviews: 124,
    language: "Français",
    certification: true,
    online: false,
    status: "upcoming",
  },
];

const FormationPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const { toast } = useToast();

  // Filtrage des formations
  const filteredFormations = useMemo(() => {
    return formations.filter((formation) => {
      const categoryMatch = !selectedCategory || formation.category === selectedCategory;
      const levelMatch = !selectedLevel || formation.level === selectedLevel;
      return categoryMatch && levelMatch;
    });
  }, [selectedCategory, selectedLevel]);

  // Gestion de l'inscription
  const handleRegister = (formation: Formation) => {
    setSelectedFormation(formation);
    setShowRegistration(true);
  };

  // Fermeture du modal d'inscription
  const handleCloseRegistration = () => {
    setSelectedFormation(null);
    setShowRegistration(false);
  };

  const handleEnroll = async (formation: Formation) => {
    try {
      const response = await axios.post(
        `http://localhost/projets-perso/ronasdev.com/ronasdev-api/formations/${formation.id}/enroll`
      );
      toast({
        title: "Succès",
        description: "Vous êtes désormais inscrit à la formation.",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de vous inscrire à la formation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de page */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`
            text-4xl font-bold mb-4
            ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
          `}>
            Formations Développement Web
          </h1>
          <p className={`
            text-xl 
            ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
          `}>
            Développez vos compétences techniques avec des formations pratiques
          </p>
        </motion.div>

        {/* Barre de filtres */}
        <FormationFilterBar
          onCategoryChange={setSelectedCategory}
          onLevelChange={setSelectedLevel}
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
        />

        {/* Statistiques des formations */}
        <FormationStats formations={filteredFormations} />

        {/* Grille des formations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredFormations.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onRegister={handleRegister}
            />
          ))}
        </div>

        {/* Modal d'inscription */}
        {showRegistration && selectedFormation && (
          <FormationRegistration
            formation={selectedFormation}
            onClose={handleCloseRegistration}
            onEnroll={handleEnroll}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FormationPage;