 
    const studentData = JSON.parse(localStorage.getItem("studentData"));
    if (studentData) {
      document.getElementById("studentInfo").innerHTML = `
        <img src="${studentData.photo}" alt="Student Photo" width="150">
        <h3>${studentData.name}</h3>
        <p>Rank: ${studentData.rank}</p>
      `;
    } else {
      document.getElementById("studentInfo").innerText = "No student data found!";
    }

    // Handle placement application
    function applyPlacement(position) {
      if (!studentData) {
        alert("No student logged in!");
        return;
      }
      const applied = {
        name: studentData.name,
        rank: studentData.rank,
        position: position,
        date: new Date().toLocaleString()
      };
      let applications = JSON.parse(localStorage.getItem("placementApplications")) || [];
      applications.push(applied);
 let applications = JSON.parse(localStorage.getItem("placementApplications")) || [];
      applications.push(applied);
      localStorage.setItem("placementApplications", JSON.stringify(applications));

      document.getElementById("appliedMsg").innerText = 
        ✅ You have successfully applied for "${position}";
    }