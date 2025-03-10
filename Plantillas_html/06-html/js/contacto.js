document.addEventListener("DOMContentLoaded", () => {
  // Formulario de contacto
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtener los valores del formulario
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Validación básica
      if (!name || !email || !subject || !message) {
        alert("Por favor, completa todos los campos obligatorios.")
        return
      }

      // Simulación de envío
      alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.`)

      // Limpiar el formulario
      contactForm.reset()
    })
  }

  // Funcionalidad de FAQ
  const faqQuestions = document.querySelectorAll(".faq-question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement

      // Cerrar todos los otros items
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active")
        }
      })

      // Alternar el estado del item actual
      faqItem.classList.toggle("active")

      // Cambiar el icono
      const icon = this.querySelector(".faq-icon")
      if (faqItem.classList.contains("active")) {
        icon.textContent = "−"
      } else {
        icon.textContent = "+"
      }
    })
  })
})

