export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Une plateforme e-commerce moderne construite avec Next.js et Stripe pour les paiements",
    image: "/images/projects/gestion.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "https://example.com/ecommerce",
    github: "https://github.com/username/ecommerce"
  },
  {
    id: 2,
    title: "Learning Management System",
    description: "Plateforme de formation en ligne avec gestion des cours et des étudiants",
    image: "/images/projects/lms.jpg",
    technologies: ["React", "Laravel", "MySQL", "AWS"],
    link: "https://example.com/lms",
    github: "https://github.com/username/lms"
  },
  {
    id: 3,
    title: "Real Estate App",
    description: "Application immobilière avec recherche avancée et carte interactive",
    image: "/images/projects/realestate.png",
    technologies: ["React Native", "Express", "PostgreSQL", "Google Maps"],
    link: "https://example.com/realestate",
    github: "https://github.com/username/realestate"
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec temps réel",
    image: "/images/projects/task.webp",
    technologies: ["Vue.js", "Firebase", "Tailwind"],
    link: "https://example.com/tasks",
    github: "https://github.com/username/tasks"
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Dashboard pour la gestion et l'analyse des réseaux sociaux",
    image: "/images/projects/social.jpg",
    technologies: ["React", "Redux", "Material-UI"],
    link: "https://example.com/social",
    github: "https://github.com/username/social"
  },
  {
    id: 6,
    title: "Portfolio Generator",
    description: "Générateur de portfolio pour développeurs avec thèmes personnalisables",
    image: "/images/projects/generator.png",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    link: "https://example.com/generator",
    github: "https://github.com/username/generator"
  },
  {
    id: 7,
    title: "Weather App",
    description: "Application météo avec prévisions détaillées et alertes",
    image: "/images/projects/weather.jpg",
    technologies: ["React", "OpenWeather API", "ChartJS"],
    link: "https://example.com/weather",
    github: "https://github.com/username/weather"
  },
  {
    id: 8,
    title: "Blog Platform",
    description: "Plateforme de blog avec éditeur markdown et système de commentaires",
    image: "/images/projects/blog.jpg",
    technologies: ["Gatsby", "GraphQL", "Netlify CMS"],
    link: "https://example.com/blog",
    github: "https://github.com/username/blog"
  },
  {
    id: 9,
    title: "Fitness Tracker",
    description: "Application de suivi d'entraînement avec visualisation des progrès",
    image: "/images/projects/fitness.jpg",
    technologies: ["React Native", "Firebase", "D3.js"],
    link: "https://example.com/fitness",
    github: "https://github.com/username/fitness"
  },
  {
    id: 10,
    title: "Recipe App",
    description: "Application de recettes avec planification de repas et liste de courses",
    image: "/images/projects/recipe.jpg",
    technologies: ["Vue.js", "Node.js", "MongoDB"],
    link: "https://example.com/recipe",
    github: "https://github.com/username/recipe"
  },
  {
    id: 11,
    title: "Movie Database",
    description: "Base de données de films avec système de recommandation",
    image: "/images/projects/movie.png",
    technologies: ["React", "TMDb API", "TailwindCSS"],
    link: "https://example.com/movie",
    github: "https://github.com/username/movie"
  },
  {
    id: 12,
    title: "Chat Application",
    description: "Application de chat en temps réel avec support des fichiers",
    image: "/images/projects/chat.png",
    technologies: ["Socket.io", "Express", "MongoDB"],
    link: "https://example.com/chat",
    github: "https://github.com/username/chat"
  },
  {
    id: 13,
    title: "Code Editor",
    description: "Éditeur de code en ligne avec support multi-langages",
    image: "/images/projects/editor.png",
    technologies: ["React", "Monaco Editor", "WebAssembly"],
    link: "https://example.com/editor",
    github: "https://github.com/username/editor"
  },
  {
    id: 14,
    title: "Music Player",
    description: "Lecteur de musique avec visualisation audio et playlists",
    image: "/images/projects/music.jpg",
    technologies: ["React", "Web Audio API", "Electron"],
    link: "https://example.com/music",
    github: "https://github.com/username/music"
  },
  {
    id: 15,
    title: "Job Board",
    description: "Plateforme de recherche d'emploi avec filtres avancés",
    image: "/images/projects/jobs.png",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    link: "https://example.com/jobs",
    github: "https://github.com/username/jobs"
  },
  {
    id: 16,
    title: "Travel Planner",
    description: "Application de planification de voyages avec cartes interactives",
    image: "/images/projects/travel.png",
    technologies: ["React", "Google Maps API", "Firebase"],
    link: "https://example.com/travel",
    github: "https://github.com/username/travel"
  },
  {
    id: 17,
    title: "Budget Tracker",
    description: "Application de suivi budgétaire avec graphiques et rapports",
    image: "/images/projects/budget.png",
    technologies: ["Vue.js", "Chart.js", "Firebase"],
    link: "https://example.com/budget",
    github: "https://github.com/username/budget"
  },
  {
    id: 18,
    title: "Note Taking App",
    description: "Application de prise de notes avec organisation hierarchique",
    image: "/images/projects/notes.png",
    technologies: ["React", "Redux", "IndexedDB"],
    link: "https://example.com/notes",
    github: "https://github.com/username/notes"
  }
];

/**
 * Récupère toutes les technologies uniques utilisées dans les projets
 */
export const getAllTechnologies = (): string[] => {
  const technologiesSet = new Set<string>();
  projects.forEach(project => {
    project.technologies.forEach(tech => technologiesSet.add(tech));
  });
  return Array.from(technologiesSet).sort();
};
