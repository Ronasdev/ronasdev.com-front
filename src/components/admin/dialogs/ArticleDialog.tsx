/**
 * Composant ArticleDialog
 * 
 * @description Boîte de dialogue pour la création et l'édition d'articles
 * 
 * Caractéristiques principales :
 * - Formulaire dynamique pour créer ou modifier un article
 * - Gestion des états de formulaire
 * - Validation et soumission des données
 * - Notifications toast pour le retour utilisateur
 * 
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.open - État d'ouverture de la boîte de dialogue
 * @param {Function} props.onOpenChange - Fonction de changement d'état de la boîte de dialogue
 * @param {Object} [props.article] - Article à éditer (optionnel)
 * @param {string} [props.article.id] - Identifiant de l'article
 * @param {string} props.article.title - Titre de l'article
 * @param {string} props.article.content - Contenu de l'article
 * @param {string} props.article.category - Catégorie de l'article
 * @param {"published" | "draft"} props.article.status - Statut de l'article
 * 
 * @returns {JSX.Element} Boîte de dialogue pour la gestion des articles
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
interface ArticleDialogProps {
  open: boolean;                  // État d'ouverture de la boîte de dialogue
  onOpenChange: (open: boolean) => void;  // Fonction de changement d'état
  article?: {                     // Article optionnel à éditer
    id?: string;                  // Identifiant de l'article
    title: string;                // Titre de l'article
    content: string;              // Contenu de l'article
    category: string;             // Catégorie de l'article
    status: "published" | "draft";// Statut de l'article
  };
}

export function ArticleDialog({
  open,
  onOpenChange,
  article,
}: ArticleDialogProps) {
  // Détermine si le composant est en mode édition
  const isEditing = !!article;
  const { toast } = useToast();

  // État du formulaire avec valeurs par défaut
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    category: article?.category || "",
    status: article?.status || "draft",
  });

  /**
   * Gère la soumission du formulaire
   * 
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour créer ou modifier l'article
      const response = await fetch("/api/articles", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: article?.id,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      // Notification de succès
      toast({
        title: isEditing ? "Article modifié" : "Article créé",
        description: isEditing
          ? "L'article a été modifié avec succès."
          : "L'article a été créé avec succès.",
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
        <DialogHeader>
          {/* Titre dynamique selon le mode */}
          <DialogTitle>
            {isEditing ? "Modifier l'article" : "Nouvel article"}
          </DialogTitle>
          {/* Description dynamique selon le mode */}
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de l'article ici."
              : "Créez un nouvel article en remplissant les informations ci-dessous."}
          </DialogDescription>
        </DialogHeader>

        {/* Formulaire de saisie des informations de l'article */}
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
              placeholder="Titre de l'article"
            />
          </div>

          {/* Champ de contenu */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Contenu de l'article"
              className="h-32"
            />
          </div>

          {/* Grille de sélection de catégorie et statut */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sélecteur de catégorie */}
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sélecteur de statut */}
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "published" | "draft") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
