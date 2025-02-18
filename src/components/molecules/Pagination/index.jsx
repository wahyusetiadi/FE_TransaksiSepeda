import React from 'react';

const Pagination = ({ currentPage, totalPage, paginate }) => {
  return (
    <div className="flex justify-center mt-4 px-4 py-2 max-md:text-xs max-md:px-0 max-md:py-0">
      {/* Tombol First */}
      <button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 max-md:px-1 rounded ${
          currentPage === 1
            ? "bg-orange-100 text-orange-300 cursor-not-allowed"
            : "bg-orange-100 text-orange-700 hover:bg-orange-300"
        }`}
      >
        &lt;&lt;
      </button>

      {/* Tombol Prev */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
          currentPage === 1
            ? "bg-orange-100 text-orange-300 cursor-not-allowed"
            : "bg-orange-100 text-orange-700 hover:bg-orange-300"
        }`}
      >
        &lt;
      </button>

      {/* Tombol halaman */}
      {Array.from({ length: totalPage }, (_, index) => {
        const pageNumber = index + 1;
        if (
          pageNumber >= currentPage - 1 &&
          pageNumber <= currentPage + 1
        ) {
          return (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
                currentPage === pageNumber
                  ? "bg-orange-600 text-white"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-300"
              }`}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}

      {/* Tombol Next */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPage}
        className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
          currentPage === totalPage
            ? "bg-orange-100 text-orange-300 cursor-not-allowed"
            : "bg-orange-100 text-orange-700 hover:bg-orange-300"
        }`}
      >
        &gt;
      </button>

      {/* Tombol Last */}
      <button
        onClick={() => paginate(totalPage)}
        disabled={currentPage === totalPage}
        className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
          currentPage === totalPage
            ? "bg-orange-100 text-orange-300 cursor-not-allowed"
            : "bg-orange-100 text-orange-700 hover:bg-orange-300"
        }`}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
