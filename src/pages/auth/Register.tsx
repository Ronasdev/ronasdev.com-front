// Page d'inscription
// Permet aux utilisateurs de créer un nouveau compte

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';
import { 
  // Importer les services d'authentification si nécessaire
  // authService 
} from '@/services/authService';
import { Eye, EyeOff } from "lucide-react";

// Commentaire : Page d'inscription désactivée pour le moment
export default function Register() {
  const { theme } = useTheme();
  
  // États locaux
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Commentaire : Inscription temporairement désactivée
    /*
    // Validation des mots de passe
    if (password !== confirmPassword) {
      toast({
        title: 'Erreur de mot de passe',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Tentative d'inscription via le service d'authentification
      const response = await authService.register({
        name,
        email,
        password,
      });
      
      // Redirection après inscription réussie
      if (response.success) {
        toast({
          title: 'Inscription réussie',
          description: 'Votre compte a été créé avec succès.',
        });
        navigate('/login');
      }
    } catch (error) {
      // Gestion des erreurs d'inscription
      toast({
        title: 'Erreur d\'inscription',
        description: 'Un problème est survenu lors de la création de votre compte.',
        variant: 'destructive',
      });
    }
    */
    
    // Exemple de toast pour indiquer que l'inscription est désactivée
    toast({
      title: 'Inscription désactivée',
      description: 'La fonctionnalité d\'inscription est temporairement désactivée.',
      variant: 'default',
    });
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
            Inscription
          </h1>
          <p className={`
            text-sm
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Créez votre compte personnel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label 
              htmlFor="name"
              className={theme === 'dark' ? 'text-gray-300' : ''}
            >
              Nom complet
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`
                mt-2
                ${theme === 'dark' 
                  ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200' 
                  : ''}
              `}
            />
          </div>

          <div>
            <Label 
              htmlFor="email"
              className={theme === 'dark' ? 'text-gray-300' : ''}
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`
                mt-2
                ${theme === 'dark' 
                  ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200' 
                  : ''}
              `}
            />
          </div>

          <div>
            <Label 
              htmlFor="password"
              className={theme === 'dark' ? 'text-gray-300' : ''}
            >
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`
                  pr-10
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200' 
                    : ''}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`
                  absolute inset-y-0 right-0 flex items-center pr-3
                  ${theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100' 
                    : 'text-gray-400 hover:text-gray-500'}
                `}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label 
              htmlFor="confirm-password"
              className={theme === 'dark' ? 'text-gray-300' : ''}
            >
              Confirmer le mot de passe
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`
                  pr-10
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200' 
                    : ''}
                `}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`
                  absolute inset-y-0 right-0 flex items-center pr-3
                  ${theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100' 
                    : 'text-gray-400 hover:text-gray-500'}
                `}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className={`
              w-full
              ${theme === 'dark' 
                ? 'bg-primary-light hover:bg-primary-light/80' 
                : ''}
            `}
          >
            S'inscrire
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className={`
            text-sm
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Déjà un compte ? {' '}
            <Link 
              to="/auth/login" 
              className={`
                ${theme === 'dark' 
                  ? 'text-primary-light hover:text-primary-light/80' 
                  : 'text-primary hover:text-primary-dark'}
              `}
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
