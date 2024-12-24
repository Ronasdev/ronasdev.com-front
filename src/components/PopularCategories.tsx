import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

interface PopularCategoriesProps {
  categories: {
    name: string;
    count: number;
  }[];
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
}

/**
 * Composant affichant les catégories populaires avec leur nombre d'articles
 * @param categories - Liste des catégories avec leur nombre d'articles
 * @param selectedCategories - Catégories actuellement sélectionnées
 * @param onCategoryClick - Fonction appelée lors du clic sur une catégorie
 */
const PopularCategories = ({
  categories,
  selectedCategories,
  onCategoryClick,
}: PopularCategoriesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-secondary-dark mb-4">
        Catégories Populaires
      </h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between group cursor-pointer"
            onClick={() => onCategoryClick(category.name)}
          >
            <Badge
              variant={selectedCategories.includes(category.name) ? "default" : "outline"}
              className="flex-1 justify-between hover:bg-primary/90 transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
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
