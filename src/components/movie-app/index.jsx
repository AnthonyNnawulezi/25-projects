import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";
import MovieCard from "./components/MovieCard";
import "./style.css";

function MovieApp() {
  const { search, setSearch, loading, movies } = useContext(MovieContext);
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
      <div className="movies-container">
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
}

export default MovieApp;
