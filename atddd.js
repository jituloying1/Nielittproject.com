// script.js - Attendance + Admin login with localStorage persistence
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const attendanceBtn = document.getElementById('attendanceBtn');
  const resultsBtn = document.getElementById('resultsBtn');
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const loginModal = document.getElementById('loginModal');
  const modalMessage = document.getElementById('modalMessage');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const modalClose = document.querySelector('.modal-close');

  const attendancePage = document.getElementById('attendancePage');
  const resultPage = document.getElementById('resultPage');
  const homeSection = document.getElementById('homeSection');

  const addStudentForm = document.getElementById('addStudentForm');
  const newStudentName = document.getElementById('newStudentName');
  const studentListEl = document.getElementById('studentList');

  const searchInput = document.getElementById('searchStudent');
  const searchBtn = document.getElementById('searchBtn');
  const searchResult = document.getElementById('searchResult');

  // Admin credentials (simple demo)
  const ADMIN_ID = 'Admin7896';
  const ADMIN_PASS = 'Admin7896';

  // current section to open after login: 'attendance' or 'results'
  let currentSection = null;

  // Load or initialize student data in localStorage
  // structure: [{ id: 'uuid', name: 'Name', present: 0, absent: 0 }]
  function loadStudents() {
    try {
      const raw = localStorage.getItem('abc_students_v1');
      if (!raw) {
        const defaultStudents = [
          { id: genId(), name: 'Rahul Sharma', present: 15, absent: 2 },
          { id: genId(), name: 'Priya Das', present: 14, absent: 3 },
          { id: genId(), name: 'Arjun Patel', present: 16, absent: 1 }
        ];
        localStorage.setItem('abc_students_v1', JSON.stringify(defaultStudents));
        return defaultStudents;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load students', e);
      return [];
    }
  }

  function saveStudents(list) {
    localStorage.setItem('abc_students_v1', JSON.stringify(list));
  }

  function genId() {
    return 's_' + Math.random().toString(36).slice(2, 9);
  }

  let students = loadStudents();

  // Helper: show modal with custom message
  function openLoginModal(message, section) {
    modalMessage.textContent = message || 'Admin access required';
    currentSection = section || null;
    loginModal.setAttribute('aria-hidden', 'false');
  }
  function closeLoginModal() {
    loginModal.setAttribute('aria-hidden', 'true');
  }

  // Show pages
  function showSection(section) {
    homeSection.classList.add('hidden');
    if (section === 'attendance') {
      attendancePage.classList.remove('hidden');
      resultPage.classList.add('hidden');
      renderStudents();
    } else if (section === 'results') {
      resultPage.classList.remove('hidden');
      attendancePage.classList.add('hidden');
    } else {
      // default home
      attendancePage.classList.add('hidden');
      resultPage.classList.add('hidden');
      homeSection.classList.remove('hidden');
    }
  }

  // Mark present/absent
  function markAttendance(id, present) {
    const idx = students.findIndex(s => s.id === id);
    if (idx === -1) return;
    if (present) students[idx].present = (students[idx].present || 0) + 1;
    else students[idx].absent = (students[idx].absent || 0) + 1;
    saveStudents(students);
    renderStudents();
    // small toast
    alert(${students[idx].name} marked ${present ? 'Present' : 'Absent'}.);
  }

  // Render student list
  function renderStudents() {
    studentListEl.innerHTML = '';
    if (!students.length) {
      studentListEl.innerHTML = '<div class="info">No students found. Add students above.</div>';
      return;
    }
    students.forEach((s, i) => {
      const item = document.createElement('div');
      item.className = 'student-item';
      item.innerHTML = `
        <div>
          <div class="student-name">${i + 1}. ${escapeHtml(s.name)}</div>
          <div class="small">Present: ${s.present || 0} • Absent: ${s.absent || 0}</div>
        </div>
        <div class="attendance-controls">
          <button class="present-btn" data-id="${s.id}" data-action="present">Present</button>
          <button class="absent-btn" data-id="${s.id}" data-action="absent">Absent</button>
        </div>
      `;
      studentListEl.appendChild(item);
    });
  }

  // Simple escape to avoid HTML injection in names
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"'`=\/]/g, function (s) {
      return ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
        "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
      })[s];
    });
  }

  // Search handler
  function handleSearch() {
    const q = (searchInput.value || '').trim().toLowerCase();
    if (!q) {
      searchResult.innerHTML = '<div class="info">Type a student name (or part of it) and click Search.</div>';
      return;
    }
    const found = students.filter(s => s.name.toLowerCase().includes(q));
    if (!found.length) {
      searchResult.innerHTML = '<div class="info">No student found with that name.</div>';
      return;
    }
    const out = found.map(s => <div><strong>${escapeHtml(s.name)}</strong><div>✅ Present: ${s.present||0} • ❌ Absent: ${s.absent||0}</div></div>).join('<hr>');
    searchResult.innerHTML = out;
  }

  // Admin "session" helper (very simple demo-level)
  function setAdminSession() {
    // use session storage so it clears on browser close
    sessionStorage.setItem('abc_admin_logged', '1');
  }
  function isAdminLogged() {
    return sessionStorage.getItem('abc_admin_logged') === '1';
  }

  // Event listeners wiring

  attendanceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdminLogged()) {
      showSection('attendance');
      return;
    }
    openLoginModal('This section is only allowed for School Admin Department', 'attendance');
  });

  resultsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdminLogged()) {
      showSection('results');
      return;
    }
    openLoginModal('This section is only allowed for School Admin Department', 'results');
  });

  adminLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal('Admin login (use provided credentials)');
  });

  modalClose.addEventListener('click', closeLoginModal);
  loginModal.addEventListener('click', (ev) => {
    if (ev.target === loginModal) closeLoginModal();
  });

  // Admin login submit
  adminLoginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const id = document.getElementById('adminId').value.trim();
    const pass = document.getElementById('adminPass').value;
    if (id === ADMIN_ID && pass === ADMIN_PASS) {
      setAdminSession();
      closeLoginModal();
      // clear fields
      adminLoginForm.reset();
      // show chosen section or home
      if (currentSection === 'attendance') showSection('attendance');
      else if (currentSection === 'results') showSection('results');
      else showSection(); // home
    } else {
      alert('Invalid Admin ID or Password');
    }
  });

  // Add student
  addStudentForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = (newStudentName.value || '').trim();
    if (!name) return;
    const newS = { id: genId(), name, present: 0, absent: 0 };
    students.push(newS);
    saveStudents(students);
    newStudentName.value = '';
    renderStudents();
  });

  // Delegate attendance button clicks
  studentListEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    if (id && action) {
      markAttendance(id, action === 'present');
    }
  });

  // Search
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleSearch();
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  });

  // initial render
  renderStudents();
});