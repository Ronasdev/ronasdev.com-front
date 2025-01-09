// Point d'entrée principal de l'application React
// Responsable de l'initialisation et du rendu de l'application

// Importations des dépendances essentielles
import React from 'react';  // Bibliothèque React pour la création de composants
import ReactDOM from 'react-dom/client';  // Méthode de rendu moderne de React
import { BrowserRouter } from 'react-router-dom';  // Routeur pour les applications à page unique
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';  // Composant racine de l'application
import './index.css';  // Styles globaux de l'application
import { HelmetProvider } from 'react-helmet-async';

// Fonction de gestion des erreurs globales
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div role="alert" className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Une erreur est survenue</h1>
      <pre className="text-red-500 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Réessayer
      </button>
    </div>
  )
}

// Rendu de l'application avec gestion des erreurs et thème
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <ThemeProvider defaultTheme="dark" storageKey="ronasdev-theme">
        {/* <BrowserRouter> */}
        {/* Composant principal de l'application */}
        <HelmetProvider>
          <App />
        </HelmetProvider>
        {/* </BrowserRouter> */}
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
