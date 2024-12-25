/**
 * Composant Comments
 * 
 * @description Système de gestion des commentaires avec fonctionnalités avancées
 * 
 * Caractéristiques principales :
 * - Affichage hiérarchique des commentaires (commentaires principaux et réponses)
 * - Ajout de nouveaux commentaires et réponses
 * - Système de likes
 * - Signalement de commentaires
 * - Formatage dynamique des dates
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Comment[]} props.comments - Liste des commentaires
 * @param {Function} props.onAddComment - Fonction d'ajout de commentaire
 * @param {Function} props.onLikeComment - Fonction de like de commentaire
 * @param {Function} props.onReportComment - Fonction de signalement de commentaire
 * 
 * @returns {JSX.Element} Interface de gestion des commentaires
 */
import { useState } from "react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ThumbsUp, MessageCircle, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

// Interface du modèle de commentaire
interface Comment {
  id: string;                  // Identifiant unique
  author: {
    name: string;              // Nom de l'auteur
    avatar: string;            // URL de l'avatar
  };
  content: string;             // Contenu du commentaire
  date: string;                // Date de publication
  likes: number;               // Nombre de likes
  isLiked: boolean;            // État de like
  replies?: Comment[];         // Réponses optionnelles
}

// Interface des propriétés du composant
interface CommentsProps {
  comments: Comment[];                                 // Liste des commentaires
  onAddComment: (content: string, parentId?: string) => void;  // Ajout de commentaire
  onLikeComment: (commentId: string) => void;         // Like de commentaire
  onReportComment: (commentId: string) => void;       // Signalement de commentaire
}

const Comments = ({ comments, onAddComment, onLikeComment, onReportComment }: CommentsProps) => {
  // États pour la gestion des commentaires
  const [newComment, setNewComment] = useState("");     // Nouveau commentaire principal
  const [replyingTo, setReplyingTo] = useState<string | null>(null);  // Commentaire en cours de réponse
  const [replyContent, setReplyContent] = useState("");  // Contenu de la réponse

  /**
   * Soumet un nouveau commentaire principal
   * 
   * @param {React.FormEvent} e - Événement de soumission
   */
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  /**
   * Soumet une réponse à un commentaire spécifique
   * 
   * @param {string} parentId - Identifiant du commentaire parent
   */
  const handleSubmitReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(replyContent, parentId);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  /**
   * Composant de rendu d'un commentaire individuel
   * Supporte les commentaires principaux et les réponses
   * 
   * @param {Object} props - Propriétés du composant de commentaire
   * @param {Comment} props.comment - Détails du commentaire
   * @param {boolean} [props.isReply=false] - Indique si c'est une réponse
   */
  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex space-x-4 ${isReply ? "ml-12 mt-4" : "mt-6"}`}>
      {/* Avatar de l'auteur */}
      <Avatar src={comment.author.avatar} alt={comment.author.name} />
      
      <div className="flex-1">
        {/* Contenu du commentaire */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.date), { addSuffix: true, locale: fr })}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
        
        {/* Actions sur le commentaire */}
        <div className="flex items-center space-x-4 mt-2">
          {/* Bouton de like */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLikeComment(comment.id)}
            className={comment.isLiked ? "text-primary" : "text-gray-500"}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {comment.likes}
          </Button>

          {/* Bouton de réponse */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="text-gray-500"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Répondre
          </Button>

          {/* Bouton de signalement */}
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

        {/* Formulaire de réponse */}
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

        {/* Réponses imbriquées */}
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
