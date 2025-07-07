// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}

// Photo gallery slideshow
const galleryImages = [
  "https://umarbellotafida.github.io/profile.webp",
  "https://umarbellotafida.github.io/office%20national%20forws.webp",
  "https://umarbellotafida.github.io/umar.webp",
  "https://umarbellotafida.github.io/umar1.webp",
  "https://umarbellotafida.github.io/tafida.webp",
  "https://umarbellotafida.github.io/umar2.webp"
];

let galleryIndex = 0;
function updateGallery() {
  const galleryContainer = document.querySelector("#gallery-slideshow img");
  galleryContainer.src = galleryImages[galleryIndex];
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
}

// Certificates slideshow
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

let certIndex = 0;
function updateCertificates() {
  const certContainer = document.querySelector("#certificates-slideshow img");
  certContainer.src = certificateImages[certIndex];
  certIndex = (certIndex + 1) % certificateImages.length;
}

// Start slideshows
setInterval(updateGallery, 2000);       // change every 2 seconds
setInterval(updateCertificates, 2000);  // change every 2 seconds

// Initialize immediately
updateGallery();
updateCertificates();