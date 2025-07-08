// Toggle menu for mobile
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Update clock & date every second
function updateClock() {
  const now = new Date();
  const optionsTime = { timeZone: 'Africa/Lagos', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const optionsDate = { timeZone: 'Africa/Lagos', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-NG', optionsTime);
  document.getElementById('date').textContent = now.toLocaleDateString('en-NG', optionsDate);
}
setInterval(updateClock, 1000);
updateClock();

// Hero image slideshow every 2 seconds
const heroImages = [
  "https://umarbellotafida.github.io/profile.webp",
  "https://umarbellotafida.github.io/umar.webp",
  "https://umarbellotafida.github.io/umar1.webp",
  "https://umarbellotafida.github.io/tafida.webp",
  "https://umarbellotafida.github.io/umar2.webp"
];
let currentImage = 0;
setInterval(() => {
  currentImage = (currentImage + 1) % heroImages.length;
  document.getElementById('hero-photo').src = heroImages[currentImage];
}, 2000);