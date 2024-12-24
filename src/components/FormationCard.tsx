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

interface FormationCardProps {
  formation: Formation;
  onRegister: (formation: Formation) => void;
}

const FormationCard = ({ formation, onRegister }: FormationCardProps) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={getLevelColor(formation.level)}>
              {formation.level}
            </Badge>
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
          <CardTitle className="text-xl font-bold">{formation.title}</CardTitle>
          <CardDescription>{formation.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formation.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(formation.startDate).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>Max. {formation.maxParticipants}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="w-4 h-4" />
              <span>{formation.level}</span>
            </div>
          </div>

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
        <CardFooter className="flex flex-col gap-4 pt-4 border-t">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-sm text-gray-500">Prix de la formation</p>
              <p className="text-2xl font-bold text-primary">{formation.price}€</p>
            </div>
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
