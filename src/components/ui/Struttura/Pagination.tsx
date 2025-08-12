import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) => {
  // Genera array delle pagine da mostrare
  const getVisiblePages = () => {
    const delta = 2; // Numero di pagine da mostrare intorno alla corrente
    const range = [];
    const rangeWithDots = [];

    // Prima pagina sempre visibile
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav 
      role="navigation" 
      aria-label="Pagination"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {/* Pulsante Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-3 py-1 rounded-md border font-sans text-sm transition-colors duration-200
          ${currentPage === 1 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'bg-background text-foreground border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20'
          }
        `}
        aria-label="Pagina precedente"
      >
        ←
      </button>

      {/* Numeri di pagina */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`dots-${index}`}
              className="px-3 py-1 text-sm text-foreground/60 font-sans"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`
              px-3 py-1 rounded-md border font-sans text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
              ${isActive
                ? 'bg-primary text-white border-primary'
                : 'bg-background text-foreground border-gray-300 hover:bg-gray-100'
              }
            `}
            aria-label={`Pagina ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Pulsante Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-3 py-1 rounded-md border font-sans text-sm transition-colors duration-200
          ${currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'bg-background text-foreground border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20'
          }
        `}
        aria-label="Pagina successiva"
      >
        →
      </button>
    </nav>
  );
};

export default Pagination;