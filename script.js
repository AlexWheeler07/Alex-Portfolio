// --- Original Function ---
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// --- ADDED: Dark/Light Mode Toggle ---
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const body = document.body;
const moonIconSrc = "./assets/moon.png";
const sunIconSrc = "./assets/sun.png";

// Function to set theme and save preference
function setTheme(isDark) {
  if (isDark) {
    body.classList.add("dark-theme");
    themeToggle.src = sunIconSrc;
    themeToggleMobile.src = sunIconSrc;
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    themeToggle.src = moonIconSrc;
    themeToggleMobile.src = moonIconSrc;
    localStorage.setItem("theme", "light");
  }
}

// Event listener for the toggle buttons
function handleThemeToggle() {
    const isDark = !body.classList.contains("dark-theme");
    setTheme(isDark);
}

themeToggle.addEventListener("click", handleThemeToggle);
themeToggleMobile.addEventListener("click", handleThemeToggle);


// Check for saved theme preference on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setTheme(true);
  } else {
    setTheme(false); // Default to light
  }
});


// --- ADDED: Contact Modal Logic ---
const modal = document.getElementById("contact-modal");
const openModalBtn = document.getElementById("open-contact-modal");
const closeModalBtn = document.querySelector(".close-button");
const contactForm = document.getElementById("contact-form");

openModalBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("open");
  }
});

// --- ADDED: EmailJS Logic ---
(function () {
  // Replace with your public key
  emailjs.init({
    publicKey: "Tv8O_WJKI2j2uNgH6",
  });
})();

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const sendButton = this.querySelector('button[type="submit"]');
  sendButton.textContent = 'Sending...';
  sendButton.disabled = true;

  // Replace with your Service ID and Template ID
  const serviceID = "service_j70253e";
  const templateID = "template_iva0usb";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      sendButton.textContent = 'Send';
      sendButton.disabled = false;
      alert("Message sent successfully!");
      modal.classList.remove("open"); // Close modal on success
      contactForm.reset(); // Clear the form
    },
    (err) => {
      sendButton.textContent = 'Send';
      sendButton.disabled = false;
      alert("Failed to send message. Error: " + JSON.stringify(err));
    }
  );
});