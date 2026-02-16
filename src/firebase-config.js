import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAwlCo5fRE4bkCVRdn7B8i7-bcJ439GbU0",
  authDomain: "react-interview-firebase-a5284.firebaseapp.com",
  projectId: "react-interview-firebase-a5284",
  storageBucket: "react-interview-firebase-a5284.appspot.com",
  messagingSenderId: "1073619378607",
  appId: "1:1073619378607:web:your-app-id",
};

// Initialize Firebase - only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Register user with email and password
export const registerUsingEmailAndPassword = async (name, email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User registered successfully:", user);
    return user;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error; // Re-throw so the component can handle it
  }
};

// Login user with email and password
export const loginUsingEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Sign in user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User logged in successfully:", user);
    return user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Re-throw so the component can handle it
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};
