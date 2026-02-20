// Employer Registration JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // Initialize logo upload
    initializeLogoUpload();
    
    // Load saved data
    loadSavedData();
});

// Initialize Logo Upload
function initializeLogoUpload() {
    const logoInput = document.getElementById('logoInput');
    const logoDropZone = document.getElementById('logoDropZone');
    
    // File input change
    logoInput.addEventListener('change', handleLogoFile);
    
    // Drag and drop
    logoDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        logoDropZone.classList.add('drag-over');
    });
    
    logoDropZone.addEventListener('dragleave', () => {
        logoDropZone.classList.remove('drag-over');
    });
    
    logoDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        logoDropZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleLogoFile({ target: { files: files } });
        }
    });
}

// Handle Logo File
function handleLogoFile(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
        alert('الرجاء اختيار ملف صورة فقط (JPG, PNG, GIF)');
        return;
    }
    
    // Validate file size
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        alert('حجم الملف كبير جداً. الحد الأقصى هو 2 ميجابايت');
        return;
    }
    
    // Store logo data
    const logoData = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
    };
    
    localStorage.setItem('companyLogo', JSON.stringify(logoData));
    
    // Show logo preview
    showLogoPreview(file);
}

// Show Logo Preview
function showLogoPreview(file) {
    const logoDropZone = document.getElementById('logoDropZone');
    const logoPreview = document.getElementById('logoPreview');
    
    logoDropZone.style.display = 'none';
    logoPreview.style.display = 'flex';
    
    // Create file reader
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('logoImage').src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    document.getElementById('logoFileName').textContent = file.name;
    document.getElementById('logoFileSize').textContent = formatFileSize(file.size);
}

// Remove Logo
function removeLogo() {
    localStorage.removeItem('companyLogo');
    document.getElementById('logoDropZone').style.display = 'block';
    document.getElementById('logoPreview').style.display = 'none';
    document.getElementById('logoInput').value = '';
}

// Load Saved Data
function loadSavedData() {
    // Load basic data from main registration
    const basicData = JSON.parse(localStorage.getItem('employerBasicData') || '{}');
    
    if (basicData.companyName) {
        document.getElementById('companyName').value = basicData.companyName;
    }
    
    if (basicData.email) {
        document.getElementById('companyEmail').value = basicData.email;
    }
    
    // Load logo if exists
    const logoData = localStorage.getItem('companyLogo');
    if (logoData) {
        const logo = JSON.parse(logoData);
        // Create a fake file object for preview
        const file = {
            name: logo.name,
            size: logo.size,
            type: logo.type
        };
        showLogoPreview(file);
    }
}

// Submit Employer Registration
function submitEmployerRegistration() {
    // Collect form data
    const employerData = {
        // Company Information
        companyName: document.getElementById('companyName').value,
        companyIndustry: document.getElementById('companyIndustry').value,
        companySize: document.getElementById('companySize').value,
        companyLocation: document.getElementById('companyLocation').value,
        companyDescription: document.getElementById('companyDescription').value,
        
        // Contact Information
        contactName: document.getElementById('contactName').value,
        contactPosition: document.getElementById('contactPosition').value,
        companyEmail: document.getElementById('companyEmail').value,
        companyPhone: document.getElementById('companyPhone').value,
        companyWebsite: document.getElementById('companyWebsite').value,
        
        // Hiring Preferences
        hiringCount: document.getElementById('hiringCount').value,
        hiringType: document.getElementById('hiringType').value,
        experienceLevel: document.getElementById('experienceLevel').value,
        salaryRange: document.getElementById('salaryRange').value,
        requiredSkills: document.getElementById('requiredSkills').value,
        
        // Registration Info
        registeredAt: new Date().toISOString(),
        status: 'active'
    };
    
    // Validate required fields
    if (!validateEmployerData(employerData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري التسجيل...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        localStorage.setItem('employerData', JSON.stringify(employerData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'employer');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        alert('تم تسجيل صاحب العمل بنجاح!\n\nيمكنك الآن نشر الوظائف والعثور على أفضل المرشحين باستخدام الذكاء الاصطناعي.');
        
        // Redirect to employer dashboard
        setTimeout(() => {
            window.location.href = 'employer-dashboard.html';
        }, 2000);
    }, 2000);
}

// Validate Employer Data
function validateEmployerData(data) {
    const required = [
        'companyName', 'companyIndustry', 'companySize', 'companyLocation',
        'contactName', 'contactPosition', 'companyEmail', 'companyPhone'
    ];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`الرجاء ملء حقل ${getFieldLabel(field)}`);
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.companyEmail)) {
        alert('الرجاء إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    // Validate phone format (simple validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]*$/;
    if (!phoneRegex.test(data.companyPhone)) {
        alert('الرجاء إدخال رقم هاتف صحيح');
        return false;
    }
    
    return true;
}

// Get Field Label
function getFieldLabel(field) {
    const labels = {
        companyName: 'اسم الشركة',
        companyIndustry: 'المجال',
        companySize: 'حجم الشركة',
        companyLocation: 'الموقع الرئيسي',
        contactName: 'الاسم الكامل',
        contactPosition: 'المنصب',
        companyEmail: 'البريد الإلكتروني',
        companyPhone: 'رقم الهاتف'
    };
    return labels[field] || field;
}

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add CSS for animations
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
