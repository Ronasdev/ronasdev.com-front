import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

interface PopularCategoriesProps {
  categories: {
    name: string;
    count: number;
  }[];
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
  theme?: 'light' | 'dark';  
}

/**
 * Composant affichant les catégories populaires avec leur nombre d'articles
 * @param categories - Liste des catégories avec leur nombre d'articles
 * @param selectedCategories - Catégories actuellement sélectionnées
 * @param onCategoryClick - Fonction appelée lors du clic sur une catégorie
 * @param theme - Thème actuel (clair ou sombre)
 */
const PopularCategories = ({
  categories,
  selectedCategories,
  onCategoryClick,
  theme = 'light',  
}: PopularCategoriesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-lg shadow-lg p-6
        ${theme === 'dark' 
          ? 'bg-secondary-dark/10 border border-secondary-dark/20' 
          : 'bg-white'}
      `}
    >
      <h3 className={`
        text-lg font-semibold mb-4
        ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
      `}>
        Catégories Populaires
      </h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.02 }}
            className={`
              flex items-center justify-between group cursor-pointer
              ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-dark'}
            `}
            onClick={() => onCategoryClick(category.name)}
          >
            <Badge
              variant={selectedCategories.includes(category.name) ? "default" : "outline"}
              className={`
                flex-1 justify-between transition-colors
                ${theme === 'dark' 
                  ? (selectedCategories.includes(category.name)
                    ? 'bg-primary-light text-secondary-dark hover:bg-primary' 
                    : 'bg-secondary-dark/20 text-gray-300 hover:bg-secondary-dark/30')
                  : (selectedCategories.includes(category.name)
                    ? 'bg-primary text-white hover:bg-primary-dark' 
                    : 'bg-gray-100 text-secondary-dark hover:bg-gray-200')}
              `}
            >
              <span>{category.name}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${theme === 'dark' 
                  ? 'bg-secondary-dark/30' 
                  : 'bg-white/20'}
              `}>
                {category.count}
              </span>
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PopularCategories;
