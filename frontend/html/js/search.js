// Modern Search Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Advanced Search Toggle
    const advancedToggle = document.querySelector('.advanced-link');
    const advancedPanel = document.querySelector('.advanced-search-panel');
    
    if (advancedToggle && advancedPanel) {
        advancedToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (advancedPanel.style.display === 'none') {
                advancedPanel.style.display = 'block';
                this.innerHTML = '<i class="bi bi-sliders"></i> إغلاق البحث المتقدم';
            } else {
                advancedPanel.style.display = 'none';
                this.innerHTML = '<i class="bi bi-sliders"></i> بحث متقدم';
            }
        });
    }

    // Search Form
    const searchBtn = document.querySelector('.search-btn-main');
    const searchInputs = document.querySelectorAll('.search-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const hasValue = Array.from(searchInputs).some(input => input.value.trim());
            
            if (!hasValue) {
                showNotification('يرجى إدخال كلمات مفتاحية للبحث', 'warning');
                return;
            }
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation me-2"></i> جاري البحث...';
            this.disabled = true;
            
            // Simulate search
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification('تم البحث بنجاح! تم العثور على 490 وظيفة', 'success');
                
                // Scroll to results
                document.querySelector('.job-results').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1500);
        });
    }

    // Popular Tags
    const popularTags = document.querySelectorAll('.popular-tag');
    popularTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update search input
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = this.textContent.trim();
                searchInput.focus();
            }
        });
    });

    // Filter Checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateFilterCount();
        });
    });

    function updateFilterCount() {
        const checkedCount = document.querySelectorAll('.filter-checkbox:checked').length;
        // You can update UI to show filter count if needed
        console.log('Active filters:', checkedCount);
    }

    // Salary Slider
    const salarySlider = document.querySelector('.salary-slider');
    const salaryDisplay = document.querySelector('.salary-display');
    
    if (salarySlider && salaryDisplay) {
        salarySlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            const min = 3000;
            const max = 30000;
            
            // Calculate dynamic range
            const rangeSize = 5000;
            const dynamicMin = Math.max(min, value - rangeSize);
            const dynamicMax = Math.min(max, value + rangeSize);
            
            salaryDisplay.innerHTML = `<span>${dynamicMin.toLocaleString()}</span> - <span>${dynamicMax.toLocaleString()}</span> ريال`;
        });
    }

    // Save Buttons
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('saved');
            
            if (this.classList.contains('saved')) {
                this.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
                showNotification('تم حفظ الوظيفة', 'success');
            } else {
                this.innerHTML = '<i class="bi bi-bookmark"></i>';
                showNotification('تم إزالة الوظيفة من المحفوظات', 'info');
            }
        });
    });

    // Apply Buttons
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card-modern').querySelector('.job-title').textContent;
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation me-2"></i> جاري التقديم...';
            this.disabled = true;
            
            // Simulate application
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-check me-1"></i> تم التقديم';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                showNotification(`تم التقديم على وظيفة ${jobTitle} بنجاح!`, 'success');
                
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
    const sortSelect = document.querySelector('.sort-select');
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

    // Pagination
    const pageBtns = document.querySelectorAll('.page-btn, .page-num');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('prev') || this.classList.contains('next')) {
                // Handle prev/next navigation
                if (!this.disabled) {
                    showNotification(`الانتقال ${this.classList.contains('prev') ? 'للخلف' : 'للأمام'}`, 'info');
                }
            } else if (this.classList.contains('page-num')) {
                // Handle page number
                // Remove active from all pages
                document.querySelectorAll('.page-num').forEach(p => p.classList.remove('active'));
                // Add active to clicked page
                this.classList.add('active');
                
                const pageNum = this.textContent;
                showNotification(`الانتقال إلى الصفحة ${pageNum}`, 'info');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Newsletter Form
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            
            if (!email) {
                showNotification('يرجى إدخال بريد إلكتروني', 'warning');
                newsletterInput.focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('يرجى إدخال بريد إلكتروني صحيح', 'warning');
                newsletterInput.focus();
                return;
            }
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation me-2"></i> جاري الاشتراك...';
            this.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-check me-1"></i> مشترك بنجاح!';
                this.classList.remove('btn-warning');
                this.classList.add('btn-success');
                
                showNotification('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
                newsletterInput.value = '';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-warning');
                    this.disabled = false;
                }, 3000);
            }, 1500);
        });
        
        // Handle Enter key in newsletter input
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }

    // Search Input Enter Key
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    });

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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

    // Auto-resize textarea inputs if any
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Add smooth scroll behavior
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
});
