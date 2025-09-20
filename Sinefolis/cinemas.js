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

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(26, 26, 26, 0.98)"
  } else {
    header.style.background = "rgba(26, 26, 26, 0.95)"
  }
})

// Search functionality
const searchInput = document.getElementById("cinemaSearch")
const areaSelect = document.getElementById("areaSelect")
const searchBtn = document.getElementById("searchBtn")
const cinemaCards = document.querySelectorAll(".cinema-card:not(.see-more-card)")

searchBtn.addEventListener("click", performSearch)
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch()
  }
})

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase()
  const selectedArea = areaSelect.value.toLowerCase()

  cinemaCards.forEach((card) => {
    const cinemaName = card.querySelector(".cinema-name").textContent.toLowerCase()
    const cinemaLocation = card.getAttribute("data-location").toLowerCase()

    const matchesSearch = searchTerm === "" || cinemaName.includes(searchTerm)
    const matchesArea = selectedArea === "" || cinemaLocation.includes(selectedArea)

    if (matchesSearch && matchesArea) {
      card.style.display = "block"
      card.classList.remove("hidden")
    } else {
      card.style.display = "none"
      card.classList.add("hidden")
    }
  })

  // Show feedback if no results
  const visibleCards = Array.from(cinemaCards).filter((card) => !card.classList.contains("hidden"))
  if (visibleCards.length === 0) {
    showNoResultsMessage()
  } else {
    hideNoResultsMessage()
  }
}

function showNoResultsMessage() {
  const existingMessage = document.querySelector(".no-results-message")
  if (existingMessage) return

  const message = document.createElement("div")
  message.className = "no-results-message"
  message.innerHTML = `
    <div style="text-align: center; padding: 3rem; color: var(--text-gray);">
      <h3>No cinemas found</h3>
      <p>Try adjusting your search criteria</p>
    </div>
  `

  document.getElementById("cinemaGrid").appendChild(message)
}

function hideNoResultsMessage() {
  const message = document.querySelector(".no-results-message")
  if (message) {
    message.remove()
  }
}

// Area filtering
const filterBtns = document.querySelectorAll(".filter-btn")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Filter cinemas
    const selectedArea = btn.getAttribute("data-area")
    filterCinemas(selectedArea)
  })
})

function filterCinemas(area) {
  cinemaCards.forEach((card) => {
    const cardArea = card.getAttribute("data-area")

    if (area === "all" || cardArea === area) {
      card.style.display = "block"
      card.classList.remove("hidden")
    } else {
      card.style.display = "none"
      card.classList.add("hidden")
    }
  })

  // Reset search when filtering
  searchInput.value = ""
  areaSelect.value = ""
  hideNoResultsMessage()
}

// Map pin interactions
const mapPins = document.querySelectorAll(".map-pin")

mapPins.forEach((pin) => {
  pin.addEventListener("click", () => {
    const location = pin.getAttribute("data-location")

    // Highlight corresponding cinema card
    highlightCinemaCard(location)

    // Scroll to cinema grid
    document.querySelector(".browse-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  })
})

function highlightCinemaCard(location) {
  // Remove existing highlights
  cinemaCards.forEach((card) => {
    card.classList.remove("highlighted")
  })

  // Find and highlight matching card
  const matchingCard = document.querySelector(`[data-location="${location}"]`)
  if (matchingCard) {
    matchingCard.classList.add("highlighted")

    // Remove highlight after 3 seconds
    setTimeout(() => {
      matchingCard.classList.remove("highlighted")
    }, 3000)
  }
}

// Cinema card actions
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const action = btn.textContent.trim()
    const cinemaCard = btn.closest(".cinema-card")
    const cinemaName = cinemaCard.querySelector(".cinema-name").textContent

    if (action === "View Details") {
      showCinemaDetails(cinemaName)
    } else if (action === "Get Directions") {
      getDirections(cinemaName)
    } else if (action === "View All Locations") {
      showAllLocations()
    }
  })
})

function showCinemaDetails(cinemaName) {
  // This would typically open a modal or navigate to a details page
  alert(`Showing details for ${cinemaName}`)
}

function getDirections(cinemaName) {
  // This would typically open maps application
  alert(`Getting directions to ${cinemaName}`)
}

function showAllLocations() {
  // Reset all filters to show all locations
  filterBtns.forEach((btn) => btn.classList.remove("active"))
  filterBtns[0].classList.add("active") // "All Areas" button
  filterCinemas("all")
}

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
    
    .cinema-card.highlighted {
        border-color: var(--primary-color);
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        transform: translateY(-5px);
    }
`
document.head.appendChild(style)

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

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Cinemas page loaded")

  // Add staggered animation to cinema cards
  const cards = document.querySelectorAll(".cinema-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
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

// Observe cinema cards for animation
document.querySelectorAll(".cinema-card").forEach((el, index) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
  observer.observe(el)
})
