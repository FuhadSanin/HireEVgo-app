// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1_LubI3O92kJxsOBO7SWLBUuzJSXUKpk",
  authDomain: "hireevgo-app.firebaseapp.com",
  projectId: "hireevgo-app",
  storageBucket: "hireevgo-app.firebasestorage.app",
  messagingSenderId: "596649558225",
  appId: "1:596649558225:web:debbf024d7f58ce7d305f0",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
