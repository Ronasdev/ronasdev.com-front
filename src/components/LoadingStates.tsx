import { Skeleton } from "./ui/skeleton";

/**
 * État de chargement pour une carte de blog
 * Affiche un placeholder animé pendant le chargement des données
 */
export const BlogCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

/**
 * État de chargement pour une grille de cartes
 * @param count - Nombre de cartes à afficher
 * @returns Un ensemble de cartes skeleton
 */
export const GridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * État de chargement pour la page de détail d'un article
 */
export const BlogPostSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero image */}
      <Skeleton className="h-96 w-full" />
      
      {/* Article header */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
};

/**
 * État de chargement pour une carte de portfolio
 */
export const PortfolioCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-20" />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * État de chargement pour la grille de portfolio
 * @param count - Nombre de projets à afficher
 */
export const PortfolioGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <PortfolioCardSkeleton key={index} />
      ))}
    </div>
  );
};
