import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type AuthMode = 'login' | 'register' | 'forgot-password';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * Composant de dialogue d'authentification
 * Permet la connexion, l'inscription et la réinitialisation du mot de passe
 */
export const AuthDialog: React.FC<AuthDialogProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  // États locaux
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Hooks
  const { toast } = useToast();
  const { login, register, requestPasswordReset, error, clearError } = useAuth();

  // Gestionnaire de changement des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    clearError();
  };

  // Changement de mode (connexion, inscription, mot de passe oublié)
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      switch (mode) {
        case 'login':
          await login({
            email: formData.email,
            password: formData.password
          });
          toast({
            title: "Connexion réussie",
            description: "Vous êtes maintenant connecté"
          });
          break;

        case 'register':
          if (formData.password !== formData.confirmPassword) {
            toast({
              title: "Erreur",
              description: "Les mots de passe ne correspondent pas",
              variant: "destructive"
            });
            return;
          }
          await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
          toast({
            title: "Inscription réussie",
            description: "Votre compte a été créé avec succès"
          });
          break;

        case 'forgot-password':
          await requestPasswordReset({ email: formData.email });
          toast({
            title: "Email envoyé",
            description: "Consultez votre boîte mail pour réinitialiser votre mot de passe"
          });
          break;
      }

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      toast({
        title: "Erreur",
        description: error || "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' && 'Connexion'}
            {mode === 'register' && 'Inscription'}
            {mode === 'forgot-password' && 'Mot de passe oublié'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' && 'Connectez-vous pour accéder à votre compte'}
            {mode === 'register' && 'Créez un compte pour commencer'}
            {mode === 'forgot-password' && 'Réinitialisez votre mot de passe'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {mode !== 'forgot-password' && (
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'login' && 'Se connecter'}
              {mode === 'register' && 'S\'inscrire'}
              {mode === 'forgot-password' && 'Envoyer'}
            </Button>

            <div className="flex justify-between text-sm">
              {mode === 'login' && (
                <>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => switchMode('register')}
                  >
                    Créer un compte
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => switchMode('forgot-password')}
                  >
                    Mot de passe oublié ?
                  </Button>
                </>
              )}
              {(mode === 'register' || mode === 'forgot-password') && (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => switchMode('login')}
                >
                  Retour à la connexion
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
