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
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={!canGoBack}
        className={`px-3 py-1 rounded-md ${
          !canGoBack ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Anterior
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={`px-3 py-1 rounded-md ${
            pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={!canGoForward}
        className={`px-3 py-1 rounded-md ${
          !canGoForward ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};
