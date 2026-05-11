import { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function Watchlist() {
  const { state, removeFromWatchlist, moveToWatched } =
    useContext(MovieContext);
  return (
    <div className="watchlist">
      <h1>Watch List</h1>
      <div className="watchlist-wrapper">
        <p className="watchlist-count">
          {state.watchlist.length} movies in watchlist
        </p>
        {state?.watchlist?.length > 0 ? (
          state.watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-movie">
              {movie?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="fill-img">No Image Available</div>
              )}
              <div className="movie-info">
                <h3>{movie?.title}</h3>
                <p>Release Date: {movie?.release_date}</p>
                <p>Rating: {movie?.vote_average}</p>
              </div>
              <div className="buttons">
                <button onClick={() => removeFromWatchlist(movie)}>
                  Remove from Watchlist
                </button>
                <button onClick={() => moveToWatched(movie)}>
                  Move to Watched
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies in watchlist</p>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
