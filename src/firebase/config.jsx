import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBKN8YoMCTWPNOf3N_ziRRNRHpjKHdR3pA",
    authDomain: "lifedev-ramon.firebaseapp.com",
    projectId: "lifedev-ramon",
    storageBucket: "lifedev-ramon.firebasestorage.app",
    messagingSenderId: "354827822740",
    appId: "1:354827822740:web:d6d7789a1ef8d336ac3681",
    measurementId: "G-8QV1J35Q5T"
  };

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }