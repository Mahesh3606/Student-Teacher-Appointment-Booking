import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEZ8cYhWh0WRc5TSZxoZhkPzZFzH6aEow",
  authDomain: "student-teacher-booking-ab248.firebaseapp.com",
  projectId: "student-teacher-booking-ab248",
  storageBucket: "student-teacher-booking-ab248.appspot.com",
  messagingSenderId: "232151809677",
  appId: "1:232151809677:web:0268adb70fc41ffaabacc4",
  measurementId: "G-ELXCET5NVG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
