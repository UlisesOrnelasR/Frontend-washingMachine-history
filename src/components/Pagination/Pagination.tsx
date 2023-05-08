import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationProps {
  currentPage: number;
  servicesPerPage: number;
  totalServices: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination = ({
  currentPage,
  servicesPerPage,
  totalServices,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i++) {
    pageNumbers.push(i);
  }

  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < pageNumbers.length;

  return (
    <div className="flex justify-center space-x-2 ">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={!canGoBack}
        className={`px-3 py-1 rounded-md text-indigo-600 ${
          !canGoBack ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IconChevronLeft size={20} />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={`px-3 py-1 rounded-xl ${
            pageNumber === currentPage ? "bg-indigo-600 text-white" : "bg-white"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={!canGoForward}
        className={`px-3 py-1 rounded-md text-indigo-600 ${
          !canGoForward ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IconChevronRight size={20} />
      </button>
    </div>
  );
};
