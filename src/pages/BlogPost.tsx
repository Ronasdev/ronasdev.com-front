
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/Comments";
import RelatedPosts from "@/components/RelatedPosts";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import blogService from "@/services/blogService";
import commentService from "@/services/commentService";
import { useTheme } from "@/components/theme-provider";

const BlogPost = () => {
  const { theme } = useTheme();
  const { slug } = useParams<{ slug: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await blogService.getArticleDetails(slug || '');
        setPost(response.data.article);
        setRelatedPosts(response.data.similar_articles || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article", error);
        setIsLoading(false);
      }
    };

    fetchArticleDetails();
  }, [slug]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await commentService.getByArticle(post.id);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    };

    if (post?.id) {
      fetchComments();
    }
  }, [post?.id]);


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

  if (!isLoading && !post) {
    return <Navigate to="/404" />;
  }

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

  // const handleAddComment = (content: string, parentId?: string) => {
  //   const newComment = {
  //     id: Date.now().toString(),
  //     author: {
  //       name: "Utilisateur",
  //       avatar: "/avatars/default.jpg",
  //     },
  //     content,
  //     date: new Date().toISOString(),
  //     likes: 0,
  //     isLiked: false,
  //   };

  //   if (parentId) {
  //     setComments(comments.map(comment => {
  //       if (comment.id === parentId) {
  //         return {
  //           ...comment,
  //           replies: [...(comment.replies || []), newComment],
  //         };
  //       }
  //       return comment;
  //     }));
  //   } else {
  //     setComments([...comments, newComment]);
  //   }
  // };

  const handleAddComment = async (content: string, parentId?: string) => {
    try {
      const newComment = await commentService.create({
        content,
        articleId: post.id,
        parentId
      });

      setComments(prevComments => {
        if (parentId) {
          return prevComments.map(comment => 
            comment.id === parentId 
              ? { 
                  ...comment, 
                  replies: [...(comment.replies || []), newComment] 
                } 
              : comment
          );
        }
        return [...prevComments, newComment];
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire', error);
    }
  };
  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
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

  const handleReportComment = (commentId: string) => {
    console.log("Commentaire signalé:", commentId);
  };

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <article className="pt-20 pb-12">
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
          {/* Informations de l'article */}
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

          {/* Commentaires */}
          <div className="mt-16">
            <Comments 
              comments={comments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              onReportComment={handleReportComment}
              currentArticleId={post?.id}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;


