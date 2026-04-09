document.addEventListener('DOMContentLoaded', () => {
    
    // --- Efekt maszyny do pisania dla napisu Hero ---
    const typewriterElement = document.querySelector('.typewriter');
    const texts = ['doświadczenia w sieci.', 'nowoczesne aplikacje.', 'piękne interfejsy.'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pauza na końcu słowa
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pauza przed nowym słowem
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Uruchomienie efektu pisania
    setTimeout(typeEffect, 1000);

    // --- Efekt pojawiania się elementów przy przewijaniu (Scroll Reveal) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcjonalnie: przestań obserwować po nałożeniu animacji by wywołała się tylko raz
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- Tło Nawigacji przy przewijaniu ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Menu mobilne Hamburger ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger i');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Zmiana ikony z hamburgera na "X"
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Zamknij menu po kliknięciu w link na mobile
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
            
            // Podświetl aktywny link
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Obsługa prostego zgłoszenia formularza ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
        btn.disabled = true;

        // Symulacja wysyłania API i efekt "Sukcesu"
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Wysłano pomyślnie!';
            btn.style.background = '#22c55e'; // kolor sukcesu
            btn.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.4)';
            contactForm.reset();

            // Powrót do domyślnego stanu przycisku
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });

    // --- Ustawienie aktualnego roku w stopce ---
    document.getElementById('year').textContent = new Date().getFullYear();
});
