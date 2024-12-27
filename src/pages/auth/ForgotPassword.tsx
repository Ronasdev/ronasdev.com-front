// Page de réinitialisation du mot de passe
// Permet aux utilisateurs de demander une réinitialisation de mot de passe

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/theme-provider';

// Commentaire : Page de réinitialisation de mot de passe désactivée pour le moment
export default function ForgotPassword() {
  // Gestion du thème
  const { theme } = useTheme();
  
  // États locaux
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Hooks
  const { toast } = useToast();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ici, vous ajouteriez l'appel API pour la réinitialisation du mot de passe
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi de l'email");

      setIsEmailSent(true);
      toast({
        title: "Email envoyé",
        description: "Consultez votre boîte mail pour réinitialiser votre mot de passe.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gray-50'}
    `}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <Card className={`
          ${theme === 'dark' 
            ? 'bg-secondary-dark/10 border-secondary-dark/30' 
            : 'bg-white'}
        `}>
          <CardHeader className="space-y-1">
            <CardTitle className={`
              text-2xl text-center
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            `}>
              Mot de passe oublié
            </CardTitle>
            <CardDescription className={`
              text-center
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
            `}>
              Entrez votre email pour réinitialiser votre mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="email"
                    className={theme === 'dark' ? 'text-gray-300' : ''}
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className={`
                      absolute left-3 top-3 h-4 w-4
                      ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}
                    `} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      className={`
                        pl-10
                        ${theme === 'dark' 
                          ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200 placeholder-gray-400' 
                          : ''}
                      `}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className={`
                    w-full
                    ${theme === 'dark' 
                      ? 'bg-primary-light hover:bg-primary-light/80' 
                      : 'bg-primary hover:bg-primary/90'}
                  `}
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                </Button>
              </form>
            ) : (
              <div className={`
                text-center space-y-4
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              `}>
                <p className="text-sm">
                  Un email a été envoyé à {email} avec les instructions pour
                  réinitialiser votre mot de passe.
                </p>
                <p className="text-sm">
                  N'oubliez pas de vérifier vos spams si vous ne trouvez pas
                  l'email.
                </p>
                <Button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className={`
                    ${theme === 'dark' 
                      ? 'border-secondary-dark/30 text-gray-300 hover:bg-secondary-dark/20' 
                      : ''}
                  `}
                >
                  Renvoyer un email
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className={`
              text-sm
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            `}>
              Retourner à la{" "}
              <Link
                to="/auth/login"
                className={`
                  ${theme === 'dark' 
                    ? 'text-primary-light hover:text-primary-light/80' 
                    : 'text-primary hover:text-primary/90'}
                `}
              >
                page de connexion
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
