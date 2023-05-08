import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
  IconChevronsLeft,
} from "@tabler/icons-react";

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
    <div className="flex justify-center ">
      <button
        onClick={() => paginate(1)}
        disabled={!canGoBack}
        className={`px-2 py-1 rounded-md text-indigo-600 ${
          !canGoBack ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IconChevronsLeft size={20} />
      </button>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={!canGoBack}
        className={`px-2 py-1 rounded-md text-indigo-600 ${
          !canGoBack ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IconChevronLeft size={20} />
      </button>
      <button
        className={`mx-2 px-3 py-1 rounded-xl ${"bg-indigo-600 text-white"}`}
      >
        {currentPage}
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={!canGoForward}
        className={`px-2 py-1 rounded-md text-indigo-600 ${
          !canGoForward ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IconChevronRight size={20} />
      </button>
      <button
        onClick={() => paginate(pageNumbers.length)}
        disabled={!canGoForward}
        className={`px-2 py-1 rounded-md text-indigo-600 ${
          !canGoForward ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IconChevronsRight size={20} />
      </button>
    </div>
  );
};
