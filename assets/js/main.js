/**
 * Devbook Theme - Main JavaScript
 * A 90s retro-inspired Ghost theme
 */

(function() {
    'use strict';

    // ===========================================
    // Dark Mode Toggle
    // ===========================================
    
    const initDarkMode = () => {
        const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('devbook-theme', isDark ? 'dark' : 'light');
            });
        });
    };

    // ===========================================
    // Mobile Menu Toggle
    // ===========================================
    
    const initMobileMenu = () => {
        const menuToggle = document.querySelector('[data-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        
        if (!menuToggle || !mobileMenu) return;
        
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                mobileMenu.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    };

    // ===========================================
    // Responsive Videos (FitVids alternative)
    // ===========================================
    
    const initResponsiveVideos = () => {
        const videos = document.querySelectorAll('.gh-content iframe[src*="youtube.com"], .gh-content iframe[src*="vimeo.com"]');
        
        videos.forEach(video => {
            // Skip if already wrapped
            if (video.parentElement.classList.contains('video-wrapper')) return;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper';
            wrapper.style.cssText = 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;';
            
            video.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
            
            video.parentNode.insertBefore(wrapper, video);
            wrapper.appendChild(video);
        });
    };

    // ===========================================
    // Smooth Scroll for Anchor Links
    // ===========================================
    
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip portal links
                if (targetId.startsWith('#/portal')) return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // ===========================================
    // Header Scroll Behavior
    // ===========================================
    
    const initHeaderScroll = () => {
        const header = document.querySelector('.db-header');
        if (!header) return;
        
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 10) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            
            // Hide/show header on scroll (optional - commented out by default)
            /*
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                header.classList.add('is-hidden');
            } else {
                header.classList.remove('is-hidden');
            }
            */
            
            lastScroll = currentScroll;
        }, { passive: true });
    };

    // ===========================================
    // External Links
    // ===========================================
    
    const initExternalLinks = () => {
        // Add target="_blank" and rel="noopener" to external links
        document.querySelectorAll('.gh-content a[href^="http"]').forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    };

    // ===========================================
    // Image Lightbox (basic)
    // ===========================================
    
    const initLightbox = () => {
        const images = document.querySelectorAll('.gh-content img:not(.kg-bookmark-thumbnail)');
        
        images.forEach(img => {
            // Make images clickable
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', () => {
                // Create lightbox overlay
                const overlay = document.createElement('div');
                overlay.className = 'db-lightbox';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: zoom-out;
                    padding: 2rem;
                `;
                
                // Clone the image
                const lightboxImg = img.cloneNode();
                lightboxImg.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border: none;
                `;
                
                overlay.appendChild(lightboxImg);
                document.body.appendChild(overlay);
                document.body.style.overflow = 'hidden';
                
                // Close on click or escape
                const closeLightbox = () => {
                    overlay.remove();
                    document.body.style.overflow = '';
                };
                
                overlay.addEventListener('click', closeLightbox);
                document.addEventListener('keydown', function onEscape(e) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                        document.removeEventListener('keydown', onEscape);
                    }
                });
            });
        });
    };

    // ===========================================
    // Copy Code Button
    // ===========================================
    
    const initCopyCode = () => {
        const codeBlocks = document.querySelectorAll('.gh-content pre');
        
        codeBlocks.forEach(block => {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            wrapper.style.position = 'relative';
            
            const button = document.createElement('button');
            button.className = 'copy-code-btn';
            button.innerHTML = 'Copy';
            button.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.5rem;
                font-family: var(--font-mono);
                font-size: 0.75rem;
                background: var(--color-bg);
                border: 1px solid var(--color-border);
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);
            wrapper.appendChild(button);
            
            // Show button on hover
            wrapper.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });
            wrapper.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });
            
            // Copy functionality
            button.addEventListener('click', async () => {
                const code = block.querySelector('code')?.textContent || block.textContent;
                
                try {
                    await navigator.clipboard.writeText(code);
                    button.innerHTML = 'Copied!';
                    setTimeout(() => {
                        button.innerHTML = 'Copy';
                    }, 2000);
                } catch (err) {
                    button.innerHTML = 'Error';
                }
            });
        });
    };

    // ===========================================
    // Initialize Everything
    // ===========================================
    
    const init = () => {
        initDarkMode();
        initMobileMenu();
        initResponsiveVideos();
        initSmoothScroll();
        initHeaderScroll();
        initExternalLinks();
        initLightbox();
        initCopyCode();
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

