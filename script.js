console.log('Portfolio script loaded!');

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
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
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation class to elements when they come into view
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';  // Start visible
        section.style.transform = 'translateY(0)';  // No initial transform
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate the submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            
            // Here you would typically send the form data to a server
            // For now, we'll just simulate a submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.backgroundColor = '#27ae60';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }
});

// Update copyright year
document.querySelector('.footer p').innerHTML = `&copy; ${new Date().getFullYear()} Syeda Umayya Fatima. All rights reserved.`;