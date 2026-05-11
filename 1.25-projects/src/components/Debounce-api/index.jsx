import { useEffect, useState } from "react";
import useDebounce from "./use-debounce";
import "./style.css";

function DebounceApi() {
  const [searchParam, setSearchParam] = useState("");
  const debounceSearchParam = useDebounce(searchParam, 1000);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchRecipes() {
    try {
      setLoading(true);
      const response = await fetch(
        //check vite.config.js for proxy setup
        `/api/recipes/search?q=${debounceSearchParam}`
      );
      const data = await response.json();
      console.log(data, "Fetched Recipes");

      data && setRecipes(data.recipes || []);
      setLoading(false);

      //  data?.recipes?.length > 0
      //     ? setRecipes(data.recipes)
      //     : setRecipes([]);
      //   setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching recipes:", error);
    }
  }

  useEffect(() => {
    if (!debounceSearchParam) return;
    fetchRecipes();
    console.log(debounceSearchParam, "Search value");

    // const fetchRecipes = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch(
    //       `https://www.themealdb.com/api/json/v1/1/search.php?s=${debounceSearchParam}`
    //     );
    //     const data = await response.json();
    //     setRecipes(data.meals || []);
    //   } catch (error) {
    //     console.error("Error fetching recipes:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchRecipes();
  }, [debounceSearchParam]);

  return (
    <div className="api-container">
      <h2>Debounce API Call</h2>
      <div className="search-wrapper">
        <input
          type="text"
          name=""
          id=""
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter Recipe"
        />
      </div>
      {loading ? <p>Loading...</p> : null}
      {recipes?.length > 0 ? (
        recipes.map((recipe) => <li key={recipe.id}>{recipe.name}</li>)
      ) : (
        <h3>No recipes found, try a different search.</h3>
      )}
    </div>
  );
}

export default DebounceApi;
