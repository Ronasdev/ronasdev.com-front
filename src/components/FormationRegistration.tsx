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

interface FormationRegistrationProps {
  formation: Formation;
  onClose: () => void;
}

interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

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
  const [formData, setFormData] = useState<RegistrationForm>(initialForm);
  const { toast } = useToast();

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Inscription à la formation</DialogTitle>
          <DialogDescription>
            {formation.title} - {formation.price}€
            <br />
            Date de début : {new Date(formation.startDate).toLocaleDateString("fr-FR")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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

          <DialogFooter className="flex gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Envoyer la demande</Button>
          </DialogFooter>
        </form>

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
