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

// Star Rating System
const starRating = document.getElementById("overallRating")
const ratingText = document.getElementById("ratingText")
const stars = starRating.querySelectorAll(".star")
let currentRating = 0

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
}

stars.forEach((star, index) => {
  star.addEventListener("mouseenter", () => {
    highlightStars(index + 1)
    ratingText.textContent = ratingLabels[index + 1]
  })

  star.addEventListener("click", () => {
    currentRating = index + 1
    setRating(currentRating)
    ratingText.textContent = ratingLabels[currentRating]
  })
})

starRating.addEventListener("mouseleave", () => {
  if (currentRating === 0) {
    highlightStars(0)
    ratingText.textContent = "Click to rate"
  } else {
    highlightStars(currentRating)
    ratingText.textContent = ratingLabels[currentRating]
  }
})

function highlightStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active")
    } else {
      star.classList.remove("active")
    }
  })
}

function setRating(rating) {
  currentRating = rating
  highlightStars(rating)
}

// Form Validation and Submission
const feedbackForm = document.getElementById("feedbackForm")
const submitBtn = feedbackForm.querySelector(".submit-btn")
const btnText = submitBtn.querySelector(".btn-text")
const btnLoading = submitBtn.querySelector(".btn-loading")

feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Validate form
  if (!validateForm()) {
    return
  }

  // Show loading state
  submitBtn.disabled = true
  btnText.style.display = "none"
  btnLoading.style.display = "inline"

  // Simulate form submission
  try {
    await simulateFormSubmission()
    showSuccessMessage()
    resetForm()
  } catch (error) {
    showErrorMessage("Failed to submit feedback. Please try again.")
  } finally {
    // Reset button state
    submitBtn.disabled = false
    btnText.style.display = "inline"
    btnLoading.style.display = "none"
  }
})

function validateForm() {
  const requiredFields = feedbackForm.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "This field is required")
      isValid = false
    } else {
      clearFieldError(field)
    }
  })

  // Validate email format
  const emailField = document.getElementById("email")
  if (emailField.value && !isValidEmail(emailField.value)) {
    showFieldError(emailField, "Please enter a valid email address")
    isValid = false
  }

  // Validate rating
  if (currentRating === 0) {
    ratingText.textContent = "Please select a rating"
    ratingText.style.color = "var(--error-color)"
    isValid = false
  } else {
    ratingText.style.color = "var(--text-gray)"
  }

  return isValid
}

function showFieldError(field, message) {
  clearFieldError(field)

  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error"
  errorDiv.textContent = message
  errorDiv.style.color = "var(--error-color)"
  errorDiv.style.fontSize = "0.875rem"
  errorDiv.style.marginTop = "0.25rem"

  field.parentNode.appendChild(errorDiv)
  field.style.borderColor = "var(--error-color)"
}

function clearFieldError(field) {
  const existingError = field.parentNode.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }
  field.style.borderColor = "var(--border-color)"
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function simulateFormSubmission() {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

function showSuccessMessage() {
  // Create success message
  const successDiv = document.createElement("div")
  successDiv.className = "success-message show"
  successDiv.textContent =
    "Thank you for your feedback! We appreciate your input and will use it to improve our services."

  // Insert before form
  feedbackForm.parentNode.insertBefore(successDiv, feedbackForm)

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.remove()
  }, 5000)
}

function showErrorMessage(message) {
  alert(message) // Simple error handling - could be improved with custom modal
}

function resetForm() {
  feedbackForm.reset()
  currentRating = 0
  highlightStars(0)
  ratingText.textContent = "Click to rate"
  ratingText.style.color = "var(--text-gray)"

  // Clear any field errors
  const errorMessages = feedbackForm.querySelectorAll(".field-error")
  errorMessages.forEach((error) => error.remove())

  const inputs = feedbackForm.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.style.borderColor = "var(--border-color)"
  })
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
  console.log("Feedback page loaded")

  // Add some interactive animations
  const reviewCards = document.querySelectorAll(".review-card")
  reviewCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
  })
})

// Character counter for textarea
const messageTextarea = document.getElementById("message")
const maxLength = 500

messageTextarea.addEventListener("input", () => {
  const currentLength = messageTextarea.value.length

  // Remove existing counter
  const existingCounter = messageTextarea.parentNode.querySelector(".char-counter")
  if (existingCounter) {
    existingCounter.remove()
  }

  // Add character counter
  if (currentLength > 0) {
    const counter = document.createElement("div")
    counter.className = "char-counter"
    counter.textContent = `${currentLength}/${maxLength} characters`
    counter.style.fontSize = "0.875rem"
    counter.style.color = currentLength > maxLength ? "var(--error-color)" : "var(--text-muted)"
    counter.style.textAlign = "right"
    counter.style.marginTop = "0.25rem"

    messageTextarea.parentNode.appendChild(counter)
  }
})
