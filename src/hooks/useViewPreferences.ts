import { useState, useEffect } from 'react';

interface ViewPreferences {
  viewMode: 'grid' | 'list';
  selectedCategories: string[];
  selectedTechnologies: string[];
  sortOrder: 'newest' | 'oldest';
  searchQuery: string;
}

const defaultPreferences: ViewPreferences = {
  viewMode: 'grid',
  selectedCategories: [],
  selectedTechnologies: [],
  sortOrder: 'newest',
  searchQuery: '',
};

/**
 * Hook personnalisé pour gérer les préférences d'affichage
 * @param key - Clé unique pour stocker les préférences dans le localStorage
 * @returns Les préférences et les fonctions pour les mettre à jour
 */
export const useViewPreferences = (key: string) => {
  // Initialisation des préférences depuis le localStorage ou valeurs par défaut
  const [preferences, setPreferences] = useState<ViewPreferences>(() => {
    const savedPrefs = localStorage.getItem(key);
    return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
  });

  // Mise à jour du localStorage quand les préférences changent
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(preferences));
  }, [preferences, key]);

  // Fonctions pour mettre à jour les préférences
  const setViewMode = (mode: 'grid' | 'list') => {
    setPreferences(prev => ({ ...prev, viewMode: mode }));
  };

  const setSelectedCategories = (categories: string[]) => {
    setPreferences(prev => ({ ...prev, selectedCategories: categories }));
  };

  const setSelectedTechnologies = (technologies: string[]) => {
    setPreferences(prev => ({ ...prev, selectedTechnologies: technologies }));
  };

  const setSortOrder = (order: 'newest' | 'oldest') => {
    setPreferences(prev => ({ ...prev, sortOrder: order }));
  };

  const setSearchQuery = (query: string) => {
    setPreferences(prev => ({ ...prev, searchQuery: query }));
  };

  return {
    ...preferences,
    setViewMode,
    setSelectedCategories,
    setSelectedTechnologies,
    setSortOrder,
    setSearchQuery,
  };
};

export default useViewPreferences;
