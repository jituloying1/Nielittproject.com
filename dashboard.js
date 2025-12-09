document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const form = document.getElementById('feedbackForm');
  const feedbackList = document.getElementById('feedbackList');
  let selectedRating = 0;

  // Load existing comments
  const stored = JSON.parse(localStorage.getItem('feedbackData')) || [];
  renderFeedback(stored);

  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = star.dataset.value;
      stars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add('selected');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const comment = document.getElementById('userComment').value.trim();
    if (!selectedRating) return alert('Please select a rating');

    const feedback = { name, comment, rating: selectedRating, date: new Date().toLocaleString() };
    stored.push(feedback);
    localStorage.setItem('feedbackData', JSON.stringify(stored));
    renderFeedback(stored);
    form.reset();
    stars.forEach(s => s.classList.remove('selected'));
    selectedRating = 0;
  });

  function renderFeedback(data) {
    feedbackList.innerHTML = "<h3>Recent Comments</h3>";
    data.slice().reverse().forEach(fb => {
      feedbackList.innerHTML += `
        <div class="feedback-item">
          <strong>${fb.name}</strong> <em>(${fb.date})</em><br>
          ${'⭐'.repeat(fb.rating)}<br>
          ${fb.comment}
        </div>
      `;
    });
  }
});