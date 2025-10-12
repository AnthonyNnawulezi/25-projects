import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwlCo5fRE4bkCVRdn7B8i7-bcJ439GbU0",
  authDomain: "react-interview-firebase-a5284.firebaseapp.com",
  projectId: "react-interview-firebase-a5284",
  storageBucket: "react-interview-firebase-a5284.firebasestorage.app",
  messagingSenderId: "148124814697",
  appId: "1:148124814697:web:147059dbfee4f4276601f8",
  measurementId: "G-6MWY2TSCGY",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
