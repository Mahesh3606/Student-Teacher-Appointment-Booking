// Load teacher list
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('users').where('role', '==', 'teacher').get().then(snapshot => {
      let html = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `
          <div style="border:1px solid #ccc; padding:10px; margin:10px;">
            <h4>${data.name}</h4>
            <button onclick="bookAppointment('${doc.id}')">Book Appointment</button>
          </div>`;
      });
      document.getElementById('teacherList').innerHTML = html;
    });
  }
});

function bookAppointment(teacherId) {
  const studentId = firebase.auth().currentUser.uid;
  db.collection('appointments').add({
    student: studentId,
    teacher: teacherId,
    status: 'Pending',
    time: new Date()
  }).then(() => alert('Appointment Requested'));
}