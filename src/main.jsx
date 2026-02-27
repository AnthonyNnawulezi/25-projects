import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import GlobalState from "./components/movie-app/context/GlobalState.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId="1008696357126-dtaigloqb9j7ulik5vmlghk0ekgln1j5.apps.googleusercontent.com">
      <GlobalState>
        <App />
      </GlobalState>
    </GoogleOAuthProvider>
  </>,
);
