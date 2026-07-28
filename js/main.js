/* ========================================
   STACKLY ARCHITECTURE - Main JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCounterAnimation();
  initHeroSlider();
  initTestimonialSlider();
  initSmoothScroll();

  // Redirect mock form submissions (e.g. newsletter, contact) to 404.html
  document.querySelectorAll('form').forEach(form => {
    if (form.id !== 'login-form' && form.id !== 'register-form') {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = '404.html';
      });
    }
  });
});

/* ========================================
   Navbar Scroll Effect
======================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
}

/* ========================================
   Mobile Menu Toggle
======================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ========================================
   Scroll Reveal Animations
======================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
}

/* ========================================
   Counter Animation
======================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2500;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (!counter.classList.contains('counted')) {
          counter.classList.add('counted');
          animateCounter(counter);
        }
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

/* ========================================
   Hero Slider
======================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  setInterval(nextSlide, 5000);
}

/* ========================================
   Testimonial Slider
======================================== */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  
  if (testimonials.length === 0) return;
  
  let currentTestimonial = 0;
  
  const showTestimonial = (index) => {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };
  
  const nextTestimonial = () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  };
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });
  
  setInterval(nextTestimonial, 6000);
}

/* ========================================
   Smooth Scroll
======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   Toast Notifications
======================================== */
function showToast(message, type = 'info', duration = 3000) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--surface);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 9999;
    animation: fadeInRight 0.3s ease-out;
    box-shadow: var(--shadow-xl);
  `;
  
  if (type === 'success') {
    toast.style.borderColor = 'var(--success)';
  } else if (type === 'error') {
    toast.style.borderColor = 'var(--error)';
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeInRight 0.3s ease-out reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ========================================
   Form Validation
======================================== */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
    
    if (input.type === 'email' && input.value && !validateEmail(input.value)) {
      isValid = false;
      input.classList.add('error');
    }
  });
  
  return isValid;
}

/* ========================================
   Loading Spinner
======================================== */
function showLoading(element) {
  const spinner = document.createElement('div');
  spinner.className = 'loading-overlay';
  spinner.innerHTML = `
    <div class="spinner">
      <div class="spinner-ring"></div>
    </div>
  `;
  spinner.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(250, 250, 249, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: inherit;
  `;
  
  element.style.position = 'relative';
  element.appendChild(spinner);
  
  return {
    hide: () => spinner.remove()
  };
}

/* ========================================
   Parallax Effect
======================================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.5;
          const yPos = -(scrolled * speed);
          el.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);
