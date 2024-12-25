/**
 * Composant FormationCard
 * 
 * @description Affiche une carte détaillée pour une formation avec des informations complètes
 * 
 * Caractéristiques principales :
 * - Affichage dynamique des détails de la formation
 * - Animations fluides avec Framer Motion
 * - Gestion des niveaux et des places disponibles
 * - Bouton d'inscription interactif
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Formation} props.formation - Objet de formation à afficher
 * @param {Function} props.onRegister - Fonction de callback pour l'inscription
 * 
 * @returns {JSX.Element} Carte de formation interactive
 */
import { motion } from "framer-motion";
import { CalendarDays, Clock, GraduationCap, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Formation } from "../types/formation";

// Interface des propriétés du composant
interface FormationCardProps {
  formation: Formation;  // Objet de formation
  onRegister: (formation: Formation) => void;  // Fonction d'inscription
}

const FormationCard = ({ formation, onRegister }: FormationCardProps) => {
  /**
   * Détermine la couleur du badge en fonction du niveau de la formation
   * 
   * @param {string} level - Niveau de la formation
   * @returns {string} Classe de couleur correspondante
   */
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "débutant":
        return "bg-green-100 text-green-800";
      case "intermédiaire":
        return "bg-blue-100 text-blue-800";
      case "avancé":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    // Carte de formation animée avec effet de survol
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Carte avec disposition flexible */}
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        {/* En-tête de la carte */}
        <CardHeader>
          {/* Badges de niveau et de places */}
          <div className="flex items-center justify-between mb-2">
            {/* Badge de niveau de formation */}
            <Badge className={getLevelColor(formation.level)}>
              {formation.level}
            </Badge>
            
            {/* Tooltip pour le nombre de places */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="cursor-help">
                    {formation.maxParticipants} places
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Places limitées pour un meilleur apprentissage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Titre et description de la formation */}
          <CardTitle className="text-xl font-bold">{formation.title}</CardTitle>
          <CardDescription>{formation.description}</CardDescription>
        </CardHeader>

        {/* Contenu de la carte */}
        <CardContent className="flex-1">
          {/* Grille d'informations détaillées */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Durée de la formation */}
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formation.duration}</span>
            </div>
            
            {/* Date de début */}
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(formation.startDate).toLocaleDateString("fr-FR")}
              </span>
            </div>
            
            {/* Nombre maximum de participants */}
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>Max. {formation.maxParticipants}</span>
            </div>
            
            {/* Niveau de la formation */}
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="w-4 h-4" />
              <span>{formation.level}</span>
            </div>
          </div>

          {/* Programme de formation */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Programme</h4>
              <ul className="space-y-2">
                {formation.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                    <span className="text-gray-600">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>

        {/* Pied de page de la carte */}
        <CardFooter className="flex flex-col gap-4 pt-4 border-t">
          <div className="flex items-center justify-between w-full">
            {/* Prix de la formation */}
            <div>
              <p className="text-sm text-gray-500">Prix de la formation</p>
              <p className="text-2xl font-bold text-primary">{formation.price}€</p>
            </div>
            
            {/* Bouton d'inscription */}
            <Button
              size="lg"
              onClick={() => onRegister(formation)}
              className="whitespace-nowrap"
            >
              S'inscrire
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FormationCard;
