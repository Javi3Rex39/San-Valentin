// ==========================================
// CONFIGURACIÓN Y VARIABLES
// ==========================================

const config = {
    enableMusic: true, // Cambiar a false para deshabilitar música
    enableSounds: true, // Efectos de sonido
    startDate: '2024-11-08', // Fecha de inicio de la relación (YYYY-MM-DD)
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
// CONTADOR DE DÍAS
// ==========================================

/**
 * Calcula el tiempo exacto desde la fecha de inicio
 */
function calculateTimeTogether() {
    const startDate = new Date(config.startDate + 'T00:00:00');
    const now = new Date();
    
    // Calcular diferencia total en milisegundos
    let diff = now - startDate;
    
    // Calcular cada unidad
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    diff -= years * (1000 * 60 * 60 * 24 * 365.25);
    
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
    diff -= months * (1000 * 60 * 60 * 24 * 30.44);
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    
    const seconds = Math.floor(diff / 1000);
    
    return { years, months, days, hours, minutes, seconds };
}

/**
 * Formatea el tiempo de manera bonita
 */
function formatTimeTogether(time) {
    const parts = [];
    
    if (time.years > 0) {
        parts.push(`${time.years} ${time.years === 1 ? 'año' : 'años'}`);
    }
    if (time.months > 0) {
        parts.push(`${time.months} ${time.months === 1 ? 'mes' : 'meses'}`);
    }
    if (time.days > 0) {
        parts.push(`${time.days} ${time.days === 1 ? 'día' : 'días'}`);
    }
    if (time.hours > 0) {
        parts.push(`${time.hours} ${time.hours === 1 ? 'hora' : 'horas'}`);
    }
    if (time.minutes > 0) {
        parts.push(`${time.minutes} ${time.minutes === 1 ? 'minuto' : 'minutos'}`);
    }
    if (time.seconds > 0) {
        parts.push(`${time.seconds} ${time.seconds === 1 ? 'segundo' : 'segundos'}`);
    }
    
    // Si no hay nada, mostrar "recién empezamos"
    if (parts.length === 0) {
        return "Recién empezamos 💕";
    }
    
    // Unir con comas y "y" antes del último elemento
    if (parts.length === 1) {
        return parts[0];
    } else if (parts.length === 2) {
        return parts.join(' y ');
    } else {
        const last = parts.pop();
        return parts.join(', ') + ' y ' + last;
    }
}

/**
 * Actualiza el contador de días en el DOM
 */
function updateDaysCounter() {
    const counter = document.getElementById('days-counter');
    if (!counter) return;
    
    const time = calculateTimeTogether();
    const formattedTime = formatTimeTogether(time);
    counter.textContent = `${formattedTime} juntos 💕`;
    
    // Actualizar cada segundo para que sea en tiempo real
    setTimeout(updateDaysCounter, 1000);
}

// ==========================================
// EFECTOS DE SONIDO
// ==========================================

/**
 * Inicializa el contexto de audio
 */
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

/**
 * Reproduce un sonido cristalino al tocar una flor
 */
function playFlowerSound() {
    if (!config.enableSounds) return;
    
    const ctx = initAudioContext();
    
    // Crear múltiples tonos para efecto cristalino
    const frequencies = [
        1318.51, // E6
        1975.53, // B6
        2637.02  // E7
    ];
    
    frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        // Usar triangle wave para sonido más cristalino
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const delay = index * 0.03;
        
        // Envelope muy delicado
        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.5);
        
        oscillator.start(ctx.currentTime + delay);
        oscillator.stop(ctx.currentTime + delay + 0.5);
    });
}

/**
 * Reproduce un sonido mágico cristalino al aparecer la tarjeta
 */
function playCardSound() {
    if (!config.enableSounds) return;
    
    const ctx = initAudioContext();
    
    // Arpeggio ascendente tipo cascada cristalina
    const notes = [
        { freq: 523.25, time: 0 },     // C5
        { freq: 659.25, time: 0.06 },  // E5
        { freq: 783.99, time: 0.12 },  // G5
        { freq: 1046.50, time: 0.18 }, // C6
        { freq: 1318.51, time: 0.24 }  // E6
    ];
    
    notes.forEach(note => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        // Filtro pasa-altos para sonido más brillante
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(note.freq, ctx.currentTime);
        
        // Envelope cristalino
        gainNode.gain.setValueAtTime(0, ctx.currentTime + note.time);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + note.time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + 0.8);
        
        oscillator.start(ctx.currentTime + note.time);
        oscillator.stop(ctx.currentTime + note.time + 0.8);
    });
    
    // Agregar un toque de "brillo" con frecuencias altas
    setTimeout(() => {
        const shimmer = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        
        shimmer.connect(shimmerGain);
        shimmerGain.connect(ctx.destination);
        
        shimmer.type = 'sine';
        shimmer.frequency.setValueAtTime(2637.02, ctx.currentTime); // E7
        
        shimmerGain.gain.setValueAtTime(0, ctx.currentTime);
        shimmerGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        
        shimmer.start(ctx.currentTime);
        shimmer.stop(ctx.currentTime + 0.6);
    }, 250);
}

/**
 * Reproduce un sonido suave al cerrar la tarjeta
 */
function playCloseSound() {
    if (!config.enableSounds) return;
    
    const ctx = initAudioContext();
    
    // Dos notas descendentes suaves
    const notes = [
        { freq: 1046.50, time: 0 },    // C6
        { freq: 523.25, time: 0.08 }   // C5
    ];
    
    notes.forEach(note => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(note.freq, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + note.time);
        gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + note.time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + 0.4);
        
        oscillator.start(ctx.currentTime + note.time);
        oscillator.stop(ctx.currentTime + note.time + 0.4);
    });
}

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

    // Reproducir sonido mágico
    playCardSound();

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

    // Reproducir sonido de cierre
    playCloseSound();

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
            
            // Reproducir sonido de flor
            playFlowerSound();
            
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
            
            // Reproducir sonido de flor
            playFlowerSound();
            
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

    // Actualizar contador de días
    updateDaysCounter();

    // Generar elementos dinámicos
    generateStarrySky();
    generateBackgroundParticles();

    // Configurar eventos
    setupFlowerEvents();
    setupSecretLetterTrigger(); // Easter egg de la carta

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
    console.log('💡 Pista: Mantén presionado algo especial... 🤫');
    console.log('💖 Pista: Doble click en el título libera corazones... 💕');
}

// ==========================================
// CARTA SECRETA (EASTER EGG)
// ==========================================

/**
 * Abre la carta secreta con animación
 */
function openSecretLetter() {
    const overlay = document.getElementById('secret-letter-overlay');
    if (!overlay) return;

    // Reproducir sonido especial
    playLetterSound();

    // Mostrar overlay
    overlay.style.display = 'flex';
    
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    // Generar pétalos cayendo
    generateFallingPetals();

    console.log('💌 Carta secreta revelada!');
}

/**
 * Cierra la carta secreta
 */
function closeSecretLetter() {
    const overlay = document.getElementById('secret-letter-overlay');
    if (!overlay) return;

    // Reproducir sonido de cierre
    playCloseSound();

    overlay.classList.remove('active');

    setTimeout(() => {
        overlay.style.display = 'none';
        
        // Limpiar pétalos
        const petalsContainer = document.getElementById('falling-petals');
        if (petalsContainer) {
            petalsContainer.innerHTML = '';
        }
    }, 500);
}

// Hacer la función global para el botón HTML
window.closeSecretLetter = closeSecretLetter;

/**
 * Genera pétalos cayendo
 */
function generateFallingPetals() {
    const container = document.getElementById('falling-petals');
    if (!container) return;

    // Limpiar pétalos anteriores
    container.innerHTML = '';

    const petalEmojis = ['🌸', '🌺', '🌹', '💮', '🏵️'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 2 + 's';
        petal.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        container.appendChild(petal);
    }
}

/**
 * Sonido especial para abrir la carta
 */
function playLetterSound() {
    if (!config.enableSounds) return;
    
    const ctx = initAudioContext();
    
    // Secuencia mágica y romántica
    const melody = [
        { freq: 523.25, time: 0 },     // C5
        { freq: 659.25, time: 0.15 },  // E5
        { freq: 783.99, time: 0.3 },   // G5
        { freq: 1046.50, time: 0.45 }, // C6
        { freq: 1318.51, time: 0.6 },  // E6
        { freq: 1568, time: 0.75 },    // G6
        { freq: 2093, time: 0.9 }      // C7
    ];
    
    melody.forEach(note => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(note.freq, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + note.time);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + note.time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + 1);
        
        oscillator.start(ctx.currentTime + note.time);
        oscillator.stop(ctx.currentTime + note.time + 1);
    });
}

/**
 * Configura el evento de mantener presionado en el contador
 */
function setupSecretLetterTrigger() {
    const counter = document.getElementById('days-counter');
    if (!counter) return;

    let pressTimer = null;
    let isLongPress = false;

    // Para desktop: mantener click
    counter.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isLongPress = false;
        
        // Agregar clase visual de presión
        counter.classList.add('pressing');
        
        pressTimer = setTimeout(() => {
            isLongPress = true;
            openSecretLetter();
            counter.classList.remove('pressing');
        }, 800); // 800ms = 0.8 segundos
    });

    counter.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
        counter.classList.remove('pressing');
    });

    counter.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
        counter.classList.remove('pressing');
    });

    // Para móvil: mantener toque
    counter.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isLongPress = false;
        
        // Agregar clase visual de presión
        counter.classList.add('pressing');
        
        pressTimer = setTimeout(() => {
            isLongPress = true;
            openSecretLetter();
            counter.classList.remove('pressing');
        }, 800);
    }, { passive: false });

    counter.addEventListener('touchend', (e) => {
        e.preventDefault();
        clearTimeout(pressTimer);
        counter.classList.remove('pressing');
    }, { passive: false });

    counter.addEventListener('touchcancel', () => {
        clearTimeout(pressTimer);
        counter.classList.remove('pressing');
    });

    // Agregar cursor pointer para dar pista
    counter.style.cursor = 'pointer';
    counter.title = '💡 Mantén presionado aquí para descubrir algo especial';
    
    // Configurar botón de cerrar carta
    const closeBtn = document.getElementById('letter-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSecretLetter);
        closeBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            closeSecretLetter();
        }, { passive: false });
    }

    // Configurar cerrar al hacer click fuera de la carta
    const letterOverlay = document.getElementById('secret-letter-overlay');
    if (letterOverlay) {
        letterOverlay.addEventListener('click', (e) => {
            if (e.target === letterOverlay) {
                closeSecretLetter();
            }
        });
    }
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
        // Para desktop: doble click
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

        // Para móvil: doble tap
        let lastTap = 0;
        title.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;

            if (tapLength < 400 && tapLength > 0) {
                // Doble tap detectado
                e.preventDefault();
                
                // Crear corazones aleatorios
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const x = Math.random() * window.innerWidth;
                        const y = Math.random() * window.innerHeight;
                        createFloatingHeart(x, y);
                    }, i * 100);
                }
                
                console.log('💕 Easter egg activado en móvil!');
            }
            
            lastTap = currentTime;
        }, { passive: false });
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