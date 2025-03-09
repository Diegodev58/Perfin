// Función para cambiar el fondo a negro (modo oscuro)


// Seleccionar el botón de toggle para móviles y el menú de navegación
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

// Añadir un evento de clic al botón de toggle para mostrar/ocultar el menú en móviles
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar el menú móvil cuando se hace clic en un enlace del menú
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Desplazamiento suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        const targetId = this.getAttribute('href'); // Obtener el ID del objetivo
        const targetElement = document.querySelector(targetId); // Seleccionar el elemento objetivo
        
        if (targetElement) {
            // Desplazarse suavemente al elemento objetivo, ajustando para el encabezado fijo
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Toggle para cambiar entre tema oscuro y claro
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Alternar la clase 'dark-mode' en el body
    
    // Cambiar el ícono del botón según el tema actual
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️'; // Cambiar a sol si está en modo oscuro
    } else {
        themeToggle.textContent = '🌙'; // Cambiar a luna si está en modo claro
    }
});

// Prevenir el envío del formulario y mostrar un mensaje de demostración
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    alert('¡Mensaje enviado! (Esta es una demostración)'); // Mostrar un mensaje de alerta
    contactForm.reset(); // Reiniciar el formulario
});

// Animar las barras de progreso cuando se desplazan a la vista
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(progress => {
        const position = progress.getBoundingClientRect().top; // Obtener la posición de la barra
        const screenPosition = window.innerHeight / 1.3; // Calcular la posición en la pantalla
        
        // Si la barra está en la vista, animarla al ancho especificado
        if (position < screenPosition) {
            progress.style.width = progress.parentElement.previousElementSibling.lastElementChild.textContent;
        }
    });
}

// Añadir un evento de desplazamiento para animar las barras de progreso
window.addEventListener('scroll', animateProgressBars);

// Filtrado de proyectos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover la clase 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir la clase 'active' al botón clickeado
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter'); // Obtener el valor del filtro
        
        // Mostrar u ocultar las tarjetas de proyecto según el filtro seleccionado
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block'; // Mostrar la tarjeta
            } else {
                card.style.display = 'none'; // Ocultar la tarjeta
            }
        });
    });
});

// Modal de proyectos
const modalOverlay = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

let currentProjectId = 0; // ID del proyecto actual en el modal

// Datos de los proyectos (en un proyecto real, esto vendría de una base de datos o API)
const projectsData = [
    // ... (datos de los proyectos)
];

// Abrir el modal con los detalles del proyecto
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    currentProjectId = projectId;
    
    // Establecer el contenido del modal
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-description').innerHTML = `<h3>Descripción</h3><p>${project.description}</p>`;
    document.getElementById('modal-client').textContent = project.client;
    document.getElementById('modal-date').textContent = project.date;
    document.getElementById('modal-duration').textContent = project.duration;
    
    // Establecer las tecnologías
    const techContainer = document.getElementById('modal-technologies');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Establecer los botones de enlace
    const liveBtn = document.getElementById('modal-live');
    liveBtn.href = project.liveUrl;
    
    const codeBtn = document.getElementById('modal-code');
    if (project.codeUrl) {
        codeBtn.href = project.codeUrl;
        codeBtn.style.display = 'inline-block';
    } else {
        codeBtn.style.display = 'none';
    }
    
    // Establecer la galería de imágenes
    document.getElementById('gallery-main').src = project.images[0];
    
    const galleryThumbs = document.getElementById('gallery-thumbs');
    galleryThumbs.innerHTML = '';
    
    project.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.className = index === 0 ? 'gallery-thumb active' : 'gallery-thumb';
        thumb.src = img;
        thumb.alt = `Miniatura ${index + 1}`;
        thumb.dataset.src = img;
        
        thumb.addEventListener('click', function() {
            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('gallery-main').src = this.dataset.src;
        });
        
        galleryThumbs.appendChild(thumb);
    });
    
    // Mostrar el modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Deshabilitar el desplazamiento de la página
}

// Cerrar el modal
function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Habilitar el desplazamiento de la página
}

// Navegar al proyecto anterior
function prevProject() {
    let prevId = currentProjectId - 1;
    if (prevId < 1) prevId = projectsData.length;
    openProjectModal(prevId);
}

// Navegar al siguiente proyecto
function nextProject() {
    let nextId = currentProjectId + 1;
    if (nextId > projectsData.length) nextId = 1;
    openProjectModal(nextId);
}

// Añadir eventos a las tarjetas de proyecto para abrir el modal
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = parseInt(card.getAttribute('data-id'));
        openProjectModal(projectId);
    });
});

// Cerrar el modal al hacer clic en el botón de cerrar
modalClose.addEventListener('click', closeProjectModal);

// Cerrar el modal al hacer clic fuera del contenido del modal
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
});

// Navegar al proyecto anterior o siguiente
modalPrev.addEventListener('click', prevProject);
modalNext.addEventListener('click', nextProject);

// Cerrar el modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeProjectModal();
    }
});

// Animar las barras de progreso al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
});

// Agregar div de experiencia laboral

const experiencias = [
    {
        titulo: 'Desarrollo Web',
        certificacion: 'Html Css Js',
        fecha: '2022-2023',
        descripcion: 'Desarrollo Web por Experiencia Laboral'
    },
    {
        titulo: 'Desarrollo Backend',
        certificacion: 'Python Node.js',
        fecha: '2024-2024',
        descripcion: 'Desarrollo Backend por Experiencia Laboral'
    }
];

// Obtener el contenedor de la línea de tiempo
const experienciaContainer = document.getElementsByClassName('timeline')[0]; // Acceder al primer elemento

// Iterar sobre el array de experiencias
for (const experiencia of experiencias) {
    // Crear un nuevo div para cada experiencia
    const timelineitem = document.createElement('div');
    timelineitem.classList.add('timeline-item');
    const experienciaDiv = document.createElement('div');
    experienciaDiv.classList.add('timeline-content');

    // Crear el elemento de fecha
    const span = document.createElement('span');
    span.classList.add('timeline-date');
    span.textContent = experiencia.fecha;

    // Crear el título de la experiencia
    const h3 = document.createElement('h3');
    h3.classList.add('timeline-title');
    h3.textContent = experiencia.titulo;

    // Crear la descripción de la experiencia
    const p = document.createElement('p');
    p.textContent = experiencia.descripcion;

    // Agregar los elementos al div de la experiencia
    experienciaDiv.appendChild(span);
    experienciaDiv.appendChild(h3);
    experienciaDiv.appendChild(p);

    // Agregar el div de la experiencia al contenedor
    experienciaContainer.appendChild(timelineitem);
    timelineitem.appendChild(experienciaDiv);
}


// agragar Proyectos

const proyectos = [
    {
        titulo: 'Generador de Link de WhatsApp',
        descripcion: 'Generador de link de WhatsApp para compartir en redes sociales. Abre el link para ver Mejor el proyecto',
        enlace: 'https://generador-link-whats-app.vercel.app/',
        category: 'Desarrollo Web'
    },
    {
        titulo: 'Generador de Link correos',
        descripcion: 'Generador de link de correos para compartir en redes sociales.',
        enlace: 'https://generador-link-correos.vercel.app/',
        category: 'Desarrollo Web'
    }
]

// Obtener el contenedor de proyectos
const proyectosContainer = document.getElementsByClassName('projects-grid')[0]; // Acceder al primer elemento

// Iterar sobre el array de proyectos
for (const proyecto of proyectos) {
    // Crear un nuevo div para cada proyecto
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');


    // Crear la iframe del proyecto
    const iframe = document.createElement('iframe');
    iframe.src = proyecto.enlace;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.classList.add('project-img');
    iframe.frameborder = '0';
    iframe.scrolling = 'no';
    // Crear el título del proyecto
    const h3 = document.createElement('h3');
    h3.classList.add('project-title');
    h3.textContent = proyecto.titulo;

   
    // Crear la categoría del proyecto
    const span = document.createElement('span');
    span.classList.add('project-category');
    span.textContent = proyecto.category;

    // Crear la descripción del proyecto
    const p = document.createElement('p');
    p.textContent = proyecto.descripcion;    

     // Crear el enlace del proyecto
    const a = document.createElement('a');
    a.classList.add('project-view');
    a.textContent = 'Ver detalles';
    a.href = proyecto.enlace;

    // Agregar los elementos al div de la experiencia    
    projectInfo.appendChild(iframe);
    projectInfo.appendChild(h3);
    projectInfo.appendChild(span);
    projectInfo.appendChild(p);
    projectInfo.appendChild(a);
    // Agregar el div de la experiencia al contenedor
    proyectosContainer.appendChild(projectCard);
    projectCard.appendChild(projectInfo);
}