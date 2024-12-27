// Page de connexion
// Permet aux utilisateurs de se connecter à leur compte

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LoginCredentials } from "@/services/authService";
import { useTheme } from "@/components/theme-provider"; // Ajout de l'import du thème

// Commentaire : Page de connexion désactivée pour le moment
export default function Login() {
  // Gestion du thème
  const { theme } = useTheme(); // Ajout de la gestion du thème
  
  // États locaux
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Nettoyer les erreurs lors du démontage du composant
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Tentative de connexion via le service d'authentification
      await login(formData);
      
      // Exemple de toast pour indiquer que la connexion est réussie
      toast({
        title: "Connexion réussie !",
        description: "Vous allez être redirigé vers votre tableau de bord.",
      });
      navigate("/admin");
    } catch (error: any) {
      // Gestion des erreurs de connexion
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gray-50'}
    `}>
      <Card className={`
        w-full max-w-md
        ${theme === 'dark' 
          ? 'bg-secondary-dark/10 border-secondary-dark/30' 
          : 'bg-white'}
      `}>
        <CardHeader className="space-y-1">
          <CardTitle className={`
            text-2xl text-center
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          `}>
            Connexion
          </CardTitle>
          <CardDescription className={`
            text-center
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Connectez-vous pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label 
                htmlFor="email"
                className={theme === 'dark' ? 'text-gray-300' : ''}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`
                  w-full
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200 placeholder-gray-400' 
                    : ''}
                `}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="password"
                  className={theme === 'dark' ? 'text-gray-300' : ''}
                >
                  Mot de passe
                </Label>
                <Link
                  to="/auth/forgot-password"
                  className={`
                    text-sm font-medium
                    ${theme === 'dark' 
                      ? 'text-primary-light hover:text-primary-light/80' 
                      : 'text-primary hover:text-primary/90'}
                  `}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={`
                    pr-10
                    ${theme === 'dark' 
                      ? 'bg-secondary-dark/20 border-secondary-dark/30 text-gray-200 placeholder-gray-400' 
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
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-sm text-center">
              <Link
                to="/auth/register"
                className={`
                  font-medium
                  ${theme === 'dark' 
                    ? 'text-primary-light hover:text-primary-light/80' 
                    : 'text-primary hover:text-primary/90'}
                `}
              >
                Pas encore de compte ? Inscrivez-vous
              </Link>
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
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
