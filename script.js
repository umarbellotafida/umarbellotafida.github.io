document.addEventListener("DOMContentLoaded", function () {
  // ==== LIVE CLOCK ====
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", { hour12: false });
    const date = now.toLocaleDateString("en-GB");
    document.getElementById("clock").textContent = `${date} ${time}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ==== DARK MODE TOGGLE ====
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // ==== RESPONSIVE NAVIGATION TOGGLE ====
  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("active");
  });

  // ==== TYPEWRITER EFFECT ====
  const typewriter = document.getElementById("typewriter");
  const text = "Welcome to my Hacker-themed Homepage.";
  let i = 0;

  function type() {
    if (i < text.length) {
      typewriter.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();

  // ==== SLIDESHOW FOR GALLERY & CERTIFICATES ====
  function initImageSlideshows() {
    document.querySelectorAll('.gallery, .certificates').forEach(container => {
      const images = container.querySelectorAll('img');
      if (images.length <= 1) return;

      let current = 0;
      let timer;

      const showImage = index => {
        images.forEach((img, i) => {
          img.style.display = i === index ? 'block' : 'none';
        });
        current = index;
      };

      const startTimer = () => {
        clearInterval(timer);
        timer = setInterval(() => {
          showImage((current + 1) % images.length);
        }, 2000);
      };

      showImage(0);
      startTimer();

      container.addEventListener('mouseenter', () => clearInterval(timer));
      container.addEventListener('mouseleave', startTimer);
    });
  }

  initImageSlideshows();
});

// === TECHNICAL GALLERY SLIDESHOW ===
(function gallerySlideshow() {
  const items = document.querySelectorAll(".gallery-slideshow .gallery-item");
  let current = 0;

  function showNext() {
    items[current].classList.remove("active");
    current = (current + 1) % items.length;
    items[current].classList.add("active");
  }

  if (items.length > 1) {
    setInterval(showNext, 2000);
  }
})();