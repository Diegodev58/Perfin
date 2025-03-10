document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const prevBtn = document.querySelector(".prev")
  const nextBtn = document.querySelector(".next")

  if (testimonials.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0

    function showTestimonial(index) {
      testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
      testimonials[index].classList.add("active")
    }

    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonials.length
      showTestimonial(currentIndex)
    }

    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
      showTestimonial(currentIndex)
    }

    nextBtn.addEventListener("click", nextTestimonial)
    prevBtn.addEventListener("click", prevTestimonial)

    // Auto slide every 5 seconds
    setInterval(nextTestimonial, 5000)
  }

  // Product Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const productItems = document.querySelectorAll(".product-item")

  if (filterBtns.length > 0 && productItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        productItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      // Here you would typically send the email to your server
      // For demo purposes, we'll just show an alert
      alert(`¡Gracias por suscribirte con ${email}! Pronto recibirás nuestras novedades.`)
      this.reset()
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Here you would typically send the form data to your server
      // For demo purposes, we'll just show an alert
      alert("¡Gracias por tu mensaje! Te responderemos a la brevedad.")
      this.reset()
    })
  }

  // FAQ Accordion
  const accordionItems = document.querySelectorAll(".accordion-item")

  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header")

      header.addEventListener("click", () => {
        // Close all other accordion items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle current accordion item
        item.classList.toggle("active")
      })
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          menuToggle.classList.remove("active")
        }
      }
    })
  })

  // Modal de Detalles del Producto
  const modal = document.getElementById("product-modal")
  const viewDetailsBtns = document.querySelectorAll(".view-details")
  const closeModal = document.querySelector(".close-modal")
  const modalProductImage = document.getElementById("modal-product-image")
  const modalProductTitle = document.getElementById("modal-product-title")
  const modalProductPrice = document.getElementById("modal-product-price")
  const modalProductDescription = document.getElementById("modal-product-description")
  const modalProductFeatures = document.getElementById("modal-product-features")
  const decreaseQtyBtn = document.getElementById("decrease-qty")
  const increaseQtyBtn = document.getElementById("increase-qty")
  const productQty = document.getElementById("product-qty")
  const addToCartBtn = document.querySelector(".add-to-cart-btn")

  if (viewDetailsBtns.length > 0 && modal) {
    // Abrir modal al hacer clic en "Ver detalles"
    viewDetailsBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()

        // Obtener datos del producto desde los atributos data
        const productId = this.getAttribute("data-id")
        const productName = this.getAttribute("data-name")
        const productPrice = this.getAttribute("data-price")
        const productImage = this.getAttribute("data-image")
        const productDescription = this.getAttribute("data-description")
        const productFeatures = this.getAttribute("data-features")

        // Actualizar el contenido del modal
        modalProductImage.src = productImage
        modalProductImage.alt = productName
        modalProductTitle.textContent = productName
        modalProductPrice.textContent = productPrice
        modalProductDescription.textContent = productDescription

        // Limpiar y agregar características
        modalProductFeatures.innerHTML = ""
        if (productFeatures) {
          const features = productFeatures.split(",")
          features.forEach((feature) => {
            const li = document.createElement("li")
            li.textContent = feature.trim()
            modalProductFeatures.appendChild(li)
          })
        }

        // Resetear cantidad
        productQty.value = 1

        // Mostrar modal
        modal.style.display = "block"
        document.body.style.overflow = "hidden" // Evitar scroll en el body
      })
    })

    // Cerrar modal al hacer clic en X
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"
        document.body.style.overflow = "auto" // Restaurar scroll
      })
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto" // Restaurar scroll
      }
    })

    // Controles de cantidad
    if (decreaseQtyBtn && increaseQtyBtn && productQty) {
      decreaseQtyBtn.addEventListener("click", () => {
        const qty = Number.parseInt(productQty.value)
        if (qty > 1) {
          productQty.value = qty - 1
        }
      })

      increaseQtyBtn.addEventListener("click", () => {
        const qty = Number.parseInt(productQty.value)
        if (qty < 10) {
          productQty.value = qty + 1
        }
      })

      productQty.addEventListener("change", function () {
        const qty = Number.parseInt(this.value)
        if (isNaN(qty) || qty < 1) {
          this.value = 1
        } else if (qty > 10) {
          this.value = 10
        }
      })
    }

    // Agregar al carrito (simulado)
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        const productName = modalProductTitle.textContent
        const quantity = productQty.value

        alert(`¡${productName} (${quantity}) agregado al carrito!`)

        // Cerrar modal después de agregar al carrito
        modal.style.display = "none"
        document.body.style.overflow = "auto" // Restaurar scroll
      })
    }
  }
})

