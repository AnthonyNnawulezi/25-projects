import { useEffect, useState } from "react";
import "./style.css";

function FilterProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currCategory, setCurrCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();

      if (result && result.products && result.products.length > 0) {
        setLoading(false);
        setProducts(result.products);
        setFilteredItems(result.products);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const copiedProducts = [...products];
    setFilteredItems(
      currCategory !== ""
        ? copiedProducts.filter(
            (product) =>
              product.category.toUpperCase() === currCategory.toUpperCase(),
          )
        : copiedProducts,
    );
  }, [currCategory, products]);

  const uniqueCategories =
    products && products.length > 0
      ? [...new Set(products.map((product) => product.category))]
      : [];

  if (loading) {
    return <h3>Fetching Products. Please wait!</h3>;
  }

  return (
    <div className="container">
      <h1>Filter Products By Category</h1>
      <div className="category-container">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setCurrCategory((prevCategory) =>
                prevCategory === category ? "" : category,
              )
            }
            className={`${currCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="list-of-products">
        {filteredItems && filteredItems.length > 0
          ? filteredItems.map((product) => (
              <li key={product.id}>
                <p>{product.title}</p>
                <button>{product.category}</button>
              </li>
            ))
          : null}
      </div>
    </div>
  );
}

export default FilterProducts;
