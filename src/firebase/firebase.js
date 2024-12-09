
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkClFs1DxNjYxYEFl8DLynmivh3pd6qFk",
  authDomain: "bisproject-7b41c.firebaseapp.com",
  projectId: "bisproject-7b41c",
  storageBucket: "bisproject-7b41c.firebasestorage.app",
  messagingSenderId: "53960820465",
  appId: "1:53960820465:web:4acae9a619054b358b8b50",
  measurementId: "G-KTHZD3V9CT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };