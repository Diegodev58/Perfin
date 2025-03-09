// Datos de ejemplo para el catálogo
const products = [
    {
      id: 1,
      name: "Smartphone Premium",
      price: 799.99,
      category: "electronics",
      image: "prod/1.jpg",
      description:
        "Un smartphone de última generación con cámara de alta resolución, batería de larga duración y procesador potente.",
    },
    {
      id: 2,
      name: "Laptop Ultradelgada",
      price: 1299.99,
      category: "electronics",
      image: "prod/1.jpg",
      description: "Laptop ligera y potente con pantalla de alta resolución, perfecta para trabajo y entretenimiento.",
    },
    {
      id: 3,
      name: "Camiseta Casual",
      price: 29.99,
      category: "clothing",
      image: "prod/1.jpg",
      description: "Camiseta de algodón 100%, cómoda y duradera, disponible en varios colores.",
    },
    {
      id: 4,
      name: "Pantalones Vaqueros",
      price: 59.99,
      category: "clothing",
      image: "prod/1.jpg",
      description: "Vaqueros de alta calidad con un ajuste perfecto y diseño moderno.",
    },
    {
      id: 5,
      name: "Lámpara de Mesa",
      price: 49.99,
      category: "home",
      image: "prod/1.jpg",
      description: "Lámpara elegante para tu mesa de noche o escritorio, con luz ajustable.",
    },
    {
      id: 6,
      name: "Juego de Sábanas",
      price: 89.99,
      category: "home",
      image: "prod/1.jpg",
      description: "Juego de sábanas suaves y duraderas, hechas de algodón egipcio de alta calidad.",
    },
    {
      id: 7,
      name: "Crema Facial",
      price: 34.99,
      category: "beauty",
      image: "prod/1.jpg",
      description: "Crema hidratante para el rostro con ingredientes naturales y protección UV.",
    },
    {
      id: 8,
      name: "Set de Maquillaje",
      price: 79.99,
      category: "beauty",
      image: "prod/1.jpg",
      description: "Set completo de maquillaje con sombras, labiales y bases de alta calidad.",
    },
    {
      id: 9,
      name: "Auriculares Inalámbricos",
      price: 149.99,
      category: "electronics",
      image: "prod/1.jpg",
      description: "Auriculares con cancelación de ruido y calidad de sonido excepcional.",
    },
    {
      id: 10,
      name: "Vestido Elegante",
      price: 119.99,
      category: "clothing",
      image: "prod/1.jpg",
      description: "Vestido elegante para ocasiones especiales, con un diseño moderno y sofisticado.",
    },
    {
      id: 11,
      name: "Sofá Modular",
      price: 899.99,
      category: "home",
      image: "prod/1.jpg",
      description: "Sofá modular que se adapta a cualquier espacio, cómodo y con diseño contemporáneo.",
    },
    {
      id: 12,
      name: "Perfume Premium",
      price: 129.99,
      category: "beauty",
      image: "prod/1.jpg",
      description: "Fragancia exclusiva con notas cítricas y amaderadas, larga duración.",
    },
  ]
  
  // Elementos DOM
  const productsContainer = document.getElementById("products-container")
  const categoriesEl = document.getElementById("categories")
  const searchInput = document.getElementById("search")
  const searchBtn = document.getElementById("search-btn")
  const modal = document.getElementById("product-modal")
  const closeModal = document.querySelector(".close")
  const modalProductDetails = document.getElementById("modal-product-details")
  
  // Estado actual
  let currentCategory = "all"
  let currentSearchTerm = ""
  
  // Función para renderizar productos
  function renderProducts() {
    // Filtrar productos por categoría y término de búsqueda
    const filteredProducts = products.filter((product) => {
      const matchesCategory = currentCategory === "all" || product.category === currentCategory
      const matchesSearch = product.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  
    // Limpiar contenedor
    productsContainer.innerHTML = ""
  
    // Si no hay productos que coincidan
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = '<p class="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>'
      return
    }
  
    // Renderizar productos filtrados
    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.dataset.id = product.id
  
      productCard.innerHTML = `
              <img src="${product.image}" alt="${product.name}" class="product-image">
              <div class="product-info">
                  <h3 class="product-name">${product.name}</h3>
                  <p class="product-category">${getCategoryName(product.category)}</p>
                  <p class="product-price">$${product.price.toFixed(2)}</p>
              </div>
          `
  
      // Evento para abrir modal al hacer clic
      productCard.addEventListener("click", () => {
        openProductModal(product)
      })
  
      productsContainer.appendChild(productCard)
    })
  }
  
  // Función para obtener el nombre de la categoría en español
  function getCategoryName(category) {
    const categories = {
      electronics: "Electrónica",
      clothing: "Ropa",
      home: "Hogar",
      beauty: "Belleza",
    }
  
    return categories[category] || category
  }
  
  // Función para abrir el modal de producto
  function openProductModal(product) {
    modalProductDetails.innerHTML = `
          <div class="product-detail">
              <img src="${product.image}" alt="${product.name}" class="product-detail-image">
              <div class="product-detail-info">
                  <h2 class="product-detail-name">${product.name}</h2>
                  <p class="product-detail-category">${getCategoryName(product.category)}</p>
                  <p class="product-detail-description">${product.description}</p>
                  <p class="product-detail-price">$${product.price.toFixed(2)}</p>
                  <button class="add-to-cart">Añadir al carrito</button>
              </div>
          </div>
      `
  
    modal.style.display = "block"
  
    // Añadir evento al botón de añadir al carrito
    const addToCartBtn = modalProductDetails.querySelector(".add-to-cart")
    addToCartBtn.addEventListener("click", () => {
      alert(`Producto "${product.name}" añadido al carrito`)
    })
  }
  
  // Eventos para filtrar por categoría
  categoriesEl.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      // Actualizar categoría activa
      document.querySelector("#categories li.active").classList.remove("active")
      e.target.classList.add("active")
  
      // Actualizar filtro y renderizar
      currentCategory = e.target.dataset.category
      renderProducts()
    }
  })
  
  // Eventos para búsqueda
  searchBtn.addEventListener("click", () => {
    currentSearchTerm = searchInput.value.trim()
    renderProducts()
  })
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      currentSearchTerm = searchInput.value.trim()
      renderProducts()
    }
  })
  
  // Cerrar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })
  
  // Inicializar la página
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts()
  })
  
  