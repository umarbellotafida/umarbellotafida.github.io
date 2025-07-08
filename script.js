// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}

// Image slider (photos + certificates)
const sliderImages = [
  // Gallery images
  'https://umarbellotafida.github.io/profile.webp',
  'https://umarbellotafida.github.io/office%20national%20forws.webp',
  'https://umarbellotafida.github.io/umar.webp',
  'https://umarbellotafida.github.io/umar1.webp',
  'https://umarbellotafida.github.io/tafida.webp',
  'https://umarbellotafida.github.io/umar2.webp',
  // Certificates
  'https://umarbellotafida.github.io/sug.webp',
  'https://umarbellotafida.github.io/cisco.webp',
  'https://umarbellotafida.github.io/networking.webp',
  'https://umarbellotafida.github.io/cybersecurity.webp',
  'https://umarbellotafida.github.io/accpro.webp',
  'https://umarbellotafida.github.io/software.webp',
  'https://umarbellotafida.github.io/sra.webp',
  'https://umarbellotafida.github.io/acc.webp'
];

let currentImageIndex = 0;
const sliderElement = document.getElementById('slider');

function changeImage() {
  sliderElement.src = sliderImages[currentImageIndex];
  currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
}

// Start slider every 2 seconds
setInterval(changeImage, 2000);
changeImage(); // initial load

// Clock & date (Nigeria)
function updateClock() {
  const now = new Date();
  const optionsTime = { timeZone: 'Africa/Lagos', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const optionsDate = { timeZone: 'Africa/Lagos', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-NG', optionsTime);
  document.getElementById('date').textContent = now.toLocaleDateString('en-NG', optionsDate);
}

setInterval(updateClock, 1000);
updateClock();