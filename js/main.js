/* ==========================================================================
   STACKLY WEB3 ADVISORY - GLOBAL JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initScrollEffects();
    initNavbarDrawer();
    initRevealAnimations();
    initInteractiveModals();
    initFormValidations();
    initCompoundCalculator();
    initDashboardSidebar();
    initDashboardRoles();
});

/* ==========================================================================
   1. PRELOADER (WITH SAFETY FALLBACK)
   ========================================================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const percentage = document.querySelector('.preloader-percentage');
    if (!preloader) return;

    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 14) + 6;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            dismissPreloader();
        }
        if (percentage) percentage.textContent = `${count}%`;
    }, 25);

    function dismissPreloader() {
        preloader.classList.add('fade-out');
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Safety fallback: guaranteed hide after 1.5 seconds
    setTimeout(() => {
        if (!preloader.classList.contains('fade-out')) {
            if (percentage) percentage.textContent = '100%';
            dismissPreloader();
        }
    }, 1500);
}

/* ==========================================================================
   2. CUSTOM CURSOR
   ========================================================================== */
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
            cursor.style.borderColor = 'var(--accent-light)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--primary)';
        });
    });
}

/* ==========================================================================
   3. SCROLL PROGRESS BAR & STICKY HEADER
   ========================================================================== */
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
}

/* ==========================================================================
   4. NAVIGATION DRAWER (MOBILE HAMBURGER)
   ========================================================================== */
function initNavbarDrawer() {
    const menuToggle = document.querySelector('.menu-toggle');
    const drawerClose = document.querySelector('.drawer-close');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.add('active');
            document.body.classList.add('menu-open');
            document.documentElement.classList.add('menu-open');
        });
    }

    const closeMenu = () => {
        if (navbar) navbar.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
    };

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMenu);
    }

    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (navbar && navbar.classList.contains('active') && !navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   5. REVEAL ANIMATIONS & COUNTERS
   ========================================================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
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
                const targetText = entry.target.getAttribute('data-target') || '0';
                const target = parseInt(targetText) || 0;
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 50));
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    
                    // Format output (handle special text formats if needed)
                    let formatted = current;
                    if (target >= 1000) {
                        formatted = current.toLocaleString();
                    }
                    
                    // Retain postfix if present in original label (e.g. +, %)
                    if (targetText.includes('+')) {
                        entry.target.textContent = `${formatted}+`;
                    } else if (targetText.includes('%')) {
                        entry.target.textContent = `${formatted}%`;
                    } else {
                        entry.target.textContent = formatted;
                    }
                }, 20);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(elem => counterObserver.observe(elem));
}

/* ==========================================================================
   6. CUSTOM MODAL ALERTS
   ========================================================================== */
function initInteractiveModals() {}

window.showCustomAlert = function(message, type = 'success') {
    if (document.querySelector('.custom-alert-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';

    const modal = document.createElement('div');
    modal.className = 'custom-alert-modal glass-card';

    const iconClass = type === 'success' ? 'fa-shield-halved' : 'fa-triangle-exclamation';
    const iconColor = type === 'success' ? '#2563eb' : '#c27d38';

    modal.innerHTML = `
        <div class="custom-alert-icon" style="color: ${iconColor}; font-size: 3.5rem; margin-bottom: 1.5rem; text-align: center;">
            <i class="fa-solid ${iconClass}"></i>
        </div>
        <p class="custom-alert-message" style="color: var(--text-light); font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; text-align: center; white-space: pre-line;">${message}</p>
        <button class="custom-alert-btn btn btn-primary" style="width: 120px; margin: 0 auto; display: block;">CONFIRM</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    const closeBtn = modal.querySelector('.custom-alert-btn');
    const closeAlert = () => {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    };

    closeBtn.addEventListener('click', closeAlert);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAlert();
    });
};

/* ==========================================================================
   7. STAKING APY SIMULATOR (CALCULATOR)
   ========================================================================== */
function initCompoundCalculator() {
    window.calculateWealthGrowth = function() {
        const principalEl = document.getElementById('calc-principal');
        const monthlyEl = document.getElementById('calc-monthly');
        const rateEl = document.getElementById('calc-rate');
        const yearsEl = document.getElementById('calc-years');

        if (!principalEl || !rateEl || !yearsEl) return;

        const principal = parseFloat(principalEl.value);
        const monthly = parseFloat(monthlyEl.value) || 0;
        const rate = parseFloat(rateEl.value) / 100;
        const years = parseFloat(yearsEl.value);

        if (!principal || !rate || !years) {
            window.showCustomAlert('Please input valid staking principal, annual rate (APY), and staking horizon.', 'error');
            return;
        }

        const months = years * 12;
        const monthlyRate = rate / 12;
        let total = principal * Math.pow(1 + monthlyRate, months);
        
        for (let i = 1; i <= months; i++) {
            total += monthly * Math.pow(1 + monthlyRate, months - i);
        }

        const totalInvested = principal + (monthly * months);
        const stakingYield = total - totalInvested;

        window.showCustomAlert(
            `Projected Staking Balance: $${Math.round(total).toLocaleString()}\nTotal Delegated Principal: $${Math.round(totalInvested).toLocaleString()}\nEst. Staking Rewards Yield: $${Math.round(stakingYield).toLocaleString()}`, 
            'success'
        );
    };
}

/* ==========================================================================
   8. FORM VALIDATIONS
   ========================================================================== */
function initFormValidations() {
    const phoneInputs = document.querySelectorAll('input[type="tel"], #booking-phone');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    });

    const contactName = document.getElementById('contact-name');
    if (contactName) {
        contactName.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }

    const contactPhone = document.getElementById('contact-phone');
    if (contactPhone) {
        contactPhone.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameVal = document.getElementById('contact-name').value;
            const phoneVal = document.getElementById('contact-phone').value;

            // Name check (letters & spaces only)
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!nameRegex.test(nameVal)) {
                window.showCustomAlert("Name must contain only alphabetical characters.", "error");
                return;
            }

            // Phone check (digits only)
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phoneVal)) {
                window.showCustomAlert("Phone number must contain only numerical digits.", "error");
                return;
            }

            window.showCustomAlert("Secure Broadcast complete! Your node consultation request has been dispatched to our consensus advisory team.", "success");
            contactForm.reset();
        });
    }

    const newsletterForms = document.querySelectorAll('.footer-newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.showCustomAlert("Subscribed! You will receive our weekly protocol yield forecasts and security audit logs.", "success");
            form.reset();
        });
    });
}

/* ==========================================================================
   9. DASHBOARD SIDEBAR TOGGLE HANDLER (MOBILE)
   ========================================================================== */
function initDashboardSidebar() {
    const dbHamburger = document.querySelector('.db-hamburger');
    const dbSidebarClose = document.querySelector('.db-sidebar-close');
    const dbSidebar = document.querySelector('.db-sidebar');
    const dbOverlay = document.querySelector('.db-sidebar-overlay');

    if (dbHamburger && dbSidebar && dbOverlay) {
        dbHamburger.addEventListener('click', () => {
            dbSidebar.classList.add('active');
            dbOverlay.classList.add('active');
        });
    }

    const closeDbSidebar = () => {
        if (dbSidebar) dbSidebar.classList.remove('active');
        if (dbOverlay) dbOverlay.classList.remove('active');
    };

    if (dbSidebarClose) {
        dbSidebarClose.addEventListener('click', closeDbSidebar);
    }
    if (dbOverlay) {
        dbOverlay.addEventListener('click', closeDbSidebar);
    }
}

/* ==========================================================================
   10. DYNAMIC PORTAL ROLE RENDERING (CLIENT VS ADVISOR MODULES)
   ========================================================================== */
function initDashboardRoles() {
    const role = localStorage.getItem('loggedInUserRole') || 'client';
    const userName = localStorage.getItem('loggedInUserName') || 'USER';

    // Update username indicators
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = role === 'advisor' ? `Consensus Advisor ${userName}` : `Liquidity Provider ${userName}`;
    });

    const initials = userName.substring(0, 2).toUpperCase();
    document.querySelectorAll('.user-avatar').forEach(el => {
        el.textContent = initials;
    });

    // Swapping modules for Fiduciary Validator Advisor
    if (role === 'advisor') {
        const sidebar = document.querySelector('.db-sidebar');
        if (sidebar) {
            const menuContainer = sidebar.querySelector('div[style*="overflow-y"]') || sidebar;
            if (menuContainer) {
                const path = window.location.pathname.split('/').pop() || 'studio-portal.html';
                
                menuContainer.innerHTML = `
                    <a href="studio-portal.html" class="sidebar-logo"><img src="images/logo.webp" alt="Stackly Logo"></a>
                    
                    <!-- Group 1: Consensus Main -->
                    <div class="sidebar-section-title" style="margin-top: 1rem;">Consensus Node</div>
                    <nav class="sidebar-menu">
                        <a href="studio-portal.html" class="sidebar-link ${path === 'studio-portal.html' ? 'active' : ''}"><i class="fa-solid fa-chart-pie"></i> Node Overview</a>
                        <a href="portfolio-holdings.html" class="sidebar-link ${path === 'portfolio-holdings.html' ? 'active' : ''}"><i class="fa-solid fa-users"></i> LP Directory</a>
                        <a href="asset-allocation.html" class="sidebar-link ${path === 'asset-allocation.html' ? 'active' : ''}"><i class="fa-solid fa-scale-balanced"></i> Rebalance Mandates</a>
                        <a href="advisory-schedule.html" class="sidebar-link ${path === 'advisory-schedule.html' ? 'active' : ''}"><i class="fa-solid fa-calendar-check"></i> Sync Requests</a>
                    </nav>

                    <!-- Group 2: Fiduciary Oversight -->
                    <div class="sidebar-section-title" style="margin-top: 1rem;">Node Oversight</div>
                    <nav class="sidebar-menu">
                        <a href="fiduciary-booking.html" class="sidebar-link ${path === 'fiduciary-booking.html' ? 'active' : ''}"><i class="fa-solid fa-file-shield"></i> Validator Logs</a>
                    </nav>

                    <!-- Group 3: Yield Simulator -->
                    <div class="sidebar-section-title" style="margin-top: 1rem;">Yield Simulator</div>
                    <nav class="sidebar-menu">
                        <a href="roi-calculator.html" class="sidebar-link ${path === 'roi-calculator.html' ? 'active' : ''}"><i class="fa-solid fa-gauge-high"></i> APY Simulator</a>
                        <a href="tax-harvesting.html" class="sidebar-link ${path === 'tax-harvesting.html' ? 'active' : ''}"><i class="fa-solid fa-shield-halved"></i> Audit Logging</a>
                    </nav>
                `;
            }
        }

        // Customise main dashboard panel
        if (window.location.pathname.endsWith('studio-portal.html') || window.location.pathname.endsWith('studio-portal')) {
            const welcomeHero = document.querySelector('.db-welcome-hero');
            if (welcomeHero) {
                welcomeHero.innerHTML = `
                    <h1>Consensus Panel, <span class="user-name" style="font-size: inherit; font-weight: inherit; color: inherit;">Advisor ${userName}</span></h1>
                    <p>Node Operations Center. Verify smart contract audits, manage addresses drift tolerances, and approve gas optimization routines.</p>
                `;
            }

            const statCards = document.querySelectorAll('.stat-card');
            if (statCards.length >= 4) {
                statCards[0].innerHTML = `
                    <div>
                        <div class="stat-label">Total Assets Under Staking</div>
                        <h3 class="stat-value">$1.28 Billion</h3>
                    </div>
                    <div class="stat-icon-wrapper" style="background: rgba(37, 99, 235, 0.1); color: var(--primary-light);"><i class="fa-solid fa-vault"></i></div>
                `;
                statCards[1].innerHTML = `
                    <div>
                        <div class="stat-label">Active LP Accounts</div>
                        <h3 class="stat-value">158 Addresses</h3>
                    </div>
                    <div class="stat-icon-wrapper" style="background: rgba(194, 125, 56, 0.1); color: var(--accent-light);"><i class="fa-solid fa-users"></i></div>
                `;
                statCards[2].innerHTML = `
                    <div>
                        <div class="stat-label">Validator Compliance Rating</div>
                        <h3 class="stat-value">99.8% Uptime</h3>
                    </div>
                    <div class="stat-icon-wrapper" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;"><i class="fa-solid fa-shield-halved"></i></div>
                `;
                statCards[3].innerHTML = `
                    <div>
                        <div class="stat-label">Node Consensus Tier</div>
                        <h3 class="stat-value">Lead Validator</h3>
                    </div>
                    <div class="stat-icon-wrapper" style="background: rgba(168, 85, 247, 0.1); color: #a855f7;"><i class="fa-solid fa-user-tie"></i></div>
                `;
            }

            const tableTitle = document.querySelector('.panel-box-title');
            if (tableTitle) {
                tableTitle.textContent = "Web3 Liquidity Provider (LP) Directory";
            }
            const table = document.querySelector('.db-table');
            if (table) {
                const tbody = table.querySelector('tbody');
                if (tbody) {
                    tbody.innerHTML = `
                        <tr>
                            <td class="text-light-value">Hamilton DAO Vault</td>
                            <td>0x71C...B29</td>
                            <td>$2,450,000 TVL</td>
                            <td><span class="badge-status status-active">Online</span></td>
                        </tr>
                        <tr>
                            <td class="text-light-value">Aurelia Yield Fund LLC</td>
                            <td>0x3aF...9E2</td>
                            <td>$15,400,000 TVL</td>
                            <td><span class="badge-status status-active">Online</span></td>
                        </tr>
                    `;
                }
            }
        }

        // Customise holdings subpage (Client Directory)
        if (window.location.pathname.endsWith('portfolio-holdings.html')) {
            const welcomeHero = document.querySelector('.db-welcome-hero');
            if (welcomeHero) {
                welcomeHero.innerHTML = `
                    <h1>Liquidity Provider Directory</h1>
                    <p>Track consensus details of delegated addresses and capital metrics.</p>
                `;
            }
            const table = document.querySelector('.db-table');
            if (table) {
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Delegate Account</th>
                            <th>Validator Address</th>
                            <th>Total TVL</th>
                            <th>Uptime Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-light-value" data-label="Account">Hamilton DAO Vault</td>
                            <td data-label="Address">0x71C27B...901B</td>
                            <td data-label="TVL">$2,450,000</td>
                            <td data-label="Uptime">99.98%</td>
                            <td data-label="Status"><span class="badge-status status-active">Online</span></td>
                        </tr>
                        <tr>
                            <td class="text-light-value" data-label="Account">Aurelia Yield Fund LLC</td>
                            <td data-label="Address">0x3aF12B...202F</td>
                            <td data-label="TVL">$15,400,000</td>
                            <td data-label="Uptime">99.92%</td>
                            <td data-label="Status"><span class="badge-status status-active">Online</span></td>
                        </tr>
                        <tr>
                            <td class="text-light-value" data-label="Account">Vance Multi-Sig Trust</td>
                            <td data-label="Address">0x9Fa481...789D</td>
                            <td data-label="TVL">$8,720,000</td>
                            <td data-label="Uptime">100.00%</td>
                            <td data-label="Status"><span class="badge-status status-active">Online</span></td>
                        </tr>
                    </tbody>
                `;
            }
        }

        // Customise allocation subpage (Rebalance Mandates)
        if (window.location.pathname.endsWith('asset-allocation.html')) {
            const welcomeHero = document.querySelector('.db-welcome-hero');
            if (welcomeHero) {
                welcomeHero.innerHTML = `
                    <h1>Consensus Allocation Mandates</h1>
                    <p>Execute token swaps, modify yield allocations, and coordinate model drift corrections.</p>
                `;
            }
            const box = document.querySelector('.panel-box');
            if (box) {
                box.innerHTML = `
                    <h3 class="panel-box-title" style="margin-bottom: 1.5rem;">Token Allocations & Slashing Limits</h3>
                    <div class="widget-metric-row">
                        <div class="widget-metric-header">
                            <span>L1 Staking Pool Drift</span>
                            <span class="text-light-value">Drift: +4.2% (Action Required)</span>
                        </div>
                        <div class="widget-progress-bar">
                            <div class="widget-progress-fill" style="width: 84%; background-color: var(--accent);"></div>
                        </div>
                    </div>
                    <div class="widget-metric-row" style="margin-top: 1.5rem;">
                        <div class="widget-metric-header">
                            <span>Stablecoin Yield Allocation</span>
                            <span class="text-light-value">Drift: -0.5% (Within Range)</span>
                        </div>
                        <div class="widget-progress-bar">
                            <div class="widget-progress-fill" style="width: 15%; background-color: var(--primary);"></div>
                        </div>
                    </div>
                `;
            }
        }

        // Customise schedule subpage (Appointment Requests)
        if (window.location.pathname.endsWith('advisory-schedule.html')) {
            const welcomeHero = document.querySelector('.db-welcome-hero');
            if (welcomeHero) {
                welcomeHero.innerHTML = `
                    <h1>Validator Sync Requests</h1>
                    <p>Review and authorize node synchronization and smart contract parameters request briefings.</p>
                `;
            }
            const table = document.querySelector('.db-table');
            if (table) {
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Sync Time Block</th>
                            <th>Delegating Client</th>
                            <th>Agenda / Protocol</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-light-value">Thu @ 11:30 AM</td>
                            <td>Alexander Hamilton</td>
                            <td>Multi-Sig Shielding Setup</td>
                            <td><span class="badge-status status-active" style="cursor: pointer;" onclick="window.showCustomAlert('Node synchronization sync session approved.', 'success')">Approve</span></td>
                        </tr>
                        <tr>
                            <td class="text-light-value">Fri @ 03:00 PM</td>
                            <td>Aurelia Yield CEO</td>
                            <td>Venture DAO Allocation Sync</td>
                            <td><span class="badge-status status-active" style="cursor: pointer;" onclick="window.showCustomAlert('Node synchronization sync session approved.', 'success')">Approve</span></td>
                        </tr>
                    </tbody>
                `;
            }
        }
    }
}
