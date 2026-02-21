function WatchedMovies() {
  return (
    <div className="watched">
      <h1>Watched Movies</h1>
      <div className="watched-wrapper">
        <p className="watched-count">{state.watched.length} watched</p>
        {state?.watched?.length > 0 ? (
          state.watched.map((movie) => (
            <div key={movie.id} className="watched-movie">
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
                  Remove from Watched
                </button>
                <button
                  disabled={state.watched.some((m) => m.id === movie.id)}
                  onClick={() => addToWatched(movie)}
                >
                  Add to Watched
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

export default WatchedMovies;
