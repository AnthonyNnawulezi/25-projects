import { createContext, useEffect, useReducer, useState } from "react";
import useDebounce from "../../Debounce-api/use-debounce";
import { Reducer } from "./Reducer";
import {
  add_to_watched,
  add_to_watchlist,
  remove_from_watched,
  remove_from_watchlist,
} from "../type";

export const MovieContext = createContext();

function GlobalState({ children }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceMovies = useDebounce(search, 500);
  const api_key = "fd5ba8be7732f6d13596b5e82c8fa701";
  const initialState = {
    watchlist: localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : [],
    watched: localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : [],
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debounceMovies) return; // Don't fetch if search is empty
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${debounceMovies}&include_adult=false&language=en-US&page=1`,
        );
        const data = await response.json();
        console.log("Data", data);
        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debounceMovies]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state.watched]);

  function addToWatchlist(movie) {
    console.log(movie);
    dispatch({
      type: add_to_watchlist,
      payload: movie,
    });
  }
  function addToWatched(movie) {
    console.log(movie);
    dispatch({
      type: add_to_watched,
      payload: movie,
    });
  }

  function removeFromWatchlist(movie) {
    dispatch({
      type: remove_from_watchlist,
      payload: movie,
    });
  }

  function removeFromWatched(movie) {
    dispatch({
      type: remove_from_watched,
      payload: movie,
    });
  }

  function moveToWatchlist(movie) {
    removeFromWatched(movie);
    addToWatchlist(movie);
  }

  function moveToWatched(movie) {
    removeFromWatchlist(movie);
    addToWatched(movie);
  }

  console.log("state", state);

  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        movies,
        setMovies,
        loading,
        setLoading,
        debounceMovies,
        addToWatched,
        addToWatchlist,
        removeFromWatchlist,
        removeFromWatched,
        state,
        moveToWatchlist,
        moveToWatched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default GlobalState;
