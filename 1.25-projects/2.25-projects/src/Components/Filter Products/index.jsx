import { useCallback, useEffect, useMemo, useState } from "react";
import "./style.css";

function FilterProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(false);

  const fetchProducts = useCallback(async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) throw new Error("Error fetching Products");

      const data = await response.json();

      setProducts(data.products ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    return products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [products, selectedCategory]);

  return (
    <section className="filter-products-container">
      <h1>Filter Products By Category</h1>
      {isLoading && <p>Loading Please wait...</p>}
      {error && <p>Error Fetching Products</p>}
      <div className="filter-button-wrapper">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              setSelectedCategory((prev) => (prev === category ? "" : category))
            }
            className={`filter-button ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="filter-products-list">
        {filteredProducts.map(({ id, category, images, brand, title }) => (
          <li className="filter-list" key={id}>
            <img src={images} alt="" />
            <h3>{title}</h3>
            <h4>{category}</h4>
            <h5>Brand:{brand}</h5>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FilterProducts;
