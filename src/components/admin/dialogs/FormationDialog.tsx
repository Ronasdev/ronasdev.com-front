/**
 * Composant FormationDialog
 * 
 * @description Boîte de dialogue pour la création et l'édition de formations
 * 
 * Caractéristiques principales :
 * - Formulaire dynamique pour créer ou modifier une formation
 * - Gestion des états de formulaire
 * - Validation et soumission des données
 * - Notifications toast pour le retour utilisateur
 * 
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.open - État d'ouverture de la boîte de dialogue
 * @param {Function} props.onOpenChange - Fonction de changement d'état de la boîte de dialogue
 * @param {Object} [props.formation] - Formation à éditer (optionnel)
 * @param {string} [props.formation.id] - Identifiant de la formation
 * @param {string} props.formation.title - Titre de la formation
 * @param {string} props.formation.description - Description de la formation
 * @param {number} props.formation.price - Prix de la formation
 * @param {string} props.formation.level - Niveau de la formation
 * @param {string} props.formation.startDate - Date de début de la formation
 * @param {string} props.formation.duration - Durée de la formation
 * @param {number} props.formation.maxParticipants - Nombre maximum de participants
 * @param {string} props.formation.instructor - Formateur
 * @param {"upcoming" | "ongoing" | "completed"} props.formation.status - Statut de la formation
 * 
 * @returns {JSX.Element} Boîte de dialogue pour la gestion des formations
 */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// Interface des propriétés du composant
interface FormationDialogProps {
  open: boolean;                  // État d'ouverture de la boîte de dialogue
  onOpenChange: (open: boolean) => void;  // Fonction de changement d'état
  formation?: {                   // Formation optionnelle à éditer
    id?: string;                  // Identifiant de la formation
    title: string;                // Titre de la formation
    description: string;          // Description de la formation
    price: number;                // Prix de la formation
    level: string;                // Niveau de la formation
    startDate: string;            // Date de début de la formation
    duration: string;             // Durée de la formation
    maxParticipants: number;      // Nombre maximum de participants
    instructor: string;           // Formateur
    status: "upcoming" | "ongoing" | "completed";  // Statut de la formation
  };
}

export function FormationDialog({
  open,
  onOpenChange,
  formation,
}: FormationDialogProps) {
  // Détermine si le composant est en mode édition
  const isEditing = !!formation;
  const { toast } = useToast();

  // État du formulaire avec valeurs par défaut
  const [formData, setFormData] = useState({
    title: formation?.title || "",
    description: formation?.description || "",
    price: formation?.price || 0,
    level: formation?.level || "",
    startDate: formation?.startDate || "",
    duration: formation?.duration || "",
    maxParticipants: formation?.maxParticipants || 10,
    instructor: formation?.instructor || "",
    status: formation?.status || "upcoming",
  });

  /**
   * Gère la soumission du formulaire
   * 
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour créer ou modifier la formation
      const response = await fetch("/api/formations", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: formation?.id,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      // Notification de succès
      toast({
        title: isEditing ? "Formation modifiée" : "Formation créée",
        description: isEditing
          ? "La formation a été modifiée avec succès."
          : "La formation a été créée avec succès.",
      });
      onOpenChange(false);
    } catch (error) {
      // Notification d'erreur
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        {/* En-tête de la boîte de dialogue */}
        <DialogHeader>
          {/* Titre dynamique selon le mode */}
          <DialogTitle>
            {isEditing ? "Modifier la formation" : "Nouvelle formation"}
          </DialogTitle>
          {/* Description dynamique selon le mode */}
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de la formation ici."
              : "Créez une nouvelle formation en remplissant les informations ci-dessous."}
          </DialogDescription>
        </DialogHeader>

        {/* Formulaire de saisie des informations de la formation */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ de titre */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Titre de la formation"
            />
          </div>

          {/* Champ de description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description de la formation"
              className="h-32"
            />
          </div>

          {/* Grille de sélection de prix et niveau */}
          <div className="grid grid-cols-2 gap-4">
            {/* Champ de prix */}
            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="Prix"
              />
            </div>

            {/* Sélecteur de niveau */}
            <div className="space-y-2">
              <Label htmlFor="level">Niveau</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grille de sélection de date et durée */}
          <div className="grid grid-cols-2 gap-4">
            {/* Champ de date de début */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>

            {/* Champ de durée */}
            <div className="space-y-2">
              <Label htmlFor="duration">Durée</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="Ex: 4 jours"
              />
            </div>
          </div>

          {/* Grille de sélection de participants et formateur */}
          <div className="grid grid-cols-2 gap-4">
            {/* Champ de nombre maximum de participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Nombre max. de participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxParticipants: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* Champ de formateur */}
            <div className="space-y-2">
              <Label htmlFor="instructor">Formateur</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
                placeholder="Nom du formateur"
              />
            </div>
          </div>

          {/* Sélecteur de statut */}
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "upcoming" | "ongoing" | "completed") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="ongoing">En cours</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Boutons de pied de page */}
          <DialogFooter>
            {/* Bouton d'annulation */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            {/* Bouton de soumission dynamique */}
            <Button type="submit">
              {isEditing ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
