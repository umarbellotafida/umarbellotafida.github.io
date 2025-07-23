// Computer Engineering Portfolio JS
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initDarkMode();
  initMenu();
  initClock();
  initTypewriter();
  initImageSlideshows();
  initCurrentYear();
  initProjectCards();
  initSupportForm();
});

// Enhanced Dark Mode with Local Storage
function initDarkMode() {
  const toggleBtn = document.querySelector('.toggle-btn');
  if (!toggleBtn) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedMode = localStorage.getItem('portfolio-theme');
  
  // Set initial mode
  if (storedMode === 'dark' || (!storedMode && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.innerHTML = isDark 
      ? '<i class="fas fa-sun"></i> Light Mode' 
      : '<i class="fas fa-moon"></i> Dark Mode';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  });
}

// Improved Menu Toggle with Accessibility
function initMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (!menuToggle || !menu) return;
  
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = menu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    menuToggle.innerHTML = isExpanded 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== menuToggle) {
      menu.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// Single Clock Implementation with Nigerian Timezone
function initClock() {
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');
  if (!clockElement || !dateElement) return;

  const updateClock = () => {
    try {
      const now = new Date();
      const options = { 
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      };
      
      clockElement.textContent = now.toLocaleTimeString('en-NG', options);
      dateElement.textContent = now.toLocaleDateString('en-NG', options);
    } catch (error) {
      console.error("Clock error:", error);
      // Fallback if timezone fails
      const now = new Date();
      clockElement.textContent = now.toLocaleTimeString();
      dateElement.textContent = now.toLocaleDateString();
    }
  };
  
  updateClock();
  setInterval(updateClock, 1000);
}

// Engineering Terminal Typewriter Effect
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
  
  let i = 0;
  let j = 0;
  let currentMessage = '';
  let isDeleting = false;
  let isPaused = false;

  function type() {
    if (isPaused) return;
    
    currentMessage = messages[i];
    
    if (isDeleting) {
      terminal.textContent = `> ${currentMessage.substring(0, j--)}_`;
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
      terminal.textContent = `> ${currentMessage.substring(0, j++)}_`;
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
    
    setTimeout(type, isDeleting ? 50 : Math.random() * 50 + 50);
  }
  
  setTimeout(type, 1000);
}

// Modern Image Gallery with Controls
function initImageSlideshows() {
  document.querySelectorAll('.gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    if (images.length <= 1) return;
    
    let current = 0;
    let timer;
    
    const showImage = (index) => {
      images.forEach((img, i) => img.style.display = i === index ? 'block' : 'none');
      current = index;
    };
    
    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => showImage((current + 1) % images.length), 3000);
    };
    
    showImage(0);
    startTimer();
    
    // Pause on hover
    gallery.addEventListener('mouseenter', () => clearInterval(timer));
    gallery.addEventListener('mouseleave', startTimer);
  });
}

// Update copyright year automatically
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// Interactive Project Cards
function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    const links = card.querySelector('.project-links');
    if (!links) return;
    
    links.style.transition = 'all 0.3s ease';
    links.style.opacity = '0';
    links.style.transform = 'translateY(10px)';
    
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

// Support Form Handling
function initSupportForm() {
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
    
    console.log('Form submission:', formData);
    alert(`Thank you for your ${formData.subject} inquiry! I'll respond soon.`);
    this.reset();
  });
}