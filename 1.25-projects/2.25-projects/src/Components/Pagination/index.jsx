import { useMemo, useState } from "react";
import Pagination from "./pagination";

function ProductsList() {
  const PRODUCTS = useMemo(() => {
    let productItems = [];

    for (let i = 1; i <= 150; i += 1) {
      productItems.push({
        id: i,
        name: "Product",
      });
    }
    return productItems;
  }, []);
  console.log(PRODUCTS);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);

  function handlePageChange(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  const currentItems = useMemo(() => {
    const indexOfLast = currentPage * ITEMS_PER_PAGE;
    const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
    return PRODUCTS.slice(indexOfFirst, indexOfLast);
  }, [PRODUCTS, currentPage]);

  return (
    <section>
      <h1>Pagination</h1>
      <div className="list-container">
        {currentItems.map((item) => (
          <li key={item.id}>Products{item.id}</li>
        ))}
      </div>
      <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        currentItems={currentItems}
        totalPages={totalPages}
      />
    </section>
  );
}

export default ProductsList;
