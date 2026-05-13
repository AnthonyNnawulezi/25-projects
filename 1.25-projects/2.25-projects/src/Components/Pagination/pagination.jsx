function Pagination({ handlePageChange, currentPage, currentItems }) {
  let pageNos = [];
  for (let i = 0; i < currentItems.length; i++) {
    pageNos.push(currentItems[i]);
  }
  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      {pageNos.map((item) => (
        <button
          key={item.id}
          className="btn ${currentPage === item ? 'active' : ''} "
          onClick={() => handlePageChange(currentPage)}
        >
          {item.id}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
