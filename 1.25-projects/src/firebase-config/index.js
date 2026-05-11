import { initializeApp, getApps, getApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwlCo5fRE4bkCVRdn7B8i7-bcJ439GbU0",
  authDomain: "react-interview-firebase-a5284.firebaseapp.com",
  projectId: "react-interview-firebase-a5284",
  storageBucket: "react-interview-firebase-a5284.firebasestorage.app",
  messagingSenderId: "148124814697",
  appId: "1:148124814697:web:147059dbfee4f4276601f8",
  measurementId: "G-6MWY2TSCGY",
};

// Initialize Firebase - only if not already initialized
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(firebaseApp);
// const auth = firebaseApp.auth();
const auth = getAuth(firebaseApp);

async function loginUsingEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in successfully:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message, error.code);
    throw error; // Re-throw so the calling component can handle it
  }
}

async function registerUsingEmailAndPassword(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // save to database
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User registered and saved to database:", docRef.id);
    return user;
  } catch (error) {
    console.error("Registration error:", error.message, error.code);
    throw error; // Re-throw so the calling component can handle it
  }
}

function logout() {
  // auth.signOut();
  signOut(auth);
}

export {
  auth,
  loginUsingEmailAndPassword,
  registerUsingEmailAndPassword,
  logout,
};
