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

  return (
    <div className="authentication-container">
      <h1>Google Authentication</h1>
      <button onClick={login}>Login with Google</button>
      {authInfo && <p>Authentication Info: {JSON.stringify(authInfo)}</p>}
      {profile && <p>Profile Info: {JSON.stringify(profile)}</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
    </div>
  );
}

export default GoogleAuthentication;
