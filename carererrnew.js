document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('jobFormModal');
  const closeBtn = document.querySelector('.close-btn');
  const applyButtons = document.querySelectorAll('.apply-btn');
  const jobTitleInput = document.getElementById('jobTitle');
  const form = document.getElementById('applicationForm');
  const successMsg = document.getElementById('successMsg');

  // Open modal on Apply button click
  applyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const job = btn.getAttribute('data-job');
      jobTitleInput.value = job;
      modal.style.display = 'flex';
      successMsg.textContent = '';
    });
  });

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.textContent = "✅ Your application has been submitted successfully!";
    form.reset();
    setTimeout(() => {
      modal.style.display = 'none';
    }, 2000);
  });
});