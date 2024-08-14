import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Add this line

const firebaseConfig = {
  apiKey: "AIzaSyBkUKhLJ-jIxjX3MmNWIvTlQk65y4A9rb0",
  authDomain: "quiz-4f728.firebaseapp.com",
  projectId: "quiz-4f728",
  storageBucket: "quiz-4f728.appspot.com",
  messagingSenderId: "793501043152",
  appId: "1:793501043152:web:fc2e39c4f931e4262e11d5",
  measurementId: "G-941T78G064"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore_database = getFirestore(app);  // Pass the app to getFirestore
