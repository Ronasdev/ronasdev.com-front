import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ThumbsUp, MessageCircle, Flag, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import type { Comment } from "@/services/commentService";
import commentService from '@/services/commentService';
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "./auth/AuthDialog";

interface CommentsProps {
  comments: Comment[];
  articleId: number;
  onCommentAdded: () => void;
}

/**
 * Composant d'affichage et de gestion des commentaires
 */
export const Comments = ({ comments, articleId, onCommentAdded }: CommentsProps) => {
  // Hooks
  const { theme } = useTheme();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  
  // États locaux
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  /**
   * Vérifie l'authentification avant d'exécuter une action
   * Si l'utilisateur n'est pas connecté, ouvre le dialogue d'authentification
   */
  const withAuth = (action: () => void) => {
    console.log("withAuth: ", isAuthenticated());
    if (!isAuthenticated()) {
      console.log("L'utilisateur n'est pas connecté");
      // Enregistre l'action pour le rediriger apres la connexion
      setPendingAction(() => action);
      setShowAuthDialog(true);
      return;
    }
    action();
  };

  /**
   * Gère la soumission d'un nouveau commentaire
   */
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    withAuth(async () => {
      if (!newComment.trim()) return;

      setIsSubmitting(true);
      try {
        await commentService.create({
          content: newComment,
          article_id: articleId
        });
        setNewComment("");
        onCommentAdded();
        toast({
          title: "Succès",
          description: "Votre commentaire a été ajouté"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter votre commentaire",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  /**
   * Gère la soumission d'une réponse à un commentaire
   */
  const handleSubmitReply = async (parentId: number) => {
    withAuth(async () => {
      if (!replyContent.trim()) return;

      setIsReplying(true);
      try {
        await commentService.replyToComment(parentId, {
          content: replyContent,
          article_id: articleId
        });
        setReplyContent("");
        setReplyingTo(null);
        onCommentAdded();
        toast({
          title: "Succès",
          description: "Votre réponse a été ajoutée"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter votre réponse",
          variant: "destructive"
        });
      } finally {
        setIsReplying(false);
      }
    });
  };

  /**
   * Gère le like/unlike d'un commentaire
   */
  const handleLike = async (commentId: number) => {
    withAuth(async () => {
      try {
        await commentService.toggleLike(commentId);
        onCommentAdded(); // Rafraîchit les commentaires pour mettre à jour le compteur
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de liker le commentaire",
          variant: "destructive"
        });
      }
    });
  };

  /**
   * Gère le signalement d'un commentaire
   */
  const handleReport = async (commentId: number) => {
    withAuth(async () => {
      try {
        await commentService.reportComment(commentId);
        toast({
          title: "Succès",
          description: "Le commentaire a été signalé"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de signaler le commentaire",
          variant: "destructive"
        });
      }
    });
  };

  /**
   * Gère la fermeture du dialogue d'authentification
   */
  const handleAuthSuccess = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  /**
   * Composant pour afficher un commentaire individuel
   */
  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-12' : ''}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.author_avatar} alt={comment.author_name} />
        <AvatarFallback>{comment.author_name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold">{comment.author_name}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { locale: fr, addSuffix: true })}
            </span>
          </div>
        </div>

        <p className="text-sm">{comment.content}</p>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${comment.is_liked ? 'text-primary' : ''}`}
            onClick={() => handleLike(comment.id)}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.likes_count}</span>
          </Button>

          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Répondre</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => handleReport(comment.id)}
          >
            <Flag className="h-4 w-4" />
            <span>Signaler</span>
          </Button>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-4">
            <Textarea
              placeholder="Votre réponse..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent("");
                }}
              >
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={isReplying}
              >
                {isReplying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Répondre"
                )}
              </Button>
            </div>
          </div>
        )}

        {comment?.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Commentaires</h3>
        
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder={isAuthenticated() ? "Votre commentaire..." : "Connectez-vous pour commenter"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            // disabled={!isAuthenticated()}
          />
          <div className="flex justify-end">
            <Button type="submit" 
            // disabled={isSubmitting || !isAuthenticated()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                isAuthenticated() ? "Commenter" : "Se connecter pour commenter"
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Comments;
