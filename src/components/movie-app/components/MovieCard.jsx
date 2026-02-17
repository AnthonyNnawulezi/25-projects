function MovieCard({ movie, key }) {
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
        <h3>{movie?.title}</h3>
        <p>Release Date: {movie?.release_date}</p>
        <p>Rating: {movie?.vote_average}</p>
      </div>
      <div className="buttons-wrapper">
        <button>Add to Watchlist</button>
        <button>Add to Watched</button>
      </div>
    </div>
  );
}

export default MovieCard;
