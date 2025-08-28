// Professional cursor system with improved rendering and performance
const cursor = document.querySelector('.cursor');
const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let isHovering = false;
let isVisible = true;
let animationFrameId = null;
let isReducedMotion = false;
let lastTime = 0;

// Check for reduced motion preference
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = mediaQuery.matches;
    
    mediaQuery.addEventListener('change', (e) => {
        isReducedMotion = e.matches;
    });
}

// Improved throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Update mouse position with improved throttling
const updateMousePosition = throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position immediately for responsive feel
    if (cursor && isVisible) {
        cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) translateZ(0)`;
    }
}, isReducedMotion ? 16 : 8); // Respect user's motion preferences

document.addEventListener('mousemove', updateMousePosition, { passive: true });

// Enhanced follower animation with improved performance
function animateFollower(currentTime) {
    if (!isVisible) {
        animationFrameId = requestAnimationFrame(animateFollower);
        return;
    }
    
    // Limit frame rate for better performance
    if (currentTime - lastTime < (isReducedMotion ? 32 : 16)) {
        animationFrameId = requestAnimationFrame(animateFollower);
        return;
    }
    lastTime = currentTime;
    
    // Use easing for smoother movement
    const ease = isReducedMotion ? 0.12 : 0.08; // Reduced for better performance
    
    // Calculate distance for adaptive speed
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Skip update if movement is very small (performance optimization)
    if (distance < 0.5) {
        animationFrameId = requestAnimationFrame(animateFollower);
        return;
    }
    
    // Adaptive speed based on distance - slower for closer distances
    let speed = ease;
    if (distance > 100) {
        speed = ease * (isReducedMotion ? 1.1 : 1.3); // Reduced multiplier
    } else if (distance < 30) {
        speed = ease * (isReducedMotion ? 0.6 : 0.4); // Slower for close distances
    }
    
    followerX += dx * speed;
    followerY += dy * speed;
    
    if (cursorFollower) {
        const size = isHovering ? 60 : 40;
        const offset = size / 2;
        
        cursorFollower.style.transform = `translate(${followerX - offset}px, ${followerY - offset}px) translateZ(0)`;
    }
    
    animationFrameId = requestAnimationFrame(animateFollower);
}

// Start animation loop
animateFollower();

// Clean up animation frame on page unload
window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    } else {
        animateFollower();
    }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    isVisible = false;
    if (cursor) cursor.style.opacity = '0';
    if (cursorFollower) cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    isVisible = true;
    if (cursor) cursor.style.opacity = '1';
    if (cursorFollower) cursorFollower.style.opacity = '1';
});

// Enhanced hover states for interactive elements with performance optimizations
const interactiveElements = document.querySelectorAll('a, button, .sector-card, .nav-item, .cta-primary, .cta-secondary, .logo, .contact-card, .contact-link, .social-link, .footer-links a, .submit-btn');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        isHovering = true;
        if (cursor) {
            cursor.classList.add('hover');
            cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(0.8) translateZ(0)`;
        }
        if (cursorFollower) {
            cursorFollower.classList.add('hover');
        }
    });
    
    element.addEventListener('mouseleave', () => {
        isHovering = false;
        if (cursor) {
            cursor.classList.remove('hover');
            cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(1) translateZ(0)`;
        }
        if (cursorFollower) {
            cursorFollower.classList.remove('hover');
        }
    });
});

// Click animation
document.addEventListener('mousedown', () => {
    if (cursorFollower) cursorFollower.classList.add('click');
});

document.addEventListener('mouseup', () => {
    if (cursorFollower) cursorFollower.classList.remove('click');
});

// Mars particle system with reduced count for better performance
function createParticles() {
    const container = document.querySelector('.mars-particles');
    const particleCount = 25; // Reduced from 50 for better performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (20 + Math.random() * 15) + 's';
        container.appendChild(particle);
    }
}

// Neural network background with reduced complexity
function createNeuralNetwork() {
    const container = document.querySelector('.neural-bg');
    const lineCount = 12; // Reduced from 20 for better performance
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'neural-line';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        line.style.width = (40 + Math.random() * 150) + 'px'; // Reduced width range
        line.style.transform = `rotate(${Math.random() * 360}deg) translateZ(0)`;
        line.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(line);
    }
}

// Advanced glitch effects - now optimized for performance
function initHoverGlitchEffects() {
    const glitchElements = document.querySelectorAll('.hero-title, .logo, .nav-item, .cta-primary, .cta-secondary, .sector-card');
    
    // Debounce function to limit glitch effect frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    glitchElements.forEach(element => {
        const debouncedGlitch = debounce(() => {
            // Trigger glitch animation via CSS class
            element.style.animation = 'elementGlitch 0.2s ease-in-out'; // Reduced duration
        }, 100); // 100ms debounce
        
        element.addEventListener('mouseenter', debouncedGlitch);
        
        element.addEventListener('mouseleave', () => {
            // Remove glitch animation
            element.style.animation = '';
            element.style.textShadow = '';
            element.style.filter = '';
            element.style.transform = '';
        });
        
        // Clean up after animation completes
        element.addEventListener('animationend', () => {
            element.style.textShadow = '';
            element.style.filter = '';
            element.style.transform = '';
        });
    });
}

// Parallax scrolling
function handleParallax() {
    const scrolled = window.pageYOffset;
    const techElements = document.querySelectorAll('.tech-element');
    
    techElements.forEach((element, index) => {
        const rate = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * rate}px) rotate(${scrolled * 0.05}deg)`;
    });
}

// Smooth scroll navigation
function initSmoothScroll() {
    document.querySelectorAll('.nav-item, .cta-primary, .cta-secondary').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Sector card interactions with performance optimizations
function initSectorInteractions() {
    const cards = document.querySelectorAll('.sector-card');
    
    cards.forEach(card => {
        // Use passive event listeners for better performance
        card.addEventListener('mouseenter', () => {
            // Simplified hover effect
            card.style.filter = 'brightness(1.05) saturate(1.1)';
        }, { passive: true });
        
        card.addEventListener('mouseleave', () => {
            card.style.filter = 'none';
        }, { passive: true });
    });
}

// Performance-optimized scroll handler
let ticking = false;
function updateParallax() {
    handleParallax();
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Terminal-style loading effect
function initTerminalEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText[i];
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createNeuralNetwork();
    initHoverGlitchEffects();
    initSmoothScroll();
    initSectorInteractions();
    initThemeToggle();
    initContactForm();
    initFooterInteractions();
});

// Event listeners
window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            showFormMessage('Sending message...', 'info');
            
            setTimeout(() => {
                // Simulate successful submission
                showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    const messageElement = document.querySelector('.form-message');
                    if (messageElement) {
                        messageElement.remove();
                    }
                }, 5000);
            }, 2000);
        });
        
        // Add form field interactions
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', () => {
                if (!field.value) {
                    field.parentElement.classList.remove('focused');
                }
            });
            
            // Add glitch effect on hover
            field.addEventListener('mouseenter', () => {
                field.style.animation = 'elementGlitch 0.3s ease-in-out';
            });
            
            field.addEventListener('mouseleave', () => {
                field.style.animation = '';
            });
        });
    }
}

// Show form messages
function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove error/info messages after 3 seconds
    if (type !== 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
}

// Footer interactions
function initFooterInteractions() {
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-bottom-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'elementGlitch 0.3s ease-in-out';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.animation = '';
        });
    });
    
    // Social media links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.2) rotate(5deg)';
            link.style.filter = 'brightness(1.3) saturate(1.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1) rotate(0deg)';
            link.style.filter = 'none';
        });
    });
}
