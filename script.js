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

// Clock Functionality
function updateClock() {
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
}

// Initialize Slideshows
function initSlideshows() {
  const slideshows = [
    { container: '.gallery-container', slideshow: '.gallery-slideshow', nav: '.gallery-nav' },
    { container: '.certificates-container', slideshow: '.certificates-slideshow', nav: '.certificates-nav' }
  ];

  slideshows.forEach(({container, slideshow, nav}) => {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const slides = containerEl.querySelectorAll(`${slideshow} img`);
    if (slides.length <= 1) return;

    const navEl = containerEl.querySelector(nav);
    let currentIndex = 0;
    let timer;

    // Create navigation dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = nav.slice(1); // Remove the dot from class name
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetTimer();
      });
      navEl.appendChild(dot);
    });

    const dots = navEl.querySelectorAll('button');

    function goToSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      currentIndex = (index + slides.length) % slides.length;
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startTimer() {
      timer = setInterval(nextSlide, 2000); // 2 second interval
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    // Initialize
    slides[0].classList.add('active');
    if (dots.length > 0) dots[0].classList.add('active');
    startTimer();

    // Pause on hover
    containerEl.addEventListener('mouseenter', () => clearInterval(timer));
    containerEl.addEventListener('mouseleave', startTimer);
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000); // Update clock every second
  initSlideshows();
});

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