import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";
import MovieCard from "./components/MovieCard";
import "./style.css";
import Watchlist from "./components/watchlist";
import Watched from "./components/watched";

function MovieApp() {
  const { search, setSearch, loading, movies } = useContext(MovieContext);
  // console.log(search);

  return (
    <div>
      <h1>Movie App</h1>
      <div className="watchlist-container">
        <Watchlist />
        <Watched />
      </div>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
      />
      <div className="movies-container">
        {loading ? <p>Loading movies...</p> : null}
        {movies && movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <h1>Search for movies</h1>
        )}
      </div>
    </div>
  );
}

export default MovieApp;
