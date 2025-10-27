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

// ==========================================
// CONTACT FORM MODAL
// ==========================================

const contactModal = document.getElementById('contactModal');
const contactFormBtn = document.getElementById('contactFormBtn');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Open modal
function openModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    // Clear form message if any
    formMessage.className = 'form-message';
    formMessage.textContent = '';
}

// Event listeners for opening/closing modal
if (contactFormBtn) {
    contactFormBtn.addEventListener('click', openModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeModal();
    }
});

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================

// Google Apps Script Web App URL (PLACEHOLDER - replace with your actual URL)
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('contactName').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        message: document.getElementById('contactMessage').value.trim(),
        timestamp: new Date().toISOString()
    };

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return;
    }

    // Disable submit button during submission
    const submitButton = contactForm.querySelector('.form-submit');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Check if Google Script URL is set
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            throw new Error('Google Apps Script URL not configured yet. Please follow the setup instructions.');
        }

        // Send data to Google Sheets via Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // With no-cors mode, we can't read the response, so we assume success
        // if no error was thrown
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');

        // Clear form
        contactForm.reset();

        // Close modal after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);

    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage(error.message || 'Sorry, there was an error sending your message. Please try emailing us directly.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Scroll message into view
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==========================================
// PHONE NUMBER FORMATTING (OPTIONAL)
// ==========================================

// Format phone number as user types
const phoneInput = document.getElementById('contactPhone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

        // Format as (XXX) XXX-XXXX
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }

        e.target.value = value;
    });
}
