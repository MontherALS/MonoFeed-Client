"use client";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center my-8 gap-3 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        const isSelected = currentPage === pageNumber;
        return (
          <button
            key={pageNumber}
            className={`py-2 px-4 rounded-lg text-center font-semibold transition-all duration-300 ${
              isSelected
                ? "bg-white text-black border-2 border-border scale-110"
                : "bg-surface text-white border border-border hover:bg-white/10"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}
