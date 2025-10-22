// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger bars
    const bars = navToggle.querySelectorAll('.nav__toggle-bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translateY(10px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Close mobile menu if open
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.nav__toggle-bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';

        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Calculate offset for fixed navbar
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================

const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to current section link
            const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Run on scroll
window.addEventListener('scroll', highlightActiveSection);

// Run on page load
document.addEventListener('DOMContentLoaded', highlightActiveSection);

// ==========================================
// SCROLL ANIMATIONS (FADE IN)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.services__card, .about__image, .projects__item, .testimonials__card, .contact__item');
animateElements.forEach(element => {
    observer.observe(element);
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

const navbar = document.getElementById('navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    // Add shadow to navbar when scrolled
    if (currentScrollPosition > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScrollPosition = currentScrollPosition;
});

// ==========================================
// PREVENT HORIZONTAL SCROLL ON MOBILE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});

// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================

let testimonials = [];
let currentTestimonialIndex = 0;
let autoRotateInterval;
let isFirstLoad = true;

// Fetch testimonials from JSON file
async function loadTestimonials() {
    try {
        const response = await fetch('testimonials.json');
        testimonials = await response.json();

        if (testimonials.length > 0) {
            displayTestimonial(0, false); // false = no animation on first load
            createDots();
            startAutoRotate();
            isFirstLoad = false;
        }
    } catch (error) {
        console.error('Error loading testimonials:', error);
        // Display fallback message
        document.getElementById('testimonialText').textContent = 'Unable to load testimonials at this time.';
        document.getElementById('testimonialAuthor').textContent = '';
    }
}

// Display specific testimonial
function displayTestimonial(index, animate = true) {
    if (testimonials.length === 0) return;

    const testimonialText = document.getElementById('testimonialText');
    const testimonialAuthor = document.getElementById('testimonialAuthor');
    const testimonialCard = document.querySelector('.testimonials__card');

    // Only add fade animation if not first load and animate is true
    if (animate && !isFirstLoad) {
        // Step 1: Fade out (300ms)
        testimonialCard.classList.add('fade-out');

        // Step 2: After fade out completes, update content
        setTimeout(() => {
            // Update content while invisible
            testimonialText.textContent = testimonials[index].text;
            testimonialAuthor.textContent = `- ${testimonials[index].name}`;

            // Update active dot
            updateActiveDot(index);

            // Step 3: Fade back in (remove fade-out class)
            setTimeout(() => {
                testimonialCard.classList.remove('fade-out');
            }, 50); // Brief moment of being fully invisible
        }, 300); // Wait for fade out to complete
    } else {
        // No animation - just update immediately
        testimonialText.textContent = testimonials[index].text;
        testimonialAuthor.textContent = `- ${testimonials[index].name}`;
        updateActiveDot(index);
    }
}

// Create dot indicators
function createDots() {
    const dotsContainer = document.getElementById('testimonialDots');
    dotsContainer.innerHTML = '';

    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonials__dot');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);

        if (index === 0) {
            dot.classList.add('active');
        }

        dot.addEventListener('click', () => {
            currentTestimonialIndex = index;
            displayTestimonial(index);
            resetAutoRotate();
        });

        dotsContainer.appendChild(dot);
    });
}

// Update active dot indicator
function updateActiveDot(index) {
    const dots = document.querySelectorAll('.testimonials__dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigate to next testimonial
function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
    resetAutoRotate();
}

// Navigate to previous testimonial
function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
    resetAutoRotate();
}

// Auto-rotate testimonials
function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds
}

// Reset auto-rotate timer
function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
}

// Event listeners for navigation buttons
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.testimonials__nav--prev');
    const nextButton = document.querySelector('.testimonials__nav--next');

    if (prevButton) {
        prevButton.addEventListener('click', prevTestimonial);
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }

    // Pause auto-rotate on hover
    const carousel = document.querySelector('.testimonials__carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoRotate();
        });
    }

    // Load testimonials
    loadTestimonials();
});
