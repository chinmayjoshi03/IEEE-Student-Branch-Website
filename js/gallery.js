// Gallery Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
});

let currentImageIndex = 0;
let galleryImages = [];

function initGallery() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Collect all gallery images for lightbox navigation
    galleryImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        return {
            src: img.src,
            alt: img.alt,
            title: title,
            description: description,
            element: item
        };
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });

            // Update gallery images array for lightbox
            updateGalleryImages(filter);
        });
    });

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        const viewBtn = item.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                openLightbox(index);
            });
        }
    });
}

function updateGalleryImages(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryImages = Array.from(galleryItems)
        .filter(item => {
            const category = item.getAttribute('data-category');
            return filter === 'all' || category === filter;
        })
        .map(item => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            return {
                src: img.src,
                alt: img.alt,
                title: title,
                description: description,
                element: item
            };
        });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
}

function openLightbox(index) {
    if (typeof index === 'object') {
        // If called from HTML onclick, find the index
        const item = index.closest('.gallery-item');
        const allItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
        index = allItems.indexOf(item);
    }

    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    if (galleryImages[currentImageIndex]) {
        const imageData = galleryImages[currentImageIndex];
        
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = galleryImages.length - 1;
    }
    updateLightboxImage();
}

function nextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    if (galleryImages[currentImageIndex]) {
        const imageData = galleryImages[currentImageIndex];
        
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-image img');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Add loading animation to gallery items
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateGalleryItems, 100);
});

console.log('Gallery page loaded');