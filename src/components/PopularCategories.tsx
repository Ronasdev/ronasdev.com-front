// import { motion } from 'framer-motion';
// import { Badge } from './ui/badge';

// interface PopularCategoriesProps {
//   categories: {
//     name: string;
//     count: number;
//   }[];
//   selectedCategories: string[];
//   onCategoryClick: (category: string) => void;
//   theme?: 'light' | 'dark' | "system";  
// }

// /**
//  * Composant affichant les catégories populaires avec leur nombre d'articles
//  * @param categories - Liste des catégories avec leur nombre d'articles
//  * @param selectedCategories - Catégories actuellement sélectionnées
//  * @param onCategoryClick - Fonction appelée lors du clic sur une catégorie
//  * @param theme - Thème actuel (clair ou sombre)
//  */
// const PopularCategories = ({
//   categories,
//   selectedCategories,
//   onCategoryClick,
//   theme = 'light',  
// }: PopularCategoriesProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`
//         rounded-lg shadow-lg p-6
//         ${theme === 'dark' 
//           ? 'bg-secondary-dark/10 border border-secondary-dark/20' 
//           : 'bg-white'}
//       `}
//     >
//       <h3 className={`
//         text-lg font-semibold mb-4
//         ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
//       `}>
//         Catégories Populaires
//       </h3>
//       <div className="space-y-3">
//         {categories.map((category) => (
//           <motion.div
//             key={category.name}
//             whileHover={{ scale: 1.02 }}
//             className={`
//               flex items-center justify-between group cursor-pointer
//               ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-dark'}
//             `}
//             onClick={() => onCategoryClick(category.name)}
//           >
//             <Badge
//               variant={selectedCategories.includes(category.name) ? "default" : "outline"}
//               className={`
//                 flex-1 justify-between transition-colors
//                 ${theme === 'dark' 
//                   ? (selectedCategories.includes(category.name)
//                     ? 'bg-primary-light text-secondary-dark hover:bg-primary' 
//                     : 'bg-secondary-dark/20 text-gray-300 hover:bg-secondary-dark/30')
//                   : (selectedCategories.includes(category.name)
//                     ? 'bg-primary text-white hover:bg-primary-dark' 
//                     : 'bg-gray-100 text-secondary-dark hover:bg-gray-200')}
//               `}
//             >
//               <span>{category.name}</span>
//               <span className={`
//                 px-2 py-0.5 rounded-full text-xs
//                 ${theme === 'dark' 
//                   ? 'bg-secondary-dark/30' 
//                   : 'bg-white/20'}
//               `}>
//                 {category.count}
//               </span>
//             </Badge>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default PopularCategories;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

interface Category {
  id: number;
  name: string;
  article_count?: number;
}

interface PopularCategoriesProps {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategory: number | null;
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ 
  onCategorySelect, 
  selectedCategory 
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ data: Category[] }>(`${API_BASE_URL}/categories`);
        
        // Trier les catégories par nombre d'articles (descendant)
        const sortedCategories = response.data.data.sort((a, b) => 
          (b.article_count || 0) - (a.article_count || 0)
        );

        setCategories(sortedCategories);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des catégories', err);
        setError('Impossible de charger les catégories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Chargement des catégories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4">Catégories Populaires</h3>
      
      {/* Bouton "Toutes les catégories" */}
      <button
        onClick={() => onCategorySelect(null)}
        className={`w-full text-left px-4 py-2 rounded transition-colors ${
          selectedCategory === null 
            ? 'bg-primary text-white' 
            : 'hover:bg-gray-100'
        }`}
      >
        Toutes les catégories
      </button>

      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`w-full text-left px-4 py-2 rounded transition-colors ${
            selectedCategory === category.id 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{category.name}</span>
            <span className="text-sm text-gray-500">
              {category.article_count || 0}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PopularCategories;
