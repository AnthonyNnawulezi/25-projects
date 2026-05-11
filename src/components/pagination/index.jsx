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
        disabled={currentPage === 1} // Disable when on first page
      >
        Prev
      </button>
      {pages.map((pageNo) => (
        <button
          className={`pagination-btn ${currentPage === pageNo ? "active" : ""}`}
          key={pageNo}
          onClick={() => onPageChange(pageNo)} //updating the current page.
        >
          {pageNo}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Correctly disables on last page
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
