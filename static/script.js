document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const formMessage = document.getElementById("formMessage");

  formMessage.textContent = `Thanks, ${name}! Your message has been received in HomeCare site.`;
  this.reset();
});
