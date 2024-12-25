/**
 * Composant FormationFilterBar
 * 
 * @description Barre de filtrage et de recherche pour les formations
 * 
 * Caractéristiques principales :
 * - Recherche textuelle de formations
 * - Filtrage par niveau
 * - Filtrage par plage de prix
 * - Filtrage par durée
 * - Animation d'entrée avec Framer Motion
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearchChange - Fonction de changement de requête de recherche
 * @param {Function} props.onLevelChange - Fonction de changement de niveau
 * @param {Function} props.onPriceRangeChange - Fonction de changement de plage de prix
 * @param {Function} props.onDurationChange - Fonction de changement de durée
 * @param {string} props.selectedLevel - Niveau de formation sélectionné
 * @param {string} props.selectedPriceRange - Plage de prix sélectionnée
 * @param {string} props.selectedDuration - Durée sélectionnée
 * @param {string} props.searchQuery - Requête de recherche
 * 
 * @returns {JSX.Element} Barre de filtrage des formations
 */
import { Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion } from "framer-motion";

// Interface des propriétés du composant
interface FormationFilterBarProps {
  onSearchChange: (value: string) => void;     // Changement de requête de recherche
  onLevelChange: (value: string) => void;      // Changement de niveau
  onPriceRangeChange: (value: string) => void; // Changement de plage de prix
  onDurationChange: (value: string) => void;   // Changement de durée
  selectedLevel: string;                       // Niveau sélectionné
  selectedPriceRange: string;                  // Plage de prix sélectionnée
  selectedDuration: string;                    // Durée sélectionnée
  searchQuery: string;                         // Requête de recherche
}

const FormationFilterBar = ({
  onSearchChange,
  onLevelChange,
  onPriceRangeChange,
  onDurationChange,
  selectedLevel,
  selectedPriceRange,
  selectedDuration,
  searchQuery,
}: FormationFilterBarProps) => {
  return (
    // Conteneur animé avec Framer Motion
    <motion.div
      initial={{ opacity: 0, y: -20 }}  // Animation d'entrée
      animate={{ opacity: 1, y: 0 }}    // État final
      className="bg-white rounded-lg shadow-md p-4 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Champ de recherche avec icône intégrée */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conteneur des filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Icône et libellé des filtres */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Filtres:</span>
          </div>

          {/* Sélecteur de niveau */}
          <Select value={selectedLevel} onValueChange={onLevelChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              <SelectItem value="Débutant">Débutant</SelectItem>
              <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
              <SelectItem value="Avancé">Avancé</SelectItem>
            </SelectContent>
          </Select>

          {/* Sélecteur de plage de prix */}
          <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les prix</SelectItem>
              <SelectItem value="0-500">0€ - 500€</SelectItem>
              <SelectItem value="500-1000">500€ - 1000€</SelectItem>
              <SelectItem value="1000+">1000€ et plus</SelectItem>
            </SelectContent>
          </Select>

          {/* Sélecteur de durée */}
          <Select value={selectedDuration} onValueChange={onDurationChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les durées</SelectItem>
              <SelectItem value="1-2">1-2 jours</SelectItem>
              <SelectItem value="3-4">3-4 jours</SelectItem>
              <SelectItem value="5+">5 jours et plus</SelectItem>
            </SelectContent>
          </Select>

          {/* Bouton de réinitialisation des filtres */}
          <Button
            variant="outline"
            onClick={() => {
              onSearchChange("");
              onLevelChange("all");
              onPriceRangeChange("all");
              onDurationChange("all");
            }}
            className="whitespace-nowrap"
          >
            Réinitialiser
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FormationFilterBar;
