import { useTheme } from "@/components/theme-provider";

/**
 * Utilitaires de thème pour générer des classes dynamiques
 */
export const useThemeClasses = () => {
  const { theme } = useTheme();

  // Classes de texte dynamiques
  const textClasses = {
    primary: theme === 'dark' ? 'text-primary-light' : 'text-primary-dark',
    secondary: theme === 'dark' ? 'text-secondary-light' : 'text-secondary-dark',
    hover: {
      primary: theme === 'dark' ? 'hover:text-primary-light' : 'hover:text-primary-dark',
      secondary: theme === 'dark' ? 'hover:text-secondary-light' : 'hover:text-secondary-dark'
    }
  };

  // Classes de fond dynamiques
  const bgClasses = {
    primary: theme === 'dark' ? 'bg-primary-dark/10' : 'bg-primary-light/10',
    secondary: theme === 'dark' ? 'bg-secondary-dark/10' : 'bg-secondary-light/10'
  };

  // Classes de bordure dynamiques
  const borderClasses = {
    primary: theme === 'dark' ? 'border-primary-light/30' : 'border-primary-dark/30',
    secondary: theme === 'dark' ? 'border-secondary-light/30' : 'border-secondary-dark/30'
  };

  return {
    textClasses,
    bgClasses,
    borderClasses,
    theme
  };
};

/**
 * Fonction pour générer des classes de thème conditionnelles
 * @param darkClass Classe pour le mode sombre
 * @param lightClass Classe pour le mode clair
 * @returns Classe appropriée en fonction du thème
 */
export const getThemeClass = (darkClass: string, lightClass: string) => {
  const { theme } = useTheme();
  return theme === 'dark' ? darkClass : lightClass;
};

/**
 * Fonction pour appliquer des styles de thème à un élément
 * @param baseStyle Style de base
 * @param darkStyle Style spécifique au mode sombre
 * @returns Style fusionné
 */
export const applyThemeStyle = (baseStyle: React.CSSProperties, darkStyle?: React.CSSProperties) => {
  const { theme } = useTheme();
  return theme === 'dark' && darkStyle 
    ? { ...baseStyle, ...darkStyle } 
    : baseStyle;
};
