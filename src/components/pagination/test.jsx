import { useState } from "react";
import Pagination from ".";
import './pagination.css';

function PaginationTest() {
  const data = Array.from({ length: 102 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
  }));

  // console.log(data);

  const itemsPerpage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(currentPage) {
    setCurrentPage(currentPage);
  }

  const indexOfLastItem = currentPage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;
  const currentListOfItems = data.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentListOfItems, indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1>Pagination</h1>
      <ul className="list-items">
        {currentListOfItems.map((listItem) => (
          <li key={listItem.id}>{listItem.name}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / itemsPerpage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PaginationTest;
