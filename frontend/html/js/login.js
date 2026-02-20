// Login Page JavaScript
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.className = 'bi bi-eye-slash';
    } else {
        passwordInput.type = 'password';
        passwordIcon.className = 'bi bi-eye';
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateEmail(email)) {
        showAlert('البريد الإلكتروني غير صحيح', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showAlert('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'danger');
        return;
    }
    
    // Set loading state
    setLoadingState(submitBtn, true);
    
    try {
        await login(email, password);
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        setLoadingState(submitBtn, false);
    }
});

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.textContent.trim();
        showAlert(`تسجيل الدخول بـ ${platform} قيد التطوير`, 'info');
    });
});

// Forgot password handler
document.querySelector('a[href="#"]').addEventListener('click', function(e) {
    e.preventDefault();
    showAlert('استعادة كلمة المرور قيد التطوير', 'info');
});
