// Search Page JavaScript - Simple Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Search Form Submission
    const searchForm = document.querySelector('.search-form-card');
    if (searchForm) {
        const searchBtn = searchForm.querySelector('.btn-search');
        
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation me-2"></i> جاري البحث...';
            this.disabled = true;
            
            // Simulate search
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification('تم البحث بنجاح! تم العثور على 124 وظيفة مطابقة.', 'success');
            }, 1500);
        });
    }

    // Quick Search Tags
    const searchTags = document.querySelectorAll('.search-tag');
    searchTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tags
            searchTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Update search input
            const searchInput = document.querySelector('.search-form-card input[type="text"]');
            if (searchInput) {
                searchInput.value = this.textContent.trim();
            }
            
            // Trigger search
            document.querySelector('.btn-search').click();
        });
    });

    // Filter Application
    const applyFiltersBtn = document.querySelector('.filters-card .btn-primary');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation me-2"></i> جاري التطبيق...';
            this.disabled = true;
            
            // Simulate filter application
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification('تم تطبيق الفلاتر بنجاح!', 'success');
                
                // Scroll to job listings
                document.querySelector('.job-listings').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1000);
        });
    }

    // Job Card Actions
    const saveButtons = document.querySelectorAll('.job-card .btn-outline-primary');
    const applyButtons = document.querySelectorAll('.job-card .btn-primary');

    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isSaved = this.classList.contains('saved');
            
            if (isSaved) {
                this.classList.remove('saved');
                this.innerHTML = 'حفظ';
                this.classList.remove('btn-success');
                this.classList.add('btn-outline-primary');
                showNotification('تم إزالة الوظيفة من المحفوظات', 'info');
            } else {
                this.classList.add('saved');
                this.innerHTML = '<i class="bi bi-check me-1"></i> محفوظ';
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-success');
                showNotification('تم حفظ الوظيفة بنجاح!', 'success');
            }
        });
    });

    applyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation me-2"></i> جاري التقديم...';
            this.disabled = true;
            
            // Simulate application
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-check me-1"></i> تم التقديم';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                showNotification('تم التقديم على الوظيفة بنجاح!', 'success');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                    this.disabled = false;
                }, 3000);
            }, 2000);
        });
    });

    // Sort Dropdown
    const sortSelect = document.querySelector('.form-select-sm');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex].text;
            showNotification(`تم الترتيب حسب: ${selectedOption}`, 'info');
            
            // Simulate sorting
            setTimeout(() => {
                showNotification('تم تحديث النتائج', 'success');
            }, 500);
        });
    }

    // Utility Functions
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-radius: 10px;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
        
        // Add animation styles if not already added
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
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
            `;
            document.head.appendChild(style);
        }
    }

    // Add spin animation styles
    if (!document.querySelector('#spin-animation')) {
        const spinStyle = document.createElement('style');
        spinStyle.id = 'spin-animation';
        spinStyle.textContent = `
            .spin-animation {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
    }

    // Filter checkboxes and radios
    const filterInputs = document.querySelectorAll('.filters-card input[type="checkbox"], .filters-card input[type="radio"]');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Update filter count
            const checkedFilters = document.querySelectorAll('.filters-card input:checked').length;
            const applyBtn = document.querySelector('.filters-card .btn-primary');
            
            if (checkedFilters > 0) {
                applyBtn.innerHTML = `تطبيق الفلاتر (${checkedFilters})`;
            } else {
                applyBtn.innerHTML = 'تطبيق الفلاتر';
            }
        });
    });
});
