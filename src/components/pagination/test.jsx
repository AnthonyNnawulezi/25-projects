import { useState } from "react";
import Pagination from ".";
import "./pagination.css";

// function ProductList() {
//   const data = Array.from({ length: 102 }, (_, index) => ({
//     id: index + 1,
//     name: `Product ${index + 1}`,
//   }));

//   // console.log(data);

//   const itemsPerpage = 12;
//   const [currentPage, setCurrentPage] = useState(1);

//   function handlePageChange(currentPage) {
//     setCurrentPage(currentPage);
//   }

//   const indexOfLastItem = currentPage * itemsPerpage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerpage;
//   const currentListOfItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   console.log(currentListOfItems, indexOfFirstItem, indexOfLastItem);

//   return (
//     <div>
//       <h1>Pagination</h1>
//       <ul className="list-items">
//         {currentListOfItems.map((listItem) => (
//           <li key={listItem.id}>{listItem.name}</li>
//         ))}
//       </ul>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(data.length / itemsPerpage)}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// }

// export default PaginationTest;

// 2nd version, moved constants outside so they are only recalculated when dpendency changes, or wrap in useMemo inside function

const ITEMS_PER_PAGE = 12;
const PRODUCTS = Array.from({ length: 102 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
}));

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return PRODUCTS.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage]);

  function handlePageChange(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <section className="pagination-container">
      <h1>Pagination</h1>

      {currentItems.length > 0 ? (
        <ul className="list-items">
          {currentItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default ProductList;
