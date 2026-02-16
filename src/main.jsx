import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import GlobalState from "./components/movie-app/context/GlobalState.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalState>
    <App />
  </GlobalState>,
);
