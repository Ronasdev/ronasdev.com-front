import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormationCard from "../components/FormationCard";
import FormationFilterBar from "../components/FormationFilterBar";
import FormationStats from "../components/FormationStats";
import FormationRegistration from "../components/FormationRegistration";
import { Formation } from "../types/formation";

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
  },
];

const FormationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);

  const filteredFormations = useMemo(() => {
    return formations.filter((formation) => {
      const matchesSearch = formation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formation.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = selectedLevel === "all" || formation.level === selectedLevel;

      const matchesPriceRange = selectedPriceRange === "all" || (() => {
        const price = formation.price;
        switch (selectedPriceRange) {
          case "0-500": return price <= 500;
          case "500-1000": return price > 500 && price <= 1000;
          case "1000+": return price > 1000;
          default: return true;
        }
      })();

      const matchesDuration = selectedDuration === "all" || (() => {
        const months = parseInt(formation.duration);
        switch (selectedDuration) {
          case "1-2": return months <= 2;
          case "3-4": return months > 2 && months <= 4;
          case "5+": return months >= 5;
          default: return true;
        }
      })();

      return matchesSearch && matchesLevel && matchesPriceRange && matchesDuration;
    });
  }, [searchQuery, selectedLevel, selectedPriceRange, selectedDuration]);

  const stats = {
    totalFormations: formations.length,
    totalStudents: 30,
    upcomingSessions: formations.length * 2,
    satisfactionRate: 99,
  };

  const handleRegister = (formation: Formation) => {
    setSelectedFormation(formation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Formations Professionnelles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Développez vos compétences avec nos formations spécialisées en
            développement web et technologies modernes.
          </p>
        </motion.div>

        {/* Statistiques */}
        <FormationStats {...stats} />

        {/* Barre de filtrage */}
        <FormationFilterBar
          searchQuery={searchQuery}
          selectedLevel={selectedLevel}
          selectedPriceRange={selectedPriceRange}
          selectedDuration={selectedDuration}
          onSearchChange={setSearchQuery}
          onLevelChange={setSelectedLevel}
          onPriceRangeChange={setSelectedPriceRange}
          onDurationChange={setSelectedDuration}
        />

        {/* Liste des formations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFormations.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onRegister={() => setSelectedFormation(formation)}
            />
          ))}
        </div>

        {/* Message si aucune formation trouvée */}
        {filteredFormations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              Aucune formation ne correspond à vos critères de recherche.
            </p>
          </motion.div>
        )}

        {/* Modal d'inscription */}
        {selectedFormation && (
          <FormationRegistration
            formation={selectedFormation}
            onClose={() => setSelectedFormation(null)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FormationPage;