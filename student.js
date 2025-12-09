function loadStudents() {
  google.script.run.withSuccessHandler(displayStudents).getStudents();
}

function displayStudents(data) {
  const rankedContainer = document.getElementById('rankedStudents');
  const careerContainer = document.getElementById('careerList');
  const allContainer = document.getElementById('studentList');

  rankedContainer.innerHTML = '';
  careerContainer.innerHTML = '';
  allContainer.innerHTML = '';

  data.forEach(stu => {
    const card = `
      <div class="student-card">
        <img src="${stu.photo}" alt="${stu.name}">
        <h4>${stu.name}</h4>
        <p><strong>Class:</strong> ${stu.class}</p>
        <p><strong>Rank:</strong> ${stu.rank}</p>
        <p>${stu.about}</p>
      </div>
    `;

    if (stu.rank && (stu.rank.includes('State') || stu.rank.includes('District') || stu.rank.includes('Top') || stu.rank.includes('Distinction'))) {
      rankedContainer.innerHTML += card;
    } else if (stu.career && (stu.career.includes('Doctor') || stu.career.includes('Engineer') || stu.career.includes('Professor'))) {
      careerContainer.innerHTML += card;
    }

    allContainer.innerHTML += card;
  });
}

function filterStudents() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.student-card');
  cards.forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
}

window.onload = loadStudents;