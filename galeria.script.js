// Elementos del DOM
const playButton = document.getElementById('play-button');
let audio = null;

// Función para reproducir música
function playMusic() {
    if (!audio) {
        // Puedes reemplazar este enlace con una canción de cumpleaños de tu elección
        audio = new Audio(audio/audio1.mp3);
        audio.volume = 0.5;
        audio.loop = true;
    }
    
    if (audio.paused) {
        audio.play()
            .then(() => {
                playButton.textContent = '⏸️ Pausar música';
            })
            .catch(error => {
                console.log('No se pudo reproducir el audio automáticamente: ' + error);
                playButton.textContent = '❌ Error al reproducir';
                setTimeout(() => {
                    playButton.textContent = '▶️ Reproducir música de cumpleaños';
                }, 2000);
            });
    } else {
        audio.pause();
        playButton.textContent = '▶️ Reproducir música de cumpleaños';
    }
}

// Evento del botón de reproducción
playButton.addEventListener('click', playMusic);

// Efecto de desplazamiento suave para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Función para animar elementos cuando aparecen en el viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.memory-card, .message-section, .music-player');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Agregar la clase fade-in a los elementos que están visibles cuando la página carga
window.addEventListener('load', () => {
    // Agregamos la clase al CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        .memory-card, .message-section, .music-player {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Ejecutamos la animación
    animateOnScroll();
});

// Activar la animación al hacer scroll
window.addEventListener('scroll', animateOnScroll);

// Agregamos interactividad a las tarjetas
const memoryCards = document.querySelectorAll('.memory-card');

memoryCards.forEach(card => {
    card.addEventListener('click', () => {
        card.querySelector('.memory-card-inner').style.transform = 
            card.querySelector('.memory-card-inner').style.transform === 'rotateY(180deg)' 
                ? 'rotateY(0deg)' 
                : 'rotateY(180deg)';
    });
});

// Detectamos si es móvil para cambiar el comportamiento de las tarjetas
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    memoryCards.forEach(card => {
        // Eliminamos el hover para dispositivos móviles
        card.querySelector('.memory-overlay').style.opacity = '1';
    });
}