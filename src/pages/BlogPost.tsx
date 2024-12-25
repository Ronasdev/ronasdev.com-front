// Page de détail d'article de blog
// Gère l'affichage complet d'un article, ses commentaires et contenus associés

import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShareButtons from "../components/ShareButtons";
import Comments from "../components/Comments";
import RelatedPosts from "../components/RelatedPosts";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { blogPosts, getRelatedPosts } from "../data/blogPosts";

/**
 * Page de détail d'un article de blog
 * Fonctionnalités:
 * - Affichage du contenu complet de l'article
 * - Système de commentaires interactif
 * - Gestion des états de chargement
 * - Redirection si l'article n'existe pas
 * 
 * @returns {JSX.Element} Page de détail d'article
 */
const BlogPost = () => {
  // Récupération du slug depuis l'URL
  const { slug } = useParams<{ slug: string }>();
  
  // État de chargement
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de l'article et des articles connexes
  const post = blogPosts.find((post) => post.slug === slug);
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // État initial des commentaires
  const [comments, setComments] = useState([
    {
      id: "1",
      author: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      content: "Super article ! J'ai beaucoup appris.",
      date: "2024-01-15T10:30:00",
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: "2",
          author: {
            name: "Jane Smith",
            avatar: "/avatars/jane.jpg",
          },
          content: "Totalement d'accord avec toi !",
          date: "2024-01-15T11:00:00",
          likes: 2,
          isLiked: false,
        },
      ],
    },
  ]);

  // Redirection si l'article n'existe pas
  if (!isLoading && !post) {
    return <Navigate to="/404" />;
  }

  // Skeleton loader pendant le chargement
  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <div className="animate-pulse pt-20 pb-12">
          <div className="h-96 bg-gray-200 mb-8" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="h-8 bg-gray-200 w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 w-1/2 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 w-full" />
              <div className="h-4 bg-gray-200 w-5/6" />
              <div className="h-4 bg-gray-200 w-4/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /**
   * Ajoute un nouveau commentaire
   * @param content Contenu du commentaire
   * @param parentId ID du commentaire parent (pour les réponses)
   */
  const handleAddComment = (content: string, parentId?: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: {
        name: "Utilisateur",
        avatar: "/avatars/default.jpg",
      },
      content,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    if (parentId) {
      // Ajout d'une réponse à un commentaire existant
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment],
          };
        }
        return comment;
      }));
    } else {
      // Ajout d'un nouveau commentaire principal
      setComments([...comments, newComment]);
    }
  };

  /**
   * Gère l'action de like/unlike sur un commentaire
   * @param commentId ID du commentaire à liker
   */
  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      // Vérifie et met à jour le commentaire principal
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      // Vérifie et met à jour les réponses aux commentaires
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked,
              };
            }
            return reply;
          }),
        };
      }
      return comment;
    }));
  };

  /**
   * Signale un commentaire inapproprié
   * @param commentId ID du commentaire à signaler
   */
  const handleReportComment = (commentId: string) => {
    // Implémentation du signalement
    console.log("Commentaire signalé:", commentId);
  };

  return (
    // Conteneur principal avec dégradé de fond
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <article className="pt-20 pb-12">
        {/* En-tête de l'article avec image de couverture */}
        <div className="relative h-96 mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Superposition sombre pour améliorer la lisibilité du titre */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              {/* Titre animé */}
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Métadonnées de l'article */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            {/* Informations de l'auteur */}
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm text-gray-500">{post.excerpt}</div>
              </div>
            </div>
            {/* Informations de lecture */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4 sm:mt-0">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min de lecture
              </span>
            </div>
          </div>

          {/* Disposition flexible du contenu */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contenu principal */}
            <div className="lg:w-3/4">
              {/* Contenu de l'article */}
              <div 
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Boutons de partage */}
              <div className="mt-8">
                <ShareButtons
                  url={`${window.location.origin}/blog/${post.slug}`}
                  title={post.title}
                />
              </div>

              {/* Section des commentaires */}
              <Comments
                comments={comments}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
                onReportComment={handleReportComment}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Catégories */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map(category => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Articles connexes */}
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
