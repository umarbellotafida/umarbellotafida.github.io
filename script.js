// script.js
// Gallery images
const galleryImages = [
  "https://umarbellotafida.github.io/profile.webp",
  "https://umarbellotafida.github.io/office%20national%20forws.webp",
  "https://umarbellotafida.github.io/umar.webp",
  "https://umarbellotafida.github.io/umar1.webp",
  "https://umarbellotafida.github.io/tafida.webp",
  "https://umarbellotafida.github.io/umar2.webp"
];

// Certificate images
const certificateImages = [
  "https://umarbellotafida.github.io/sug.webp",
  "https://umarbellotafida.github.io/cisco.webp",
  "https://umarbellotafida.github.io/networking.webp",
  "https://umarbellotafida.github.io/cybersecurity.webp",
  "https://umarbellotafida.github.io/accpro.webp",
  "https://umarbellotafida.github.io/software.webp",
  "https://umarbellotafida.github.io/sra.webp",
  "https://umarbellotafida.github.io/acc.webp"
];

let galleryIndex = 0;
let certificateIndex = 0;

// Show next gallery image
function showNextGalleryImage() {
  const img = document.querySelector("#gallery-slideshow img");
  img.src = galleryImages[galleryIndex];
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
}

// Show next certificate image
function showNextCertificateImage() {
  const img = document.querySelector("#certificates-slideshow img");
  img.src = certificateImages[certificateIndex];
  certificateIndex = (certificateIndex + 1) % certificateImages.length;
}

// Start slideshows every 2 seconds
setInterval(showNextGalleryImage, 2000);
setInterval(showNextCertificateImage, 2000);
showNextGalleryImage();
showNextCertificateImage();

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

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Menu toggle
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}