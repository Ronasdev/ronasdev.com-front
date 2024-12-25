/**
 * Composant UserDialog
 * 
 * @description Boîte de dialogue pour la création et l'édition d'utilisateurs
 * 
 * Caractéristiques principales :
 * - Formulaire dynamique pour créer ou modifier un utilisateur
 * - Validation des mots de passe
 * - Gestion des états de formulaire
 * - Sélection de rôle et statut
 * - Notifications toast pour le retour utilisateur
 * 
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.open - État d'ouverture de la boîte de dialogue
 * @param {Function} props.onOpenChange - Fonction de changement d'état de la boîte de dialogue
 * @param {Object} [props.user] - Utilisateur à éditer (optionnel)
 * @param {string} [props.user.id] - Identifiant de l'utilisateur
 * @param {string} props.user.name - Nom de l'utilisateur
 * @param {string} props.user.email - Email de l'utilisateur
 * @param {"admin" | "editor" | "user"} props.user.role - Rôle de l'utilisateur
 * @param {"active" | "inactive"} props.user.status - Statut de l'utilisateur
 * 
 * @returns {JSX.Element} Boîte de dialogue pour la gestion des utilisateurs
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
import { useToast } from "@/components/ui/use-toast";

// Interface des propriétés du composant
interface UserDialogProps {
  open: boolean;                  // État d'ouverture de la boîte de dialogue
  onOpenChange: (open: boolean) => void;  // Fonction de changement d'état
  user?: {                        // Utilisateur optionnel à éditer
    id?: string;                  // Identifiant de l'utilisateur
    name: string;                 // Nom de l'utilisateur
    email: string;                // Email de l'utilisateur
    role: "admin" | "editor" | "user";  // Rôle de l'utilisateur
    status: "active" | "inactive";  // Statut de l'utilisateur
  };
}

export function UserDialog({ open, onOpenChange, user }: UserDialogProps) {
  // Détermine si le composant est en mode édition
  const isEditing = !!user;
  const { toast } = useToast();

  // État du formulaire avec valeurs par défaut
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
    status: user?.status || "active",
    password: "",
    confirmPassword: "",
  });

  /**
   * Gère la soumission du formulaire
   * 
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des mots de passe lors de la création
    if (!isEditing && formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Appel API pour créer ou modifier l'utilisateur
      const response = await fetch("/api/users", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: user?.id,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      // Notification de succès
      toast({
        title: isEditing ? "Utilisateur modifié" : "Utilisateur créé",
        description: isEditing
          ? "L'utilisateur a été modifié avec succès."
          : "L'utilisateur a été créé avec succès.",
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
      <DialogContent className="sm:max-w-[425px]">
        {/* En-tête de la boîte de dialogue */}
        <DialogHeader>
          {/* Titre dynamique selon le mode */}
          <DialogTitle>
            {isEditing ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
          </DialogTitle>
          {/* Description dynamique selon le mode */}
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de l'utilisateur ici."
              : "Créez un nouvel utilisateur en remplissant les informations ci-dessous."}
          </DialogDescription>
        </DialogHeader>

        {/* Formulaire de saisie des informations de l'utilisateur */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ de nom */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nom complet"
            />
          </div>

          {/* Champ d'email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email@example.com"
            />
          </div>

          {/* Champs de mot de passe uniquement pour la création */}
          {!isEditing && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </div>
            </>
          )}

          {/* Sélecteur de rôle */}
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "admin" | "editor" | "user") =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Éditeur</SelectItem>
                <SelectItem value="user">Utilisateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sélecteur de statut */}
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
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
