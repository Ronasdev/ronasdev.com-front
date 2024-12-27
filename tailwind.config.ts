// Configuration Tailwind CSS pour le projet
// Définit le système de design, les thèmes et les extensions

import type { Config } from "tailwindcss";

export default {
  // Active le mode sombre via une classe
  darkMode: ["class"],

  // Chemins des fichiers à analyser pour générer les classes CSS
  content: [
    "./pages/**/*.{ts,tsx}",     // Pages
    "./components/**/*.{ts,tsx}", // Composants
    "./app/**/*.{ts,tsx}",        // Fichiers d'application
    "./src/**/*.{ts,tsx}",        // Tous les fichiers source
  ],

  // Préfixe optionnel pour les classes (ici vide)
  prefix: "",

  // Configuration du thème personnalisé
  theme: {
    // Configuration du conteneur (centré avec padding)
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px", // Largeur maximale
      },
    },

    // Extensions et personnalisations du thème
    extend: {
      // Palette de couleurs personnalisée avec support des thèmes
      colors: {
        // Couleurs système avec support HSL
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          soft: "hsl(var(--background-soft))"
        },
        foreground: "hsl(var(--foreground))",

        // Couleur primaire personnalisée (vert émeraude)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))"
        },

        // Couleur secondaire personnalisée (gris)
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))"
        },

        // Couleurs d'état
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },

        // Couleurs spécifiques au thème
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))"
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))"
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))"
        }
      },
      // Autres extensions précédentes (borderRadius, keyframes, etc.)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Keyframes précédentes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Nouvelles animations de thème
        "theme-transition-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "theme-transition-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
        // Animations de transition de thème
        "theme-in": "theme-transition-in 0.3s ease-out",
        "theme-out": "theme-transition-out 0.3s ease-in",
      },
      // Transitions personnalisées
      transitionProperty: {
        'theme': 'background, color, border-color, text-decoration-color, fill, stroke, opacity, transform',
      },
      transitionTimingFunction: {
        'theme-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'theme': '300ms',
      }
    },
  },

  // Plugins Tailwind (à ajouter si nécessaire)
  plugins: [require("tailwindcss-animate")],
} satisfies Config;