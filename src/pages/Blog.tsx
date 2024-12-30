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
import blogService, { BlogPost } from "@/services/blogService";
import useViewPreferences from "../hooks/useViewPreferences";
import ShareButtons from "../components/ShareButtons";
import PopularCategories from "../components/PopularCategories";
import Pagination from "../components/Pagination";
import { useTheme } from "@/components/theme-provider";

// Nombre d'articles par page pour la pagination
const ITEMS_PER_PAGE = 2;
const VITE_API_URL = import.meta.env.VITE_API_URL;

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

  // Récupération du thème actuel
  const { theme } = useTheme();

  // Hook personnalisé pour gérer les préférences de vue d'affichage
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

  // États pour stocker les articles
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Réinitialise la page courante lors du changement des filtres
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, searchQuery, sortOrder]);

  // Effet pour charger les articles
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetchPosts", {
        page: currentPage,
        per_page: ITEMS_PER_PAGE,
        categories: selectedCategories,
        searchQuery,
        sortOrder,
        status: "published",
      });
      
      try {
        setIsLoading(true);
        const result = await blogService.getPosts({
          page: currentPage,
          per_page: ITEMS_PER_PAGE,
          categories: selectedCategories,
          searchQuery,
          sortOrder,
          status: "published",
        });
        console.log("getPosts", result);
        setPosts(result.posts);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Erreur lors du chargement des articles", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, selectedCategories, searchQuery, sortOrder]);

  // Calcul des catégories populaires
  const popularCategories = Array.from(
    (posts || []).reduce((acc, post) => {
      // Compte le nombre d'occurrences de chaque catégorie
      post?.categories?.forEach(category => {
        acc.set(category, (acc.get(category) || 0) + 1);
      });
      return acc;
    }, new Map())
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);



  // // Filtrage des articles
  // const filteredPosts = posts
  //   .filter(post => {
  //     const matchesCategories = selectedCategories.length === 0 ||
  //       post.categories.some(cat => selectedCategories.includes(cat));
  //     const matchesSearch = searchQuery === "" ||
  //       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  //     return matchesCategories && matchesSearch;
  //   })
  //   .sort((a, b) => {
  //     if (sortOrder === "newest") {
  //       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //     }
  //     return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  //   });


  // // Pagination
  // const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  // Gestionnaire de clic sur une catégorie
  const handleCategoryClick = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark'
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20'
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        {/* En-tête animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`
            text-4xl font-bold mb-4
            ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
          `}>
            Blog & Actualités
          </h1>
          <p className={`
            max-w-2xl mx-auto
            ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
          `}>
            Découvrez mes derniers articles sur le développement web,
            les nouvelles technologies et les meilleures pratiques.
          </p>
        </motion.div>

        <BlogFilterBar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          theme={theme}
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
                  className={`grid ${viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 gap-6"
                    : "grid-cols-1 gap-4"
                    }`}
                >
                  {/* Mapping des articles avec animations individuelles */}
                  {posts?.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      className={`
                      rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow
                       ${theme === 'dark'
                          ? 'bg-secondary-dark/10 border border-secondary-dark/20'
                          : 'bg-white'}
                    `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Image de couverture */}
                      <img
                        src={VITE_API_URL + post.featured_image}
                        alt={post.title}
                        className={`
                          w-full h-48 object-cover
                          ${theme === 'dark' ? 'opacity-80' : 'opacity-100'}
                        `}
                      />
                      <div className="p-6">
                        {/* Métadonnées de l'article */}
                        <div className={`
                           flex items-center space-x-4 text-sm mb-4
                           ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                         `}>
                          {/* Catégorie principale */}
                          <span className={`
                             px-3 py-1 rounded-full
                             ${theme === 'dark'
                              ? 'bg-primary-dark/20 text-primary-light'
                              : 'bg-primary/10 text-primary'}
                           `}>
                            {post?.categories[0]}
                          </span>
                          {/* Date de publication */}
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.created_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          {/* Temps de lecture */}
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.read_time || '5 min'}
                          </div>
                        </div>
                        {/* Titre de l'article */}
                        <h2 className={`
                          text-xl font-semibold mb-2
                          ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
                        `}>
                          {post.title}
                        </h2>
                        {/* Extrait de l'article */}
                        <p className={`
                           mb-4
                           ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                         `}>
                          {post.excerpt}
                        </p>
                        {/* Lien de lecture et le partage de l'article*/}
                        <div className="flex items-center justify-between">
                          {/* Lien de lecture */}
                          <Link
                            to={`/blog/${post.slug}`}
                            className={`
                                      inline-flex items-center font-medium transition-colors
                                      ${theme === 'dark'
                                ? 'text-primary-light hover:text-primary'
                                : 'text-primary hover:text-primary-dark'}
                            `}
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
                {/* {posts.length > ITEMS_PER_PAGE && ( */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      theme={theme}
                    />
                  </div>
                )}
              </>
            )}

            {/* Message si aucun article ne correspond */}
            {!isLoading && posts.length === 0 && (
              <motion.p
                className={`
                text-center mt-12 text-xl
                ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
              `}>
                Aucun article ne correspond à vos critères.
              </motion.p>
            )}
          </div>

          {/* Sidebar des catégories populaires */}
          <div className="lg:col-span-1">
            <PopularCategories
              categories={popularCategories}
              selectedCategories={selectedCategories}
              onCategoryClick={handleCategoryClick}
              theme={theme}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;