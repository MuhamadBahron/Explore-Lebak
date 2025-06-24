// ====================== GLOBAL FUNCTIONS ======================
/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip if link points to another page
      if (this.getAttribute('href').includes('.html')) return;
      
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Animate elements when they come into view
 */
function initScrollAnimations() {
  const animateElements = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    const windowHeight = window.innerHeight;
    const triggerOffset = 100;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < windowHeight - triggerOffset) {
        element.classList.add('visible');
      }
    });
  };

  // Run on load and scroll
  window.addEventListener('load', animateElements);
  window.addEventListener('scroll', animateElements);
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ====================== HOMEPAGE SPECIFIC ======================
/**
 * Initialize destination card animations
 */
function initDestinationCards() {
  const cards = document.querySelectorAll('.destination-card');
  
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      // Add delay for staggered animation
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  }
}

/**
 * Handle contact form submission
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Validate form
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const message = formData.get('message').trim();
      
      if (!name || !email || !message) {
        showAlert('Mohon lengkapi semua kolom', 'error');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert('Format email tidak valid', 'error');
        return;
      }
      
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      
      // In a real app, you would send data to server here
      setTimeout(() => {
        showAlert('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1500);
    });
  }
}

/**
 * Show alert message
 */
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <span>${message}</span>
    <button class="alert-close"><i class="fas fa-times"></i></button>
  `;
  
  document.body.appendChild(alertDiv);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    alertDiv.classList.add('fade-out');
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
  
  // Close button
  alertDiv.querySelector('.alert-close').addEventListener('click', () => {
    alertDiv.classList.add('fade-out');
    setTimeout(() => alertDiv.remove(), 300);
  });
}

// ====================== DESTINATION PAGE SPECIFIC ======================
/**
 * Initialize image slider for destination pages
 */
function initImageSlider() {
  const slider = document.querySelector('.image-slider');
  
  if (slider) {
    const images = slider.querySelectorAll('.image');
    let currentIndex = 0;
    
    // Set initial state
    images.forEach((img, index) => {
      img.style.opacity = index === 0 ? 1 : 0;
      img.style.transition = 'opacity 1s ease-in-out';
    });
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
      images[currentIndex].style.opacity = 0;
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.opacity = 1;
    }, 5000);
  }
}

// ====================== INITIALIZE ALL FUNCTIONALITY ======================
document.addEventListener('DOMContentLoaded', () => {
  // Global functions
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initBackToTop();
  
  // Homepage specific
  initDestinationCards();
  initContactForm();
  
  // Destination page specific
  initImageSlider();
  
  // Add fade-in class to sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
  });
});