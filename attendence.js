document.addEventListener('DOMContentLoaded', () => {
  const attendanceBtn = document.getElementById('attendanceBtn');
  const resultsBtn = document.getElementById('resultsBtn');
  const modal = document.getElementById('loginModal');
  const closeBtn = document.querySelector('.close-btn');
  const adminForm = document.getElementById('adminLoginForm');
  const modalMsg = document.getElementById('modalMessage');
  const attendancePage = document.getElementById('attendancePage');
  const resultPage = document.getElementById('resultPage');
  const studentList = document.getElementById('studentList');
  const searchInput = document.getElementById('searchStudent');
  const searchBtn = document.getElementById('searchBtn');
  const searchResult = document.getElementById('searchResult');

  let currentSection = '';
  let students = [
    { name: 'Rahul Sharma', present: 15, absent: 2 },
    { name: 'Priya Das', present: 14, absent: 3 },
    { name: 'Arjun Patel', present: 16, absent: 1 }
  ];

  attendanceBtn.onclick = () => {
    currentSection = 'attendance';
    openModal("This section is only allowed for School Admin Department");
  };

  resultsBtn.onclick = () => {
    currentSection = 'results';
    openModal("This section is only allowed for School Admin Department");
  };

  function openModal(message) {
    modalMsg.textContent = message;
    modal.style.display = 'flex';
  }

  closeBtn.onclick = () => modal.style.display = 'none';
  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

  adminForm.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('adminId').value;
    const pass = document.getElementById('adminPass').value;

    if (id === 'Admin7896' && pass === 'Admin7896') {
      modal.style.display = 'none';
      if (currentSection === 'attendance') showAttendancePage();
      if (currentSection === 'results') showResultPage();
    } else {
      alert("Invalid Admin ID or Password");
    }
  };

  function showAttendancePage() {
    resultPage.classList.add('hidden');
    attendancePage.classList.remove('hidden');
    renderStudents();
  }

  function showResultPage() {
    attendancePage.classList.add('hidden');
    resultPage.classList.remove('hidden');
  }

  function renderStudents() {
    studentList.innerHTML = '';
    students.forEach((student, i) => {
      const div = document.createElement('div');
      div.classList.add('student-item');
      div.innerHTML = `
        <span>${i + 1}. ${student.name}</span>
        <div>
          <button class="btn" onclick="markAttendance(${i}, true)">Present</button>
          <button class="btn" onclick="markAttendance(${i}, false)">Absent</button>
        </div>
      `;
      studentList.appendChild(div);
    });
  }

  // Attendance marking
  window.markAttendance = (index, present) => {
    if (present) students[index].present++;
    else students[index].absent++;
    alert(${students[index].name} marked as ${present ? 'Present' : 'Absent'});
  };

  // Search functionality
  searchBtn.onclick = () => {
    const name = searchInput.value.trim().toLowerCase();
    const student = students.find(s => s.name.toLowerCase().includes(name));
    if (student) {
      searchResult.innerHTML = `
        <p><strong>${student.name}</strong></p>
        <p>✅ Present Days: ${student.present}</p>
        <p>❌ Absent Days: ${student.absent}</p>
      `;
    } else {
      searchResult.textContent = 'No student found';
    }
  };
});