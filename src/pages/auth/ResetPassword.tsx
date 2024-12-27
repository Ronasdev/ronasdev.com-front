// Page de réinitialisation du mot de passe
// Permet aux utilisateurs de définir un nouveau mot de passe

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';
import { 
  // Importer les services d'authentification si nécessaire
  // authService 
} from '@/services/authService';

// Commentaire : Page de réinitialisation de mot de passe désactivée pour le moment
export default function ResetPassword() {
  // Gestion du thème
  const { theme } = useTheme();
  
  // États locaux
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Hooks
  const navigate = useNavigate();
  const { token } = useParams();
  const { toast } = useToast();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Commentaire : Réinitialisation de mot de passe temporairement désactivée
    if (password !== confirmPassword) {
      toast({
        title: 'Erreur de mot de passe',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Ici, vous ajouteriez l'appel API pour la réinitialisation du mot de passe
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la réinitialisation");

      toast({
        title: 'Mot de passe réinitialisé',
        description: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
      });

      // Redirection vers la page de connexion
      navigate('/auth/login');
    } catch (error) {
      // Gestion des erreurs de réinitialisation
      toast({
        title: 'Erreur de réinitialisation',
        description: 'Un problème est survenu lors de la réinitialisation du mot de passe.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gray-50'}
    `}>
      <div className={`
        w-full max-w-md p-8 space-y-8 rounded-xl shadow-lg
        ${theme === 'dark' 
          ? 'bg-secondary-dark/10 border border-secondary-dark/20' 
          : 'bg-white'}
      `}>
        <div className="text-center">
          <h1 className={`
            text-3xl font-bold mb-4
            ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
          `}>
            Nouveau mot de passe
          </h1>
          <p className={`
            text-sm
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Définissez un nouveau mot de passe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label 
              htmlFor="password"
              className={theme === 'dark' ? 'text-gray-300' : ''}
            >
              Nouveau mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`
                mt-2
                ${theme === 'dark' 
                  ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200 placeholder-gray-400' 
                  : ''}
              `}
            />
          </div>

          <div>
            <Label 
              htmlFor="confirm-password"
              className={theme === 'dark' ? 'text-gray-300' : ''}
            >
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`
                mt-2
                ${theme === 'dark' 
                  ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200 placeholder-gray-400' 
                  : ''}
              `}
            />
          </div>

          <Button 
            type="submit" 
            className={`
              w-full
              ${theme === 'dark' 
                ? 'bg-primary-light hover:bg-primary-light/80' 
                : 'bg-primary hover:bg-primary/90'}
            `}
          >
            Réinitialiser le mot de passe
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className={`
            text-sm
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Retour à la {' '}
            <Link 
              to="/auth/login" 
              className={`
                ${theme === 'dark' 
                  ? 'text-primary-light hover:text-primary-light/80' 
                  : 'text-primary hover:text-primary-dark'}
              `}
            >
              page de connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
