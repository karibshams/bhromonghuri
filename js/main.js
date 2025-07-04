// Main JavaScript File

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter Animation
const counters = document.querySelectorAll('.count');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 10);
    } else {
        counter.innerText = target.toLocaleString();
    }
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Load Featured Trips on Homepage
const loadFeaturedTrips = () => {
    const container = document.getElementById('featuredTrips');
    if (!container) return;

    const featuredTrips = trips.filter(trip => trip.featured).slice(0, 3);
    
    container.innerHTML = featuredTrips.map(trip => `
        <div class="trip-card" data-aos="fade-up">
            <img src="${trip.image}" alt="${trip.title}">
            <div class="trip-card-content">
                <span class="trip-badge">${trip.type}</span>
                <h3>${trip.title}</h3>
                <p>${trip.description}</p>
                <div class="trip-details">
                    <span><i class="fas fa-calendar"></i> ${trip.duration}</span>
                    <span class="trip-price">৳${trip.price.toLocaleString()}</span>
                </div>
                <a href="trip-details.html?id=${trip.id}" class="btn btn-primary btn-sm">View Details</a>
            </div>
        </div>
    `).join('');
};

// Load Gallery Preview
const loadGalleryPreview = () => {
    const container = document.getElementById('galleryPreview');
    if (!container) return;

    const galleryItems = gallery.slice(0, 6);
    
    container.innerHTML = galleryItems.map(item => `
        <div class="gallery-item" data-aos="zoom-in">
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.location}</p>
            </div>
        </div>
    `).join('');
};

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Show success message
        showNotification('Successfully subscribed to newsletter!', 'success');
        e.target.reset();
    });
}

// Notification System
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Smooth Scrolling
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

// Lazy Loading Images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Search Functionality
const initSearch = () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `trips.html?search=${encodeURIComponent(query)}`;
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedTrips();
    loadGalleryPreview();
    lazyLoadImages();
    initSearch();
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// Trip Filter Functionality (for trips page)
const initTripFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tripCards = document.querySelectorAll('.trip-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter trips
            tripCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
};

// Contact Form Handler
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            // Here you would send the data to your server
            console.log('Contact form data:', Object.fromEntries(formData));
            
            showNotification('Thank you for contacting us! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
};

// Trip Registration Modal
const initTripRegistration = () => {
    const registerBtns = document.querySelectorAll('.register-trip-btn');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tripId = btn.dataset.tripId;
            const tripTitle = btn.dataset.tripTitle;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2>Register for ${tripTitle}</h2>
                    <form id="registrationForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label>Number of Persons</label>
                            <input type="number" name="persons" min="1" value="1" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Complete Registration</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
            });
            
            // Handle form submission
            modal.querySelector('#registrationForm').addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Registration successful! We will contact you soon.', 'success');
                modal.remove();
            });
        });
    });
};