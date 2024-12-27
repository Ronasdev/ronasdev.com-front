export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  categories: string[];
  date: string;
  readTime: number;
  slug: string;
  content: string[]; 
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    title: "Les tendances du développement web en 2024",
    excerpt: "Découvrez les technologies et pratiques qui façonnent le développement web moderne",
    image: "/images/blog/blog1.jpg",
    categories: ["Web", "Tendances", "Frontend"],
    date: "2024-01-15",
    readTime: 8,
    slug: "tendances-dev-web-2024",
    content: [
      "Le développement web continue d'évoluer rapidement, avec des technologies émergentes qui transforment la façon dont nous construisons des applications web.",
      "En 2024, plusieurs tendances se distinguent et promettent de révolutionner l'expérience utilisateur et les performances des applications web.",
      "Parmi ces tendances, on retrouve l'adoption massive des frameworks modernes comme React Server Components, l'intégration de l'IA dans le développement web, et une attention croissante à l'accessibilité et aux performances.",
    ],
    author: {
      name: "Alex Martin",
      avatar: "/avatars/thomas.png",
    },
  },
  {
    title: "Introduction à TypeScript",
    excerpt: "Un guide complet pour débuter avec TypeScript et améliorer la qualité de votre code",
    image: "/images/blog/typescript-intro.jpg",
    categories: ["TypeScript", "JavaScript", "Tutoriel"],
    date: "2024-01-10",
    readTime: 12,
    slug: "introduction-typescript",
    content: [
      "TypeScript est un langage de programmation open-source développé par Microsoft qui étend JavaScript en ajoutant des types statiques.",
      "Contrairement à JavaScript, TypeScript permet de détecter les erreurs de type pendant la phase de développement, améliorant ainsi la qualité et la maintenabilité du code.",
      "Dans ce guide, nous allons explorer les concepts fondamentaux de TypeScript et comment il peut améliorer votre processus de développement.",
    ],
    author: {
      name: "Sophie Chen",
      avatar: "/avatars/emma.png",
    },
  },
  {
    title: "React Server Components expliqués",
    excerpt: "Comprendre les avantages et l'utilisation des React Server Components",
    image: "/images/blog/react.jpg",
    categories: ["React", "Performance", "Frontend"],
    date: "2024-01-05",
    readTime: 10,
    slug: "react-server-components",
    content: [
      "Les React Server Components représentent une avancée majeure dans l'écosystème React, offrant une nouvelle approche pour le rendu côté serveur.",
      "Contrairement aux composants traditionnels, les Server Components sont rendus directement sur le serveur, ce qui permet d'améliorer significativement les performances et l'expérience utilisateur.",
      "Dans cet article, nous allons explorer en détail le fonctionnement et les avantages des React Server Components.",
    ],
    author: {
      name: "Thomas Weber",
      avatar: "/avatars/thomas.png",
    },
  },
  {
    title: "Optimisation SEO pour les applications React",
    excerpt: "Guide pratique pour améliorer le référencement de vos applications React",
    image: "/images/blog/seo-react.jpeg",
    categories: ["SEO", "React", "Marketing"],
    date: "2024-01-02",
    readTime: 15,
    slug: "seo-react-guide",
    content: [
      "L'optimisation SEO est cruciale pour améliorer la visibilité de vos applications React dans les résultats de recherche.",
      "Dans ce guide, nous allons explorer les meilleures pratiques pour optimiser votre application React pour les moteurs de recherche.",
      "Nous allons couvrir des sujets tels que l'utilisation de balises meta, l'optimisation des images, et la création de contenu de qualité.",
    ],
    author: {
      name: "Emma Brown",
      avatar: "/avatars/emma.png",
    },
  },
  {
    title: "Architecture Micro-Frontend en 2024",
    excerpt: "Comment implémenter une architecture micro-frontend moderne",
    image: "/images/blog/blog2.jpg",
    categories: ["Architecture", "Frontend", "Microservices"],
    date: "2023-12-28",
    readTime: 20,
    slug: "micro-frontend-2024",
    content: [
      "L'architecture micro-frontend est une approche moderne pour construire des applications web complexes.",
      "Dans cet article, nous allons explorer les avantages et les défis de l'architecture micro-frontend, ainsi que les meilleures pratiques pour l'implémenter.",
      "Nous allons également couvrir des sujets tels que la communication entre les micro-frontends et la gestion des dépendances.",
    ],
    author: {
      name: "Lucas Garcia",
      avatar: "/avatars/thomas.png",
    },
  },
  {
    title: "Tests automatisés avec Cypress",
    excerpt: "Maîtrisez les tests end-to-end avec Cypress",
    image: "/images/blog/blog3.jpg",
    categories: ["Testing", "Automation", "QA"],
    date: "2023-12-25",
    readTime: 18,
    slug: "cypress-testing-guide",
    content: [
      "Les tests automatisés sont essentiels pour garantir la qualité de vos applications web.",
      "Dans ce guide, nous allons explorer les avantages et les défis des tests automatisés avec Cypress.",
      "Nous allons également couvrir des sujets tels que la création de tests end-to-end et la gestion des dépendances.",
    ],
    author: {
      name: "Anna Kowalski",
      avatar: "/avatars/emma.png",
    },
  },
  {
    title: "GraphQL vs REST en 2024",
    excerpt: "Comparaison détaillée des approches API modernes",
    image: "/images/blog/graphql-rest.png",
    categories: ["API", "GraphQL", "Backend"],
    date: "2023-12-20",
    readTime: 15,
    slug: "graphql-vs-rest-2024",
    content: [
      "GraphQL et REST sont deux approches populaires pour créer des API modernes.",
      "Dans cet article, nous allons explorer les avantages et les défis de chaque approche, ainsi que les meilleures pratiques pour les implémenter.",
      "Nous allons également couvrir des sujets tels que la gestion des requêtes et la sécurité des données.",
    ],
    author: {
      name: "David Kim",
      avatar: "/avatars/thomas.png",
    },
  },
  {
    title: "Sécurité des applications web modernes",
    excerpt: "Meilleures pratiques pour sécuriser vos applications web",
    image: "/images/blog/web-security.jpg",
    categories: ["Sécurité", "Web", "DevOps"],
    date: "2023-12-15",
    readTime: 25,
    slug: "securite-web-moderne",
    content: [
      "La sécurité des applications web est cruciale pour protéger les données des utilisateurs.",
      "Dans ce guide, nous allons explorer les meilleures pratiques pour sécuriser vos applications web modernes.",
      "Nous allons couvrir des sujets tels que la gestion des mots de passe, la protection contre les attaques de type XSS et CSRF, et la mise en place de politiques de sécurité.",
    ],
    author: {
      name: "Marie Dubois",
      avatar: "/avatars/emma.png",
    },
  },
  {
    title: "State Management avec Zustand",
    excerpt: "Alternative légère à Redux pour la gestion d'état React",
    image: "/blog/zustand-state.jpg",
    categories: ["React", "State Management", "Frontend"],
    date: "2023-12-10",
    readTime: 12,
    slug: "zustand-state-management",
    content: [
      "La gestion d'état est un aspect crucial de la création d'applications React.",
      "Dans cet article, nous allons explorer l'utilisation de Zustand comme alternative légère à Redux pour la gestion d'état React.",
      "Nous allons également couvrir des sujets tels que la création de magasins d'état et la gestion des actions.",
    ],
    author: {
      name: "Alex Martin",
      avatar: "/avatars/thomas.png",
    },
  },
  {
    title: "Développement mobile avec React Native",
    excerpt: "Guide complet pour créer des applications mobiles cross-platform",
    image: "/images/blog/react-native.png",
    categories: ["Mobile", "React Native", "Cross-platform"],
    date: "2023-12-05",
    readTime: 20,
    slug: "react-native-guide",
    content: [
      "Le développement mobile est un aspect crucial de la création d'applications modernes.",
      "Dans ce guide, nous allons explorer les avantages et les défis du développement mobile avec React Native.",
      "Nous allons également couvrir des sujets tels que la création de composants mobiles et la gestion des dépendances.",
    ],
    author: {
      name: "Sophie Chen",
      avatar: "/avatars/emma.png",
    },
  },
  {
    title: "CI/CD avec GitHub Actions",
    excerpt: "Automatisez votre pipeline de développement avec GitHub Actions",
    image: "/images/blog/github-actions.png",
    categories: ["DevOps", "CI/CD", "Automation"],
    date: "2023-12-01",
    readTime: 16,
    slug: "github-actions-guide",
    content: [
      "La mise en place d'un pipeline de développement automatisé est essentielle pour améliorer la qualité et la rapidité de vos applications web.",
      "Dans ce guide, nous allons explorer les avantages et les défis de l'utilisation de GitHub Actions pour la mise en place d'un pipeline de développement automatisé.",
      "Nous allons également couvrir des sujets tels que la création de workflows et la gestion des dépendances.",
    ],
    author: {
      name: "Thomas Weber",
      avatar: "/avatars/thomas.png",
    },
  },
  {
    title: "Performance Web avec Core Web Vitals",
    excerpt: "Optimisez votre site selon les métriques de Google",
    image: "/images/blog/web-vitals.png",
    categories: ["Performance", "SEO", "Frontend"],
    date: "2023-11-28",
    readTime: 14,
    slug: "core-web-vitals",
    content: [
      "La performance web est un aspect crucial de la création d'applications web modernes.",
      "Dans cet article, nous allons explorer les avantages et les défis de l'utilisation de Core Web Vitals pour optimiser la performance de votre site web.",
      "Nous allons également couvrir des sujets tels que la mesure de la performance et la mise en place de politiques de performance.",
    ],
    author: {
      name: "Emma Brown",
      avatar: "/avatars/emma.png",
    },
  },
];

export const getPopularCategories = () => {
  const categoryCount = new Map<string, number>();
  
  blogPosts.forEach(post => {
    post.categories.forEach(category => {
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });
  });

  return Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({
      name: category,
      count,
    }));
};

export const getRelatedPosts = (currentSlug: string, limit = 3) => {
  const currentPost = blogPosts.find(post => post.slug === currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      post,
      commonCategories: post.categories.filter(category => 
        currentPost.categories.includes(category)
      ).length
    }))
    .sort((a, b) => b.commonCategories - a.commonCategories)
    .slice(0, limit)
    .map(item => item.post);
};
