/**
 * Main Interactive Scripts — Kayra Ecrin Küçük
 * Premium portfolio interaction suite:
 * - Top reading scroll progress indicator
 * - Sticky header backdrop-blur transition on scroll
 * - Mobile navigation drawer with animated icon toggle
 * - Spotlight card hover lighting effect (--spot-x, --spot-y)
 * - Scroll reveal animations with IntersectionObserver
 * - Dynamic number counter animations for stats
 * - 3D interactive avatar tilt physics on hero hover
 * - Smooth trailing cursor glow in purple atmosphere
 * - Filter tabs for project showcase
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reading Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    const updateProgress = () => {
        if (!progressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // 2. Header Scroll Blur Transition
    const header = document.querySelector('.site-header');
    const handleHeaderScroll = () => {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // 3. Mobile Navigation Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            const icon = mobileToggle.querySelector('svg');
            if (icon) {
                if (isOpen) {
                    icon.innerHTML = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';
                } else {
                    icon.innerHTML = '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>';
                }
            }
        });

        // Close drawer on link click
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileToggle.querySelector('svg');
                    if (icon) icon.innerHTML = '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>';
                }
            });
        });
    }

    // 4. Spotlight Hover Effect for Cards
    const spotlightCards = document.querySelectorAll('.spotlight-card, .featured-project-card, .score-badge-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--spot-x', `${x}px`);
            card.style.setProperty('--spot-y', `${y}px`);
        });
    });

    // 5. Scroll Reveal with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Number Counter Animation for Stats
    const counterElements = document.querySelectorAll('[data-count-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-count-target'));
                const suffix = entry.target.getAttribute('data-count-suffix') || '';
                const prefix = entry.target.getAttribute('data-count-prefix') || '';
                const duration = 1500;
                const start = performance.now();

                const updateCount = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutCubic curve
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentVal = Math.floor(easeProgress * target);

                    entry.target.textContent = `${prefix}${currentVal}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = `${prefix}${target}${suffix}`;
                    }
                };

                requestAnimationFrame(updateCount);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));

    // 7. Subtle 3D Hero Avatar Tilt Effect
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    const heroSection = document.querySelector('.hero-section');
    if (avatarWrapper && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = avatarWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
            const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

            const rotateX = -deltaY * 12;
            const rotateY = deltaX * 12;

            avatarWrapper.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            avatarWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // 8. Interactive Ambient Cursor Glow (Desktop Only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        const animateGlow = () => {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;
            requestAnimationFrame(animateGlow);
        };
        requestAnimationFrame(animateGlow);
    }

    // 9. Project Filtering System (for projects.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-filter-item');
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                        setTimeout(() => card.classList.add('revealed'), 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 10. Certificate Lightbox Modal Controller
    let modalEl = document.getElementById('cert-modal');
    if (!modalEl) {
        // Dynamically create modal if not present
        modalEl = document.createElement('div');
        modalEl.id = 'cert-modal';
        modalEl.className = 'cert-modal';
        modalEl.setAttribute('role', 'dialog');
        modalEl.setAttribute('aria-modal', 'true');
        modalEl.setAttribute('aria-label', 'Certificate Viewer');
        modalEl.innerHTML = `
            <div class="cert-modal-backdrop" id="cert-modal-backdrop"></div>
            <div class="cert-modal-dialog">
                <div class="cert-modal-header">
                    <div class="cert-modal-title-group">
                        <h3 id="cert-modal-title">Certificate</h3>
                        <p id="cert-modal-subtitle">Official Verification</p>
                    </div>
                    <button type="button" class="cert-modal-close-btn" id="cert-modal-close" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="cert-modal-body">
                    <div class="cert-modal-img-wrap">
                        <img id="cert-modal-img" src="" alt="Certificate Preview" class="cert-modal-img" loading="lazy">
                    </div>
                    <div class="cert-modal-notes" id="cert-modal-notes"></div>
                </div>
                <div class="cert-modal-footer">
                    <span id="cert-modal-date" class="font-mono text-muted" style="font-size: 0.8125rem;"></span>
                    <div style="display: flex; gap: 0.75rem; align-items: center;">
                        <a id="cert-modal-pdf" href="#" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.5rem 1.15rem; font-size: 0.8125rem;">
                            <span>Open Official PDF</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        <button type="button" class="btn-secondary" id="cert-modal-dismiss" style="padding: 0.5rem 1rem; font-size: 0.8125rem;">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);
    }

    const modalBackdrop = document.getElementById('cert-modal-backdrop');
    const modalCloseBtn = document.getElementById('cert-modal-close');
    const modalDismissBtn = document.getElementById('cert-modal-dismiss');
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalSubtitle = document.getElementById('cert-modal-subtitle');
    const modalNotes = document.getElementById('cert-modal-notes');
    const modalDate = document.getElementById('cert-modal-date');
    const modalPdfLink = document.getElementById('cert-modal-pdf');

    const openCertModal = (data) => {
        if (!modalEl) return;
        if (modalImg) {
            modalImg.src = data.img || '';
            modalImg.alt = data.title || 'Certificate';
        }
        if (modalTitle) modalTitle.textContent = data.title || 'Certificate';
        if (modalSubtitle) modalSubtitle.textContent = data.issuer || 'Official Credential';
        if (modalNotes) {
            if (data.notes) {
                modalNotes.innerHTML = data.notes;
                modalNotes.style.display = 'block';
            } else {
                modalNotes.style.display = 'none';
            }
        }
        if (modalDate) modalDate.textContent = data.date ? `Awarded / Session: ${data.date}` : '';
        if (modalPdfLink) {
            if (data.pdf) {
                modalPdfLink.href = data.pdf;
                modalPdfLink.style.display = 'inline-flex';
            } else {
                modalPdfLink.style.display = 'none';
            }
        }
        modalEl.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeCertModal = () => {
        if (!modalEl) return;
        modalEl.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeCertModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCertModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeCertModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl && modalEl.classList.contains('open')) {
            closeCertModal();
        }
    });

    // Delegate click events for certificate previews
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-cert-img]');
        if (trigger) {
            e.preventDefault();
            const data = {
                img: trigger.getAttribute('data-cert-img'),
                title: trigger.getAttribute('data-cert-title') || 'Certificate of Achievement',
                issuer: trigger.getAttribute('data-cert-issuer') || 'Accredited Institution',
                notes: trigger.getAttribute('data-cert-notes') || '',
                date: trigger.getAttribute('data-cert-date') || '',
                pdf: trigger.getAttribute('data-cert-pdf') || ''
            };
            openCertModal(data);
        }
    });
});

