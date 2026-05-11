import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

function GoogleAuthentication() {
  const [authInfo, setAuthInfo] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Response", response);
      setAuthInfo(response);
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authInfo.access_token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authInfo.access_token}`,
            Accept: "application/json",
          },
        },
      );
      const data = await response.json();
      console.log(data, "Data");
      setProfile(data);
    } catch (err) {
      console.log("Error fetching user info", err);
      setError(err);
    }
  };

  useEffect(() => {
    if (authInfo) fetchProfile();
  }, [authInfo]);

  function logout() {
    setAuthInfo(null);
    setProfile(null);
    setError(null);
  }

  console.log("Auth and Profile", authInfo, profile);

  return (
    <div className="authentication-container">
      <h1>Google Authentication</h1>
      {profile !== null ? (
        <div className="profile-info">
          <img
            src={profile?.picture}
            alt="Profile"
            className="profile-picture"
          />
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
}

export default GoogleAuthentication;
