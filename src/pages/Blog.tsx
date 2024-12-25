// Page de Blog dynamique et interactive
// Gère le filtrage, le tri et la pagination des articles de blog

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogFilterBar from "../components/BlogFilterBar";
import { motion } from "framer-motion";
import { GridSkeleton } from "../components/LoadingStates";
import { blogPosts } from "../data/blogPosts";
import useViewPreferences from "../hooks/useViewPreferences";
import ShareButtons from "../components/ShareButtons";
import PopularCategories from "../components/PopularCategories";
import Pagination from "../components/Pagination";

// Nombre d'articles par page pour la pagination
const ITEMS_PER_PAGE = 6;

/**
 * Page principale du blog
 * Fonctionnalités:
 * - Filtrage par catégories
 * - Recherche par titre/extrait
 * - Tri par date
 * - Pagination
 * - Modes d'affichage (grille/liste)
 * 
 * @returns {JSX.Element} Page de blog complète
 */
const Blog = () => {
  // États de chargement et de pagination
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Hook personnalisé pour gérer les préférences de vue
  const { 
    viewMode,           // Mode d'affichage (grille/liste)
    selectedCategories, // Catégories sélectionnées
    sortOrder,          // Ordre de tri (plus récent/plus ancien)
    searchQuery,        // Requête de recherche
    setViewMode,        // Fonction pour changer le mode de vue
    setSelectedCategories, // Fonction pour mettre à jour les catégories
    setSortOrder,       // Fonction pour changer l'ordre de tri
    setSearchQuery      // Fonction pour mettre à jour la recherche
  } = useViewPreferences("blog");

  // Réinitialise la page courante lors du changement des filtres
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, searchQuery, sortOrder]);

  // Simulation de chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calcul des catégories populaires
  const popularCategories = Array.from(
    blogPosts.reduce((acc, post) => {
      // Compte le nombre d'occurrences de chaque catégorie
      post.categories.forEach(category => {
        acc.set(category, (acc.get(category) || 0) + 1);
      });
      return acc;
    }, new Map())
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Filtrage et tri des articles
  const filteredPosts = blogPosts
    .filter(post => {
      // Filtre par catégories
      const matchesCategories = selectedCategories.length === 0 || 
        post.categories.some(cat => selectedCategories.includes(cat));
      
      // Filtre par requête de recherche
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategories && matchesSearch;
    })
    .sort((a, b) => {
      // Tri par date (plus récent/plus ancien)
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  // Gestion de la pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Gestionnaire de clic sur une catégorie
  const handleCategoryClick = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    // Conteneur principal avec dégradé de fond
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        {/* En-tête animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-secondary-dark mb-4">
            Blog & Actualités
          </h1>
          <p className="text-secondary-light max-w-2xl mx-auto">
            Découvrez mes derniers articles sur le développement web, 
            les nouvelles technologies et les meilleures pratiques.
          </p>
        </motion.div>

        {/* Barre de filtrage et de recherche */}
        <BlogFilterBar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* Conteneur principal avec disposition responsive */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Section des articles */}
          <div className="lg:col-span-3">
            {/* États de chargement ou liste d'articles */}
            {isLoading ? (
              <GridSkeleton count={6} />
            ) : (
              <>
                {/* Conteneur de la grille d'articles avec animations */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 gap-6"
                      : "grid-cols-1 gap-4"
                  }`}
                >
                  {/* Mapping des articles avec animations individuelles */}
                  {paginatedPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Image de couverture */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        {/* Métadonnées de l'article */}
                        <div className="flex items-center space-x-4 text-sm text-secondary-light mb-4">
                          {/* Catégorie principale */}
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {post.categories[0]}
                          </span>
                          {/* Date de publication */}
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          {/* Temps de lecture */}
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime || '5 min'}
                          </div>
                        </div>
                        {/* Titre de l'article */}
                        <h2 className="text-xl font-semibold text-secondary-dark mb-2">
                          {post.title}
                        </h2>
                        {/* Extrait de l'article */}
                        <p className="text-secondary-light mb-4">
                          {post.excerpt}
                        </p>
                        {/* Actions de l'article */}
                        <div className="flex items-center justify-between">
                          {/* Lien vers l'article complet */}
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                          >
                            Lire la suite
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                          {/* Boutons de partage */}
                          <ShareButtons
                            url={`${window.location.origin}/blog/${post.slug}`}
                            title={post.title}
                          />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                {/* Pagination */}
                {filteredPosts.length > ITEMS_PER_PAGE && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar avec catégories populaires */}
          <div className="hidden lg:block">
            <PopularCategories
              categories={popularCategories}
              selectedCategories={selectedCategories}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;