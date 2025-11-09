// ============================================
// INITIALIZE
// ============================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// ============================================
// LOADER
// ============================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const splineIframe = document.getElementById('spline-background');
    
    // Wait for Spline to load
    setTimeout(() => {
        loader.classList.add('hidden');
        splineIframe.style.opacity = '1';
    }, 2000);
});

// ============================================
// NAVBAR SCROLL & BADGE HIDE
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class to navbar and body
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        // Smooth scroll
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// FAQ ACCORDION
// ============================================

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

// ============================================
// MODAL FUNCTIONALITY
// ============================================

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

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
                <li><strong>Step 5:</strong> A questo punto vi apparirà una schermata con tutti numeri o lettere e basta premere SPAZIO (sulla tastiera) per avviare l'estrazione</li>
                <li><strong>Step 6:</strong> Una volta estratto il numero o la lettera cliccare sul pulsante "Ok" che si trova sotto la lettera o numero estratto e potete continuare con le estrazioni</li>
                <li><strong>Step 7:</strong> Se dovete eseguire SOLO "1" (UNA ESTRAZIONE), e volete tornare al menu principale, basta cliccare sul simbolo "☰" e tornerete al menu principale</li>
                <li><strong>Step 8:</strong> Una volta tornati al menu principale vi basterà cliccare il tasto "Pulisci" ed il programma in modo automatico sarà pronto per una nuova estrazione</li>
                <li><strong>Step 9:</strong> Per vedere lo storico delle estrazioni vi basterà andare nella sezione "Storico Estrazioni" e potrete visualizzare i risultati</li>
                <li><strong>Step 10:</strong> ⚠️ ATTENZIONE!! Se andate nella sezione Storico e cliccate sul pulsante "Pulisci Storico" NON avrete più la possibilità di vedere i risultati delle estrazioni precedenti</li>
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
        modal.classList.add('show');
        document.body.classList.add('no-scroll');
    }
}

function closeModalFunc() {
    modal.classList.remove('show');
    document.body.classList.remove('no-scroll');
}

if (modalClose) {
    modalClose.addEventListener('click', closeModalFunc);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModalFunc);
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFunc();
    }
});

// ============================================
// CARDS HOVER EFFECT
// ============================================

document.querySelectorAll('.card-interactive').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const glow = this.querySelector('.card-glow');
        if (glow) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.2) 0%, transparent 50%)`;
        }
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .faq-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// SMOOTH REVEAL ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.section-header, .hero-content');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ============================================
// EMAIL OPTIONS
// ============================================

function showEmailOptions() {
    const emailOptions = document.getElementById('emailOptions');
    if (emailOptions.style.display === 'none' || emailOptions.style.display === '') {
        emailOptions.style.display = 'flex';
    } else {
        emailOptions.style.display = 'none';
    }
}

function copyEmail(event) {
    event.stopPropagation();
    const email = 'segreteria@ciesseselezione.it';
    
    navigator.clipboard.writeText(email).then(() => {
        const btn = event.target.closest('.copy-email');
        const originalText = btn.textContent;
        btn.textContent = '✅ Email Copiata!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Errore nella copia:', err);
        alert('Email: segreteria@ciesseselezione.it');
    });
}

// Chiudi menu email se clicchi fuori
document.addEventListener('click', (e) => {
    const emailOptions = document.getElementById('emailOptions');
    const contactCard = e.target.closest('.contact-card');
    const emailButton = e.target.closest('button[onclick*="showEmailOptions"]');
    
    if (!contactCard && !emailButton && emailOptions && emailOptions.style.display === 'flex') {
        emailOptions.style.display = 'none';
    }
});

// ============================================
// CURSOR GLOW EFFECT
// ============================================

const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

console.log('🚀 C&S Estrattore - Sito Web caricato con successo!');
