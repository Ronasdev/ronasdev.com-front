// vite.config.ts
import { defineConfig } from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import fs from "file:///C:/xampp/htdocs/projets-perso/ronasdev.com/ronasdev-front/node_modules/fs-extra/lib/index.js";
var __vite_injected_original_dirname = "C:\\xampp\\htdocs\\projets-perso\\ronasdev.com\\ronasdev-front";
var copyTinyMCEFiles = () => {
  return {
    name: "copy-tinymce-files",
    closeBundle() {
      const sourceDir = path.resolve(__vite_injected_original_dirname, "node_modules/tinymce");
      const destDir = path.resolve(__vite_injected_original_dirname, "dist/tinymce");
      try {
        fs.copySync(sourceDir, destDir, {
          filter: (src) => {
            return src.includes(".min.js") || src.includes("themes") || src.includes("icons") || src.includes("plugins");
          }
        });
        console.log("TinyMCE files copied successfully");
      } catch (err) {
        console.error("Error copying TinyMCE files:", err);
      }
    }
  };
};
var vite_config_default = defineConfig(() => ({
  // Configuration du serveur de développement
  server: {
    host: "::",
    // Écoute sur toutes les interfaces réseau
    port: 8080,
    // Port de développement
    headers: {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tiny.cloud; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost"
    }
  },
  // Configuration pour TinyMCE
  optimizeDeps: {
    include: ["tinymce"],
    // Exclusions spécifiques
    exclude: ["@tinymce/tinymce-react"]
  },
  // Plugins Vite
  plugins: [
    react(),
    // Plugin React SWC officiel
    copyTinyMCEFiles()
    // Ajout du plugin de copie
  ],
  // Configuration des alias de chemins
  resolve: {
    alias: {
      // Permet d'importer depuis "@/" au lieu de chemins relatifs
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      // Alias pour TinyMCE
      "tinymce": path.resolve(__vite_injected_original_dirname, "node_modules/tinymce")
    }
  },
  // Configuration de build
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("tinymce")) {
            return "tinymce";
          }
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccHJvamV0cy1wZXJzb1xcXFxyb25hc2Rldi5jb21cXFxccm9uYXNkZXYtZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxwcm9qZXRzLXBlcnNvXFxcXHJvbmFzZGV2LmNvbVxcXFxyb25hc2Rldi1mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveGFtcHAvaHRkb2NzL3Byb2pldHMtcGVyc28vcm9uYXNkZXYuY29tL3JvbmFzZGV2LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7Ly8gQ29uZmlndXJhdGlvbiBWaXRlIHBvdXIgbGUgcHJvamV0IFJlYWN0XG4vLyBJbXBvcnRlIGxlcyBkXHUwMEU5cGVuZGFuY2VzIG5cdTAwRTljZXNzYWlyZXMgcG91ciBsYSBjb25maWd1cmF0aW9uXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiOyAgLy8gRm9uY3Rpb24gZGUgY29uZmlndXJhdGlvbiBkZSBWaXRlXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOyAgLy8gUGx1Z2luIFJlYWN0IFNXQ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjsgIC8vIE1vZHVsZSBOb2RlLmpzIHBvdXIgbWFuaXB1bGF0aW9uIGRlIGNoZW1pbnNcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcblxuLy8gQ29waWUgZGVzIHJlc3NvdXJjZXMgVGlueU1DRVxuY29uc3QgY29weVRpbnlNQ0VGaWxlcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnY29weS10aW55bWNlLWZpbGVzJyxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGNvbnN0IHNvdXJjZURpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdub2RlX21vZHVsZXMvdGlueW1jZScpO1xuICAgICAgY29uc3QgZGVzdERpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0L3RpbnltY2UnKTtcbiAgICAgIFxuICAgICAgdHJ5IHtcbiAgICAgICAgZnMuY29weVN5bmMoc291cmNlRGlyLCBkZXN0RGlyLCB7XG4gICAgICAgICAgZmlsdGVyOiAoc3JjKSA9PiB7XG4gICAgICAgICAgICAvLyBDb3BpZXIgdW5pcXVlbWVudCBsZXMgZmljaGllcnMgblx1MDBFOWNlc3NhaXJlc1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgc3JjLmluY2x1ZGVzKCcubWluLmpzJykgfHwgXG4gICAgICAgICAgICAgIHNyYy5pbmNsdWRlcygndGhlbWVzJykgfHwgXG4gICAgICAgICAgICAgIHNyYy5pbmNsdWRlcygnaWNvbnMnKSB8fCBcbiAgICAgICAgICAgICAgc3JjLmluY2x1ZGVzKCdwbHVnaW5zJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ1RpbnlNQ0UgZmlsZXMgY29waWVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvcHlpbmcgVGlueU1DRSBmaWxlczonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG4vLyBDb25maWd1cmF0aW9uIGV4cG9ydFx1MDBFOWUgYXZlYyBzdXBwb3J0IGRlcyBtb2RlcyAoZFx1MDBFOXZlbG9wcGVtZW50L3Byb2R1Y3Rpb24pXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4gKHtcbiAgLy8gQ29uZmlndXJhdGlvbiBkdSBzZXJ2ZXVyIGRlIGRcdTAwRTl2ZWxvcHBlbWVudFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsICAvLyBcdTAwQzljb3V0ZSBzdXIgdG91dGVzIGxlcyBpbnRlcmZhY2VzIHJcdTAwRTlzZWF1XG4gICAgcG9ydDogODA4MCwgIC8vIFBvcnQgZGUgZFx1MDBFOXZlbG9wcGVtZW50XG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtU2VjdXJpdHktUG9saWN5JzogXG4gICAgICAgIFwiZGVmYXVsdC1zcmMgJ3NlbGYnOyBcIiArXG4gICAgICAgIFwic2NyaXB0LXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCcgaHR0cHM6Ly9jZG4udGlueS5jbG91ZDsgXCIgK1xuICAgICAgICBcInN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnOyBcIiArXG4gICAgICAgIFwiaW1nLXNyYyAnc2VsZicgZGF0YTo7IFwiICtcbiAgICAgICAgXCJjb25uZWN0LXNyYyAnc2VsZicgaHR0cDovL2xvY2FsaG9zdFwiXG4gICAgfVxuICB9LFxuXG4gIC8vIENvbmZpZ3VyYXRpb24gcG91ciBUaW55TUNFXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsndGlueW1jZSddLFxuICAgIC8vIEV4Y2x1c2lvbnMgc3BcdTAwRTljaWZpcXVlc1xuICAgIGV4Y2x1ZGU6IFsnQHRpbnltY2UvdGlueW1jZS1yZWFjdCddXG4gIH0sXG5cbiAgLy8gUGx1Z2lucyBWaXRlXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLCAgLy8gUGx1Z2luIFJlYWN0IFNXQyBvZmZpY2llbFxuICAgIGNvcHlUaW55TUNFRmlsZXMoKSAvLyBBam91dCBkdSBwbHVnaW4gZGUgY29waWVcbiAgXSxcblxuICAvLyBDb25maWd1cmF0aW9uIGRlcyBhbGlhcyBkZSBjaGVtaW5zXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgLy8gUGVybWV0IGQnaW1wb3J0ZXIgZGVwdWlzIFwiQC9cIiBhdSBsaWV1IGRlIGNoZW1pbnMgcmVsYXRpZnNcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgLy8gQWxpYXMgcG91ciBUaW55TUNFXG4gICAgICBcInRpbnltY2VcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJub2RlX21vZHVsZXMvdGlueW1jZVwiKVxuICAgIH0sXG4gIH0sXG5cbiAgLy8gQ29uZmlndXJhdGlvbiBkZSBidWlsZFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAvLyBTXHUwMEU5cGFyYXRpb24gZGVzIGNodW5rcyBwb3VyIFRpbnlNQ0VcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3RpbnltY2UnKSkge1xuICAgICAgICAgICAgcmV0dXJuICd0aW55bWNlJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRWpCLE9BQU8sUUFBUTtBQU5mLElBQU0sbUNBQW1DO0FBU3pDLElBQU0sbUJBQW1CLE1BQU07QUFDN0IsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sY0FBYztBQUNaLFlBQU0sWUFBWSxLQUFLLFFBQVEsa0NBQVcsc0JBQXNCO0FBQ2hFLFlBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUV0RCxVQUFJO0FBQ0YsV0FBRyxTQUFTLFdBQVcsU0FBUztBQUFBLFVBQzlCLFFBQVEsQ0FBQyxRQUFRO0FBRWYsbUJBQ0UsSUFBSSxTQUFTLFNBQVMsS0FDdEIsSUFBSSxTQUFTLFFBQVEsS0FDckIsSUFBSSxTQUFTLE9BQU8sS0FDcEIsSUFBSSxTQUFTLFNBQVM7QUFBQSxVQUUxQjtBQUFBLFFBQ0YsQ0FBQztBQUNELGdCQUFRLElBQUksbUNBQW1DO0FBQUEsTUFDakQsU0FBUyxLQUFLO0FBQ1osZ0JBQVEsTUFBTSxnQ0FBZ0MsR0FBRztBQUFBLE1BQ25EO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUlBLElBQU8sc0JBQVEsYUFBYSxPQUFPO0FBQUE7QUFBQSxFQUVqQyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsMkJBQ0U7QUFBQSxJQUtKO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsU0FBUztBQUFBO0FBQUEsSUFFbkIsU0FBUyxDQUFDLHdCQUF3QjtBQUFBLEVBQ3BDO0FBQUE7QUFBQSxFQUdBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBQ04saUJBQWlCO0FBQUE7QUFBQSxFQUNuQjtBQUFBO0FBQUEsRUFHQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQTtBQUFBLE1BRXBDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLElBQzNEO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFFZixjQUFJLEdBQUcsU0FBUyxTQUFTLEdBQUc7QUFDMUIsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
