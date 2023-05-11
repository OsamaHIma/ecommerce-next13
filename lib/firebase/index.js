// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC69DbZ1iu_MZUcxvvXxbKsb1l38gZxNE",
  authDomain: "safirni-com.firebaseapp.com",
  projectId: "safirni-com",
  storageBucket: "safirni-com.appspot.com",
  messagingSenderId: "330990068467",
  appId: "1:330990068467:web:94341555f02031107e0d86",
  measurementId: "G-RFQT8LE12V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const dataBase = getFirestore();
export const auth = getAuth();
export const signIN = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, provider);
};


// Creating user document and if it doesn't exist create new one

export const createUserDocument = async (user, additionalInfo = {}) => {
  if (!user) return;
  const userDocRef = doc(dataBase, "users", user.uid);
  const userSnapShoot = await getDoc(userDocRef);
  if (!userSnapShoot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userDocRef;
};

export const addUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => {
  if (window.confirm("Are You sure you wanna sign out?") === true) {
    await signOut(auth);
  } else {
    return;
  }
};
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
