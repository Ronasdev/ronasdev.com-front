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
      // Palette de couleurs personnalisée
      colors: {
        // Couleurs système avec support HSL
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Couleur primaire personnalisée (vert émeraude)
        primary: {
          DEFAULT: "#10B981",  // Couleur principale
          light: "#34D399",    // Variante claire
          dark: "#059669",     // Variante sombre
          foreground: "hsl(var(--primary-foreground))",
        },

        // Couleur secondaire personnalisée (gris foncé)
        secondary: {
          DEFAULT: "#1F2937",
          light: "#374151",
          dark: "#111827",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Autres couleurs système
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      // Autres extensions possibles : bordures, animations, etc.
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },

  // Plugins Tailwind (à ajouter si nécessaire)
  plugins: [require("tailwindcss-animate")],
} satisfies Config;