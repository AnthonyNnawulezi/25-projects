import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";

function MovieApp() {
  const { search, setSearch } = useContext(MovieContext);
  // console.log(search);

  return (
    <div>
      <h1>Movie App</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
      />
    </div>
  );
}

export default MovieApp;
