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
import portfolioService, { PortfolioProject } from "@/services/portfolioService"; 
import { useTheme } from "@/components/theme-provider";
import { Button } from "../components/ui/button";

// Nombre de projets affichés par page
const ITEMS_PER_PAGE = 6;

/**
 * Page de Portfolio
 * Permet de visualiser, filtrer et paginer les projets
 * @returns Composant de la page de portfolio
 */
const Portfolio = () => {
  // États pour gérer les projets et la pagination
  const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement des projets
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [projects, setProjects] = useState<PortfolioProject[]>([]); // Liste des projets à afficher
  const [totalProjects, setTotalProjects] = useState(0); // Nombre total de projets
  
  // Récupération du thème actuel
  const { theme } = useTheme();
  
  // Gestion des préférences de vue utilisateur
  const { 
    viewMode, // Mode d'affichage (grille/liste)
    selectedTechnologies, // Technologies sélectionnées pour filtrer
    searchQuery, // Requête de recherche
    setViewMode,
    setSelectedTechnologies,
    setSearchQuery
  } = useViewPreferences("portfolio-preferences");

  // Effet pour récupérer les projets dynamiquement
  useEffect(() => {
    // Fonction asynchrone pour charger les projets
    const fetchProjects = async () => {
      try {
        // Début du chargement
        setIsLoading(true);

        // Récupération des projets paginés depuis le service
        const response = await portfolioService.getPaginatedProjects(
          currentPage, 
          ITEMS_PER_PAGE, 
          selectedTechnologies, 
          searchQuery
        );

        // Mise à jour des états avec les données récupérées
        setProjects(response.data); // Projets de la page courante
        setTotalProjects(response.total); // Nombre total de projets
      } catch (error) {
        // Gestion des erreurs de chargement
        console.error("Erreur lors du chargement des projets:", error);
      } finally {
        // Fin du chargement
        setIsLoading(false);
      }
    };

    // Appel de la fonction de chargement
    fetchProjects();
  }, [currentPage, selectedTechnologies, searchQuery]); // Dépendances qui déclenchent le rechargement

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);

  // Réinitialisation à la première page lors du changement de filtres
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
        {!isLoading && projects.length === 0 && (
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
              {projects.map((project, index) => (
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
                    <p 
                      className={`
                        mb-4
                        ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                      `}
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
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
                      {project.link && (
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
                          <ExternalLink className="w-4 h-4" size={16}  />
                          Voir le projet
                        </a>
                      )}
                      {project.github && (
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
                          <Github className="w-4 h-4" size={16}  />
                          Code source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-4">
            {/* Bouton page précédente */}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2" /> Précédent
            </Button>

            {/* Bouton page suivante */}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Suivant <ChevronRight className="ml-2" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;