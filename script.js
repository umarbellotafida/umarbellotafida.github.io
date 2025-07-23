// Computer Engineering Portfolio JS
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initDarkMode();
  initMenu();
  initClock(); // Single clock
  initTypewriter();
  initImageSlideshows(); // 2-second slideshows
  initCurrentYear();
  initProjectCards();
});

// Dark Mode Toggle
function initDarkMode() {
  const toggleBtn = document.querySelector('.toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedMode = localStorage.getItem('portfolio-theme');
  
  // Set initial mode
  if (storedMode === 'dark' || (!storedMode && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? 'Light Mode' : 'Terminal Mode';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  });
}

// Mobile Menu Toggle
function initMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    menuToggle.textContent = isExpanded ? '✕' : '☰';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== menuToggle) {
      menu.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }
  });
}

// Single Clock Display
function initClock() {
  const updateClock = () => {
    const now = new Date();
    const options = { 
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    
    document.getElementById('clock').textContent = now.toLocaleString('en-NG', options);
  };
  
  updateClock();
  setInterval(updateClock, 1000);
}

// Typewriter Effect
function initTypewriter() {
  const terminal = document.getElementById('typewriter');
  if (!terminal) return;
  
  const messages = [
    "> Welcome to Engr. Umar Bello Tafida, CCNA, CISSP",
    "> Loading cybersecurity modules...",
    "> Initializing AI research projects...",
    "> Booting embedded systems...",
    "> Systems operational. Ready for commands."
  ];
  
  let i = 0, j = 0, currentMessage = '', isDeleting = false, isPaused = false;

  function type() {
    if (isPaused) return;
    
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
  
  setTimeout(type, 1000);
}

// Image Slideshows with 2-second interval
function initImageSlideshows() {
  const galleries = [
    { id: 'gallery', interval: 2000 },
    { id: 'certificates', interval: 2000 }
  ];
  
  galleries.forEach(({ id, interval }) => {
    const container = document.querySelector(`#${id} .gallery`);
    if (!container) return;
    
    const images = Array.from(container.querySelectorAll('img'));
    if (images.length <= 1) return;
    
    let current = 0;
    let timer;
    
    const showImage = (index) => {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
      current = index;
      updateDots();
    };
    
    const nextImage = () => showImage((current + 1) % images.length);
    
    // Navigation dots
    const nav = document.createElement('div');
    nav.className = 'gallery-nav';
    
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot';
      dot.addEventListener('click', () => {
        clearInterval(timer);
        showImage(i);
        startTimer();
      });
      nav.appendChild(dot);
    });
    
    container.parentNode.insertBefore(nav, container.nextSibling);
    
    const updateDots = () => {
      const dots = nav.querySelectorAll('.gallery-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };
    
    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(nextImage, interval);
    };
    
    // Initialize
    images[0].classList.add('active');
    startTimer();
    
    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', startTimer);
  });
}

// Copyright Year
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// Project Card Hover Effects
function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    const links = card.querySelector('.project-links');
    if (!links) return;
    
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
  });
}

// Contact Form
document.getElementById('supportForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    email: this.email.value,
    subject: this.subject.value,
    message: this.message.value,
    timestamp: new Date().toISOString()
  };
  
  console.log('Form submission:', formData);
  alert(`🚀 Message received!\n\nI'll respond to your inquiry within 24 hours.`);
  
  this.style.opacity = '0.5';
  setTimeout(() => {
    this.reset();
    this.style.opacity = '1';
  }, 500);
});