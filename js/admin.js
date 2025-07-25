import { auth, db } from './firebase-config.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  collection, query, where, getDocs, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Listen for auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadTeachers();
    loadPendingStudents();
  } else {
    window.location.href = "../login.html";
  }
});

async function loadTeachers() {
  document.getElementById('teacherList').innerHTML = '<p>Loading teachers...</p>';
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'teacher'));
    const snapshot = await getDocs(q);
    let html = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `<div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <strong>${data.name}</strong><br>Email: ${data.email}
      </div>`;
    });
    document.getElementById('teacherList').innerHTML = html || '<p>No teachers found.</p>';
  } catch (err) {
    console.error("Error loading teachers:", err);
    document.getElementById('teacherList').innerHTML = '<p>Failed to load teachers.</p>';
  }
}

async function loadPendingStudents() {
  document.getElementById('studentApprovals').innerHTML = '<p>Loading pending students...</p>';
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'student'), where('approved', '==', false));
    const snapshot = await getDocs(q);
    let html = '';
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      html += `<div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <strong>${data.name}</strong> - ${data.email}
        <button onclick="approveStudent('${docSnap.id}')">Approve</button>
      </div>`;
    });
    document.getElementById('studentApprovals').innerHTML = html || '<p>No pending students.</p>';
  } catch (err) {
    console.error("Error loading students:", err);
    document.getElementById('studentApprovals').innerHTML = '<p>Failed to load students.</p>';
  }
}

window.approveStudent = async (studentId) => {
  try {
    const userRef = doc(db, 'users', studentId);
    await updateDoc(userRef, { approved: true });
    alert('Student Approved');
    loadPendingStudents();
  } catch (err) {
    console.error("Approval failed:", err);
    alert('Failed to approve student');
  }
};
