/**
 * Composant FormationRegistration
 * 
 * @description Formulaire modal d'inscription à une formation
 * 
 * Caractéristiques principales :
 * - Formulaire dynamique et réactif
 * - Validation des champs
 * - Gestion des états de formulaire
 * - Intégration avec système de notifications
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Formation} props.formation - Détails de la formation
 * @param {Function} props.onClose - Fonction de fermeture de la modal
 * 
 * @returns {JSX.Element} Modal d'inscription à la formation
 */
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Formation } from "../types/formation";
import axios from "axios";

// Interface des propriétés du composant
interface FormationRegistrationProps {
  formation: Formation;  // Détails de la formation
  onClose: () => void;   // Fonction de fermeture
}

// Interface du formulaire d'inscription
interface RegistrationForm {
  name: string;      // Nom complet
  email: string;     // Adresse email
  phone: string;     // Numéro de téléphone
  company: string;   // Entreprise
  message: string;   // Message optionnel
}

// État initial du formulaire
const initialForm: RegistrationForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

const FormationRegistration = ({
  formation,
  onClose,
}: FormationRegistrationProps) => {
  // État du formulaire
  const [formData, setFormData] = useState<RegistrationForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook de notifications
  const { toast } = useToast();

  /**
   * Gère la soumission du formulaire d'inscription
   * 
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Envoyer les données au backend
      const response = await axios.post(`${API_URL}/enrollments`, {
        formation_id: formation.id,
        ...formData,
      });
      console.log("enrollement d'une formation: ", response.data);
      // Afficher un message de succès
      toast({
        title: "Inscription envoyée !",
        description: "Nous vous contacterons bientôt pour confirmer votre inscription.",
        duration: 5000,
      });

      // Réinitialiser le formulaire et fermer la modal
      setFormData(initialForm);
      onClose();
    } catch (error: any) {
      // Afficher un message d'erreur
      toast({
        title: "Erreur",
        description: error.response?.data?.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère les changements dans les champs du formulaire
   * 
   * @param {React.ChangeEvent} e - Événement de changement de champ
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inscription à la formation</DialogTitle>
          <DialogDescription>
            {formation.title} - {formation.level}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "S'inscrire"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormationRegistration;
