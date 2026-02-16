import { createContext, useEffect, useState } from "react";
import useDebounce from "../../Debounce-api/use-debounce";

export const MovieContext = createContext();

function GlobalState({ children }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceMovies = useDebounce(search, 500);
  const api_key = "fd5ba8be7732f6d13596b5e82c8fa701";

  useEffect(() => {
    console.log(debounceMovies);
  }, [debounceMovies]);

  useEffect(() => {
    try {
      const response = fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}&query=${debounceMovies}`,
      );
      const data = response.json();
      console.log("Data", data);
    } catch (error) {
      console.error(error);
    }
  }, []);

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default GlobalState;
