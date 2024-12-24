import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getAllTechnologies } from "../data/projects";

interface FilterBarProps {
  selectedTechnologies: string[];
  onTechnologyChange: (technologies: string[]) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
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
  const technologies = getAllTechnologies();

  const handleTechnologyToggle = (tech: string) => {
    if (selectedTechnologies.includes(tech)) {
      onTechnologyChange(selectedTechnologies.filter((t) => t !== tech));
    } else {
      onTechnologyChange([...selectedTechnologies, tech]);
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Barre de recherche et bouton de vue */}
      <div className="flex gap-4 items-center">
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
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            title="Vue grille"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
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
