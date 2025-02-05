import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ThumbsUp, MessageCircle, Flag, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "./ui/use-toast";
import type { Comment } from "@/services/commentService";
import commentService from '@/services/commentService';
import { useAuth } from "@/contexts/AuthContext";

interface CommentsProps {
  comments: Comment[];
  articleId: number;
  onCommentAdded: () => void;
}

export const Comments = ({ comments, articleId, onCommentAdded }: CommentsProps) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // États locaux
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  /**
   * Gère la soumission d'un nouveau commentaire
   */
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour commenter",
        variant: "destructive"
      });
      return;
    }

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
  };

  /**
   * Gère la soumission d'une réponse à un commentaire
   */
  const handleSubmitReply = async (parentId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour répondre",
        variant: "destructive"
      });
      return;
    }

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
  };

  /**
   * Gère le like/unlike d'un commentaire
   */
  const handleLike = async (commentId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour liker",
        variant: "destructive"
      });
      return;
    }

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
  };

  /**
   * Gère le signalement d'un commentaire
   */
  const handleReport = async (commentId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour signaler",
        variant: "destructive"
      });
      return;
    }

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
  };

  /**
   * Composant pour afficher un commentaire individuel
   */
  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-12' : ''}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold">{comment.author.name}</span>
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
            placeholder="Votre commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                "Commenter"
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
    </div>
  );
};

export default Comments;
