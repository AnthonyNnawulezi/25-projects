import { useMemo, useState } from "react";
import "./style.css";
import "./style.css";
import { Pagination } from "../pagination";

function ProductsList() {
  const PRODUCTS = useMemo(() => {
    let productItems = [];

    for (let i = 0; i < 150; i++) {
      productItems.id = i++;
      productItems.name = "Product";
      productItems.push[i];
    }
    return productItems;
  }, []);
  console.log(PRODUCTS);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  function goToPage(page) {
    setCurrentPage(page);
  }

  const currentItems = useMemo(() => {
    const indexOfLast = currentPage * ITEMS_PER_PAGE;
    const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
    return PRODUCTS.slice(indexOfFirst, indexOfLast);
  }, [PRODUCTS, currentPage]);
  console.log(currentItems);

  return (
    <section>
      <h1>Pagination</h1>
      <div className="list-container">
        {currentItems.map((item) => (
          <li key={item}>Products`{PRODUCTS.id}`</li>
        ))}
      </div>
      <Pagination
        goToPage={goToPage}
        currentPage={currentPage}
        currentItems={currentItems}
      />
    </section>
  );
}

export default ProductsList;
