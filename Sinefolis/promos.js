// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.querySelector(".nav-menu");

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
});

// Theme toggle
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

// Promo card hover effects
document.querySelectorAll(".promo-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
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

// Observe promo cards for animation
document.querySelectorAll(".promo-card").forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
  observer.observe(el);
});

// Add mobile menu styles
const style = document.createElement("style");
style.textContent = `
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

// Add click effects to promo cards
document.querySelectorAll(".promo-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Add a subtle click animation
    card.style.transform = "scale(0.98)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 150);

    // You could add functionality here to show more details or redirect
    console.log("Promo card clicked:", card.querySelector(".promo-title")?.textContent);
  });
});
function openModal(imgElement) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = imgElement.src;
  document.body.style.overflow = "hidden"; // prevent scroll
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // restore scroll
}

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
