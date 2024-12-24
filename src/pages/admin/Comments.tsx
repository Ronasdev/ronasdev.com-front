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

// Types
interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  post: {
    title: string;
    type: "article" | "formation";
  };
  status: "approved" | "pending" | "spam";
  date: string;
  likes: number;
  reports: number;
}

// Données simulées
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

const Comments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [contextDialogOpen, setContextDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filtrage des commentaires
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

  // Gestion de la suppression
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

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commentaires</h1>
        <p className="text-muted-foreground">
          Gérez les commentaires des articles et formations
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les commentaires..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-4">
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

      {/* Table */}
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
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={comment.author.avatar}
                        alt={comment.author.name}
                      />
                      <AvatarFallback>
                        {comment.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{comment.author.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {comment.content}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{comment.post.title}</div>
                    <Badge variant="outline">
                      {comment.post.type === "article"
                        ? "Article"
                        : "Formation"}
                    </Badge>
                  </div>
                </TableCell>
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
                <TableCell>
                  {new Date(comment.date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{comment.likes}</span>
                    </div>
                    {comment.reports > 0 && (
                      <div className="flex items-center space-x-1">
                        <Flag className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">
                          {comment.reports}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedComment(comment);
                          setContextDialogOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir le contexte
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedComment(comment);
                          setDeleteDialogOpen(true);
                        }}
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

      {/* Comment Context Dialog */}
      {selectedComment && (
        <CommentContextDialog
          open={contextDialogOpen}
          onOpenChange={setContextDialogOpen}
          comment={selectedComment}
        />
      )}

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
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
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Comments;
