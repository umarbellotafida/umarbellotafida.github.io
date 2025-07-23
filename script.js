// Computer Engineering Portfolio JS

document.addEventListener('DOMContentLoaded', () => { initDarkMode(); initMenu(); initClock(); initTypewriter(); initImageSlideshows(); initCurrentYear(); initProjectCards(); });

function initDarkMode() { const toggleBtn = document.querySelector('.toggle-btn'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const storedMode = localStorage.getItem('portfolio-theme');

if (storedMode === 'dark' || (!storedMode && prefersDark)) { document.body.classList.add('dark-mode'); toggleBtn.textContent = 'Light Mode'; }

toggleBtn.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); const isDark = document.body.classList.contains('dark-mode'); toggleBtn.textContent = isDark ? 'Light Mode' : 'Terminal Mode'; localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light'); }); }

function initMenu() { const menuToggle = document.querySelector('.menu-toggle'); const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => { const isExpanded = menu.classList.toggle('show'); menuToggle.setAttribute('aria-expanded', isExpanded); menuToggle.textContent = isExpanded ? '✕' : '☰'; });

document.addEventListener('click', (e) => { if (!menu.contains(e.target) && e.target !== menuToggle) { menu.classList.remove('show'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰'; } }); }

function initClock() { const updateClock = () => { const now = new Date(); const options = { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, weekday: 'short', month: 'short', day: 'numeric' };

document.getElementById('clock').textContent = now.toLocaleString('en-NG', options);

};

updateClock(); setInterval(updateClock, 1000); }

function initTypewriter() { const terminal = document.getElementById('typewriter'); if (!terminal) return;

const messages = [ "> Welcome to Engr. Umar Bello Tafida, CCNA, CISSP", "> Loading cybersecurity modules...", "> Initializing AI research projects...", "> Booting embedded systems...", "> Systems operational. Ready for commands." ];

let i = 0, j = 0, currentMessage = '', isDeleting = false, isPaused = false;

function type() { if (isPaused) return;

currentMessage = messages[i];

if (isDeleting) {
  terminal.innerHTML = `> ${currentMessage.substring(0, j--)}_`;
  if (j < 0) {
    isDeleting = false;
    i = (i + 1) % messages.length;
    isPaused = true;
    setTimeout(() => { isPaused = false; type(); }, 500);
  }
} else {
  terminal.innerHTML = `> ${currentMessage.substring(0, j++)}_`;
  if (j > currentMessage.length) {
    isDeleting = true;
    isPaused = true;
    setTimeout(() => { isPaused = false; type(); }, 2000);
    return;
  }
}

setTimeout(type, isDeleting ? 50 : Math.random() * 50 + 50);

}

setTimeout(type, 1000); }

function initImageSlideshows() { const slideshows = [ { container: '.gallery-container', slider: '.gallery', nav: '.gallery-nav', interval: 2000 }, { container: '.certificates-container', slider: '.certificates', nav: '.certificates-nav', interval: 2000 } ];

slideshows.forEach(({ container, slider, nav, interval }) => { const containerEl = document.querySelector(container); if (!containerEl) return;

const sliderEl = containerEl.querySelector(slider);
const images = Array.from(sliderEl.querySelectorAll('img'));
if (images.length <= 1) return;

const navEl = containerEl.querySelector(nav);
let currentIndex = 0;
let timer;

if (images.length > 1 && navEl.children.length === 0) {
  images.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = slider.includes('gallery') ? 'gallery-dot' : 'certificates-dot';
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetTimer();
    });
    navEl.appendChild(dot);
  });
}

const dots = Array.from(navEl.children);
images[0].classList.add('active');
if (dots.length > 0) dots[0].classList.add('active');

const goToSlide = (index) => {
  if (index >= images.length) index = 0;
  if (index < 0) index = images.length - 1;

  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');

  if (dots.length > 0) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  currentIndex = index;
};

const nextSlide = () => goToSlide(currentIndex + 1);
const prevSlide = () => goToSlide(currentIndex - 1);

const startTimer = () => {
  timer = setInterval(nextSlide, interval);
};

const resetTimer = () => {
  clearInterval(timer);
  startTimer();
};

startTimer();

containerEl.addEventListener('mouseenter', () => clearInterval(timer));
containerEl.addEventListener('mouseleave', startTimer);

let touchStartX = 0;
let touchEndX = 0;

containerEl.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(timer);
}, { passive: true });

containerEl.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  startTimer();
}, { passive: true });

const handleSwipe = () => {
  if (touchEndX < touchStartX - 50) nextSlide();
  if (touchEndX > touchStartX + 50) prevSlide();
};

}); }

function initCurrentYear() { const yearElement = document.getElementById('current-year'); if (yearElement) yearElement.textContent = new Date().getFullYear(); }

function initProjectCards() { document.querySelectorAll('.project-card').forEach(card => { const links = card.querySelector('.project-links'); if (!links) return;

card.addEventListener('mouseenter', () => {
  links.style.opacity = '1';
  links.style.transform = 'translateY(0)';
});

card.addEventListener('mouseleave', () => {
  links.style.opacity = '0';
  links.style.transform = 'translateY(10px)';
});

links.style.opacity = '0';
links.style.transform = 'translateY(10px)';
links.style.transition = 'all 0.3s ease';

}); }

document.getElementById('supportForm')?.addEventListener('submit', function(e) { e.preventDefault();

const formData = { email: this.email.value, subject: this.subject.value, message: this.message.value, timestamp: new Date().toISOString() };

console.log('Form submission:', formData); alert(🚀 Message received!\n\nI'll respond to your inquiry within 24 hours.);

this.style.opacity = '0.5'; setTimeout(() => { this.reset(); this.style.opacity = '1'; }, 500); });

