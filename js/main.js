/* ========================================
   FUTURISTIC WEB3 STARTUP - Master Script
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggling
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Navbar Background Transition
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Global Form Submissions Redirect to 404.html
  document.querySelectorAll('form').forEach(form => {
    if (form.id !== 'login-form' && form.id !== 'register-form') {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = '404.html';
      });
    }
  });
});
