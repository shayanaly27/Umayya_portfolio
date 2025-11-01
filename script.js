console.log('Portfolio script loaded!');

// Mobile Menu Slide Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
let menuOpen = false;

// Create X icon dynamically
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        navLinks.classList.add('active');
        menuIcon.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden'; // prevent scroll behind menu
    } else {
        navLinks.classList.remove('active');
        menuIcon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = ''; 
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768 && menuOpen) {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
                menuOpen = false;
            }
        }
    });
});

// Progress Bar Animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        progress.style.setProperty('--percent', percent + '%');
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = percent + '%';
        }, 100);
    });
};

// Scroll Animation for Elements
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.id === 'skills') {
                animateProgressBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => observer.observe(section));

// Add animation class to elements when they come into view
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.backgroundColor = '#27ae60';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }
});

// Update Copyright
document.querySelector('.footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Syeda Umayya Fatima. All rights reserved.`;
