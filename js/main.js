// ==========================================
// CONFIGURACIÓN Y VARIABLES
// ==========================================

const config = {
    enableMusic: true, // Cambiar a false para deshabilitar música
    starCount: 60,
    shootingStarCount: 3,
    particleCount: 25,
    loveMessages: [
        "Eres mi persona favorita 💕",
        "Contigo todo es mejor ✨",
        "Gracias por existir 🌹",
        "Cada día a tu lado es especial 🌟",
        "Eres mi felicidad 💖",
        "Mi corazón es tuyo 💗",
        "Juntos somos perfectos 🌸",
        "Eres mi todo 💝"
    ]
};

let audioContext = null;
let musicPlaying = false;

// ==========================================
// GENERADORES DE ELEMENTOS DINÁMICOS
// ==========================================

/**
 * Genera el cielo estrellado con estrellas parpadeantes y fugaces
 */
function generateStarrySky() {
    const sky = document.getElementById('starry-sky');
    if (!sky) return;

    // Limpiar contenido existente
    sky.innerHTML = '';

    // Generar estrellas parpadeantes
    for (let i = 0; i < config.starCount; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 3;
        
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        sky.appendChild(star);
    }

    // Generar estrellas fugaces
    for (let i = 0; i < config.shootingStarCount; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        const top = -500 + Math.random() * -200;
        const left = 500 + Math.random() * 1500;
        const duration = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 10;
        
        shootingStar.style.top = `${top}px`;
        shootingStar.style.left = `${left}px`;
        shootingStar.style.animationDuration = `${duration}s`;
        shootingStar.style.animationDelay = `${delay}s`;
        
        sky.appendChild(shootingStar);
    }
}

/**
 * Genera partículas de fondo que suben
 */
function generateBackgroundParticles() {
    const container = document.querySelector('.background-particles');
    if (!container) return;

    // Limpiar contenido existente
    container.innerHTML = '';

    for (let i = 0; i < config.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const left = Math.random() * 100;
        const duration = 7 + Math.random() * 8;
        const size = 1 + Math.random() * 3;
        const delay = Math.random() * 10;
        
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// ==========================================
// CONTROL DE AUDIO
// ==========================================

/**
 * Inicializa y reproduce la música de fondo
 */
function playBackgroundMusic() {
    if (!config.enableMusic) return;
    
    const audio = document.getElementById('background-music');
    if (!audio) return;

    // Intentar reproducir con manejo de errores
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                musicPlaying = true;
                console.log('🎵 Música iniciada');
            })
            .catch(error => {
                console.log('⚠️ No se pudo reproducir la música automáticamente:', error);
                musicPlaying = false;
            });
    }
}

/**
 * Detiene la música de fondo
 */
function stopBackgroundMusic() {
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        musicPlaying = false;
    }
}

// ==========================================
// OVERLAY INICIAL
// ==========================================

/**
 * Muestra el overlay inicial
 */
function showOverlay() {
    const overlay = document.getElementById('audio-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        document.body.classList.add('container');
    }
}

/**
 * Oculta el overlay inicial e inicia la experiencia
 */
function hideOverlay() {
    const overlay = document.getElementById('audio-overlay');
    if (!overlay) return;

    overlay.classList.add('hidden');
    document.body.classList.remove('paused');
    
    // Iniciar música después de la interacción del usuario
    setTimeout(() => {
        playBackgroundMusic();
    }, 500);

    // Ocultar texto de instrucción inicial
    setTimeout(() => {
        const instructionText = document.getElementById('instruction-text');
        if (instructionText) {
            instructionText.style.opacity = '1';
        }
    }, 1500);

    // Remover el overlay del DOM después de la transición
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 800);
}

// ==========================================
// TARJETA DE AMOR
// ==========================================

/**
 * Obtiene un mensaje de amor aleatorio
 */
function getRandomLoveMessage() {
    const randomIndex = Math.floor(Math.random() * config.loveMessages.length);
    return config.loveMessages[randomIndex];
}

/**
 * Muestra la tarjeta de amor con un mensaje
 */
function showLoveCard(message) {
    const overlay = document.getElementById('love-card-overlay');
    const cardText = document.getElementById('love-card-text');
    const card = document.getElementById('love-card');
    
    if (!overlay || !cardText || !card) return;

    // Establecer el mensaje
    cardText.textContent = message || getRandomLoveMessage();

    // Limpiar partículas anteriores
    const oldParticles = card.querySelectorAll('.card-particle');
    oldParticles.forEach(p => p.remove());

    // Crear partículas decorativas
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'card-particle';
        particle.style.left = (20 + Math.random() * 60) + '%';
        particle.style.bottom = '10px';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        card.appendChild(particle);
    }

    // Mostrar el overlay
    overlay.style.display = 'flex';
    
    // Pequeño delay para permitir que el display se aplique antes de la animación
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    // Ocultar texto de instrucción
    const instructionText = document.getElementById('instruction-text');
    if (instructionText) {
        instructionText.style.opacity = '0';
    }
}

/**
 * Oculta la tarjeta de amor
 */
function hideLoveCard() {
    const overlay = document.getElementById('love-card-overlay');
    
    if (!overlay) return;

    overlay.classList.remove('active');

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);

    // Mostrar texto de instrucción nuevamente
    const instructionText = document.getElementById('instruction-text');
    if (instructionText) {
        instructionText.style.opacity = '1';
    }
}

// ==========================================
// EVENTOS DE FLORES
// ==========================================

/**
 * Configura los eventos de click en las flores
 */
function setupFlowerEvents() {
    const flowers = document.querySelectorAll('.flower__leafs');
    
    flowers.forEach((flower, index) => {
        // Evento principal de click
        flower.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Efecto visual al hacer click
            flower.style.transform = 'scale(1.1)';
            setTimeout(() => {
                flower.style.transform = '';
            }, 200);

            // Mostrar tarjeta con mensaje
            const message = getRandomLoveMessage();
            showLoveCard(message);

            console.log(`🌸 Flor ${index + 1} clickeada`);
        });

        // Evento táctil específico para móviles (mejor respuesta)
        flower.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Evitar el click fantasma
            flower.style.transform = 'scale(1.05)';
        }, { passive: false });

        flower.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            flower.style.transform = 'scale(1.1)';
            setTimeout(() => {
                flower.style.transform = '';
            }, 200);

            const message = getRandomLoveMessage();
            showLoveCard(message);

            console.log(`🌸 Flor ${index + 1} tocada (touch)`);
        }, { passive: false });

        // Efecto hover (solo en dispositivos no táctiles)
        if (!('ontouchstart' in window)) {
            flower.addEventListener('mouseenter', () => {
                flower.style.filter = 'brightness(1.2)';
            });

            flower.addEventListener('mouseleave', () => {
                flower.style.filter = '';
            });
        }
    });
}

// ==========================================
// EFECTOS ESPECIALES
// ==========================================

/**
 * Crea un efecto de corazones flotantes
 */
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'float-up 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // Remover después de la animación
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Agregar keyframes para el corazón flotante
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// INICIALIZACIÓN
// ==========================================

/**
 * Inicializa toda la aplicación
 */
function init() {
    console.log('💖 Iniciando experiencia de San Valentín...');

    // Generar elementos dinámicos
    generateStarrySky();
    generateBackgroundParticles();

    // Configurar eventos
    setupFlowerEvents();

    // Configurar overlay inicial
    const overlay = document.getElementById('audio-overlay');
    if (overlay) {
        overlay.addEventListener('click', hideOverlay);
    }

    // Configurar overlay de tarjeta
    const cardOverlay = document.getElementById('love-card-overlay');
    if (cardOverlay) {
        cardOverlay.addEventListener('click', (e) => {
            if (e.target === cardOverlay) {
                hideLoveCard();
            }
        });
    }

    // El overlay ya está visible por defecto en el CSS
    // Las animaciones están pausadas hasta que el usuario haga click

    console.log('✨ Experiencia lista!');
}

// ==========================================
// EASTER EGGS Y EXTRAS
// ==========================================

/**
 * Efecto especial al hacer doble click en el título
 */
function setupTitleEasterEgg() {
    const titles = document.querySelectorAll('.main-title');
    
    titles.forEach(title => {
        title.addEventListener('dblclick', () => {
            // Crear corazones aleatorios
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    createFloatingHeart(x, y);
                }, i * 100);
            }
            
            console.log('💕 Easter egg activado!');
        });
    });
}

// ==========================================
// DETECCIÓN DE MÓVIL
// ==========================================

/**
 * Detecta si el dispositivo es móvil
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Optimizaciones para móviles
 */
function mobileOptimizations() {
    if (isMobileDevice()) {
        console.log('📱 Dispositivo móvil detectado - Aplicando optimizaciones');
        
        // Reducir partículas en móvil para mejor rendimiento
        config.starCount = 25;
        config.particleCount = 12;
        config.shootingStarCount = 2;
        
        // Ajustar texto de instrucción para móvil
        setTimeout(() => {
            const instructionText = document.getElementById('instruction-text');
            if (instructionText && window.innerWidth < 600) {
                instructionText.textContent = 'Toca una flor 🌸';
            }
        }, 100);
        
        // Prevenir zoom en doble tap (iOS)
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        console.log('✨ Optimizaciones móviles aplicadas');
    }
}

// ==========================================
// EVENTOS DEL DOCUMENTO
// ==========================================

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        mobileOptimizations();
        init();
        setupTitleEasterEgg();
    });
} else {
    mobileOptimizations();
    init();
    setupTitleEasterEgg();
}

// Prevenir comportamientos no deseados
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ==========================================
// EXPORTS (para uso futuro)
// ==========================================

window.ValentineApp = {
    showLoveCard,
    hideLoveCard,
    playBackgroundMusic,
    stopBackgroundMusic,
    getRandomLoveMessage,
    config
};

console.log('💝 San Valentín App cargada correctamente');