/* ========================================
   STACKLY ARCHITECTURE - Advanced Animations
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMagneticButtons();
  initTextReveal();
  initHoverTilt();
  initCursorEffect();
  initScrollProgress();
  initImageReveal();
  initStaggerAnimations();
});

/* ========================================
   Magnetic Buttons
======================================== */
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.btn, .service-card, .project-card, .blog-card');
  
  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ========================================
   Text Reveal Animation
======================================== */
function initTextReveal() {
  const textElements = document.querySelectorAll('.text-reveal');
  
  textElements.forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${i * 0.05}s`;
      el.appendChild(span);
    });
  });
}

/* ========================================
   3D Hover Tilt Effect
======================================== */
function initHoverTilt() {
  const tiltElements = document.querySelectorAll('.service-card, .pricing-card, .blog-card');
  
  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ========================================
   Custom Cursor Effect
======================================== */
function initCursorEffect() {
  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
  
  cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  `;
  
  const cursorDot = cursor.querySelector('.cursor-dot');
  const cursorRing = cursor.querySelector('.cursor-ring');
  
  cursorDot.style.cssText = `
    width: 8px;
    height: 8px;
    background: var(--secondary);
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
  `;
  
  cursorRing.style.cssText = `
    width: 40px;
    height: 40px;
    border: 1px solid var(--secondary);
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: all 0.15s ease;
  `;
  
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    cursorRing.style.left = cursorX + 'px';
    cursorRing.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.borderColor = 'var(--primary)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'var(--secondary)';
    });
  });
}

/* ========================================
   Scroll Progress Indicator
======================================== */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-gold);
    z-index: 10001;
    transition: width 0.1s ease-out;
  `;
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

/* ========================================
   Image Reveal Animation
======================================== */
function initImageReveal() {
  const images = document.querySelectorAll('.img-reveal');
  
  const revealImage = (img) => {
    const overlay = document.createElement('div');
    overlay.className = 'img-reveal-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--secondary);
      transform-origin: left;
      z-index: 1;
    `;
    
    img.style.position = 'relative';
    img.style.overflow = 'hidden';
    img.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.animation = 'imgReveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards';
    }, 100);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  images.forEach(img => observer.observe(img));
}

/* ========================================
   Stagger Animations
======================================== */
function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  
  staggerContainers.forEach(container => {
    const children = container.children;
    const delay = parseFloat(container.dataset.stagger) || 0.1;
    
    Array.from(children).forEach((child, index) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = `all 0.6s ease ${index * delay}s`;
    });
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach(child => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  staggerContainers.forEach(container => observer.observe(container));
}

/* ========================================
   Line Draw Animation
======================================== */
function initLineDraw() {
  const lines = document.querySelectorAll('.line-draw');
  
  lines.forEach(line => {
    line.style.width = '0';
    line.style.transition = 'width 1s ease-out';
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width || '100%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  lines.forEach(line => observer.observe(line));
}

/* ========================================
   Floating Elements
======================================== */
function initFloatingElements() {
  const floatElements = document.querySelectorAll('.float-element');
  
  floatElements.forEach((el, index) => {
    const delay = index * 0.5;
    const duration = 3 + Math.random() * 2;
    
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });
}

// Initialize floating elements
document.addEventListener('DOMContentLoaded', initFloatingElements);

/* ========================================
   Smooth Page Transitions
======================================== */
function initPageTransitions() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        document.body.style.opacity = '0';
        
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    }
  });
}

/* ========================================
   Number Counter Animation
======================================== */
function animateValue(element, start, end, duration, suffix = '') {
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    element.textContent = Math.floor(easeProgress * (end - start) + start) + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
}

/* ========================================
   GSAP-like Animations (Vanilla JS)
======================================== */
const Animator = {
  fadeIn: (element, duration = 600, delay = 0) => {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease ${delay}ms`;
    
    setTimeout(() => {
      element.style.opacity = '1';
    }, delay);
  },
  
  slideUp: (element, duration = 600, delay = 0) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all ${duration}ms ease ${delay}ms`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  },
  
  scaleIn: (element, duration = 600, delay = 0) => {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.9)';
    element.style.transition = `all ${duration}ms ease ${delay}ms`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    }, delay);
  }
};

/* ========================================
   Keyframe Animations (CSS-in-JS)
======================================== */
const addKeyframes = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes imgReveal {
      0% { transform: scaleX(1); }
      100% { transform: scaleX(0); }
    }
    
    @keyframes fadeInRight {
      from { 
        opacity: 0;
        transform: translateX(20px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes pulse-ring {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }
    
    .shimmer-effect {
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
  `;
  document.head.appendChild(style);
};

addKeyframes();
