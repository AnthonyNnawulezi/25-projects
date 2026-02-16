import { auth, db, logout } from "../../firebase-config/index.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Todo from "../todo";

function AuthPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);

  async function fetchUserDetails() {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const doc = await getDocs(q);
      const userData = doc.docs[0].data();
      setUserDetails(userData);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, loading]);

  console.log(userDetails, "user details", user, error);

  return (
    <div>
      <h1>Authentication Page</h1>
      {userDetails ? (
        <>
          <p>Username: {userDetails?.name}</p>
          <p>Email: {userDetails?.email}</p>
        </>
      ) : null}
      <Todo authInfo={{ user, loading, error }} />
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

export default AuthPage;
