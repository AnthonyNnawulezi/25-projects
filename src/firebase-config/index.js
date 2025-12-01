import { initializeApp } from "firebase/app";
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

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
// const auth = firebaseApp.auth();
const auth = getAuth(firebaseApp);

async function loginUsingEmailAndPassword(email, password) {
  try {
    // await auth.signInWithEmailAndPassword(email, password); ask why not work instead of below
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
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
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
  }
}

function logout() {
  auth.signOut();
  signOut(auth);
}

export {
  auth,
  loginUsingEmailAndPassword,
  registerUsingEmailAndPassword,
  logout,
};
