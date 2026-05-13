function Pagination({ handlePageChange, currentPage, currentItems }) {
  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      {currentItems.map((item) => (
        <button
          key={item}
          className="btn ${currentPage === item ? 'active' : ''} "
          onClick={() => handlePageChange(currentPage)}
        >
          {item}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
