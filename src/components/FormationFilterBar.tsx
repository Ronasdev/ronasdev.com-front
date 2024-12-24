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

interface FormationFilterBarProps {
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  selectedLevel: string;
  selectedPriceRange: string;
  selectedDuration: string;
  searchQuery: string;
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Filtres:</span>
          </div>
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
