// ============================================
// INITIALIZE
// ============================================

AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    disable: 'mobile'
});

// ============================================
// LOADER
// ============================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const splineIframe = document.getElementById('spline-background');
    
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
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });

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
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

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
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
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
                <li><strong>Avvio dell'applicazione:</strong> Apri C&S Estrattore sul tuo dispositivo per iniziare.</li>
                <li><strong>Inserimento dei dati:</strong> Inserisci i numeri o le lettere che desideri utilizzare nelle apposite sezioni dedicate.</li>
                <li><strong>Conferma degli elementi:</strong> Clicca sul pulsante "Aggiungi" per confermare. Gli elementi inseriti appariranno nella sezione "Lista Opzioni".</li>
                <li><strong>Preparazione dell'estrazione:</strong> Premi il pulsante "Prepara" per avviare il processo di estrazione casuale.</li>
                <li><strong>Avvio dell'estrazione:</strong> Verrà visualizzata una schermata con tutti gli elementi inseriti. Premi il tasto SPAZIO sulla tastiera per avviare l'estrazione.</li>
                <li><strong>Proseguimento:</strong> Una volta estratto l'elemento, clicca sul pulsante "Prossima Estrazione" per continuare con ulteriori estrazioni.</li>
            </ol>
            <p>⁉️ Per ulteriori informazioni o chiarimenti, non esitare a contattarci!</p>
        `
    },
    'import-guide': {
        title: '📥 Importazione Dati',
        content: `
            <h3>Come Importare Sessioni Salvate</h3>
            <p>Il sistema di importazione ti permette di recuperare e continuare sessioni precedentemente salvate:</p>
            <ol>
                <li><strong>Accesso all'importazione:</strong> Clicca sul pulsante "Importa Storico" presente nell'interfaccia principale.</li>
                <li><strong>Autenticazione:</strong> Inserisci la password che hai impostato all'inizio dell'utilizzo del software.</li>
                <li><strong>Selezione della sessione:</strong> Nella colonna di sinistra appariranno tutte le sessioni salvate. Clicca sulla sessione che desideri recuperare.</li>
                <li><strong>Caricamento dei dati:</strong> Il sistema caricherà automaticamente tutti gli elementi (lettere o numeri) ancora non estratti dalla sessione selezionata.</li>
                <li><strong>Avvio dell'estrazione:</strong> Clicca su "Prepara" e premi SPAZIO sulla tastiera per continuare con le estrazioni.</li>
            </ol>
            <p><strong>Nota importante:</strong> Assicurati di ricordare la password impostata, poiché è necessaria per accedere a tutte le funzionalità di importazione ed esportazione.</p>
        `
    },
    'extraction-guide': {
        title: '🎲 Estrazione Casuale',
        content: `
            <h3>Funzionalità Avanzate</h3>
            <p>L'algoritmo di estrazione utilizza tecniche certificate per garantire:</p>
            <ul>
                <li><strong>Randomizzazione certificata:</strong> Sistema completamente casuale e imparziale</li>
                <li><strong>Nessuna ripetizione:</strong> Gli elementi estratti vengono automaticamente esclusi dalle estrazioni successive</li>
                <li><strong>Velocità ottimale:</strong> Elaborazione istantanea anche con dataset di grandi dimensioni</li>
                <li><strong>Tracciabilità completa:</strong> Ogni estrazione viene registrata nello storico con data e ora</li>
            </ul>
            <p><strong>Affidabilità:</strong> Il sistema garantisce l'integrità di ogni estrazione, rendendola ideale per processi di selezione ufficiali.</p>
        `
    },
    'export-guide': {
        title: '💾 Esportazione Risultati',
        content: `
            <h3>Come Esportare i Dati</h3>
            <p>Il sistema di esportazione ti permette di salvare i risultati delle tue sessioni in formato PDF:</p>
            <ol>
                <li><strong>Accesso all'esportazione:</strong> Clicca sul pulsante "Esporta Storico PDF" dall'interfaccia principale.</li>
                <li><strong>Autenticazione:</strong> Il software ti chiederà di inserire la password impostata all'inizio.</li>
                <li><strong>Selezione della sessione:</strong> Scegli la sessione che desideri esportare dalla lista disponibile (sessione in corso o sessioni passate).</li>
                <li><strong>Scelta della destinazione:</strong> Seleziona la cartella di destinazione sul tuo computer dove salvare il file.</li>
                <li><strong>Nome del file:</strong> Assegna un nome personalizzato al file PDF che verrà generato.</li>
                <li><strong>Salvataggio:</strong> Il sistema genererà automaticamente un documento PDF completo con tutti i dettagli dell'estrazione.</li>
            </ol>
            <p><strong>Formato del documento:</strong> Il PDF esportato include data, ora, elementi estratti e ordine di estrazione per una documentazione completa e professionale.</p>
        `
    },
    'location-info': {
        title: '📍 Le Nostre Sedi',
        content: `
            <h3>Dove Trovarci</h3>
            <div class="location-list">
                <div class="location-item">
                    <div class="location-icon">📍</div>
                    <div class="location-details">
                        <h4>Sede Legale</h4>
                        <p>Via Michele Migliarini n. 51/A - 00173 Roma</p>
                    </div>
                </div>
                
                <div class="location-item">
                    <div class="location-icon">🏢</div>
                    <div class="location-details">
                        <h4>Sede Operativa Roma</h4>
                        <p>Via Tuscolana n. 1890/B - 00173</p>
                    </div>
                </div>
                
                <div class="location-item">
                    <div class="location-icon">🏙️</div>
                    <div class="location-details">
                        <h4>Sede Operativa Milano</h4>
                        <p>Corso Italia, 22 - 20122</p>
                    </div>
                </div>
            </div>
            
            <div class="location-footer">
                <p><strong>Orari di apertura:</strong> Lun-Ven 9:00-18:00</p>
                <p>Per appuntamenti o informazioni, contattaci via email o telefono.</p>
            </div>
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
        document.body.style.overflow = 'hidden';
    }
}

function closeModalFunc() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModalFunc);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModalFunc);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFunc();
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
    const email = 'csselezione03@gmail.com';
    
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
        alert('Email: csselezione03@gmail.com');
    });
}

document.addEventListener('click', (e) => {
    const emailOptions = document.getElementById('emailOptions');
    const emailButton = e.target.closest('button[onclick*="showEmailOptions"]');
    const emailMenu = e.target.closest('.email-options');
    
    if (emailOptions && 
        emailOptions.style.display === 'flex' && 
        !emailButton && 
        !emailMenu) {
        emailOptions.style.display = 'none';
    }
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
// PARALLAX EFFECT - SOLO DESKTOP
// ============================================

const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }, { passive: true });
}

// ============================================
// CURSOR GLOW EFFECT - SOLO DESKTOP
// ============================================

if (!isMobile) {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

console.log('🚀 C&S Estrattore - Website loaded successfully!');
