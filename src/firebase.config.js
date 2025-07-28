// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJHxNwvD14oRXh0Mm1TGFJZb6iA9W3J2c",
  authDomain: "simple-email-password-au-b019e.firebaseapp.com",
  projectId: "simple-email-password-au-b019e",
  storageBucket: "simple-email-password-au-b019e.firebasestorage.app",
  messagingSenderId: "100397019677",
  appId: "1:100397019677:web:3d8c31abd0f22f7f79ccf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth