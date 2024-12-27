// Configuration Vite pour le projet React
// Importe les dépendances nécessaires pour la configuration
import { defineConfig } from "vite";  // Fonction de configuration de Vite
import react from "@vitejs/plugin-react-swc";  // Plugin React SWC
import path from "path";  // Module Node.js pour manipulation de chemins

// https://vitejs.dev/config/
// Configuration exportée avec support des modes (développement/production)
export default defineConfig(() => ({
  // Configuration du serveur de développement
  server: {
    host: "::",  // Écoute sur toutes les interfaces réseau
    port: 8080,  // Port de développement
    headers: {
      'Content-Security-Policy': 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "connect-src 'self' http://localhost"
    }
  },

  // Plugins Vite
  plugins: [
    react(),  // Plugin React SWC officiel
  ],

  // Configuration des alias de chemins
  resolve: {
    alias: {
      // Permet d'importer depuis "@/" au lieu de chemins relatifs
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
