// Fecha objetivo: 8 de mayo a las 00:00
const targetDate = new Date('2025-04-08T00:00:00');

// Elementos del DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const birthdayMessageElement = document.getElementById('birthday-message');
const confettiContainer = document.getElementById('confetti-container');

// Colores para el confeti
const confettiColors = [
    '#FF577F', '#FF884B', '#FFD384', '#FFF9B0',
    '#A7D2CB', '#F2D388', '#C98474', '#874C62',
    '#FF8BA7', '#FFC75F', '#F9F871', '#00C9A7'
];

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;
    
    if (difference <= 0) {
        // ¡Es el cumpleaños!
        clearInterval(countdownInterval);
        showBirthdayMessage();
        return;
    }
    
    // Calcular días, horas, minutos y segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Actualizar el DOM
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Actualizar mensaje según la proximidad
    if (days === 0 && hours < 12) {
        messageElement.innerHTML = '<p>¡Ya casi es hora de la sorpresa!</p>';
    } else if (days === 0) {
        messageElement.innerHTML = '<p>¡Hoy es el día! La cuenta regresiva está por terminar...</p>';
    } else if (days === 1) {
        messageElement.innerHTML = '<p>¡Solo queda un día! La sorpresa está muy cerca...</p>';
    }
}

// Función para mostrar el mensaje de cumpleaños
function showBirthdayMessage() {
    countdownElement.classList.add('hidden');
    messageElement.classList.add('hidden');
    birthdayMessageElement.classList.remove('hidden');
    
    // Crear y lanzar confeti
    createConfetti();
    
    // Reproducir sonido de celebración si está permitido por el navegador
    try {
        const audio = new Audio('https://soundbible.com/mp3/Ta Da-SoundBible.com-1884170640.mp3');
        audio.volume = 0.5;
        audio.play().catch(error => console.log('No se pudo reproducir el audio automáticamente'));
    } catch (error) {
        console.log('No se pudo reproducir el audio');
    }
}

// Función para crear confeti
function createConfetti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 3;
            
            confetti.style.setProperty('--color', color);
            confetti.style.setProperty('--duration', `${duration}s`);
            confetti.style.left = `${left}%`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDelay = `${delay}s`;
            
            confettiContainer.appendChild(confetti);
            
            // Eliminar el confeti después de que termine la animación
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 50);
    }
}

// Comprobar si ya es el cumpleaños
function checkBirthday() {
    const currentTime = new Date();
    if (currentTime >= targetDate) {
        showBirthdayMessage();
    } else {
        // Iniciar la cuenta regresiva
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

// Iniciar
let countdownInterval;
window.addEventListener('load', checkBirthday);

// Verificar si debemos redirigir de la página de cumpleaños
function checkRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('birthday') === 'true') {
        showBirthdayMessage();
    }
}

// Verificar redirección al cargar
window.addEventListener('load', checkRedirect);
