// function Pagination({ currentPage, totalPages = 10, onPageChange }) {
//   function generateNoOfPages() {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   }

//   return (
//     <div className="pagination">
//       <button
//         className="pagination-btn"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>
//       {generateNoOfPages().map((pageNo) => (
//         <button
//           className={`pagination-btn ${currentPage === pageNo ? "active" : ""}`}
//           key={pageNo}
//           onClick={() => onPageChange(pageNo)}
//         >
//           {pageNo}
//         </button>
//       ))}
//       <button
//         className="pagination-btn"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default Pagination;

//or

import { useMemo } from "react";

function Pagination({ currentPage, totalPages = 10, onPageChange }) {
  // Memoize page generation to avoid re-renders this time inside function
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          className={`pagination-btn ${currentPage === page ? "active" : ""}`}
          key={page}
          onClick={() => onPageChange(page)} //updating the current page.
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
