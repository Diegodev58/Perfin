// Funcionalidad del menú móvil
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const menu = document.getElementById("menu")

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active")
    })
  }

  // Cerrar el menú al hacer clic en un enlace
  const menuLinks = document.querySelectorAll(".menu a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove("active")
      }
    })
  })

  // Formulario de newsletter
  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      if (emailInput && emailInput.value) {
        alert("¡Gracias por suscribirte a nuestro boletín!")
        emailInput.value = ""
      }
    })
  }

  // Slider de testimonios
  const testimonials = document.getElementById("testimonials")
  if (testimonials) {
    const prevBtn = document.getElementById("prevTestimonial")
    const nextBtn = document.getElementById("nextTestimonial")

    let currentIndex = 0
    const testimonialItems = testimonials.querySelectorAll(".testimonial")

    if (testimonialItems.length > 0) {
      // Ocultar todos los testimonios excepto el primero
      testimonialItems.forEach((item, index) => {
        if (index !== 0) {
          item.style.display = "none"
        }
      })

      // Función para mostrar un testimonio específico
      const showTestimonial = (index) => {
        testimonialItems.forEach((item) => {
          item.style.display = "none"
        })
        testimonialItems[index].style.display = "block"
      }

      // Event listeners para los botones
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length
          showTestimonial(currentIndex)
        })

        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % testimonialItems.length
          showTestimonial(currentIndex)
        })
      }
    }
  }
})

