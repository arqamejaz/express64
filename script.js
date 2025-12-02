// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Emergency content visibility function
function ensureContentVisible() {
    const elements = document.querySelectorAll('section, .service-card, .highlight-card, .gallery-item');
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
    });
}

// Run visibility check after a delay
setTimeout(ensureContentVisible, 2000);

// Set dynamic years
function setDynamicYears() {
    const currentYear = new Date().getFullYear();
    
    // Set copyright year
    const copyrightElement = document.getElementById('current-year');
    if (copyrightElement) {
        copyrightElement.textContent = currentYear;
    }
}

// Set years immediately
setDynamicYears();

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic years first
    setDynamicYears();
    
    // Basic functionality first
    initializeMobileNav();
    initializeNavbarEffects();
    initializeFormHandling();
    initializeGalleryEffects();
    
    // Then animations (with delay to ensure content is visible)
    setTimeout(() => {
        initializeAnimations();
        initializeTypewriterEffect();
        initializeFloatingElements();
        initializeCounterAnimations();
        initializeParallax();
    }, 100);
});

// GSAP ScrollTrigger Animations
function initializeAnimations() {
    try {
        // Hero content animation (simplified)
        gsap.from(".hero-content", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.3
        });
        
        gsap.from(".hero-features .feature-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.8,
            ease: "power2.out"
        });

    // Section reveal animations
    gsap.utils.toArray("section:not(.hero)").forEach((section, i) => {
        gsap.from(section.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none none"
            }
        });
    });

    // Service cards stagger animation
    gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // Highlights cards with advanced stagger
    gsap.from(".highlight-card", {
        scale: 0.9,
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".highlights-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // Gallery masonry animation
    gsap.from(".gallery-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // About image parallax
    gsap.to(".about-image img", {
        y: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    // Text reveal animation
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    } catch (error) {
        console.log('Animation initialization error:', error);
        // Ensure all content is visible if animations fail
        gsap.set('section, .service-card, .highlight-card, .gallery-item', {
            opacity: 1,
            visibility: 'visible'
        });
    }
}

// Typewriter effect for hero title
function initializeTypewriterEffect() {
    try {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        const speed = 80;
        
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typewriter after a delay
        setTimeout(typeWriter, 1000);
        
        // Fallback: show full text after 6 seconds if typewriter fails
        setTimeout(() => {
            if (heroTitle.textContent !== originalText) {
                heroTitle.textContent = originalText;
            }
        }, 6000);
    } catch (error) {
        console.log('Typewriter effect error:', error);
    }
}

// Floating elements animation
function initializeFloatingElements() {
    // Create floating particles for Express 64 theme
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: rgba(37, 99, 235, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particle);
        
        // Animate particles
        gsap.to(particle, {
            y: -window.innerHeight,
            x: Math.random() * 200 - 100,
            opacity: 0,
            duration: Math.random() * 12 + 8,
            repeat: -1,
            delay: Math.random() * 8,
            ease: "none"
        });
        
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50
        });
    }
}

// Enhanced counter animations
function initializeCounterAnimations() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const textContent = stat.textContent;
        const numbers = textContent.match(/\d+/);
        if (!numbers) return;
        
        const endValue = parseInt(numbers[0]);
        const suffix = textContent.replace(/\d+/, '');
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
                gsap.from({ value: 0 }, {
                    value: endValue,
                    duration: 2.5,
                    ease: "power3.out",
                    onUpdate: function() {
                        stat.textContent = Math.floor(this.targets()[0].value) + suffix;
                    }
                });
            }
        });
    });
}

// Advanced parallax effects
function initializeParallax() {
    // Hero parallax
    gsap.to('.hero', {
        backgroundPosition: '50% 100%',
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Multi-layer parallax for sections
    gsap.utils.toArray('.service-card, .highlight-card').forEach(card => {
        gsap.to(card, {
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

// Mobile Navigation
function initializeMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate mobile menu
        if (navMenu.classList.contains('active')) {
            gsap.from('.nav-item', {
                x: -50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Enhanced navbar effects
function initializeNavbarEffects() {
    const navbar = document.getElementById('navbar');
    
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {
            className: "scrolled",
            targets: navbar
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery lightbox and effects
function initializeGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        // Hover effects
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.1,
                filter: "brightness(1.2)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                filter: "brightness(1)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Lightbox functionality
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
                opacity: 0;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                transform: scale(0.5);
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Animate lightbox in
            gsap.to(lightbox, { opacity: 1, duration: 0.3 });
            gsap.to(lightboxImg, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });
            
            // Close lightbox
            lightbox.addEventListener('click', () => {
                gsap.to(lightbox, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => document.body.removeChild(lightbox)
                });
            });
            
            // Close on escape key
            const closeOnEscape = (e) => {
                if (e.key === 'Escape') {
                    gsap.to(lightbox, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => document.body.removeChild(lightbox)
                    });
                    document.removeEventListener('keydown', closeOnEscape);
                }
            };
            document.addEventListener('keydown', closeOnEscape);
        });
    });
}

// Enhanced form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Animate button
        gsap.to(submitButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            gsap.to(submitButton, {
                backgroundColor: '#27ae60',
                duration: 0.3
            });
            
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                gsap.to(submitButton, {
                    backgroundColor: '',
                    duration: 0.3
                });
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(400px);
        background: ${type === 'success' ? '#27ae60' : '#dc2626'};
        font-family: 'Poppins', sans-serif;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    gsap.to(notification, {
        x: -400,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    setTimeout(() => {
        gsap.to(notification, {
            x: 400,
            duration: 0.3,
            onComplete: () => document.body.removeChild(notification)
        });
    }, 4000);
}

// Advanced hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    // Service cards hover enhancement
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(37, 99, 235, 0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.service-icon'), {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.service-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Highlight cards hover enhancement
    document.querySelectorAll('.highlight-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(220, 38, 38, 0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.highlight-icon'), {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.highlight-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance optimization
window.addEventListener('load', () => {
    // Hide loading overlay if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => loader.style.display = 'none'
        });
    }
    
    // Start entrance animations
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });
    
    // Prefetch next likely pages (if applicable)
    const prefetchLinks = [
        '/contact',
        '/services',
        '/about'
    ];
    
    prefetchLinks.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = link;
        document.head.appendChild(linkElement);
    });
});

// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// Express 64 specific enhancements
function initializeExpress64Features() {
    // Beer and wine theme particles
    const colors = ['rgba(37, 99, 235, 0.3)', 'rgba(220, 38, 38, 0.3)', 'rgba(255, 255, 255, 0.2)'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            top: 100vh;
            left: ${Math.random() * 100}vw;
        `;
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            y: -window.innerHeight - 100,
            x: Math.random() * 200 - 100,
            opacity: 0,
            duration: 6,
            ease: "none",
            onComplete: () => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }
        });
    }, 3000);
}

// Initialize Express 64 specific features
setTimeout(initializeExpress64Features, 2000);