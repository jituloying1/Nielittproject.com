// Load student info safely
let studentData = {};
try {
  studentData = JSON.parse(localStorage.getItem("studentData")) || null;
} catch (e) {
  studentData = null;
}

if (studentData && studentData.name) {
  document.getElementById("studentInfo").innerHTML = `
    <img src="${studentData.photo}" alt="Student Photo">
    <h3>${studentData.name}</h3>
    <p>Rank: ${studentData.rank}</p>
  `;
} else {
  document.getElementById("studentInfo").innerText =
    "⚠ No student data found! Please add a student from Admin Dashboard first.";
}

// Apply placement function
function applyPlacement(position) {
  if (!studentData) {
    alert("No student logged in!");
    return;
  }

  const applied = {
    name: studentData.name,
    rank: studentData.rank,
    position: position,
    date: new Date().toLocaleString(),
  };

  let applications =
    JSON.parse(localStorage.getItem("placementApplications")) || [];

  // Prevent duplicate applications
  const alreadyApplied = applications.find(
    (app) => app.name === applied.name && app.position === applied.position
  );

  if (alreadyApplied) {
    document.getElementById("appliedMsg").innerText = ⚠ You have already applied for "${position}".;
    return;
  }

  applications.push(applied);
  localStorage.setItem("placementApplications", JSON.stringify(applications));

  document.getElementById("appliedMsg").innerText =
    ✅ You have successfully applied for "${position}";
}