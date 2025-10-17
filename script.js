// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00d4ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const wasActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!wasActive) {
            faqItem.classList.add('active');
        }
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

const modalContent = {
    'quick-guide': {
        title: '🚀 Guida Rapida',
        content: `
            <h3>Inizia in 5 Minuti</h3>
            <ol>
                <li><strong>Step 1:</strong> Apri l'applicazione C&S Estrattore</li>
                <li><strong>Step 2:</strong> Inserisci i tuoi numeri e lettere nelle apposite sezioni</li>
                <li><strong>Step 3:</strong> Clicca su "Aggiungi" e nella sezione "Lista Opzioni" vedrai i numeri o le lettere che hai aggiunto</li>
                <li><strong>Step 4:</strong> Premi "Prepara" per avviare l'estrazione casuale</li>
                <li><strong>Step 4:</strong> A questo punto vi apparirà una schermata con tutti numeri o lettere e basta premere SPAZIO(sulla tastiera) per avviare l'estrazione</li>
                <li><strong>Step 5:</strong> Una volta estratto il numero o la lettera cliccare sul pulsante "Ok" che si trovo sotto la lettera o numnero estratto e potete continuare con le estrazioni</li>
                <li><strong>Step 5:</strong> Se dovete eseguire SOLO "1" (UNA ESTRAZIONE),e volete tornare al menu principale , basta cliccare sul simbolo "☰" e tornerete al menu principale</li>
                <li><strong>Step 5:</strong> Una volta tornati al menu principale vi basterà cliccare il tasto "Pulisci" ed il programma in modo automatico sarà pronto per una nuova estrazione</li>
                <li><strong>Step 5:</strong> Per vedere lo storico delle estrazioni vi basterà andare nella sezione "Storico Estrazioni" e potrete visualizzare i risultati</li>
                <li><strong>Step 5:</strong> ⚠️ ATTENZIONE!! Se andate nella sezione Storico e cliccate sul pulsante "Pulisci Storico" NON avrete più la posibilità di vedere i risultati delle estrazioni precedenti</li>
            </ol>

            <p>⁉️ Per ulteriori informazioni o chiarimenti, non esitare a contattarci!</p>
        `
    },
    'import-guide': {
        title: '📥 Importazione Dati',
        content: `
            <h3>Come Importare Liste</h3>
            <p>Puoi importare liste da diversi formati:</p>
            <ul>
                <li><strong>Excel (.xlsx):</strong> Seleziona il file e scegli la colonna da importare</li>
                <li><strong>CSV (.csv):</strong> Il software rileverà automaticamente il delimitatore</li>
                <li><strong>File di testo (.txt):</strong> Un elemento per riga</li>
            </ul>
            <p><strong>Suggerimento:</strong> Assicurati che i dati siano puliti e senza spazi extra.</p>
        `
    },
    'extraction-guide': {
        title: '🎲 Estrazione Casuale',
        content: `
            <h3>Funzionalità Avanzate</h3>
            <p>L'algoritmo di estrazione utilizza tecniche certificate per garantire:</p>
            <ul>
                <li>Randomizzazione completamente casuale</li>
                <li>Nessuna ripetizione degli elementi estratti</li>
                <li>Velocità di elaborazione ottimale anche con grandi dataset</li>
                <li>Tracciabilità completa nello storico</li>
            </ul>
            <p>Ogni estrazione è registrata con data, ora e risultati completi.</p>
        `
    },
    'export-guide': {
        title: '💾 Salvataggio Risultati',
        content: `
            <h3>Esportazione e Condivisione</h3>
            <p>Dopo l'estrazione, puoi:</p>
            <ul>
                <li>Esportare i risultati in formato Excel</li>
                <li>Salvare in formato PDF per stampa o condivisione</li>
                <li>Copiare negli appunti per uso immediato</li>
                <li>Visualizzare lo storico completo delle estrazioni passate</li>
            </ul>
            <p><strong>Nota:</strong> Tutti i dati sono salvati localmente sul tuo computer.</p>
        `
    }
};

function openModal(guideType) {
    const content = modalContent[guideType];
    if (content) {
        modalBody.innerHTML = `
            <h2>${content.title}</h2>
            ${content.content}
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Scroll to section function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector('.hero-subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;

setTimeout(() => {
    const typeWriter = setInterval(() => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);
}, 1000);

// === NAVBAR HIDE ON SCROLL ===
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 50) {
        // Solo quando sei QUASI in cima - mostra navbar
        navbar.style.transform = 'translateY(0)';
    } else {
        // Altrimenti - nascondi navbar
        navbar.style.transform = 'translateY(-100%)';
    }
    
    lastScroll = currentScroll;
});
