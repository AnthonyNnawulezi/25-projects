import { useCallback, useEffect, useMemo, useState } from "react";
import "./style.css";

// function FilterProducts() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const fetchProducts = useCallback(async () => {
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("https://dummyjson.com/products");

//       if (!response.ok) throw new Error("Error fetching Products");

//       const data = await response.json();

//       setProducts(data.products ?? []);
//     } catch (error) {
//       console.error(error);
//       setError(error.status);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const categories = useMemo(() => {
//     return [...new Set(products.map((product) => product.category))];
//   }, [products]);

//   const filteredProducts = useMemo(() => {
//     if (!selectedCategory) return products;

//     return products.filter(
//       (product) =>
//         product.category.toLowerCase() === selectedCategory.toLowerCase(),
//     );
//   }, [products, selectedCategory]);

//   return (
//     <section className="filter-products-container">
//       <h1>Filter Products By Category</h1>
//       {isLoading && <p>Loading Please wait...</p>}
//       {error && <p>error, Error Fetching Products</p>}
//       <div className="filter-button-wrapper">
//         {categories.map((category) => (
//           <button
//             key={category}
//             type="button"
//             onClick={() =>
//               setSelectedCategory((prev) => (prev === category ? "" : category))
//             }
//             className={`filter-button ${selectedCategory === category ? "active" : ""}`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       <ul className="filter-products-list">
//         {filteredProducts.map(({ id, thumbnail, category, brand, title }) => (
//           <li className="filter-list" key={id}>
//             <img src={thumbnail} alt={title} />
//             <p>{title}</p>
//             <span>{category}</span>
//             <span>Brand:{brand}</span>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

const PRODUCTS_API_URL = "https://dummyjson.com/products";

function FilterProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // let isMounted = true;
    const response = await fetch(PRODUCTS_API_URL);

    try {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      //   if (isMounted && data?.products) {
      //       setProducts(data.products);
      //     } gemini
      // if (result && Array.isArray(result.products)) {
      //     setProducts(result.products);
      //   } else {
      //     throw new Error("Invalid products data");
      //   }copilot
      // setProducts(data.products || []); gpt

      setProducts(data.products ?? []);
    } catch (error) {
      setError(error.message ?? "Something went wrong while fetching products");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [selectedCategory, products]);

  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  }, []);

  if (isLoading) return <h3>Fetching products, please wait...</h3>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="filter-products-container">
      <h1>Filter Products By Category</h1>
      {isLoading && <p>Loading Please wait...</p>}
      {error && <p>error, Error Fetching Products</p>}
      <div className="filter-button-wrapper">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryToggle(category)}
            className={`filter-button ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="filter-products-list">
        {filteredProducts.map(({ id, thumbnail, category, brand, title }) => (
          <li className="filter-list" key={id}>
            <img src={thumbnail} alt={title} />
            <p>{title}</p>
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FilterProducts;
