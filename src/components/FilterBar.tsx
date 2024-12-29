/**
 * Composant FilterBar
 * 
 * @description Barre de filtrage et de recherche pour le portfolio
 * 
 * Caractéristiques principales :
 * - Recherche textuelle de projets
 * - Filtrage par technologies
 * - Changement de mode d'affichage (grille/liste)
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string[]} props.selectedTechnologies - Technologies sélectionnées
 * @param {Function} props.onTechnologyChange - Fonction de changement de technologies
 * @param {'grid' | 'list'} props.viewMode - Mode d'affichage actuel
 * @param {Function} props.onViewModeChange - Fonction de changement de mode d'affichage
 * @param {string} props.searchQuery - Requête de recherche
 * @param {Function} props.onSearchQueryChange - Fonction de changement de requête
 * 
 * @returns {JSX.Element} Barre de filtrage du portfolio
 */
import { useState, useEffect } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import portfolioService from "@/services/portfolioService";

// Interface des propriétés du composant
interface FilterBarProps {
  selectedTechnologies: string[];  // Technologies sélectionnées
  onTechnologyChange: (technologies: string[]) => void;  // Changement de technologies
  viewMode: 'grid' | 'list';  // Mode d'affichage
  onViewModeChange: (mode: 'grid' | 'list') => void;  // Changement de mode
  searchQuery: string;  // Requête de recherche
  onSearchQueryChange: (query: string) => void;  // Changement de requête
}

/**
 * Barre de filtrage pour le portfolio
 * Permet de rechercher, filtrer par technologie et changer le mode d'affichage
 */
const FilterBar = ({
  selectedTechnologies,
  onTechnologyChange,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchQueryChange,
}: FilterBarProps) => {
  // État pour stocker les technologies disponibles
  const [technologies, setTechnologies] = useState<string[]>([]);

  // Récupération des technologies disponibles
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const allProjects = await portfolioService.getAll();
        
        // Extraire les technologies uniques de tous les projets
        const uniqueTechnologies = Array.from(
          new Set(
            allProjects.flatMap(project => project.technologies)
          )
        ).sort();

        setTechnologies(uniqueTechnologies);
      } catch (error) {
        console.error("Erreur lors de la récupération des technologies:", error);
      }
    };

    fetchTechnologies();
  }, []);

  /**
   * Gère le basculement de sélection d'une technologie
   * 
   * @param {string} tech - Technologie à basculer
   */
  const handleTechnologyToggle = (tech: string) => {
    if (selectedTechnologies.includes(tech)) {
      // Retire la technologie si déjà sélectionnée
      onTechnologyChange(selectedTechnologies.filter((t) => t !== tech));
    } else {
      // Ajoute la technologie si non sélectionnée
      onTechnologyChange([...selectedTechnologies, tech]);
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Barre de recherche et bouton de vue */}
      <div className="flex gap-4 items-center">
        {/* Champ de recherche avec icône intégrée */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Boutons de changement de mode d'affichage */}
        <div className="flex gap-2">
          {/* Bouton vue grille */}
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            title="Vue grille"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>

          {/* Bouton vue liste */}
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("list")}
            title="Vue liste"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filtres par technologie */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => handleTechnologyToggle(tech)}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
