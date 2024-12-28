// vite.config.ts
import { defineConfig } from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\xampp\\htdocs\\projets-perso\\ronasdev.com\\ronasdev-front";
var vite_config_default = defineConfig(() => ({
  // Configuration du serveur de développement
  server: {
    host: "::",
    // Écoute sur toutes les interfaces réseau
    port: 8080,
    // Port de développement
    headers: {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://cdn.tiny.cloud; style-src 'self' 'unsafe-inline'; img-src 'self' data: http://localhost https:; connect-src 'self' http://localhost"
    }
  },
  // Plugins Vite
  plugins: [
    react()
    // Plugin React SWC officiel
  ],
  // Configuration des alias de chemins
  resolve: {
    alias: {
      // Permet d'importer depuis "@/" au lieu de chemins relatifs
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccHJvamV0cy1wZXJzb1xcXFxyb25hc2Rldi5jb21cXFxccm9uYXNkZXYtZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxwcm9qZXRzLXBlcnNvXFxcXHJvbmFzZGV2LmNvbVxcXFxyb25hc2Rldi1mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveGFtcHAvaHRkb2NzL3Byb2pldHMtcGVyc28vcm9uYXNkZXYuY29tL3JvbmFzZGV2LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7Ly8gQ29uZmlndXJhdGlvbiBWaXRlIHBvdXIgbGUgcHJvamV0IFJlYWN0XG4vLyBJbXBvcnRlIGxlcyBkXHUwMEU5cGVuZGFuY2VzIG5cdTAwRTljZXNzYWlyZXMgcG91ciBsYSBjb25maWd1cmF0aW9uXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiOyAgLy8gRm9uY3Rpb24gZGUgY29uZmlndXJhdGlvbiBkZSBWaXRlXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOyAgLy8gUGx1Z2luIFJlYWN0IFNXQ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjsgIC8vIE1vZHVsZSBOb2RlLmpzIHBvdXIgbWFuaXB1bGF0aW9uIGRlIGNoZW1pbnNcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIENvbmZpZ3VyYXRpb24gZXhwb3J0XHUwMEU5ZSBhdmVjIHN1cHBvcnQgZGVzIG1vZGVzIChkXHUwMEU5dmVsb3BwZW1lbnQvcHJvZHVjdGlvbilcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuICAvLyBDb25maWd1cmF0aW9uIGR1IHNlcnZldXIgZGUgZFx1MDBFOXZlbG9wcGVtZW50XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIiwgIC8vIFx1MDBDOWNvdXRlIHN1ciB0b3V0ZXMgbGVzIGludGVyZmFjZXMgclx1MDBFOXNlYXVcbiAgICBwb3J0OiA4MDgwLCAgLy8gUG9ydCBkZSBkXHUwMEU5dmVsb3BwZW1lbnRcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBcbiAgICAgICAgXCJkZWZhdWx0LXNyYyAnc2VsZic7IFwiICtcbiAgICAgICAgXCJzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3Vuc2FmZS1ldmFsJyBodHRwczovL2Nkbi5ncHRlbmcuY28gaHR0cHM6Ly9jZG4udGlueS5jbG91ZDsgXCIgK1xuICAgICAgICBcInN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnOyBcIiArXG4gICAgICAgIFwiaW1nLXNyYyAnc2VsZicgZGF0YTogaHR0cDovL2xvY2FsaG9zdCBodHRwczo7IFwiICtcbiAgICAgICAgXCJjb25uZWN0LXNyYyAnc2VsZicgaHR0cDovL2xvY2FsaG9zdFwiXG4gICAgfVxuICB9LFxuXG4gIC8vIFBsdWdpbnMgVml0ZVxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSwgIC8vIFBsdWdpbiBSZWFjdCBTV0Mgb2ZmaWNpZWxcbiAgXSxcblxuICAvLyBDb25maWd1cmF0aW9uIGRlcyBhbGlhcyBkZSBjaGVtaW5zXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgLy8gUGVybWV0IGQnaW1wb3J0ZXIgZGVwdWlzIFwiQC9cIiBhdSBsaWV1IGRlIGNoZW1pbnMgcmVsYXRpZnNcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWEsT0FBTztBQUFBO0FBQUEsRUFFakMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLDJCQUNFO0FBQUEsSUFLSjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUFBO0FBQUEsRUFHQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
