// About Us Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize about page animations
    initAboutAnimations();
});

function initAboutAnimations() {
    // Animate pillars on scroll
    const pillars = document.querySelectorAll('.pillar');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    pillars.forEach((pillar, index) => {
        pillar.style.opacity = '0';
        pillar.style.transform = 'translateY(30px)';
        pillar.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(pillar);
    });
}

// Add any about-us specific functionality here
console.log('About Us page loaded');