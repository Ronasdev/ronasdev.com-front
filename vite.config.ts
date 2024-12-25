// Configuration Vite pour le projet React
// Importe les dépendances nécessaires pour la configuration
import { defineConfig } from "vite";  // Fonction de configuration de Vite
import react from "@vitejs/plugin-react-swc";  // Plugin React avec SWC pour compilation rapide
import path from "path";  // Module Node.js pour manipulation de chemins
import { componentTagger } from "lovable-tagger";  // Plugin optionnel pour le développement

// https://vitejs.dev/config/
// Configuration exportée avec support des modes (développement/production)
export default defineConfig(({ mode }) => ({
  // Configuration du serveur de développement
  server: {
    host: "::",  // Écoute sur toutes les interfaces réseau
    port: 8080,  // Port de développement
  },

  // Plugins Vite
  plugins: [
    react(),  // Plugin React officiel
    mode === 'development' && componentTagger(),  // Plugin de développement conditionnel
  ].filter(Boolean),  // Filtre les plugins nuls/faux

  // Configuration des alias de chemins
  resolve: {
    alias: {
      // Permet d'importer depuis "@/" au lieu de chemins relatifs
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
