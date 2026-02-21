import { add_to_watched, add_to_watchlist } from "../type";

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

    default:
      return state;
  }
}
