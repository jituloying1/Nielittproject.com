document.addEventListener('DOMContentLoaded', () => {
  // Generate payment QR
  new QRCode(document.getElementById("qrcode"), {
    text: "upi://pay?pa=7896220943@upi&pn=Jitu Loying&am=1000&cu=INR",
    width: 150,
    height: 150
  });

  const form = document.getElementById('admissionForm');
  const previewModal = document.getElementById('previewModal');
  const previewContent = document.getElementById('previewContent');
  const closeModal = document.querySelector('.close');
  const confirmSubmit = document.getElementById('confirmSubmit');

  // Load draft data
  const draft = JSON.parse(localStorage.getItem('admissionDraft'));
  if (draft) {
    for (let key in draft) {
      if (form.elements[key]) form.elements[key].value = draft[key];
    }
  }

  // Save draft
  document.getElementById('saveDraft').addEventListener('click', () => {
    const data = {};
    [...form.elements].forEach(el => {
      if (el.name) data[el.name] = el.value;
    });
    localStorage.setItem('admissionDraft', JSON.stringify(data));
    alert("Draft saved successfully!");
  });

  // Preview
  document.getElementById('previewForm').addEventListener('click', () => {
    previewContent.innerHTML = "";
    [...form.elements].forEach(el => {
      if (el.name && el.type !== 'file') {
        previewContent.innerHTML += <p><strong>${el.name}:</strong> ${el.value}</p>;
      }
    });
    previewModal.style.display = "flex";
  });

  closeModal.onclick = () => previewModal.style.display = "none";

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert("Thank you Loying Developer! Your form has been submitted successfully.");
    localStorage.removeItem('admissionDraft');
    window.location.href = "thankyou.html";
  });

  confirmSubmit.addEventListener('click', () => {
    previewModal.style.display = "none";
    alert("Thank you Loying Developer! Your form has been submitted successfully.");
  });
});