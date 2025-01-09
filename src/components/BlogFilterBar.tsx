// /**
//  * Composant BlogFilterBar
//  * 
//  * @description Barre de filtrage et de recherche pour le blog
//  * 
//  * Caractéristiques principales :
//  * - Recherche textuelle
//  * - Changement de mode d'affichage (grille/liste)
//  * - Tri par ordre chronologique
//  * 
//  * @param {Object} props - Propriétés du composant
//  * @param {string[]} props.selectedCategories - Catégories sélectionnées
//  * @param {Function} props.onCategoryChange - Fonction de changement de catégories
//  * @param {'grid' | 'list'} props.viewMode - Mode d'affichage actuel
//  * @param {Function} props.onViewModeChange - Fonction de changement de mode d'affichage
//  * @param {'newest' | 'oldest'} props.sortOrder - Ordre de tri
//  * @param {Function} props.onSortOrderChange - Fonction de changement d'ordre de tri
//  * @param {string} props.searchQuery - Requête de recherche
//  * @param {Function} props.onSearchQueryChange - Fonction de changement de requête
//  * 
//  * @returns {JSX.Element} Barre de filtrage du blog
//  */
// import { Search, LayoutGrid, List, SortAsc, SortDesc } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useTheme } from '@/components/theme-provider';

// // Interface des propriétés du composant
// interface BlogFilterBarProps {
//   selectedCategories: string[];  // Catégories sélectionnées
//   onCategoryChange: (categories: string[]) => void;  // Changement de catégories
//   viewMode: 'grid' | 'list';  // Mode d'affichage
//   onViewModeChange: (mode: 'grid' | 'list') => void;  // Changement de mode
//   sortOrder: 'newest' | 'oldest';  // Ordre de tri
//   onSortOrderChange: (order: 'newest' | 'oldest') => void;  // Changement d'ordre
//   searchQuery: string;  // Requête de recherche
//   onSearchQueryChange: (query: string) => void;  // Changement de requête
// }

// /**
//  * Barre de filtrage pour le blog
//  * Permet de rechercher, filtrer par catégorie, trier par date et changer le mode d'affichage
//  */
// const BlogFilterBar = ({
//   selectedCategories,
//   onCategoryChange,
//   viewMode,
//   onViewModeChange,
//   sortOrder,
//   onSortOrderChange,
//   searchQuery,
//   onSearchQueryChange
// }: BlogFilterBarProps) => {
//   // Récupération du thème actuel
//   const { theme } = useTheme();

//   // Liste des catégories statiques
//   const categories = [
//     "Développement Web", 
//     "Frontend", 
//     "Backend", 
//     "DevOps", 
//     "Design"
//   ];

//   return (
//     // Conteneur principal avec espacement vertical
//     <div className="space-y-4 mb-8">
//       {/* Barre de recherche et boutons de contrôle */}
//       <div className="flex gap-4 items-center">
//         {/* Champ de recherche avec icône intégrée */}
//         <div className="relative flex-1">
//           <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-secondary-light'} w-4 h-4`} />
//           <Input
//             type="text"
//             placeholder="Rechercher un article..."
//             value={searchQuery}
//             onChange={(e) => onSearchQueryChange(e.target.value)}
//             className={`pl-10 ${theme === 'dark' ? 'bg-secondary-dark/10 border-secondary-dark/20 text-white' : 'bg-white'}`}
//           />
//         </div>

//         {/* Bouton de changement d'ordre de tri */}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => onSortOrderChange(sortOrder === 'newest' ? 'oldest' : 'newest')}
//           title={sortOrder === 'newest' ? "Plus ancien d'abord" : "Plus récent d'abord"}
//         >
//           {/* Icône dynamique selon l'ordre de tri */}
//           {sortOrder === 'newest' ? (
//             <SortDesc className="w-4 h-4" />
//           ) : (
//             <SortAsc className="w-4 h-4" />
//           )}
//         </Button>

//         {/* Bouton de changement de mode d'affichage */}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
//           title={viewMode === 'grid' ? "Vue liste" : "Vue grille"}
//         >
//           {/* Icône dynamique selon le mode d'affichage */}
//           {viewMode === 'grid' ? (
//             <List className="w-4 h-4" />
//           ) : (
//             <LayoutGrid className="w-4 h-4" />
//           )}
//         </Button>
//       </div>

//       {/* Filtres de catégories */}
//       <div className="flex flex-wrap gap-2">
//         {categories.map(category => (
//           <Button
//             key={category}
//             variant={selectedCategories.includes(category) ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => {
//               onCategoryChange(
//                 selectedCategories.includes(category)
//                   ? selectedCategories.filter(c => c !== category)
//                   : [...selectedCategories, category]
//               );
//             }}
//             className={`
//               ${selectedCategories.includes(category) 
//                 ? (theme === 'dark' 
//                   ? 'bg-primary-dark text-white' 
//                   : 'bg-primary text-white') 
//                 : (theme === 'dark' 
//                   ? 'bg-secondary-dark/10 text-gray-300 hover:bg-secondary-dark/20' 
//                   : 'bg-gray-100 text-secondary-light hover:bg-gray-200')}
//             `}
//           >
//             {category}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogFilterBar;


import React, { useState } from 'react';
import { Search, LayoutGrid, List, SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from '@/components/theme-provider';

interface BlogFilterBarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortOrder: 'newest' | 'oldest';
  onSortOrderChange: (order: 'newest' | 'oldest') => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  theme?: 'light' | 'dark';
}

const BlogFilterBar: React.FC<BlogFilterBarProps> = ({
  selectedCategories,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  sortOrder,
  onSortOrderChange,
  searchQuery,
  onSearchQueryChange,
  theme
}) => {

  return (
    <div className="space-y-4 mb-8">
      {/* Barre de recherche et boutons de contrôle */}
      <div className="flex gap-4 items-center">
        {/* Champ de recherche avec icône intégrée */}
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 
            ${theme === 'dark' ? 'text-gray-400' : 'text-secondary-light'} w-4 h-4`} 
          />
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className={`pl-10 ${theme === 'dark' 
              ? 'bg-secondary-dark/10 border-secondary-dark/20 text-white' 
              : 'bg-white'}`}
          />
        </div>

        {/* Bouton de changement d'ordre de tri */}
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

        {/* Bouton de changement de mode d'affichage */}
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
