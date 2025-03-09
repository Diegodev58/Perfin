document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        document.body.classList.toggle("menu-open")
      })
    }
  
    // Header Scroll Effect
    const header = document.querySelector("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Product Filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const productCards = document.querySelectorAll(".product-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        productCards.forEach((card) => {
          if (filterValue === "todos") {
            card.style.display = "block"
          } else if (card.getAttribute("data-category") === filterValue) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    let currentSlide = 0
  
    function showSlide(n) {
      // Hide all slides
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))
  
      // Show the current slide
      testimonialSlides[n].classList.add("active")
      dots[n].classList.add("active")
      currentSlide = n
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length
      showSlide(currentSlide)
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
      showSlide(currentSlide)
    }
  
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", prevSlide)
      nextBtn.addEventListener("click", nextSlide)
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })
  
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000)
  
    // Quick View Modal
    const quickViewBtns = document.querySelectorAll(".quick-view")
    const modal = document.getElementById("quickViewModal")
    const closeModal = document.querySelector(".close-modal")
    const modalProductImg = document.getElementById("modalProductImg")
    const modalProductTitle = document.getElementById("modalProductTitle")
    const modalProductPrice = document.getElementById("modalProductPrice")
  
    quickViewBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Get product details from the parent card
        const card = this.closest(".product-card")
        const img = card.querySelector("img").src
        const title = card.querySelector("h3").textContent
        const price = card.querySelector(".price").textContent
  
        // Set modal content
        modalProductImg.src = img
        modalProductTitle.textContent = title
        modalProductPrice.textContent = price
  
        // Show modal
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
      })
    })
  
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      })
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  
    // Quantity selector in modal
    const minusBtn = document.querySelector(".minus")
    const plusBtn = document.querySelector(".plus")
    const quantityInput = document.getElementById("quantity")
  
    if (minusBtn && plusBtn && quantityInput) {
      minusBtn.addEventListener("click", () => {
        const value = Number.parseInt(quantityInput.value)
        if (value > 1) {
          quantityInput.value = value - 1
        }
      })
  
      plusBtn.addEventListener("click", () => {
        const value = Number.parseInt(quantityInput.value)
        quantityInput.value = value + 1
      })
    }
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        // Simple validation
        if (name && email && message) {
          // Here you would normally send the form data to a server
          alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
          contactForm.reset()
        } else {
          alert("Por favor completa todos los campos requeridos.")
        }
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          document.body.classList.remove("menu-open")
        }
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  