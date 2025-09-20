document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;

  if (slides.length === 0) {
    console.warn("Tidak ditemukan elemen .hero-slide");
    return;
  }

  // Pastikan slide pertama aktif saat awal
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === 0) slide.classList.add("active");
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function startSlideshow() {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000); // 5 detik
  }

  startSlideshow();
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.querySelector(".nav-menu");

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
});

// Theme toggle (placeholder functionality)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

themeToggle.addEventListener("click", () => {
  if (themeIcon.textContent === "🌙") {
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(26, 26, 26, 0.98)";
  } else {
    header.style.background = "rgba(26, 26, 26, 0.95)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".feature-card, .stat-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Counter animation for statistics
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = counter.textContent;
    const numericValue = parseFloat(target.replace(/[^\d.]/g, ""));
    const suffix = target.replace(/[\d.]/g, "");

    let current = 0;
    const increment = numericValue / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }

      if (suffix.includes("K")) {
        counter.textContent = Math.floor(current) + "K+";
      } else if (suffix.includes("M")) {
        counter.textContent = current.toFixed(1) + "M+";
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 20);
  });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".why-choose");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Button click handlers
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Add ripple effect
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-dark);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-bg-image");
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Loading screen (optional)
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// document.addEventListener("DOMContentLoaded", () => {
//   const slides = document.querySelectorAll(".hero-slide");
//   let currentSlide = 0;

//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       slide.classList.toggle("active", i === index);
//     });
//   }

//   function startSlideshow() {
//     showSlide(currentSlide);
//     setInterval(() => {
//       currentSlide = (currentSlide + 1) % slides.length;
//       showSlide(currentSlide);
//     }, 5000); // tiap 5 detik
//   }

//   if (slides.length > 0) {
//     startSlideshow();
//   } else {
//     console.warn("No slides found.");
//   }
// });
