// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typing Animation
const typingTexts = ['تلقائياً', 'بذكاء', 'بسرعة', 'باحترافية'];
let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function typeText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const text = typingTexts[textIndex];
    
    if (isDeleting) {
        currentText = text.substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = text.substring(0, charIndex + 1);
        charIndex++;
    }
    
    typingElement.textContent = currentText;
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === text.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    typeText();
    
    // Animated Counter
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 10);
            } else {
                counter.innerText = target;
                // Add % sign if needed
                if (counter.getAttribute('data-count').includes('%')) {
                    counter.innerText = target + '%';
                } else if (counter.getAttribute('data-count').includes('+')) {
                    counter.innerText = target + '+';
                }
            }
        });
    };
    
    // Start counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
    
    // Initialize Swiper for testimonials
    const swiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
    
    // Smooth scrolling for navigation links
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
    
    // Navbar background on scroll
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-dark');
                navbar.classList.remove('bg-primary');
            } else {
                navbar.classList.add('bg-primary');
                navbar.classList.remove('bg-dark');
            }
        });
    }
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Particle effect for hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    heroSection.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Create particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Button click handlers for register buttons
document.addEventListener('DOMContentLoaded', function() {
    const registerButtons = document.querySelectorAll('.btn-arrow-animated[href*="register"]');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading effect
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation ms-2"></i> جاري الانتقال...';
            this.style.pointerEvents = 'none';
            
            // Add spin animation
            const style = document.createElement('style');
            style.textContent = `
                .spin-animation {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Navigate after delay
            setTimeout(() => {
                window.location.href = this.href;
            }, 800);
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Footer CTA Video Button
    const videoBtn = document.querySelector('.cta-buttons .btn-outline-light');
    if (videoBtn) {
        videoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal for video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <div class="video-modal-header">
                        <h4>شاهد كيف يعمل JobPilot</h4>
                        <button class="video-modal-close">&times;</button>
                    </div>
                    <div class="video-modal-body">
                        <div class="video-placeholder">
                            <i class="bi bi-play-circle"></i>
                            <p>فيديو تعريفي قريباً</p>
                        </div>
                    </div>
                </div>
                <div class="video-modal-backdrop"></div>
            `;
            
            // Add modal styles
            const modalStyles = document.createElement('style');
            modalStyles.textContent = `
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .video-modal-content {
                    background: white;
                    border-radius: 15px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow: hidden;
                    position: relative;
                    animation: slideUp 0.3s ease;
                }
                
                .video-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 25px;
                    border-bottom: 1px solid #e9ecef;
                }
                
                .video-modal-header h4 {
                    margin: 0;
                    color: #333;
                }
                
                .video-modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .video-modal-close:hover {
                    background: #f8f9fa;
                    color: #333;
                }
                
                .video-modal-body {
                    padding: 40px;
                    text-align: center;
                }
                
                .video-placeholder {
                    background: #f8f9fa;
                    border-radius: 10px;
                    padding: 60px 20px;
                    border: 2px dashed #dee2e6;
                }
                
                .video-placeholder i {
                    font-size: 4rem;
                    color: #6c757d;
                    margin-bottom: 20px;
                    display: block;
                }
                
                .video-placeholder p {
                    color: #6c757d;
                    margin: 0;
                    font-size: 1.1rem;
                }
                
                .video-modal-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to { 
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(modalStyles);
            
            document.body.appendChild(modal);
            
            // Close modal handlers
            const closeBtn = modal.querySelector('.video-modal-close');
            const backdrop = modal.querySelector('.video-modal-backdrop');
            
            function closeModal() {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(modalStyles);
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeModal);
            backdrop.addEventListener('click', closeModal);
            
            // Add fadeOut animation
            const fadeOutStyle = document.createElement('style');
            fadeOutStyle.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(fadeOutStyle);
        });
    }

    // Footer Social Links Animation
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.5s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Add bounce animation
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            80% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(bounceStyle);

    // Footer Links Hover Effect
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(pulseStyle);
});
