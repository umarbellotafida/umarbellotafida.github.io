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
  populateContent();
});

// Content Data - Replace with your actual information
const portfolioData = {
  expertise: [
    {
      icon: 'fa-microchip',
      title: 'Computer Systems Engineering',
      items: [
        'Computer Architecture Design',
        'Embedded Systems Development',
        'Network Systems Integration',
        'FPGA Programming'
      ]
    },
    {
      icon: 'fa-shield-alt',
      title: 'Cybersecurity',
      items: [
        'Information Security Management',
        'Network Security Architecture',
        'Penetration Testing',
        'Cryptographic Systems'
      ]
    },
    {
      icon: 'fa-robot',
      title: 'Artificial Intelligence',
      items: [
        'Machine Learning Systems',
        'Computer Vision Applications',
        'Natural Language Processing',
        'Neural Network Optimization'
      ]
    }
  ],
  projects: [
    {
      title: 'Rabah Technician Platform',
      tech: 'Node.js, MongoDB, React, OAuth 2.0',
      description: 'Secure digital payment gateway for rural communities with multi-factor authentication and fraud detection systems',
      codeLink: '#',
      demoLink: '#'
    },
    {
      title: 'Secure Chat Platform',
      tech: 'WebSockets, E2E Encryption, React',
      description: 'Privacy-focused messaging platform with military-grade encryption',
      codeLink: '#',
      demoLink: '#'
    },
    {
      title: 'IoT Agricultural Monitoring',
      tech: 'Raspberry Pi, LoRaWAN, TensorFlow Lite',
      description: 'Edge computing solution for crop monitoring with predictive analytics',
      codeLink: '#',
      demoLink: '#'
    }
  ],
  certifications: [
    {
      image: 'https://umarbellotafida.github.io/cisco.webp',
      title: 'Cisco Certified Network Associate',
      description: 'Specialized in network security and infrastructure protection',
      year: '2020'
    },
    {
      image: 'https://umarbellotafida.github.io/cybersecurity.webp',
      title: 'CISSP Certification',
      description: 'Certified Information Systems Security Professional',
      year: '2019'
    }
  ],
  education: [
    {
      institution: 'Sokoto State University',
      degree: 'BSc Information Technology (In Progress)',
      courses: 'Relevant Courses: Computer Architecture, Network Security, Data Structures, Cryptography'
    },
    {
      institution: 'Alison Online',
      degree: 'Diploma in Certified Information Security System Professional',
      grade: 'Grade: A (2019)'
    },
    {
      institution: 'National Diploma in Computer Science',
      courses: 'Key Studies: Computer Hardware, Programming, Database Systems'
    }
  ],
  gallery: [
    {
      image: 'https://umarbellotafida.github.io/office%20national%20forws.webp',
      caption: 'Presenting technical education proposal'
    },
    {
      image: 'https://umarbellotafida.github.io/cisco.webp',
      caption: 'Cisco Networking Certification'
    },
    {
      image: 'https://umarbellotafida.github.io/cybersecurity.webp',
      caption: 'Cybersecurity Achievement'
    },
    {
      image: 'https://umarbellotafida.github.io/profile.webp',
      caption: 'Professional Profile'
    }
  ]
};

// Populate content from data
function populateContent() {
  // Populate Expertise
  const expertiseGrid = document.querySelector('.expertise-grid');
  portfolioData.expertise.forEach(item => {
    const card = document.createElement('div');
    card.className = 'expertise-card';
    card.innerHTML = `
      <div class="expertise-icon"><i class="fas ${item.icon}"></i></div>
      <h3>${item.title}</h3>
      <ul>
        ${item.items.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    `;
    expertiseGrid.appendChild(card);
  });

  // Populate Projects
  const projectGrid = document.querySelector('.project-cards');
  portfolioData.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p class="tech-stack">Tech: ${project.tech}</p>
      <p>${project.description}</p>
      <div class="project-links">
        <a href="${project.codeLink}" class="code-link">View Code</a>
        <a href="${project.demoLink}" class="demo-link">Case Study</a>
      </div>
    `;
    projectGrid.appendChild(card);
  });

  // Populate Certifications
  const cyberGrid = document.querySelector('.cyber-grid');
  portfolioData.certifications.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'certification-card';
    card.innerHTML = `
      <img src="${cert.image}" alt="${cert.title}">
      <h3>${cert.title}</h3>
      <p>${cert.description}</p>
      <div class="cert-date">${cert.year}</div>
    `;
    cyberGrid.appendChild(card);
  });

  // Populate Education
  const educationTimeline = document.querySelector('.education-timeline');
  portfolioData.education.forEach(edu => {
    const item = document.createElement('div');
    item.className = 'education-item';
    item.innerHTML = `
      <h3>${edu.institution}</h3>
      ${edu.degree ? `<p class="degree">${edu.degree}</p>` : ''}
      ${edu.grade ? `<p class="grade">${edu.grade}</p>` : ''}
      ${edu.courses ? `<p class="courses">${edu.courses}</p>` : ''}
    `;
    educationTimeline.appendChild(item);
  });

  // Populate Gallery
  const galleryGrid = document.querySelector('.gallery-grid');
  portfolioData.gallery.forEach(img => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${img.image}" alt="${img.caption}">
      <p>${img.caption}</p>
    `;
    galleryGrid.appendChild(item);
  });
}

// Enhanced Dark Mode with Local Storage
function initDarkMode() {
  const toggleBtn = document.querySelector('.toggle-btn');
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

// Enhanced Clock with Nigerian Timezone
function initClock() {
  const formatTimeDate = () => {
    const now = new Date();
    const options = { 
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    
    const timeStr = now.toLocaleTimeString('en-NG', options);
    const dateStr = now.toLocaleDateString('en-NG', options);
    
    document.getElementById('clock').innerHTML = `<i class="fas fa-clock"></i> ${timeStr}`;
    document.getElementById('date').innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateStr}`;
  };
  
  formatTimeDate();
  setInterval(formatTimeDate, 1000);
}

// Engineering Terminal Typewriter Effect
function initTypewriter() {
  const terminal = document.getElementById('typewriter');
  if (!terminal) return;
  
  const messages = [
    "> Welcome to Engr. Umar's portfolio",
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

// Modern Image Gallery with Controls
function initImageSlideshows() {
  const galleries = [
    { id: 'gallery', interval: 3000 },
    { id: 'certificates', interval: 4000 }
  ];
  
  galleries.forEach(({ id, interval }) => {
    const container = document.querySelector(`#${id} .gallery`);
    if (!container) return;
    
    const images = Array.from(container.querySelectorAll('img'));
    if (images.length <= 1) return;
    
    let current = 0;
    let timer;
    
    const showImage = (index) => {
      images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
      });
      current = index;
    };
    
    const nextImage = () => {
      showImage((current + 1) % images.length);
    };
    
    // Add navigation controls if more than 3 images
    if (images.length > 3) {
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
      updateDots();
    }
    
    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(nextImage, interval);
    };
    
    const updateDots = () => {
      const dots = container.parentNode.querySelectorAll('.gallery-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    };
    
    // Initialize
    showImage(0);
    startTimer();
    
    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', startTimer);
  });
}

// Update copyright year automatically
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Interactive Project Cards
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
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
    
    // Initialize state
    links.style.opacity = '0';
    links.style.transform = 'translateY(10px)';
    links.style.transition = 'all 0.3s ease';
  });
}

// Public functions for HTML onclick handlers
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const toggleBtn = document.querySelector('.toggle-btn');
  const isDark = document.body.classList.contains('dark-mode');
  toggleBtn.innerHTML = isDark 
    ? '<i class="fas fa-sun"></i> Light Mode' 
    : '<i class="fas fa-moon"></i> Dark Mode';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
}

function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  const isExpanded = menu.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', isExpanded);
  menuToggle.innerHTML = isExpanded 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
}