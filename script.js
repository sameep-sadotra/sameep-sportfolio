// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Function to open resume
function openResume() {
    window.open('https://github.com/sameep-sadotra', '_blank');
}

// Function to open GitHub
function openGithub() {
    window.open('https://github.com/sameep-sadotra', '_blank');
}

// Function to open Gmail compose
function openGmail() {
    window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sadotrasameep@gmail.com&su=Portfolio%20Inquiry', '_blank');
}

// Function to open phone dialer
function openPhone() {
    window.location.href = 'tel:+916006982438';
}

// Function to open external links
function openLink(url) {
    window.open(url, '_blank');
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add fade-in class to cards and other elements
    const cards = document.querySelectorAll('.project-card, .achievement-card, .contact-card, .skill-category');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Account for navbar height
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-2px)';
    });
});

// Add click analytics (optional)
function trackClick(element, action) {
    console.log(`User clicked: ${action} on ${element}`);
    // You can integrate with Google Analytics or other tracking services here
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        trackClick(e.target.textContent, 'button');
    });
});

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}

// Apply loading state to external link buttons
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.onclick) {
            addLoadingState(button);
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
    
    // Press 'Enter' or 'Space' on focused elements
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('contact-card')) {
            e.preventDefault();
            focused.click();
        }
    }
});

// Add focus styles for accessibility
document.querySelectorAll('.contact-card, .project-card, .achievement-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('focus', () => {
        card.style.outline = '2px solid #3b82f6';
        card.style.outlineOffset = '2px';
    });
    
    card.addEventListener('blur', () => {
        card.style.outline = 'none';
    });
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Su1mXxOPuPqEv2EyZBrWBcEZCKzwtx.png',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rDt1BgAJIjhTupCKT0nnnhlzgl8UHg.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading when page loads
document.addEventListener('DOMContentLoaded', preloadImages);

// Add error handling for external links
function handleLinkError(url) {
    console.error(`Failed to open: ${url}`);
    alert('Sorry, there was an error opening this link. Please try again.');
}

// Enhanced link opening with error handling
function safeOpenLink(url) {
    try {
        window.open(url, '_blank');
    } catch (error) {
        handleLinkError(url);
    }
}

// Update all link opening functions to use safe method
window.openResume = () => safeOpenLink('https://drive.google.com/file/d/1ou9v8v-sDT4vhoMkfpSGrPGt8_yE2Fzn/view?usp=drive_link');
window.openGithub = () => safeOpenLink('https://github.com/sameep-sadotra');
window.openGmail = () => safeOpenLink('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sadotrasameep@gmail.com&su=Portfolio%20Inquiry');
window.openLink = (url) => safeOpenLink(url);

// Disable parallax effect that was causing overlap issues
// Remove any transform effects on scroll
window.removeEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Ensure proper section spacing
document.addEventListener('DOMContentLoaded', () => {
    // Add proper spacing between sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.position = 'relative';
        section.style.zIndex = '1';
    });
});
