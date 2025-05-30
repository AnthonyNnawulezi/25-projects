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
      console.log(result);

      if (result && result.products && result.products.length > 0) {
        setLoading(false);
        setProducts(result.products);
        setFilteredItems(result.products);
      }

      //or
      // if (result?.products?.length) {
      //   setLoading(false);
      //   setProducts(result.products);
      //   setFilteredItems(result.products);
      // }

      //or
      // if (result?.products?.length > 0) {
      //   setLoading(false);
      //   setProducts(result.products);
      //   setFilteredItems(result.products);
      // }
    } catch (error) {
      console.log(error);
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
      currCategory !== "" //empty & no category has been clicked
        ? copiedProducts.filter(
            (product) =>
              product.category.toUpperCase() === currCategory.toUpperCase() //show products according to category
          )
        : copiedProducts //show all products when no category btn has been clicked
    );
  }, [currCategory, products]);

  const uniqueCategories =
    products && products.length > 0
      ? [...new Set(products.map((product) => product.category))]
      : [];

  //or
  // const uniqueCategories = [...new Set(products.map((product) => product.category))];

  console.log(uniqueCategories, "uniqueCategories");

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
              //If the currently selected category (prevCategory) is the same as the clicked category, clear the filter (""). Otherwise, set it to the clicked category.
              setCurrCategory((prevCategory) =>
                prevCategory === category ? "" : category
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

        {/* {filteredItems.length > 0 &&
          filteredItems.map((product) => (
            <li key={product.id}>
              <p>{product.title}</p>
              <button>{product.category}</button>
            </li>
          ))} */}
      </div>
    </div>
  );
}

export default FilterProducts;
