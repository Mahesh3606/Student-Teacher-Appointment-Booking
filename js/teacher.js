import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(collection(db, 'appointments'), where('teacher', '==', user.uid));
    const snapshot = await getDocs(q);

    let html = '';
    if (snapshot.empty) {
      html = "<p>No appointments yet.</p>";
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `
          <div style="border:1px solid #ccc; padding:10px; margin:10px;">
            <p>Student ID: ${data.student}</p>
            <p>Status: ${data.status}</p>
            <p>Time: ${data.time?.seconds ? new Date(data.time.seconds * 1000).toLocaleString() : "N/A"}</p>
          </div>`;
      });
    }

    document.getElementById('appointments').innerHTML = html;
  }
});
