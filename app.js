document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Light/Dark Theme Switcher
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Minor visual feedback
        themeToggleBtn.style.transform = 'scale(0.9) rotate(45deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 150);
    });

    /* ==========================================================================
       2. Sticky Header
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    function checkHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.remove('header-transparent');
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.add('header-transparent');
        }
    }
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll(); // Call once on load

    /* ==========================================================================
       3. Mobile Navigation Hamburger Menu
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when links are clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       4. Active Scroll Spy
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollSpy() {
        const scrollPosition = window.scrollY + 120; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Call once on load

    /* ==========================================================================
       5. Scroll Reveal Intersection Observer
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       6. Floating Back to Top Button
       ========================================================================== */
    const backToTopBtn = document.getElementById('floating-back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       7. Mock Form Handlers (Newsletter & Contact)
       ========================================================================== */
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;

        newsletterStatus.textContent = 'Subscribing...';
        newsletterStatus.className = 'form-status';

        setTimeout(() => {
            newsletterStatus.textContent = `Thank you! ${email} has been subscribed to Vanguard Enterprise Reports.`;
            newsletterStatus.className = 'form-status success';
            newsletterForm.reset();
        }, 1200);
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        contactStatus.textContent = 'Sending message...';
        contactStatus.className = 'form-status';

        setTimeout(() => {
            contactStatus.textContent = 'Your inquiry has been received. Our procurement and contracting director will contact you within 24 hours.';
            contactStatus.className = 'form-status success';
            contactForm.reset();
        }, 1500);
    });
});
