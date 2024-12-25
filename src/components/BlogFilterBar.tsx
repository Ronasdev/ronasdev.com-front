/**
 * Composant BlogFilterBar
 * 
 * @description Barre de filtrage et de recherche pour le blog
 * 
 * Caractéristiques principales :
 * - Recherche textuelle
 * - Changement de mode d'affichage (grille/liste)
 * - Tri par ordre chronologique
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string[]} props.selectedCategories - Catégories sélectionnées
 * @param {Function} props.onCategoryChange - Fonction de changement de catégories
 * @param {'grid' | 'list'} props.viewMode - Mode d'affichage actuel
 * @param {Function} props.onViewModeChange - Fonction de changement de mode d'affichage
 * @param {'newest' | 'oldest'} props.sortOrder - Ordre de tri
 * @param {Function} props.onSortOrderChange - Fonction de changement d'ordre de tri
 * @param {string} props.searchQuery - Requête de recherche
 * @param {Function} props.onSearchQueryChange - Fonction de changement de requête
 * 
 * @returns {JSX.Element} Barre de filtrage du blog
 */
import { Search, LayoutGrid, List, SortAsc, SortDesc } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Interface des propriétés du composant
interface BlogFilterBarProps {
  selectedCategories: string[];  // Catégories sélectionnées
  onCategoryChange: (categories: string[]) => void;  // Changement de catégories
  viewMode: 'grid' | 'list';  // Mode d'affichage
  onViewModeChange: (mode: 'grid' | 'list') => void;  // Changement de mode
  sortOrder: 'newest' | 'oldest';  // Ordre de tri
  onSortOrderChange: (order: 'newest' | 'oldest') => void;  // Changement d'ordre
  searchQuery: string;  // Requête de recherche
  onSearchQueryChange: (query: string) => void;  // Changement de requête
}

/**
 * Barre de filtrage pour le blog
 * Permet de rechercher, filtrer par catégorie, trier par date et changer le mode d'affichage
 */
const BlogFilterBar = ({
  selectedCategories,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  sortOrder,
  onSortOrderChange,
  searchQuery,
  onSearchQueryChange,
}: BlogFilterBarProps) => {
  return (
    // Conteneur principal avec espacement vertical
    <div className="space-y-4 mb-8">
      {/* Barre de recherche et boutons de contrôle */}
      <div className="flex gap-4 items-center">
        {/* Champ de recherche avec icône intégrée */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Bouton de changement d'ordre de tri */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSortOrderChange(sortOrder === 'newest' ? 'oldest' : 'newest')}
          title={sortOrder === 'newest' ? "Plus ancien d'abord" : "Plus récent d'abord"}
        >
          {/* Icône dynamique selon l'ordre de tri */}
          {sortOrder === 'newest' ? (
            <SortDesc className="w-4 h-4" />
          ) : (
            <SortAsc className="w-4 h-4" />
          )}
        </Button>

        {/* Bouton de changement de mode d'affichage */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
          title={viewMode === 'grid' ? "Vue liste" : "Vue grille"}
        >
          {/* Icône dynamique selon le mode d'affichage */}
          {viewMode === 'grid' ? (
            <List className="w-4 h-4" />
          ) : (
            <LayoutGrid className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default BlogFilterBar;
