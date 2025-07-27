
// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Menu toggle
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}

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

// Slideshow for gallery & certificates every 2 seconds
function startImageSlideshow(sectionId) {
  const container = document.querySelector(`#${sectionId} .gallery`);
  const images = container.querySelectorAll('img');
  let current = 0;
  setInterval(() => {
    images.forEach((img, i) => {
      img.style.display = (i === current) ? 'block' : 'none';
    });
    current = (current + 1) % images.length;
  }, 2000);
}
startImageSlideshow('gallery');
startImageSlideshow('certificates');
