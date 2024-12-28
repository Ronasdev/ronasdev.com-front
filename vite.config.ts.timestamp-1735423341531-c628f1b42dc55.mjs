// vite.config.ts
import { defineConfig } from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\xampp\\htdocs\\projets-perso\\ronasdev.com\\ronasdev-front";
var vite_config_default = defineConfig(({ mode }) => ({
  // Configuration du serveur de développement
  server: {
    host: "::",
    // Écoute sur toutes les interfaces réseau
    port: 8080
    // Port de développement
  },
  // Plugins Vite
  plugins: [
    react()
    // mode === 'development' &&
    // componentTagger(),
  ].filter(Boolean),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccHJvamV0cy1wZXJzb1xcXFxyb25hc2Rldi5jb21cXFxccm9uYXNkZXYtZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxwcm9qZXRzLXBlcnNvXFxcXHJvbmFzZGV2LmNvbVxcXFxyb25hc2Rldi1mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveGFtcHAvaHRkb2NzL3Byb2pldHMtcGVyc28vcm9uYXNkZXYuY29tL3JvbmFzZGV2LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7Ly8gLy8gQ29uZmlndXJhdGlvbiBWaXRlIHBvdXIgbGUgcHJvamV0IFJlYWN0XG4vLyAvLyBJbXBvcnRlIGxlcyBkXHUwMEU5cGVuZGFuY2VzIG5cdTAwRTljZXNzYWlyZXMgcG91ciBsYSBjb25maWd1cmF0aW9uXG4vLyBpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiOyAgLy8gRm9uY3Rpb24gZGUgY29uZmlndXJhdGlvbiBkZSBWaXRlXG4vLyBpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOyAgLy8gUGx1Z2luIFJlYWN0IFNXQ1xuLy8gaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjsgIC8vIE1vZHVsZSBOb2RlLmpzIHBvdXIgbWFuaXB1bGF0aW9uIGRlIGNoZW1pbnNcblxuLy8gLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIC8vIENvbmZpZ3VyYXRpb24gZXhwb3J0XHUwMEU5ZSBhdmVjIHN1cHBvcnQgZGVzIG1vZGVzIChkXHUwMEU5dmVsb3BwZW1lbnQvcHJvZHVjdGlvbilcbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuLy8gICAvLyBDb25maWd1cmF0aW9uIGR1IHNlcnZldXIgZGUgZFx1MDBFOXZlbG9wcGVtZW50XG4vLyAgIHNlcnZlcjoge1xuLy8gICAgIGhvc3Q6IFwiOjpcIiwgIC8vIFx1MDBDOWNvdXRlIHN1ciB0b3V0ZXMgbGVzIGludGVyZmFjZXMgclx1MDBFOXNlYXVcbi8vICAgICBwb3J0OiA4MDgwLCAgLy8gUG9ydCBkZSBkXHUwMEU5dmVsb3BwZW1lbnRcbi8vICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBcbi8vICAgICAgICAgXCJkZWZhdWx0LXNyYyAnc2VsZic7IFwiICtcbi8vICAgICAgICAgXCJzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3Vuc2FmZS1ldmFsJyBodHRwczovL2Nkbi5ncHRlbmcuY28gaHR0cHM6Ly9jZG4udGlueS5jbG91ZDsgXCIgK1xuLy8gICAgICAgICBcInN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnOyBcIiArXG4vLyAgICAgICAgIFwiaW1nLXNyYyAnc2VsZicgZGF0YTogaHR0cDovL2xvY2FsaG9zdCBodHRwczo7IFwiICtcbi8vICAgICAgICAgXCJjb25uZWN0LXNyYyAnc2VsZicgaHR0cDovL2xvY2FsaG9zdFwiXG4vLyAgICAgfVxuLy8gICB9LFxuXG4vLyAgIC8vIFBsdWdpbnMgVml0ZVxuLy8gICBwbHVnaW5zOiBbXG4vLyAgICAgcmVhY3QoKSwgIC8vIFBsdWdpbiBSZWFjdCBTV0Mgb2ZmaWNpZWxcbi8vICAgXSxcblxuLy8gICAvLyBDb25maWd1cmF0aW9uIGRlcyBhbGlhcyBkZSBjaGVtaW5zXG4vLyAgIHJlc29sdmU6IHtcbi8vICAgICBhbGlhczoge1xuLy8gICAgICAgLy8gUGVybWV0IGQnaW1wb3J0ZXIgZGVwdWlzIFwiQC9cIiBhdSBsaWV1IGRlIGNoZW1pbnMgcmVsYXRpZnNcbi8vICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuLy8gICAgIH0sXG4vLyAgIH0sXG4vLyB9KSk7XG5cblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7ICAgLy8gUGx1Z2luIFJlYWN0IFNXQ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbi8vIGltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuXG4vLyBDb25maWd1cmF0aW9uIGV4cG9ydFx1MDBFOWUgYXZlYyBzdXBwb3J0IGRlcyBtb2RlcyAoZFx1MDBFOXZlbG9wcGVtZW50L3Byb2R1Y3Rpb24pXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICAvLyBDb25maWd1cmF0aW9uIGR1IHNlcnZldXIgZGUgZFx1MDBFOXZlbG9wcGVtZW50XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIiwvLyBcdTAwQzljb3V0ZSBzdXIgdG91dGVzIGxlcyBpbnRlcmZhY2VzIHJcdTAwRTlzZWF1XG4gICAgcG9ydDogODA4MCwvLyBQb3J0IGRlIGRcdTAwRTl2ZWxvcHBlbWVudFxuICB9LFxuICAgLy8gUGx1Z2lucyBWaXRlXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIC8vIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICAvLyBjb21wb25lbnRUYWdnZXIoKSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gICAvLyBDb25maWd1cmF0aW9uIGRlcyBhbGlhcyBkZSBjaGVtaW5zXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgIC8vIFBlcm1ldCBkJ2ltcG9ydGVyIGRlcHVpcyBcIkAvXCIgYXUgbGlldSBkZSBjaGVtaW5zIHJlbGF0aWZzXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxufSkpO1xuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBc0NBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUF4Q2pCLElBQU0sbUNBQW1DO0FBNEN6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBO0FBQUEsRUFFekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxFQUNSO0FBQUE7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBO0FBQUEsRUFHUixFQUFFLE9BQU8sT0FBTztBQUFBO0FBQUEsRUFFaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
