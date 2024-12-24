import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
}

/**
 * Composant de boutons de partage social
 * @param url - L'URL à partager
 * @param title - Le titre à partager
 */
const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  // Encode les paramètres pour les URLs de partage
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Fonction pour copier l'URL dans le presse-papier
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "URL copiée !",
        description: "L'URL a été copiée dans votre presse-papier.",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier l'URL.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      {/* Facebook */}
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-blue-500 hover:text-white transition-colors"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
      >
        <Facebook className="w-4 h-4" />
      </Button>

      {/* Twitter */}
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-sky-500 hover:text-white transition-colors"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank')}
      >
        <Twitter className="w-4 h-4" />
      </Button>

      {/* LinkedIn */}
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-blue-700 hover:text-white transition-colors"
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')}
      >
        <Linkedin className="w-4 h-4" />
      </Button>

      {/* Copier le lien */}
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-primary hover:text-white transition-colors"
        onClick={copyToClipboard}
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ShareButtons;
