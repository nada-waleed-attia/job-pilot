// Profile Page JavaScript
AOS.init({ duration: 1000, once: true });
requireAuth();

// Profile Image Upload
document.getElementById('avatarInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
            showAlert('تم تحديث الصورة الشخصية', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// CV Upload
document.getElementById('cvInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const fileName = file.name;
        document.getElementById('cvFileName').textContent = fileName;
        showAlert('تم رفع السيرة الذاتية', 'success');
    }
});

// Skills Management
function addSkill() {
    const skillInput = document.getElementById('newSkill');
    const skillValue = skillInput.value.trim();
    
    if (skillValue) {
        const skillsContainer = document.getElementById('skillsContainer');
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skillValue}
            <span class="remove" onclick="removeSkill(this)">×</span>
        `;
        skillsContainer.appendChild(skillTag);
        skillInput.value = '';
    }
}

function removeSkill(element) {
    element.parentElement.remove();
}

// Portfolio Management
function addPortfolioItem() {
    const portfolioContainer = document.getElementById('portfolioContainer');
    const newItem = document.createElement('div');
    newItem.className = 'portfolio-item';
    newItem.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-8">
                <h6>مشروع جديد</h6>
                <p class="text-muted mb-0">وصف المشروع</p>
            </div>
            <div class="col-md-4 text-end">
                <button class="btn btn-sm btn-outline-primary" onclick="editPortfolioItem(this)">تعديل</button>
                <button class="btn btn-sm btn-outline-danger" onclick="removePortfolioItem(this)">حذف</button>
            </div>
        </div>
    `;
    portfolioContainer.appendChild(newItem);
    showAlert('تم إضافة مشروع جديد', 'success');
}

function removePortfolioItem(element) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
        element.closest('.portfolio-item').remove();
        showAlert('تم حذف المشروع', 'success');
    }
}

function editPortfolioItem(element) {
    showAlert('فتح محرر المشروع...', 'info');
}

// Form Validation
function validateProfileForm() {
    const requiredFields = document.querySelectorAll('#profileForm [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Save Profile
document.getElementById('saveProfileBtn')?.addEventListener('click', function() {
    if (validateProfileForm()) {
        setLoadingState(this, true);
        
        setTimeout(() => {
            setLoadingState(this, false);
            showAlert('تم حفظ الملف الشخصي بنجاح', 'success');
        }, 2000);
    } else {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'warning');
    }
});

// Auto-save functionality
let autoSaveTimer;
document.querySelectorAll('#profileForm input, #profileForm textarea, #profileForm select').forEach(field => {
    field.addEventListener('input', function() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            console.log('Auto-saving...');
            // Here you would implement actual auto-save logic
        }, 2000);
    });
});
