import { Search, LayoutGrid, List, SortAsc, SortDesc } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface BlogFilterBarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortOrder: 'newest' | 'oldest';
  onSortOrderChange: (order: 'newest' | 'oldest') => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
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
    <div className="space-y-4 mb-8">
      {/* Barre de recherche et boutons de contrôle */}
      <div className="flex gap-4 items-center">
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSortOrderChange(sortOrder === 'newest' ? 'oldest' : 'newest')}
          title={sortOrder === 'newest' ? "Plus ancien d'abord" : "Plus récent d'abord"}
        >
          {sortOrder === 'newest' ? (
            <SortDesc className="w-4 h-4" />
          ) : (
            <SortAsc className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
          title={viewMode === 'grid' ? "Vue liste" : "Vue grille"}
        >
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
