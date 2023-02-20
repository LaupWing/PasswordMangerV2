
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
   apiKey: "AIzaSyDUSZ8ClNUwZf768yyzKyKER0BMHv5zK4k",
   authDomain: "password-manager-2b50d.firebaseapp.com",
   projectId: "password-manager-2b50d",
   storageBucket: "password-manager-2b50d.appspot.com",
   messagingSenderId: "866396500303",
   appId: "1:866396500303:web:29a3fdcf592e4f60d8d53a",
   measurementId: "G-NMSRY9HM49",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = typeof window !== undefined && getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export {
   app,
   // analytics,
   db,
   auth
}
