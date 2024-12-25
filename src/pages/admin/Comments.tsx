// Page de gestion des commentaires pour l'administration
// Permet de filtrer, visualiser et gérer les commentaires des articles et formations

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  MessageSquare,
  Flag,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentContextDialog } from "@/components/admin/dialogs/CommentContextDialog";

/**
 * Interface représentant un commentaire
 * Contient toutes les informations nécessaires pour la gestion des commentaires
 */
interface Comment {
  id: string;                   // Identifiant unique du commentaire
  content: string;              // Contenu du commentaire
  author: {
    name: string;               // Nom de l'auteur
    avatar?: string;            // Avatar de l'auteur (optionnel)
  };
  post: {
    title: string;              // Titre de l'article ou de la formation
    type: "article" | "formation"; // Type de contenu
  };
  status: "approved" | "pending" | "spam"; // Statut du commentaire
  date: string;                 // Date de publication
  likes: number;                // Nombre de likes
  reports: number;              // Nombre de signalements
}

// Données simulées pour le développement et les tests
const comments: Comment[] = [
  {
    id: "1",
    content: "Super article, très instructif !",
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    post: {
      title: "Introduction à React 18",
      type: "article",
    },
    status: "approved",
    date: "2024-12-15",
    likes: 5,
    reports: 0,
  },
  {
    id: "2",
    content: "Cette formation est exactement ce que je cherchais.",
    author: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    post: {
      title: "TypeScript Fondamentaux",
      type: "formation",
    },
    status: "pending",
    date: "2024-12-14",
    likes: 3,
    reports: 1,
  },
  // Ajoutez plus de commentaires ici
];

/**
 * Composant de gestion des commentaires pour l'administration
 * Permet de :
 * - Filtrer les commentaires
 * - Visualiser les détails des commentaires
 * - Gérer le statut des commentaires
 * 
 * @returns {JSX.Element} Page de gestion des commentaires
 */
const Comments = () => {
  // États pour la gestion des filtres et des interactions
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [contextDialogOpen, setContextDialogOpen] = useState(false);

  // Hook de notification pour les actions
  const { toast } = useToast();

  /**
   * Filtre les commentaires en fonction des critères de recherche
   * @returns {Comment[]} Liste des commentaires filtrés
   */
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || comment.status === selectedStatus;
    const matchesType =
      selectedType === "all" || comment.post.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  /**
   * Gère la suppression d'un commentaire
   * Affiche une notification de succès
   */
  const handleDelete = () => {
    if (selectedComment) {
      toast({
        title: "Commentaire supprimé",
        description: "Le commentaire a été supprimé avec succès.",
      });
      setDeleteDialogOpen(false);
      setSelectedComment(null);
    }
  };

  /**
   * Change le statut d'un commentaire
   * @param status Nouveau statut du commentaire
   */
  const handleChangeStatus = (status: Comment['status']) => {
    if (selectedComment) {
      toast({
        title: "Statut mis à jour",
        description: `Le commentaire a été marqué comme ${status}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commentaires</h1>
        <p className="text-muted-foreground">
          Gérez les commentaires des articles et formations
        </p>
      </div>

      {/* Section de filtrage et recherche */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        {/* Barre de recherche */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les commentaires..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtres de statut et type */}
        <div className="flex items-center space-x-4">
          {/* Filtre par statut */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtre par type de contenu */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
              <SelectItem value="formation">Formations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau des commentaires */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Commentaire</TableHead>
              <TableHead>Sur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Interactions</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                {/* Colonne du commentaire avec avatar et contenu */}
                <TableCell className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>
                      {comment.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{comment.author.name}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {comment.content}
                    </p>
                  </div>
                </TableCell>

                {/* Colonne du contenu associé */}
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {comment.post.type === "article" ? (
                      <MessageSquare className="h-4 w-4 text-primary" />
                    ) : (
                      <Eye className="h-4 w-4 text-primary" />
                    )}
                    <span>{comment.post.title}</span>
                  </div>
                </TableCell>

                {/* Colonne de statut */}
                <TableCell>
                  <Badge
                    variant={
                      comment.status === "approved"
                        ? "default"
                        : comment.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {comment.status === "approved"
                      ? "Approuvé"
                      : comment.status === "pending"
                      ? "En attente"
                      : "Spam"}
                  </Badge>
                </TableCell>

                {/* Colonne de date */}
                <TableCell>{comment.date}</TableCell>

                {/* Colonne d'interactions */}
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span>{comment.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flag className="h-4 w-4 text-destructive" />
                      <span>{comment.reports}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Colonne d'actions */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* Actions sur le commentaire */}
                      <DropdownMenuItem
                        onSelect={() => {
                          setSelectedComment(comment);
                          setContextDialogOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir le contexte
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          handleChangeStatus(
                            comment.status === "approved" ? "spam" : "approved"
                          );
                        }}
                      >
                        {comment.status === "approved" ? (
                          <Flag className="mr-2 h-4 w-4" />
                        ) : (
                          <ThumbsUp className="mr-2 h-4 w-4" />
                        )}
                        {comment.status === "approved"
                          ? "Marquer comme spam"
                          : "Approuver"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setSelectedComment(comment);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le commentaire</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action
              est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de contexte du commentaire */}
      {selectedComment && (
        <CommentContextDialog
          open={contextDialogOpen}
          onOpenChange={setContextDialogOpen}
          comment={selectedComment}
        />
      )}
    </div>
  );
};

export default Comments;
