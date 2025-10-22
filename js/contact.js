// Contact Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initFormValidation();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }
}

function initFormValidation() {
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message') || createErrorMessage(formGroup);
    
    // Remove existing error state
    field.classList.remove('error');
    formGroup.classList.remove('error');
    errorMessage.style.display = 'none';
    
    let isValid = true;
    let message = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            message = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            message = 'Please enter a valid phone number.';
        }
    }
    
    // Message length validation
    if (field.name === 'message' && field.value.trim() && field.value.trim().length < 10) {
        isValid = false;
        message = 'Message must be at least 10 characters long.';
    }
    
    if (!isValid) {
        field.classList.add('error');
        formGroup.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    return isValid;
}

function createErrorMessage(formGroup) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    formGroup.appendChild(errorMessage);
    return errorMessage;
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Remove any error states
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
        
        const errorGroups = form.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });
        
    }, 2000);
}

function showSuccessMessage() {
    // Create success message if it doesn't exist
    let successMessage = document.querySelector('.success-message');
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
        
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(successMessage, form);
    }
    
    successMessage.classList.add('show');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
});

// Form field animations
function initFieldAnimations() {
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentNode.classList.add('focused');
        }
    });
}

// Initialize field animations
document.addEventListener('DOMContentLoaded', function() {
    initFieldAnimations();
});

// Contact info animations
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Initialize contact animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initContactAnimations, 100);
});

// Copy to clipboard functionality
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        // Show copied feedback
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = '#28a745';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Add click to copy functionality to email and phone
document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('.contact-info p:has(.fa-envelope)');
    const phoneElements = document.querySelectorAll('.contact-info p:has(.fa-phone)');
    
    [...emailElements, ...phoneElements].forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy';
        
        element.addEventListener('click', function() {
            const text = this.textContent.trim();
            copyToClipboard(text, this);
        });
    });
});

console.log('Contact page loaded');