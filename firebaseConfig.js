import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCBD6Wi85cbJZHYRLewkA2nhdGJfPlInw",
    authDomain: "gone-fishin-caf16.firebaseapp.com",
    projectId: "gone-fishin-caf16",
    storageBucket: "gone-fishin-caf16.firebasestorage.app",
    messagingSenderId: "880238012738",
    appId: "1:880238012738:web:50a246ca45263a54abc0db",
    measurementId: "G-BL7785QJ55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Export Auth and Firestore for use in other files
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
