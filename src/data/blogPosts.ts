export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  categories: string[];
  date: string;
  readTime: number;
  slug: string;
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
    author: {
      name: "Emma Brown",
      avatar: "/avatars/emma.png",
    },
  },
];

// Extraction des catégories populaires avec leur nombre d'occurrences
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

// Fonction pour obtenir les articles liés à un article donné
export const getRelatedPosts = (currentSlug: string, limit = 3) => {
  const currentPost = blogPosts.find(post => post.slug === currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      post,
      commonCategories: post.categories.filter(category => 
        currentPost.categories.includes(category)
      ).length,
    }))
    .sort((a, b) => b.commonCategories - a.commonCategories)
    .slice(0, limit)
    .map(({ post }) => post);
};
