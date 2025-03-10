document.addEventListener("DOMContentLoaded", () => {
  // Filtrado y ordenación de productos
  const brandFilter = document.getElementById("brandFilter")
  const priceFilter = document.getElementById("priceFilter")
  const categoryFilter = document.getElementById("categoryFilter")
  const sortOrder = document.getElementById("sortOrder")
  const productsGrid = document.getElementById("productsGrid")

  // Función para filtrar productos (simulada)
  const filterProducts = () => {
    // En una aplicación real, aquí se implementaría la lógica de filtrado
    // Para este ejemplo, simplemente mostramos un mensaje
    console.log("Filtrando productos...")

    // Simulación de carga
    productsGrid.style.opacity = "0.5"
    setTimeout(() => {
      productsGrid.style.opacity = "1"
    }, 500)
  }

  // Event listeners para los filtros
  if (brandFilter) {
    brandFilter.addEventListener("change", filterProducts)
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", filterProducts)
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts)
  }

  if (sortOrder) {
    sortOrder.addEventListener("change", filterProducts)
  }

  // Paginación
  const paginationNumbers = document.querySelectorAll(".pagination-number")
  const paginationBtns = document.querySelectorAll(".pagination-btn")

  if (paginationNumbers.length > 0) {
    paginationNumbers.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remover clase active de todos los botones
        paginationNumbers.forEach((b) => b.classList.remove("active"))
        // Añadir clase active al botón clickeado
        this.classList.add("active")

        // Habilitar/deshabilitar botones de anterior/siguiente
        const currentPage = Number.parseInt(this.textContent)
        const totalPages = paginationNumbers.length

        if (paginationBtns.length >= 2) {
          paginationBtns[0].disabled = currentPage === 1
          paginationBtns[1].disabled = currentPage === totalPages
        }

        // Simular carga de nuevos productos
        filterProducts()
      })
    })
  }

  if (paginationBtns.length >= 2) {
    // Botón Anterior
    paginationBtns[0].addEventListener("click", function () {
      if (!this.disabled) {
        const activeBtn = document.querySelector(".pagination-number.active")
        const prevBtn = activeBtn.previousElementSibling
        if (prevBtn) {
          prevBtn.click()
        }
      }
    })

    // Botón Siguiente
    paginationBtns[1].addEventListener("click", function () {
      if (!this.disabled) {
        const activeBtn = document.querySelector(".pagination-number.active")
        const nextBtn = activeBtn.nextElementSibling
        if (nextBtn) {
          nextBtn.click()
        }
      }
    })
  }

  // Botones de añadir al carrito
  const addToCartBtns = document.querySelectorAll(".product-card .btn-primary")
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productName = this.closest(".product-info").querySelector("h3").textContent
      alert(`¡${productName} añadido al carrito!`)
    })
  })
})

