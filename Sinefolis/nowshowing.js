// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navMenu = document.querySelector(".nav-menu")

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  mobileMenuToggle.classList.toggle("active")
})

// Theme toggle
const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.querySelector(".theme-icon")

themeToggle.addEventListener("click", () => {
  if (themeIcon.textContent === "🌙") {
    themeIcon.textContent = "☀️"
  } else {
    themeIcon.textContent = "🌙"
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(26, 26, 26, 0.98)"
  } else {
    header.style.background = "rgba(26, 26, 26, 0.95)"
  }
})

// Showtime button interactions
document.querySelectorAll(".showtime-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const movieTitle = e.target.closest(".movie-card").querySelector(".movie-title").textContent
    const showtime = e.target.textContent

    // Remove active class from all buttons in the same movie card
    const movieCard = e.target.closest(".movie-card")
    movieCard.querySelectorAll(".showtime-btn").forEach((button) => {
      button.classList.remove("active")
    })

    // Add active class to clicked button
    e.target.classList.add("active")

    // You could add booking functionality here
    console.log(`Selected: ${movieTitle} at ${showtime}`)

    // Show selection feedback
    showSelectionFeedback(movieTitle, showtime)
  })
})

// Show selection feedback
function showSelectionFeedback(movie, time) {
  // Create a temporary notification
  const notification = document.createElement("div")
  notification.className = "selection-notification"
  notification.textContent = `Selected: ${movie} at ${time}`

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Star rating hover effects
document.querySelectorAll(".movie-rating").forEach((rating) => {
  const stars = rating.querySelectorAll(".star")

  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", () => {
      // Highlight stars up to the hovered one
      stars.forEach((s, i) => {
        if (i <= index) {
          s.style.color = "var(--star-color)"
        } else {
          s.style.color = "var(--border-color)"
        }
      })
    })
  })

  rating.addEventListener("mouseleave", () => {
    // Reset to original rating
    stars.forEach((star) => {
      if (star.classList.contains("filled")) {
        star.style.color = "var(--star-color)"
      } else {
        star.style.color = "var(--border-color)"
      }
    })
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe movie cards for animation
document.querySelectorAll(".movie-card").forEach((el, index) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
  observer.observe(el)
})

// Add mobile menu styles
const style = document.createElement("style")
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
    
    .showtime-btn.active {
        background: var(--primary-color);
        color: var(--bg-dark);
        border-color: var(--primary-color);
    }
    
    .selection-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: var(--bg-dark);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)

// Movie data (could be fetched from an API)
const movieData = [
  {
    title: "Avatar: The Way of Water",
    rating: 4,
    showtimes: ["10:30", "13:30", "15:30", "17:30"],
  },
  {
    title: "BAGMAN",
    rating: 3,
    showtimes: ["10:30", "13:30", "15:30", "17:30"],
  },
  {
    title: "Final Destination Bloodlines",
    rating: 4,
    showtimes: ["10:30", "13:30", "15:30", "17:30"],
  },
  {
    title: "Fall",
    rating: 4,
    showtimes: ["10:30", "13:30", "15:30", "17:30"],
  },
]

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Now Showing page loaded")

  // You could fetch real movie data here
  // fetchMovieData()
})

// Simulate loading movie posters
setTimeout(() => {
  document.querySelectorAll(".poster-image").forEach((img) => {
    img.style.animation = "none"
  })
}, 2000)
