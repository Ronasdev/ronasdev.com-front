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

// Nombre d'articles par page
const ITEMS_PER_PAGE = 6;

/**
 * Page principale du blog
 * Affiche une liste d'articles avec options de filtrage, tri et pagination
 */
const Blog = () => {
  // États locaux
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Préférences d'affichage
  const { 
    viewMode, 
    selectedCategories, 
    sortOrder, 
    searchQuery, 
    setViewMode, 
    setSelectedCategories, 
    setSortOrder, 
    setSearchQuery 
  } = useViewPreferences("blog");

  // Réinitialise la page courante lors du changement des filtres
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, searchQuery, sortOrder]);

  // Simulation du chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calcul des catégories populaires
  const popularCategories = Array.from(
    blogPosts.reduce((acc, post) => {
      post.categories.forEach(category => {
        acc.set(category, (acc.get(category) || 0) + 1);
      });
      return acc;
    }, new Map())
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Filtrage des articles
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesCategories = selectedCategories.length === 0 || 
        post.categories.some(cat => selectedCategories.includes(cat));
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategories && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  // Pagination
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        {/* En-tête */}
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

        {/* Barre de filtrage */}
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

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <GridSkeleton count={6} />
            ) : (
              <>
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
                  {paginatedPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-secondary-light mb-4">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {post.categories[0]}
                          </span>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime || '5 min'}
                          </div>
                        </div>
                        <h2 className="text-xl font-semibold text-secondary-dark mb-2">
                          {post.title}
                        </h2>
                        <p className="text-secondary-light mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                          >
                            Lire la suite
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
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

                {/* Message si aucun article */}
                {filteredPosts.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-secondary-light py-8"
                  >
                    Aucun article ne correspond à vos critères de recherche.
                  </motion.p>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
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