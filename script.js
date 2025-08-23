// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        observer.observe(item);
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Dashboard section animation
    const dashboardFrames = document.querySelectorAll('.dashboard-frame');
    dashboardFrames.forEach(frame => {
        frame.classList.add('slide-in-left');
        observer.observe(frame);
    });
    
    const dashboardInfo = document.querySelector('.dashboard-info');
    if (dashboardInfo) {
        dashboardInfo.classList.add('slide-in-right');
        observer.observe(dashboardInfo);
    }
});

// Animate skill bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Counter animation for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalNumber = statNumber.textContent;
            const isPlus = finalNumber.includes('+');
            const numericValue = parseInt(finalNumber.replace('+', ''));
            
            let currentNumber = 0;
            const increment = Math.ceil(numericValue / 200); // تبطيء أكتر: من 100 إلى 200
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= numericValue) {
                    currentNumber = numericValue;
                    statNumber.textContent = currentNumber + (isPlus ? '+' : '');
                    clearInterval(timer);
                } else {
                    statNumber.textContent = currentNumber + (isPlus ? '+' : '');
                }
            }, 150); // زيادة الوقت من 80 إلى 150 مللي ثانية
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add typing effect to hero tagline
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        setTimeout(() => {
            typeWriter(heroTagline, originalText, 30);
        }, 1000);
    }
});

// Add particle effect to hero background
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(37, 99, 235, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    return particle;
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .mobile-menu-active .nav-menu {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Add particles to hero section
const hero = document.querySelector('.hero');
if (hero) {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            hero.appendChild(createParticle());
        }, i * 400);
    }
    
    // Continuously add particles
    setInterval(() => {
        const particles = hero.querySelectorAll('.particle');
        if (particles.length < 15) {
            hero.appendChild(createParticle());
        }
    }, 2000);
}

// Enhanced mobile menu functionality
hamburger.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        document.body.classList.remove('mobile-menu-active');
        hamburger.classList.remove('active');
    }
});

// Scroll reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .about-content, .contact-content');
revealElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Add smooth transitions to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for smooth loading
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Calculate years of experience dynamically
function updateYearsOfExperience() {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const yearsOfExperience = currentYear - startYear;
    
    // Update the stat number
    const yearsExperienceElement = document.getElementById('years-experience');
    if (yearsExperienceElement) {
        yearsExperienceElement.textContent = yearsOfExperience + '+';
    }
    
    // Update the text in the paragraph
    const yearsTextElement = document.getElementById('years-text');
    if (yearsTextElement) {
        yearsTextElement.textContent = yearsOfExperience;
    }
}

// Update years when page loads
document.addEventListener('DOMContentLoaded', updateYearsOfExperience);
