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

const FormationRegistration = ({
  formation,
  onClose,
}: FormationRegistrationProps) => {
  // État du formulaire
  const [formData, setFormData] = useState<RegistrationForm>(initialForm);
  
  // Hook de notifications
  const { toast } = useToast();

  /**
   * Gère la soumission du formulaire d'inscription
   * 
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ici, vous pouvez ajouter la logique pour envoyer les données à votre backend
    console.log("Données d'inscription:", {
      formation: formation.id,
      ...formData,
    });

    // Afficher un message de succès
    toast({
      title: "Inscription envoyée !",
      description: "Nous vous contacterons bientôt pour confirmer votre inscription.",
      duration: 5000,
    });

    // Réinitialiser le formulaire et fermer la modal
    setFormData(initialForm);
    onClose();
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
    // Modal d'inscription
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {/* En-tête de la modal */}
        <DialogHeader>
          <DialogTitle>Inscription à la formation</DialogTitle>
          <DialogDescription>
            {formation.title} - {formation.price}€
            <br />
            Date de début : {new Date(formation.startDate).toLocaleDateString("fr-FR")}
          </DialogDescription>
        </DialogHeader>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section Nom et Email */}
          <div className="grid grid-cols-2 gap-4">
            {/* Champ Nom */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            
            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Section Téléphone et Entreprise */}
          <div className="grid grid-cols-2 gap-4">
            {/* Champ Téléphone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            
            {/* Champ Entreprise */}
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de l'entreprise"
              />
            </div>
          </div>

          {/* Champ Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (optionnel)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Vos attentes, questions ou besoins spécifiques..."
              className="min-h-[100px]"
            />
          </div>

          {/* Boutons d'action */}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Envoyer la demande</Button>
          </DialogFooter>
        </form>

        {/* Informations supplémentaires */}
        <div className="mt-4 text-sm text-gray-500">
          <p>* Champs obligatoires</p>
          <p>
            En soumettant ce formulaire, vous acceptez d'être contacté(e) au sujet
            de cette formation.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormationRegistration;
