/**
 * Composant CommentContextDialog
 * 
 * @description Boîte de dialogue affichant le contexte complet d'un commentaire
 * 
 * Caractéristiques principales :
 * - Présentation du contenu de l'article/formation
 * - Affichage des détails du commentaire
 * - Zone de défilement pour le contenu long
 * - Formatage des dates
 * 
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.open - État d'ouverture de la boîte de dialogue
 * @param {Function} props.onOpenChange - Fonction de changement d'état de la boîte de dialogue
 * @param {Object} props.comment - Informations détaillées du commentaire
 * @param {string} props.comment.id - Identifiant du commentaire
 * @param {string} props.comment.content - Contenu du commentaire
 * @param {Object} props.comment.author - Informations de l'auteur
 * @param {string} props.comment.author.name - Nom de l'auteur
 * @param {string} [props.comment.author.avatar] - Avatar de l'auteur (optionnel)
 * @param {Object} props.comment.post - Informations du post
 * @param {string} props.comment.post.title - Titre du post
 * @param {"article" | "formation"} props.comment.post.type - Type de post
 * @param {string} props.comment.post.content - Contenu du post
 * @param {string} props.comment.date - Date du commentaire
 * 
 * @returns {JSX.Element} Boîte de dialogue de contexte de commentaire
 */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Interface des propriétés du composant
interface CommentContextDialogProps {
  open: boolean;                  // État d'ouverture de la boîte de dialogue
  onOpenChange: (open: boolean) => void;  // Fonction de changement d'état
  comment: {                      // Informations détaillées du commentaire
    id: string;                   // Identifiant du commentaire
    content: string;              // Contenu du commentaire
    author: {                     // Informations de l'auteur
      name: string;               // Nom de l'auteur
      avatar?: string;            // Avatar de l'auteur (optionnel)
    };
    post: {                       // Informations du post
      title: string;              // Titre du post
      type: "article" | "formation";  // Type de post
      content: string;            // Contenu du post
    };
    date: string;                 // Date du commentaire
  };
}

export function CommentContextDialog({
  open,
  onOpenChange,
  comment,
}: CommentContextDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        {/* En-tête de la boîte de dialogue */}
        <DialogHeader>
          <DialogTitle>Contexte du commentaire</DialogTitle>
          <DialogDescription>
            Commentaire de {comment.author.name} sur {comment.post.title}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Section du contenu du post */}
          <div>
            <h4 className="mb-2 font-medium">Contenu de l'article/formation</h4>
            {/* Zone de défilement pour le contenu long */}
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div
                className="prose prose-sm max-w-none"
                // Rendu HTML sécurisé du contenu
                dangerouslySetInnerHTML={{ __html: comment.post.content }}
              />
            </ScrollArea>
          </div>

          {/* Section du commentaire */}
          <div>
            <h4 className="mb-2 font-medium">Commentaire</h4>
            <div className="rounded-md border p-4">
              {/* Contenu du commentaire */}
              <p className="text-sm">{comment.content}</p>
              
              {/* Date du commentaire formatée */}
              <p className="mt-2 text-xs text-muted-foreground">
                Publié le {new Date(comment.date).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
