<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C&S - Consulenza e Selezione | Centro Supporto</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>
    <!-- LOADING SCREEN -->
    <div id="loader" class="loader-wrapper">
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p class="loader-text">Caricamento Guida In Corso...</p>
        </div>
    </div>

    <!-- SFONDO SPLINE 3D -->
    <div class="spline-container">
        <iframe 
            id="spline-background" 
            src='https://my.spline.design/cybermannequin-pz7OkIdnMGOncgiSaOCN14tk/' 
            frameborder='0' 
            width='100%' 
            height='100%'
            allowfullscreen>
        </iframe>
    </div>

    <!-- OVERLAY GRADIENT -->
    <div class="overlay-gradient"></div>

    <!-- BADGE PERSONALIZZATO C&S - STATICO -->
    <div class="custom-spline-badge">
        <a href="https://www.consulenzaeselezione.com/" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M2 10H18M10 2C10 2 6 5 6 10C6 15 10 18 10 18M10 2C10 2 14 5 14 10C14 15 10 18 10 18" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Consulenza e Selezione</span>
        </a>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <img src="logo.png" alt="C&S Logo" class="logo-image">
            </div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link active" data-text="Home">Home</a></li>
                <li><a href="#guide" class="nav-link" data-text="Guide">Guide</a></li>
                <li><a href="#faq" class="nav-link" data-text="FAQ">FAQ</a></li>
                <li><a href="#contatti" class="nav-link" data-text="Contatti">Contatti</a></li>
            </ul>
            <div class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- HERO SECTION -->
    <section id="home" class="hero">
        <div class="hero-content">
            <div class="hero-badge" data-aos="fade-down">
                <span class="badge-icon">✨</span>
                <span>Centro Supporto Digitale</span>
            </div>
            
            <h1 class="hero-title" data-aos="fade-up" data-aos-delay="200">
                <span class="gradient-text">Centro</span>
                <span class="gradient-text">Supporto</span>
            </h1>
            
            <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="400">
                La tua guida completa per <strong>C&S Estrattore</strong>
            </p>
            
            <div class="hero-buttons" data-aos="fade-up" data-aos-delay="600">
                <button class="btn btn-primary" onclick="scrollToSection('guide')">
                    <span>Inizia Ora</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn btn-secondary" onclick="scrollToSection('contatti')">
                    <span>Contattaci</span>
                </button>
            </div>

            <div class="hero-stats" data-aos="fade-up" data-aos-delay="800">
                <div class="stat-item">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Casuale</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-number">5 Min</div>
                    <div class="stat-label">Setup</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Supporto</div>
                </div>
            </div>
        </div>
    </section>

    <!-- GUIDE SECTION -->
    <section id="guide" class="section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Guide</span>
                <h2 class="section-title">Come Utilizzare <span class="gradient-text">C&S Estrattore</span></h2>
                <p class="section-description">Scopri tutte le funzionalità in pochi semplici step</p>
            </div>

            <div class="cards-grid">
                <div class="card card-animated" data-aos="zoom-in-up" data-aos-delay="100" data-aos-duration="800">
                    <div class="card-glow"></div>
                    <div class="card-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M24 24L42 14M24 24L6 14M24 24V44" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3 class="card-title">Guida Rapida</h3>
                    <p class="card-text">Inizia in 5 minuti con la nostra guida step-by-step completa per utilizzare C&S Estrattore</p>
                    <button class="card-button" onclick="openModal('quick-guide')">
                        <span>Scopri di più</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div class="card card-animated" data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="800">
                    <div class="card-glow"></div>
                    <div class="card-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M40 20V8H28" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28 20L40 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 28V40H20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 28L8 40" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3 class="card-title">Importazione Dati</h3>
                    <p class="card-text">Recupera e carica le tue sessioni salvate con la password impostata</p>
                    <button class="card-button" onclick="openModal('import-guide')">
                        <span>Scopri di più</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div class="card card-animated" data-aos="zoom-in-up" data-aos-delay="300" data-aos-duration="800">
                    <div class="card-glow"></div>
                    <div class="card-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3"/>
                            <path d="M24 16V24L30 30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3 class="card-title">Estrazione Casuale</h3>
                    <p class="card-text">Scopri come funziona l'algoritmo di estrazione casuale certificato e garantito</p>
                    <button class="card-button" onclick="openModal('extraction-guide')">
                        <span>Scopri di più</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div class="card card-animated" data-aos="zoom-in-up" data-aos-delay="400" data-aos-duration="800">
                    <div class="card-glow"></div>
                    <div class="card-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M12 8V40H36V16L28 8H12Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28 8V16H36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3 class="card-title">Esportazione Risultati</h3>
                    <p class="card-text">Esporta e salva i risultati delle estrazioni in formato PDF</p>
                    <button class="card-button" onclick="openModal('export-guide')">
                        <span>Scopri di più</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="faq" class="section section-dark">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">FAQ</span>
                <h2 class="section-title">Domande <span class="gradient-text">Frequenti</span></h2>
                <p class="section-description">Risposte alle domande più comuni</p>
            </div>

            <div class="faq-container">
                <div class="faq-item" data-aos="fade-up" data-aos-delay="100">
                    <div class="faq-question">
                        <span>Come posso iniziare ad usare C&S Estrattore?</span>
                        <div class="faq-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="faq-answer">
                        <p>È semplicissimo! Apri l'applicazione, inserisci i tuoi numeri o lettere, clicca su "Aggiungi" e poi "Prepara". Premi SPAZIO sulla tastiera per avviare l'estrazione casuale.</p>
                    </div>
                </div>

                <div class="faq-item" data-aos="fade-up" data-aos-delay="200">
                    <div class="faq-question">
                        <span>Posso importare sessioni salvate?</span>
                        <div class="faq-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="faq-answer">
                        <p>Sì! Clicca su "Importa Storico", inserisci la password che hai scelto all'inizio, seleziona la sessione dalla lista a sinistra e continua con le estrazioni.</p>
                    </div>
                </div>

                <div class="faq-item" data-aos="fade-up" data-aos-delay="300">
                    <div class="faq-question">
                        <span>L'estrazione è veramente casuale?</span>
                        <div class="faq-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="faq-answer">
                        <p>Assolutamente sì! Utilizziamo algoritmi certificati che garantiscono una randomizzazione completamente casuale, senza ripetizioni e con tracciabilità completa.</p>
                    </div>
                </div>

                <div class="faq-item" data-aos="fade-up" data-aos-delay="400">
                    <div class="faq-question">
                        <span>Come posso esportare i risultati?</span>
                        <div class="faq-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="faq-answer">
                        <p>Clicca su "Esporta Storico PDF", inserisci la password, seleziona la sessione che vuoi salvare e scegli la destinazione sul tuo computer.</p>
                    </div>
                </div>

                <div class="faq-item" data-aos="fade-up" data-aos-delay="500">
                    <div class="faq-question">
                        <span>Cosa succede se dimentico la password?</span>
                        <div class="faq-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="faq-answer">
                        <p>La password è fondamentale per proteggere i tuoi dati. Se la dimentichi, contatta il supporto per assistenza nel recupero delle sessioni.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTACT SECTION - 4 CARD CON TELEFONO -->
    <section id="contatti" class="section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Contatti</span>
                <h2 class="section-title">Hai bisogno di <span class="gradient-text">Aiuto?</span></h2>
                <p class="section-description">Il nostro team è sempre disponibile per supportarti</p>
            </div>

            <div class="contact-grid">
                <!-- EMAIL -->
                <div class="contact-card" data-aos="flip-left" data-aos-delay="100">
                    <div class="contact-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M33.3333 6.66669H6.66667C5.19391 6.66669 4 7.8606 4 9.33335V30.6667C4 32.1394 5.19391 33.3334 6.66667 33.3334H33.3333C34.8061 33.3334 36 32.1394 36 30.6667V9.33335C36 7.8606 34.8061 6.66669 33.3333 6.66669Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M36 10L20 21.6667L4 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Email</h3>
                    <p>Hai domande o suggerimenti? Scrivici!</p>
                    <button class="contact-link" onclick="showEmailOptions()">
                        <span>Invia Email</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    
                    <!-- Menu Email Options -->
                    <div id="emailOptions" class="email-options" style="display: none;">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=csselezione03@gmail.com&su=Richiesta%20Supporto%20C%26S%20Estrattore&body=Ciao%20team%20C%26S,%0A%0A" target="_blank" rel="noopener noreferrer" class="email-option">
                            📧 Apri Gmail
                        </a>
                        <a href="mailto:csselezione03@gmail.com" class="email-option">
                            💻 Apri App Email
                        </a>
                        <button class="email-option copy-email" onclick="copyEmail(event)">
                            📋 Copia Email
                        </button>
                    </div>
                </div>

                <!-- TELEFONO -->
                <div class="contact-card" data-aos="flip-left" data-aos-delay="200">
                    <div class="contact-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M36 28.2V33.2C36.0011 33.6701 35.9058 34.1355 35.7208 34.5672C35.5357 34.9989 35.2652 35.3876 34.9256 35.7083C34.586 36.029 34.1847 36.2748 33.7463 36.4298C33.3079 36.5849 32.8419 36.6457 32.38 36.6084C27.1786 36.0284 22.1892 34.3156 17.78 31.6084C13.6869 29.1457 10.2157 25.6745 7.75296 21.5817C5.03798 17.1517 3.32481 12.1397 2.75796 6.91835C2.72073 6.45806 2.78118 5.99369 2.93531 5.5564C3.08944 5.1191 3.33379 4.71857 3.65243 4.37926C3.97106 4.03995 4.35746 3.76927 4.78655 3.58343C5.21565 3.3976 5.67862 3.30093 6.14629 3.30002H11.1463C11.9744 3.29166 12.7783 3.59344 13.4019 4.14677C14.0254 4.70009 14.4253 5.46653 14.5296 6.29502C14.724 7.95082 15.1228 9.57755 15.7173 11.145C15.9364 11.7089 15.992 12.3225 15.8782 12.9164C15.7643 13.5103 15.4854 14.0611 15.0713 14.51L12.993 16.5884C15.2488 20.8706 18.5521 24.1738 22.8343 26.4297L24.9126 24.3514C25.3616 23.9372 25.9124 23.6583 26.5063 23.5445C27.1002 23.4307 27.7138 23.4862 28.2776 23.7054C29.8451 24.2999 31.4719 24.6987 33.1276 24.893C33.9624 24.9981 34.7338 25.4037 35.2883 26.0355C35.8428 26.6674 36.1415 27.4803 36.1276 28.3167L36 28.2Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Telefono</h3>
                    <p>Chiamaci per supporto immediato e assistenza diretta</p>
                    <a href="tel:067900345" class="contact-link">
                        <span>06.7900345</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </div>

                <!-- SEDE OPERATIVA -->
                <div class="contact-card" data-aos="flip-left" data-aos-delay="300">
                    <div class="contact-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20 4C14.48 4 10 8.48 10 14C10 21.5 20 36 20 36C20 36 30 21.5 30 14C30 8.48 25.52 4 20 4Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="20" cy="14" r="4" stroke="currentColor" stroke-width="3"/>
                        </svg>
                    </div>
                    <h3>Sede Operativa</h3>
                    <p>Vieni a trovarci presso le nostre sedi per assistenza dedicata e consulenza personalizzata</p>
                    <button class="contact-link" onclick="openModal('location-info')">
                        <span>Scopri Dove Siamo</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <!-- SUPPORTO 24/7 -->
                <div class="contact-card" data-aos="flip-left" data-aos-delay="400">
                    <div class="contact-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4Z" stroke="currentColor" stroke-width="3"/>
                            <path d="M20 12V20L26 26" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3>Supporto 24/7</h3>
                    <p>Sempre a vostra disposizione, risposta in breve tempo</p>
                    <a href="mailto:csselezione03@gmail.com" class="contact-link">
                        <span>Richiedi Supporto</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- MODAL -->
    <div id="modal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div id="modal-body"></div>
        </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <img src="logo.png" alt="C&S Logo" class="footer-logo-img">
            </div>
            <div class="footer-text">
                <p>&copy; 2025 C&S - Consulenza e Selezione. Tutti i diritti riservati.</p>
                <p>Versione Software: 1.0.0</p>
                <p class="developer-credit">Developed by <span class="developer-name">Marius</span></p>
            </div>
        </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="script.js"></script>
</body>
</html>
