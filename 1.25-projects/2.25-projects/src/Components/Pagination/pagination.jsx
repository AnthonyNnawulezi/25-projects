function Pagination({ goToPage, currentPage, currentItems }) {
  return (
    <div>
      <button onClick={goToPage(currentPage - 1)}>Previous</button>
      <button onClick={goToPage}>
        `
        {currentItems.map((item) => (
          <button
            key={item}
            className="btn ${currentPage === item ? 'active' : ''} "
            onClick={goToPage}
          >
            {item}
          </button>
        ))}
        `
      </button>
      <button onClick={goToPage(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
