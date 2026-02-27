import { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieCard({ movie, key }) {
  const { addToWatchlist, addToWatched, state } = useContext(MovieContext);

  return (
    <div key={key} className="movie-card">
      {movie?.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="fill-img">No Image Available</div>
      )}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Release Date: {movie.release_date ?? "Unknown"}</p>
        <p>Rating: {movie.vote_average ?? "N/A"}</p>
      </div>
      <div className="buttons-wrapper">
        <button
          disabled={state.watchlist.some((m) => m.id === movie.id)}
          // disabled={state.watchlist.findIndex((m) => m.id === movie.id) !== -1}
          // disabled={state.watchlist.findIndex((m) => m.id === movie.id) > -1 ? true : false}
          onClick={() => addToWatchlist(movie)}
        >
          Add to Watchlist
        </button>
        <button
          disabled={state.watched.findIndex((m) => m.id === movie.id) !== -1}
          onClick={() => addToWatched(movie)}
        >
          Add to Watched
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
