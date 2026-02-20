// Register Page JavaScript
let currentStep = 1;
const totalSteps = 3;

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + 'Icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'bi bi-eye-slash';
    } else {
        passwordInput.type = 'password';
        icon.className = 'bi bi-eye';
    }
}

// Password strength checker
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('passwordStrength');
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    strengthBar.className = 'password-strength';
    if (strength <= 1) {
        strengthBar.classList.add('weak');
    } else if (strength === 2) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
});

// Skill selection
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.classList.toggle('selected');
        updateSelectedSkills();
    });
});

function updateSelectedSkills() {
    const selectedSkills = Array.from(document.querySelectorAll('.skill-tag.selected'))
        .map(tag => tag.dataset.skill);
    document.getElementById('selectedSkills').value = selectedSkills.join(',');
}

// Step navigation
function changeStep(direction) {
    if (direction === 1 && !validateCurrentStep()) {
        return;
    }
    
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
    
    // Update step number
    currentStep += direction;
    
    // Show new step
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    
    // Update buttons
    updateButtons();
    
    // Mark completed steps
    for (let i = 1; i < currentStep; i++) {
        document.querySelector(`[data-step="${i}"]`).classList.add('completed');
    }
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    nextBtn.style.display = currentStep === totalSteps ? 'none' : 'block';
    submitBtn.style.display = currentStep === totalSteps ? 'block' : 'none';
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            showAlert('يرجى ملء جميع الحقول المطلوبة', 'warning');
            return false;
        }
    }
    
    // Validate email
    if (currentStep === 1) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!validateEmail(email)) {
            showAlert('البريد الإلكتروني غير صحيح', 'danger');
            return false;
        }
        
        if (password.length < 6) {
            showAlert('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'danger');
            return false;
        }
        
        if (password !== confirmPassword) {
            showAlert('كلمات المرور غير متطابقة', 'danger');
            return false;
        }
    }
    
    return true;
}

// Handle form submission
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    setLoadingState(submitBtn, true);
    
    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        experienceLevel: document.getElementById('experienceLevel').value,
        jobType: document.getElementById('jobType').value,
        currentTitle: document.getElementById('currentTitle').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        skills: document.getElementById('selectedSkills').value,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        industry: document.getElementById('industry').value,
        bio: document.getElementById('bio').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    try {
        await register(formData);
    } catch (error) {
        console.error('Registration error:', error);
    } finally {
        setLoadingState(submitBtn, false);
    }
});
