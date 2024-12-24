import { useState } from "react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ThumbsUp, MessageCircle, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
  onLikeComment: (commentId: string) => void;
  onReportComment: (commentId: string) => void;
}

/**
 * Composant de gestion des commentaires
 * Permet d'afficher, ajouter, répondre, liker et signaler des commentaires
 */
const Comments = ({ comments, onAddComment, onLikeComment, onReportComment }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleSubmitReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(replyContent, parentId);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex space-x-4 ${isReply ? "ml-12 mt-4" : "mt-6"}`}>
      <Avatar src={comment.author.avatar} alt={comment.author.name} />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.date), { addSuffix: true, locale: fr })}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLikeComment(comment.id)}
            className={comment.isLiked ? "text-primary" : "text-gray-500"}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {comment.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="text-gray-500"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Répondre
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReportComment(comment.id)}
            className="text-gray-500"
          >
            <Flag className="w-4 h-4 mr-1" />
            Signaler
          </Button>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-4">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Écrivez votre réponse..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <Button
                variant="outline"
                onClick={() => setReplyingTo(null)}
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim()}
              >
                Répondre
              </Button>
            </div>
          </div>
        )}

        {comment.replies?.map((reply) => (
          <CommentComponent key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Commentaires</h3>
      
      {/* Formulaire de nouveau commentaire */}
      <form onSubmit={handleSubmitComment}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Partagez votre avis..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end mt-2">
          <Button type="submit" disabled={!newComment.trim()}>
            Commenter
          </Button>
        </div>
      </form>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
