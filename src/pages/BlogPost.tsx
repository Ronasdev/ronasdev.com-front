import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/Comments";
import RelatedPosts from "@/components/RelatedPosts";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Correction de l'import
import blogService from "@/services/blogService";
import commentService from "@/services/commentService";
import { useTheme } from "@/components/theme-provider";
import type { Comment } from "@/services/commentService";

/**
 * Composant BlogPost
 * Affiche le détail d'un article avec ses commentaires
 */
const BlogPost = () => {
  // Hooks et états
  const { theme } = useTheme();
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast(); // Hook pour afficher les notifications

  // États locaux
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState<Comment[]>([]);

  /**
   * Effet pour charger les détails de l'article et les articles connexes
   */
  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await blogService.getArticleDetails(slug || '');
        setPost(response.data.article);
        setRelatedPosts(response.data.similar_articles || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article", error);
        // Notification d'erreur avec le hook useToast
        toast({
          title: "Erreur",
          description: "Impossible de charger l'article",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchArticleDetails();
  }, [slug]);

  /**
   * Effet pour charger les commentaires de l'article
   */
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await commentService.getByArticle(post.id);
        console.log("fetchedComments dans Blogpost: ", fetchedComments);

        setComments(fetchedComments.comments);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires', error);
        // Notification d'erreur avec le hook useToast
        toast({
          title: "Erreur",
          description: "Impossible de charger les commentaires",
          variant: "destructive"
        });
      }
    };

    if (post?.id) {
      fetchComments();
    }
  }, [post?.id]);

  /**
   * Fonction pour rafraîchir la liste des commentaires
   * Appelée après l'ajout, la modification ou la suppression d'un commentaire
   */
  const refreshComments = async () => {
    if (post?.id) {
      try {
        const fetchedComments = await commentService.getByArticle(post.id);
        setComments(fetchedComments.comments);
      } catch (error) {
        console.error('Erreur lors du rafraîchissement des commentaires', error);
        // Notification d'erreur avec le hook useToast
        toast({
          title: "Erreur",
          description: "Impossible de rafraîchir les commentaires",
          variant: "destructive"
        });
      }
    }
  };

  // Redirection vers la page 404 si l'article n'existe pas
  if (!isLoading && !post) {
    return <Navigate to="/404" />;
  }

  // Affichage du loader pendant le chargement
  if (isLoading || !post) {
    return (
      <div className={`
        min-h-screen 
        ${theme === 'dark' 
          ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
          : 'bg-gradient-to-b from-white to-gray-50'}
      `}>
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

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <article className="pt-20 pb-12">
        {/* Image de couverture de l'article */}
        <div className="relative h-96 mb-8">
          <img
            src={VITE_API_URL + post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Métadonnées de l'article */}
          <div className={`
            flex items-center justify-between mb-8
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.read_time || 5} min de lecture</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>{post.categories[0]}</span>
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className={`
            prose lg:prose-xl 
            ${theme === 'dark' 
              ? 'prose-invert prose-dark' 
              : 'prose-light'}
            mx-auto
          `}
          dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Boutons de partage */}
          <div className="mt-12">
            <ShareButtons 
              url={`/blog/${post.slug}`} 
              title={post.title} 
            />
          </div>

          {/* Articles connexes */}
          <div className="mt-16">
            <h3 className={`
              text-2xl font-bold mb-6
              ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
            `}>
              Articles connexes
            </h3>
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Section des commentaires */}
          <div className="mt-16">
            <Comments 
              comments={comments}
              articleId={post.id}
              onCommentAdded={refreshComments}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
