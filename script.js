// Computer Engineering Portfolio JS
document.addEventListener('DOMContentLoaded', () => {
  try {
    initDarkMode();
    initMenu();
    initClock();
    initTypewriter();
    initImageSlideshows();
    initCurrentYear();
    initProjectCards();
    initContactForm();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Dark Mode Toggle with Local Storage
function initDarkMode() {
  const toggleBtn = document.querySelector('.toggle-btn');
  if (!toggleBtn) return;

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

// Mobile Menu Toggle with Accessibility
function initMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (!menuToggle || !menu) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
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

// Nigerian Timezone Clock
function initClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return;

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
    
    clockElement.textContent = now.toLocaleString('en-NG', options);
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// Terminal Typewriter Effect
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
        setTimeout(() => {
          isPaused = false;
          type();
        }, 500);
      }
    } else {
      terminal.innerHTML = `> ${currentMessage.substring(0, j++)}_`;
      if (j > currentMessage.length) {
        isDeleting = true;
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          type();
        }, 2000);
        return;
      }
    }
    
    const speed = isDeleting ? 50 : Math.random() * 50 + 50;
    setTimeout(type, speed);
  }
  
  // Start with a delay
  setTimeout(type, 1000);
}

// Image Slideshows with Touch Support
function initImageSlideshows() {
  const slideshows = [
    { container: '.gallery-container', slider: '.gallery-slideshow', nav: '.gallery-nav', interval: 2000 },
    { container: '.certificates-container', slider: '.certificates-slideshow', nav: '.certificates-nav', interval: 2000 }
  ];

  slideshows.forEach(({ container, slider, nav, interval }) => {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const sliderEl = containerEl.querySelector(slider);
    const images = Array.from(sliderEl?.querySelectorAll('img') || []);
    if (images.length <= 1) return;

    const navEl = containerEl.querySelector(nav);
    let currentIndex = 0;
    let timer;

    // Create navigation dots
    if (images.length > 1 && navEl && navEl.children.length === 0) {
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

    const dots = Array.from(navEl?.children || []);
    
    const goToSlide = (index) => {
      // Wrap around if at ends
      if (index >= images.length) index = 0;
      if (index < 0) index = images.length - 1;

      // Update active classes
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
      
      if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }

      currentIndex = index;
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(nextSlide, interval);
    };

    // Initialize first slide
    goToSlide(0);
    startTimer();

    // Pause on hover
    containerEl.addEventListener('mouseenter', () => clearInterval(timer));
    containerEl.addEventListener('mouseleave', startTimer);

    // Touch support for mobile
    let touchStartX = 0;
    containerEl.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(timer);
    }, { passive: true });

    containerEl.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (diff > 50) nextSlide(); // Swipe left
      if (diff < -50) goToSlide(currentIndex - 1); // Swipe right
      
      startTimer();
    }, { passive: true });
  });
}

// Update Copyright Year
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Project Card Hover Effects
function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    const links = card.querySelector('.project-links');
    if (!links) return;
    
    // Initialize state
    links.style.opacity = '0';
    links.style.transform = 'translateY(10px)';
    links.style.transition = 'all 0.3s ease';
    
    card.addEventListener('mouseenter', () => {
      links.style.opacity = '1';
      links.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', () => {
      links.style.opacity = '0';
      links.style.transform = 'translateY(10px)';
    });
  });
}

// Contact Form Handling
function initContactForm() {
  const form = document.getElementById('supportForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
      timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    console.log('Technical Inquiry:', formData);
    
    // Show engineering-themed alert
    const alertMsg = `🚀 Message received!\n\nI'll respond to your ${formData.subject.replace(/([A-Z])/g, ' $1').trim()} inquiry within 24 hours.`;
    alert(alertMsg);
    
    // Reset form with animation
    this.style.opacity = '0.5';
    setTimeout(() => {
      this.reset();
      this.style.opacity = '1';
    }, 500);
  });
}