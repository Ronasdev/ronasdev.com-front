// Page de Portfolio personnel
// Affiche et filtre les projets réalisés avec des fonctionnalités interactives

import { useState, useEffect } from "react";
import { motion } from "framer-motion";  // Bibliothèque d'animations
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";  // Icônes

// Composants de navigation et de mise en page
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";
import { PortfolioGridSkeleton } from "../components/LoadingStates";

// Hook personnalisé pour gérer les préférences de vue
import useViewPreferences from "../hooks/useViewPreferences";

// Données statiques des projets
import { projects } from "../data/projects";
import { Button } from "../components/ui/button";
import { useTheme } from "@/components/theme-provider";  // Ajout du hook de thème

// Nombre de projets affichés par page
const ITEMS_PER_PAGE = 6;

/**
 * Page de Portfolio
 * Permet de visualiser, filtrer et paginer les projets
 * @returns Composant de la page de portfolio
 */
const Portfolio = () => {
  // États de chargement et de pagination
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Récupération du thème actuel
  const { theme } = useTheme();
  
  // Hook de gestion des préférences de vue
  const { 
    viewMode,           // Mode d'affichage (grille/liste)
    selectedTechnologies, // Technologies sélectionnées pour filtrer
    searchQuery,        // Requête de recherche
    setViewMode,        // Fonction pour changer le mode de vue
    setSelectedTechnologies, // Fonction pour mettre à jour les technologies
    setSearchQuery      // Fonction pour mettre à jour la recherche
  } = useViewPreferences("portfolio-preferences");

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrage des projets selon les critères de recherche
  const filteredProjects = projects.filter(project => {
    const matchesTech = selectedTechnologies.length === 0 || 
      project.technologies.some(tech => selectedTechnologies.includes(tech));
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Réinitialisation de la page lors du changement de filtres
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTechnologies, searchQuery]);

  return (
    // Conteneur principal avec dégradé de fond
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        {/* Titre animé de la section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`
            text-4xl font-bold mb-4
            ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
          `}>
            Portfolio
          </h1>
          <p className={`
            max-w-2xl mx-auto
            ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
          `}>
            Découvrez mes projets et réalisations dans le développement web.
          </p>
        </motion.div>

        {/* Barre de filtres et de recherche */}
        <FilterBar
          selectedTechnologies={selectedTechnologies}
          onTechnologyChange={setSelectedTechnologies}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* Message si aucun projet ne correspond aux filtres */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.p
            className={`
              text-center mt-8
              ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Aucun projet ne correspond à vos critères de recherche.
          </motion.p>
        )}

        <div className="mt-8">
          {/* Skeleton de chargement ou grille de projets */}
          {isLoading ? (
            <PortfolioGridSkeleton count={ITEMS_PER_PAGE} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-8`}
            >
              {/* Carte de projet avec animations */}
              {paginatedProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    rounded-xl shadow-sm overflow-hidden hover:shadow-lg 
                    transition-shadow duration-300 flex flex-col
                    ${theme === 'dark' 
                      ? 'bg-secondary-dark/10 border border-secondary-dark/20' 
                      : 'bg-white'}
                  `}
                >
                  {/* Image du projet */}
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`
                        w-full h-48 object-cover
                        ${theme === 'dark' ? 'opacity-80' : 'opacity-100'}
                      `}
                    />
                  </div>
                  {/* Détails du projet */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className={`
                      text-xl font-semibold mb-2
                      ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
                    `}>
                      {project.title}
                    </h2>
                    <p className={`
                      mb-4
                      ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                    `}>
                      {project.description}
                    </p>
                    {/* Technologies utilisées */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`
                            px-3 py-1 rounded-full text-sm
                            ${theme === 'dark' 
                              ? 'bg-primary-dark/20 text-primary-light' 
                              : 'bg-primary/10 text-primary'}
                          `}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Boutons d'action */}
                    <div className="mt-auto pt-4 border-t flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center justify-center flex-1 gap-2 
                          px-4 py-2 border rounded-full transition-colors
                          ${theme === 'dark' 
                            ? 'text-primary-light border-primary-light hover:bg-primary-light hover:text-secondary-dark' 
                            : 'text-primary border-primary hover:bg-primary hover:text-white'}
                        `}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir le projet
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center justify-center flex-1 gap-2 
                          px-4 py-2 border rounded-full transition-colors
                          ${theme === 'dark' 
                            ? 'text-secondary-light border-secondary-light hover:bg-secondary-light hover:text-secondary-dark' 
                            : 'text-secondary border-secondary hover:bg-secondary hover:text-white'}
                        `}
                      >
                        <Github className="w-4 h-4" />
                        Code source
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {/* Bouton page précédente */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`
                ${theme === 'dark' 
                  ? 'text-white border-secondary-light hover:bg-secondary-light/10' 
                  : 'text-secondary-dark border-secondary hover:bg-secondary/10'}
              `}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Numéros de page */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={`
                  ${currentPage === page 
                    ? (theme === 'dark' 
                      ? 'bg-primary-light text-secondary-dark' 
                      : 'bg-primary text-white') 
                    : (theme === 'dark' 
                      ? 'text-white border-secondary-light hover:bg-secondary-light/10' 
                      : 'text-secondary-dark border-secondary hover:bg-secondary/10')}
                `}
              >
                {page}
              </Button>
            ))}

            {/* Bouton page suivante */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`
                ${theme === 'dark' 
                  ? 'text-white border-secondary-light hover:bg-secondary-light/10' 
                  : 'text-secondary-dark border-secondary hover:bg-secondary/10'}
              `}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;