// Danger: Don't commit this file


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoXSNZ9FjdggxtZW6uSf5-VDHHVu4aM6g",
  authDomain: "email-password-auth-9c97f.firebaseapp.com",
  projectId: "email-password-auth-9c97f",
  storageBucket: "email-password-auth-9c97f.firebasestorage.app",
  messagingSenderId: "706813403169",
  appId: "1:706813403169:web:feb9c58f71b92f3cb9c360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);