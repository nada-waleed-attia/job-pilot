// Search Hero Page JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // CV Upload Functionality
    const cvUploadBtn = document.getElementById('cvUploadBtn');
    const cvInput = document.getElementById('cvInput');
    const cvFileName = document.getElementById('cvFileName');
    
    if (cvUploadBtn && cvInput && cvFileName) {
        // Trigger file input when button is clicked
        cvUploadBtn.addEventListener('click', function() {
            cvInput.click();
        });
        
        // Handle file selection
        cvInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Validate file type
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                const validExtensions = ['.pdf', '.doc', '.docx'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
                    showNotification('الرجاء اختيار ملف PDF أو Word فقط (PDF, DOC, DOCX)', 'error');
                    cvInput.value = '';
                    return;
                }
                
                // Validate file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    showNotification('حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت', 'error');
                    cvInput.value = '';
                    return;
                }
                
                // Show file name with success
                cvFileName.innerHTML = `<i class="bi bi-check-circle-fill"></i> تم اختيار: ${file.name} (${formatFileSize(file.size)})`;
                cvFileName.classList.add('show');
                
                // Change button style to show success
                cvUploadBtn.style.borderColor = '#4ade80';
                cvUploadBtn.style.background = 'rgba(74, 222, 128, 0.1)';
                
                // Show success notification
                showNotification('تم رفع السيرة الذاتية بنجاح!', 'success');
                
                // Store file info (in real app, this would be uploaded to server)
                const cvData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified
                };
                
                // Save to localStorage for demo purposes
                localStorage.setItem('userCV', JSON.stringify(cvData));
                
            } else {
                // Reset if no file selected
                cvFileName.classList.remove('show');
                cvFileName.innerHTML = '';
                cvUploadBtn.style.borderColor = '';
                cvUploadBtn.style.background = '';
            }
        });
        
        // Drag and drop functionality
        const cvUploadContainer = document.querySelector('.cv-upload-container');
        
        if (cvUploadContainer) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                cvUploadContainer.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                cvUploadContainer.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                cvUploadContainer.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight(e) {
                cvUploadContainer.classList.add('drag-over');
                cvUploadBtn.style.borderColor = '#4ade80';
                cvUploadBtn.style.background = 'rgba(74, 222, 128, 0.2)';
            }
            
            function unhighlight(e) {
                cvUploadContainer.classList.remove('drag-over');
                if (!cvInput.files[0]) {
                    cvUploadBtn.style.borderColor = '';
                    cvUploadBtn.style.background = '';
                }
            }
            
            cvUploadContainer.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                
                if (files.length > 0) {
                    cvInput.files = files;
                    const event = new Event('change', { bubbles: true });
                    cvInput.dispatchEvent(event);
                }
            }
        }
        
        // Check if there's already a saved CV
        const savedCV = localStorage.getItem('userCV');
        if (savedCV) {
            const cvData = JSON.parse(savedCV);
            cvFileName.innerHTML = `<i class="bi bi-check-circle-fill"></i> ملف محفوظ: ${cvData.name} (${formatFileSize(cvData.size)})`;
            cvFileName.classList.add('show');
            cvUploadBtn.style.borderColor = '#4ade80';
            cvUploadBtn.style.background = 'rgba(74, 222, 128, 0.1)';
        }
    }
    
    // Utility function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Search button functionality
    const searchBtn = document.getElementById("searchBtn");
    
    if (searchBtn) {
        searchBtn.addEventListener("click", function() {
            const jobTitle = document.querySelector('.search-box input[placeholder="المسمى الوظيفي، كلمات مفتاحية..."]').value;
            const location = document.querySelector('.search-box input[placeholder="الموقع"]').value;
            
            if (jobTitle || location) {
                // Show loading state
                const originalText = this.innerHTML;
                this.innerHTML = 'جاري البحث...';
                this.disabled = true;
                
                // Add loading animation
                this.style.animation = 'pulse 1s infinite';
                
                setTimeout(() => {
                    // Redirect to search results page
                    window.location.href = 'search-results.html';
                }, 1500);
            } else {
                // Show error message
                showNotification('الرجاء إدخال وظيفة أو موقع للبحث', 'warning');
                
                // Shake animation for search box
                const searchBox = document.querySelector('.search-box');
                searchBox.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    searchBox.style.animation = '';
                }, 500);
            }
        });
    }
    
    // Add enter key support for search inputs
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
        
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects for navigation buttons
    const navButtons = document.querySelectorAll('.nav-buttons button');
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-left h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Add parallax effect to floating icons
    const icons = document.querySelectorAll('.icon');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        icons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 9999;
                min-width: 300px;
                max-width: 400px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                animation: slideInRight 0.3s ease;
                color: #333;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 15px 20px;
            }
            
            .notification-success {
                border-right: 4px solid #28a745;
            }
            
            .notification-warning {
                border-right: 4px solid #ffc107;
            }
            
            .notification-info {
                border-right: 4px solid #17a2b8;
            }
            
            .notification-error {
                border-right: 4px solid #dc3545;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #6c757d;
                margin-right: auto;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                background: #f8f9fa;
                color: #333;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .cv-upload-container.drag-over {
                transform: scale(1.02);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle-fill',
        warning: 'exclamation-triangle-fill',
        info: 'info-circle-fill',
        error: 'x-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}
