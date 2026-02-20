// Main Website JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // Initialize navigation
    initializeNavigation();
    
    // Add smooth scrolling
    initializeSmoothScroll();
    
    // Add animations on scroll
    initializeScrollAnimations();
});

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Initialize Smooth Scroll
function initializeSmoothScroll() {
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
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe service cards and stats
    const serviceCards = document.querySelectorAll('.service-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    [...serviceCards, ...statItems].forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Navigation Functions
function goToAISystem() {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    
    if (userData) {
        // User already registered, go to results
        window.location.href = 'ai-system.html';
    } else {
        // New user, go to AI system registration
        window.location.href = 'ai-system.html';
    }
}

function goToSimpleSearch() {
    window.location.href = 'search-hero-separated.html';
}

function goToLinkedInSearch() {
    window.location.href = 'search-real.html';
}

// Login/Register Functions
function showLogin() {
    // Simple login modal
    const loginHTML = `
        <div class="login-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>تسجيل الدخول</h3>
                    <button class="close-btn" onclick="closeModal()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" id="loginEmail" placeholder="example@email.com">
                    </div>
                    <div class="form-group">
                        <label>كلمة المرور</label>
                        <input type="password" id="loginPassword" placeholder="•••••">
                    </div>
                    <div class="form-actions">
                        <button class="login-submit-btn" onclick="handleLogin()">
                            <i class="bi bi-box-arrow-in-right"></i>
                            تسجيل الدخول
                        </button>
                    </div>
                    <p class="switch-form">
                        ليس لديك حساب؟ <a href="#" onclick="showRegister(); closeModal();">إنشاء حساب</a>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    showModal(loginHTML);
}

function showRegister() {
    const registerHTML = `
        <div class="register-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>إنشاء حساب جديد</h3>
                    <button class="close-btn" onclick="closeModal()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>الاسم الكامل</label>
                        <input type="text" id="registerName" placeholder="أدخل اسمك الكامل">
                    </div>
                    <div class="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" id="registerEmail" placeholder="example@email.com">
                    </div>
                    <div class="form-group">
                        <label>كلمة المرور</label>
                        <input type="password" id="registerPassword" placeholder="•••••">
                    </div>
                    <div class="form-group">
                        <label>تأكيد كلمة المرور</label>
                        <input type="password" id="confirmPassword" placeholder="••••••">
                    </div>
                    <div class="form-actions">
                        <button class="register-submit-btn" onclick="handleRegister()">
                            <i class="bi bi-person-plus"></i>
                            إنشاء حساب
                        </button>
                    </div>
                    <p class="switch-form">
                        لديك حساب بالفعل؟ <a href="#" onclick="showLogin(); closeModal();">تسجيل الدخول</a>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    showModal(registerHTML);
}

// Modal Functions
function showModal(html) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = html;
    
    // Add styles
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px 25px 20px;
                border-bottom: 1px solid #f8f9fa;
            }
            
            .modal-header h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #333;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: #f8f9fa;
                color: #333;
            }
            
            .modal-body {
                padding: 25px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                font-weight: 600;
                color: #333;
                margin-bottom: 8px;
            }
            
            .form-group input {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            
            .form-actions {
                margin-bottom: 20px;
            }
            
            .login-submit-btn,
            .register-submit-btn {
                width: 100%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 15px;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .login-submit-btn:hover,
            .register-submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
            }
            
            .switch-form {
                text-align: center;
                color: #666;
            }
            
            .switch-form a {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
            }
            
            .switch-form a:hover {
                text-decoration: underline;
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
    }
    
    document.body.appendChild(modalContainer);
    
    // Close on outside click
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });
}

function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modalContainer.remove();
        }, 300);
    }
}

// Handle Login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }
    
    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        alert('تم تسجيل الدخول بنجاح!');
        closeModal();
        
        // Redirect based on user data
        const userData = localStorage.getItem('userData');
        if (userData) {
            window.location.href = 'ai-system.html';
        }
    }
}

// Handle Register
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('كلمات المرور غير متطابقة');
        return;
    }
    
    // Store user data
    const userData = {
        name: name,
        email: email,
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('userBasicData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    alert('تم إنشاء الحساب بنجاح! يرجى إكمال بياناتك في النظام الذكي.');
    closeModal();
    
    // Redirect to AI system for complete registration
    window.location.href = 'ai-system.html';
}

// Check login status on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('userData');
    
    if (isLoggedIn && userData) {
        // User is logged in and has complete data
        updateUIForLoggedInUser();
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    if (loginBtn && registerBtn && userData.fullName) {
        loginBtn.textContent = userData.fullName;
        loginBtn.onclick = () => showUserMenu();
        registerBtn.textContent = 'الملف الشخصي';
        registerBtn.onclick = () => window.location.href = 'ai-system.html';
    }
}

// Show user menu
function showUserMenu() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    const menuHTML = `
        <div class="user-menu-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>ملف المستخدم</h3>
                    <button class="close-btn" onclick="closeModal()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="user-info">
                        <div class="user-avatar">
                            <i class="bi bi-person-circle"></i>
                        </div>
                        <h4>${userData.fullName || 'مستخدم'}</h4>
                        <p>${userData.email || 'user@example.com'}</p>
                    </div>
                    <div class="user-actions">
                        <button class="action-btn" onclick="window.location.href='ai-system.html'">
                            <i class="bi bi-robot"></i>
                            النظام الذكي
                        </button>
                        <button class="action-btn" onclick="viewApplications()">
                            <i class="bi bi-send-check"></i>
                            التقديمات
                        </button>
                        <button class="action-btn logout-btn" onclick="handleLogout()">
                            <i class="bi bi-box-arrow-right"></i>
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal(menuHTML);
}

// View applications
function viewApplications() {
    const applications = JSON.parse(localStorage.getItem('aiApplications') || '[]');
    
    if (applications.length === 0) {
        alert('لا توجد تقديمات حالياً');
        return;
    }
    
    const applicationsList = applications.map(app => 
        `• ${app.jobTitle} في ${app.company} (${app.matchScore}% مطابقة)`
    ).join('\n');
    
    alert(`التقديمات:\n\n${applicationsList}`);
    closeModal();
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    alert('تم تسجيل الخروج بنجاح');
    closeModal();
    
    // Reload page to update UI
    location.reload();
}

// Initialize on page load
checkLoginStatus();
