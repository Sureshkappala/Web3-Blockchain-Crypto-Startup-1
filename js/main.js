document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initScrollEffects();
    initNavbarDrawer();
    initPortalSidebar();
    initUserSession();
    initRevealAnimations();
    initCompoundCalculator();
    initLiveTelemetryLogs();
});

/* ========================================
   1. PRELOADER
======================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const percentage = document.querySelector('.preloader-percentage');
    if (!preloader) return;

    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 12) + 5;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            dismissPreloader();
        }
        if (percentage) percentage.textContent = `${count}%`;
    }, 30);

    function dismissPreloader() {
        preloader.classList.add('fade-out');
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    setTimeout(() => {
        if (!preloader.classList.contains('fade-out')) {
            if (percentage) percentage.textContent = '100%';
            dismissPreloader();
        }
    }, 1500);
}

/* ========================================
   2. CUSTOM CURSOR
======================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .glass-card, .hero-color-toggle-dot');
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.width = '55px';
            cursor.style.height = '55px';
            cursor.style.borderColor = 'var(--cyan)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--primary)';
        });
    });
}

/* ========================================
   3. SCROLL PROGRESS BAR & STICKY HEADER
======================================== */
function initScrollEffects() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0 && progressBar) {
            const scrollPercent = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initialize stats counters on scroll (fallback scroll listener)
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200;
    let triggered = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    }

    window.addEventListener('scroll', () => {
        const statsSec = document.querySelector('.stats-section');
        if (statsSec && !triggered) {
            const rect = statsSec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                triggered = true;
                runCounters();
            }
        }
    });
}

/* ========================================
   4. NAVIGATION DRAWER
======================================== */
function initNavbarDrawer() {
    const menuToggle = document.querySelector('.menu-toggle');
    const drawerClose = document.querySelector('.drawer-close');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.add('active');
            document.body.classList.add('menu-open');
            document.documentElement.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        });
    }

    const closeMenu = () => {
        if (navbar) navbar.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    };

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMenu);
    }

    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 404 Submission handlers
    document.querySelectorAll('form').forEach(form => {
        if (form.id !== 'login-form' && form.id !== 'register-form') {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                window.location.href = '404.html';
            });
        }
    });
}

function initPortalSidebar() {
    const hamburger = document.querySelector('.db-hamburger');
    const closeBtn = document.querySelector('.db-sidebar-close');
    const overlay = document.querySelector('.db-sidebar-overlay');
    const sidebar = document.querySelector('.db-sidebar');

    if (hamburger && sidebar && overlay) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        });
    }

    const closePortalMenu = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closePortalMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closePortalMenu);
    }
}

function initUserSession() {
    const storedName = localStorage.getItem('loggedInUserName') || 'LIQUIDITY PROVIDER';
    
    // Update all user-name elements
    const nameElTxt = document.querySelectorAll('.user-name');
    nameElTxt.forEach(el => {
        el.textContent = storedName;
    });

    // Update avatar badges (First 2 initials)
    const avatarEl = document.querySelectorAll('.user-avatar');
    if (avatarEl.length > 0) {
        const parts = storedName.trim().split(/\s+/);
        let initials = 'LP';
        if (parts.length > 1) {
            initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts.length === 1 && parts[0].length > 0) {
            initials = parts[0].substring(0, 2).toUpperCase();
        }
        avatarEl.forEach(el => {
            el.textContent = initials;
        });
    }
}

/* ========================================
   5. COMPOUND REWARDS CALCULATOR
======================================= */
let currentAsset = 'ETH';
let currentApy = 4.5;

function initCompoundCalculator() {
    window.setCalcAsset = function(asset, apy) {
        currentAsset = asset;
        currentApy = apy;
        
        const tabs = ['eth', 'sol', 'atom'];
        tabs.forEach(t => {
            const btn = document.getElementById('calc-tab-' + t);
            if (btn) {
                if (t === asset.toLowerCase()) {
                    btn.style.background = 'var(--gradient-primary)';
                    btn.style.borderColor = 'var(--cyan)';
                    btn.style.color = 'var(--text-light)';
                } else {
                    btn.style.background = 'transparent';
                    btn.style.borderColor = 'var(--border-glass)';
                    btn.style.color = 'var(--text-muted)';
                }
            }
        });
        
        window.updateYieldEstimator();
    };

    window.updateYieldEstimator = function() {
        const amountRange = document.getElementById('calc-amount-range');
        const durationRange = document.getElementById('calc-duration-range');
        const amountDisplay = document.getElementById('calc-amount-val');
        const durationDisplay = document.getElementById('calc-duration-val');
        
        const outDaily = document.getElementById('calc-out-daily');
        const outMonthly = document.getElementById('calc-out-monthly');
        const outBalance = document.getElementById('calc-out-balance');
        const outTotal = document.getElementById('calc-out-total');
        
        if (!amountRange || !durationRange) return;
        
        const amount = parseFloat(amountRange.value);
        const duration = parseFloat(durationRange.value);
        
        if (amountDisplay) amountDisplay.textContent = amount.toLocaleString() + ' ' + currentAsset;
        if (durationDisplay) durationDisplay.textContent = duration + (duration === 1 ? ' Year' : ' Years');
        
        const dailyRewards = amount * (currentApy / 100) / 365;
        const monthlyRewards = amount * (currentApy / 100) / 12;
        const totalRewards = amount * Math.pow(1 + (currentApy / 100), duration) - amount;
        const finalBalance = amount + totalRewards;
        
        if (outDaily) outDaily.textContent = dailyRewards.toFixed(4) + ' ' + currentAsset;
        if (outMonthly) outMonthly.textContent = monthlyRewards.toFixed(3) + ' ' + currentAsset;
        if (outBalance) outBalance.textContent = finalBalance.toLocaleString(undefined, {maximumFractionDigits: 2}) + ' ' + currentAsset;
        if (outTotal) outTotal.textContent = totalRewards.toLocaleString(undefined, {maximumFractionDigits: 2}) + ' ' + currentAsset;
    };
    
    setTimeout(() => {
        window.updateYieldEstimator();
    }, 100);
}

/* ========================================
   6. REVEAL ANIMATIONS & COUNTERS
======================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(elem => revealObserver.observe(elem));

    const counterElements = document.querySelectorAll('.counter-value');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target')) || 0;
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 40));
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    entry.target.textContent = (target >= 1000) ? current.toLocaleString() : current;
                }, 25);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(elem => counterObserver.observe(elem));
}

/* ========================================
   7. LIVE NETWORK TELEMETRY LOGS SIMULATOR
======================================== */
function initLiveTelemetryLogs() {
    const logsBox = document.getElementById('live-node-logs');
    if (!logsBox) return;

    const templates = [
        "Swiss-Vault signature relay active | 100% sync",
        "Proposed block validation completed on Solana Singapore",
        "Checking peer-to-peer telemetry handshakes...",
        "Attestation signature verified for block #{BLOCK}",
        "New validator block proposal broadcasted globally",
        "P2P consensus weight reached 99.85%",
        "Swiss-Vault ping latency optimized to 3.8ms",
        "MEV transaction sequencing bundle executed (+0.12 ETH fee)"
    ];

    let blockNum = 18409214;

    setInterval(() => {
        blockNum += Math.floor(Math.random() * 3) + 1;
        const randTemplate = templates[Math.floor(Math.random() * templates.length)];
        const text = randTemplate.replace('{BLOCK}', blockNum);
        
        const now = new Date().toTimeString().split(' ')[0];
        const p = document.createElement('p');
        p.style.margin = "0";
        p.style.opacity = "0";
        p.style.transform = "translateY(5px)";
        p.style.transition = "all 0.3s ease";
        
        if (text.includes("verified") || text.includes("active") || text.includes("completed")) {
            p.style.color = "#10b981";
        } else if (text.includes("latency") || text.includes("MEV")) {
            p.style.color = "var(--cyan)";
        }
        
        p.innerHTML = `<span style="color: var(--text-muted);">[${now}]</span> ${text}`;
        logsBox.appendChild(p);
        
        setTimeout(() => {
            p.style.opacity = "1";
            p.style.transform = "translateY(0)";
        }, 50);

        if (logsBox.children.length > 5) {
            const first = logsBox.children[0];
            first.style.opacity = "0";
            first.style.transform = "translateY(-5px)";
            setTimeout(() => {
                first.remove();
            }, 300);
        }
    }, 3000);
}

/* ========================================
   8. SYSTEM ALERT OVERLAY NOTIFICATION
======================================== */
window.showCustomAlert = function(message, type = 'info') {
    let alertBox = document.getElementById('custom-system-alert');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'custom-system-alert';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.right = '20px';
        alertBox.style.zIndex = '99999';
        alertBox.style.padding = '1rem 1.5rem';
        alertBox.style.borderRadius = '8px';
        alertBox.style.fontFamily = 'sans-serif';
        alertBox.style.fontSize = '0.9rem';
        alertBox.style.fontWeight = '600';
        alertBox.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
        alertBox.style.transition = 'all 0.4s ease';
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateY(-20px)';
        document.body.appendChild(alertBox);
    }
    
    if (type === 'success') {
        alertBox.style.background = 'rgba(16, 185, 129, 0.95)';
        alertBox.style.color = '#fff';
        alertBox.style.border = '1px solid #10b981';
    } else if (type === 'error') {
        alertBox.style.background = 'rgba(239, 68, 68, 0.95)';
        alertBox.style.color = '#fff';
        alertBox.style.border = '1px solid #ef4444';
    } else {
        alertBox.style.background = 'rgba(6, 182, 212, 0.95)';
        alertBox.style.color = '#fff';
        alertBox.style.border = '1px solid #06b6d4';
    }
    
    alertBox.textContent = message;
    alertBox.style.opacity = '1';
    alertBox.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateY(-20px)';
    }, 3000);
};
