import "./style.css";

function Pagination({ handlePageChange, currentPage, totalPages }) {
  let pageNos = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNos.push(i);
  }
  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      {pageNos.map((item) => (
        <button
          key={item}
          className={`btn ${currentPage === item ? "active" : ""}`}
          onClick={() => handlePageChange(item)}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
