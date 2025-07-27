var firebaseConfig = {
  apiKey: "AIzaSyCEZ8cYhWh0WRc5TSZxoZhkPzZFzH6aEow",
  authDomain: "student-teacher-booking-ab248.firebaseapp.com",
  projectId: "student-teacher-booking-ab248",
  storageBucket: "student-teacher-booking-ab248.appspot.com",
  messagingSenderId: "232151809677",
  appId: "1:232151809677:web:0268adb70fc41ffaabacc4",
  measurementId: "G-ELXCET5NVG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register — No approval logic
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        name,
        email,
        role
      });
    })
    .then(() => {
      alert('Registered successfully!');
      location.href = 'login.html';
    })
    .catch(err => alert(err.message));
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection('users').doc(cred.user.uid).get();
    })
    .then(doc => {
      const user = doc.data();
      if (!user) {
        alert("User profile not found in Firestore.");
        return auth.signOut();
      }

      if (user.role === 'admin') {
        location.href = 'dashboard/admin.html';
      } else if (user.role === 'teacher') {
        location.href = 'dashboard/teacher.html';
      } else if (user.role === 'student') {
        location.href = 'dashboard/student.html';
      } else {
        alert("Invalid user role.");
        auth.signOut();
      }
    })
    .catch(err => alert(err.message));
});


