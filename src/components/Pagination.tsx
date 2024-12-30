import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

// Interface définissant les props du composant Pagination
interface PaginationProps {
  currentPage: number;      // Page actuelle
  totalPages: number;       // Nombre total de pages
  onPageChange: (page: number) => void;  // Fonction de callback pour le changement de page
}

/**
 * Composant de pagination avec navigation et indicateur de page
 * @param currentPage - Page actuelle
 * @param totalPages - Nombre total de pages
 * @param onPageChange - Fonction appelée lors du changement de page
 */
const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Génère un tableau de numéros de page à afficher
  const getPageNumbers = () => {
    console.log("totalPages", totalPages);
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Si le nombre total de pages est inférieur à maxVisiblePages, affiche toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sinon, affiche un sous-ensemble de pages avec des ellipses
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Bouton précédent */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-primary hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Numéros de page */}
      {getPageNumbers().map((pageNumber, index) => (
        <Button
          key={index}
          variant={pageNumber === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => {
            if (typeof pageNumber === 'number') {
              onPageChange(pageNumber);
            }
          }}
          disabled={pageNumber === '...'}
          className={`w-10 ${
            pageNumber === currentPage
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white transition-colors"
          }`}
        >
          {pageNumber}
        </Button>
      ))}

      {/* Bouton suivant */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-primary hover:text-white transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;