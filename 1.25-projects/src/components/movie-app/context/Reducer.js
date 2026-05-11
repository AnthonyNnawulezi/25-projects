import {
  add_to_watched,
  add_to_watchlist,
  move_to_watched,
  move_to_watchlist,
  remove_from_watched,
  remove_from_watchlist,
} from "../type";

export function Reducer(state, action) {
  switch (action.type) {
    case add_to_watchlist:
      console.log(action, "action");

      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };

    case add_to_watched:
      console.log(action, "action");

      return {
        ...state,
        watched: [...state.watched, action.payload],
      };

    case remove_from_watchlist:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id,
        ),
      };

    case remove_from_watched:
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id,
        ),
      };

    case move_to_watchlist:
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id,
        ),
        watchlist: [...state.watchlist, action.payload],
      };

    case move_to_watched:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id,
        ),
        watched: [...state.watched, action.payload],
      };

    default:
      return state;
  }
}
