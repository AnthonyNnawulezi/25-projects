import { auth } from "../../firebase-config";
import AuthPage from "./auth";
import UnAuthPage from "./unauth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.css";

function FireBaseAuth() {
  const [user, loading, error] = useAuthState(auth);
  console.log(user, error, loading, "izu");

  const content = loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : user ? (
    <AuthPage />
  ) : (
    <UnAuthPage />
  );

  return (
    <div className="auth-container">
      <h2>Firebase Authentication Component</h2>
      {content}
    </div>
  );
}

export default FireBaseAuth;
