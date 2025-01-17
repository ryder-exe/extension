import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7fKD41xnA-RczP5Ey4Sm0GsTEs02nNt0",
    authDomain: "ytextension-e74d2.firebaseapp.com",
    projectId: "ytextension-e74d2",
    storageBucket: "ytextension-e74d2.firebasestorage.app",
    messagingSenderId: "633466753006",
    appId: "1:633466753006:web:46481828f430f000b3c8ff",
    measurementId: "G-1CEXTM5YFX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

//AIzaSyDfQT9dWBUxqEVfSzqMwvnBKl2uMEVIm9s