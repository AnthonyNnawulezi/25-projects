import { useCallback, useEffect, useMemo, useState } from "react";
import './style.css'

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
      console.log(data);

      setProducts(data.products ?? []);
    } catch (error) {
        <p>{'Error fetching Products', error}</p>
    }finally{
        setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category.toLowerCase === selectedCategory.toLowerCase))]
  }, [products])

  const filteredProducts = useMemo(() => {
    if(!selectedCategory) return products;

    return products.map((product) => product.category.toLowerCase === selectedCategory.toLowerCase)
  }, [products, selectedCategory])

  return (
    <section>
      <h1>Filter Products By Category</h1>
      {
        categories.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory((prev) => prev === category ? "" : category)} className={selectedCategory === category ? 'active' : ""}></button>
        ))
      }

      {
        filteredProducts.map(({id, category, images, brand, title}) => (
                <ul key={id} className="products-list">
                <li className="list" >
                    <img src={images} alt="" />
                    <h3>{title}</h3>
                    <h4>{category}</h4>
                    <h5>Brand:{brand}</h5>
                </li>
            </ul>
        ))
      }
    </section>
  );
}

export default FilterProducts;
