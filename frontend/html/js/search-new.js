// Search Page New JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Search Form Handler
    const searchForm = document.querySelector('.main-search-form');
    const searchInput = document.querySelector('.search-input');
    const locationInput = document.querySelector('.location-input');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = searchInput.value.trim();
            const location = locationInput.value.trim();
            
            if (searchTerm || location) {
                // Show loading state
                const searchBtn = document.querySelector('.search-btn');
                const originalBtnText = searchBtn.innerHTML;
                searchBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري البحث...';
                searchBtn.disabled = true;
                
                // Simulate search delay
                setTimeout(() => {
                    searchBtn.innerHTML = originalBtnText;
                    searchBtn.disabled = false;
                    
                    // Show notification
                    showNotification('جاري عرض نتائج البحث...', 'success');
                    
                    // Scroll to results
                    document.querySelector('.main-content').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }, 1500);
            } else {
                showNotification('الرجاء إدخال كلمات بحث أو موقع', 'warning');
            }
        });
    }

    // Quick Search Tags
    const searchTags = document.querySelectorAll('.search-tag');
    searchTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagText = this.textContent;
            searchInput.value = tagText;
            
            // Add visual feedback
            this.style.background = 'rgba(255, 255, 255, 0.4)';
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
            }, 300);
            
            // Trigger search
            searchForm.dispatchEvent(new Event('submit'));
        });
    });

    // Filter Functions
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');

    // Clear all filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset salary inputs
            const salaryInputs = document.querySelectorAll('.range-inputs input');
            salaryInputs.forEach(input => {
                input.value = '';
            });
            
            // Reset salary sliders
            const minSlider = document.getElementById('minSalary');
            const maxSlider = document.getElementById('maxSlider');
            if (minSlider) minSlider.value = 0;
            if (maxSlider) maxSlider.value = 50000;
            
            showNotification('تم مسح جميع الفلاتر', 'info');
        });
    }

    // Apply filters
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const activeFilters = [];
            
            // Collect checked filters
            filterCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    activeFilters.push(checkbox.value);
                }
            });
            
            // Collect salary range
            const minSalary = document.querySelector('.range-inputs input[placeholder="من"]').value;
            const maxSalary = document.querySelector('.range-inputs input[placeholder="إلى"]').value;
            
            if (minSalary || maxSalary) {
                activeFilters.push(`الراتب: ${minSalary || '0'} - ${maxSalary || '∞'}`);
            }
            
            if (activeFilters.length > 0) {
                showNotification(`تم تطبيق ${activeFilters.length} فلتر`, 'success');
                
                // Scroll to results
                document.querySelector('.main-content').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            } else {
                showNotification('الرجاء اختيار فلتر واحد على الأقل', 'warning');
            }
        });
    }

    // Salary Range Sliders
    const minSlider = document.getElementById('minSalary');
    const maxSlider = document.getElementById('maxSalary');
    const minInput = document.querySelector('.range-inputs input[placeholder="من"]');
    const maxInput = document.querySelector('.range-inputs input[placeholder="إلى"]');

    if (minSlider && maxSlider) {
        minSlider.addEventListener('input', function() {
            if (parseInt(this.value) > parseInt(maxSlider.value)) {
                this.value = maxSlider.value;
            }
            minInput.value = this.value;
        });

        maxSlider.addEventListener('input', function() {
            if (parseInt(this.value) < parseInt(minSlider.value)) {
                this.value = minSlider.value;
            }
            maxInput.value = this.value;
        });

        minInput.addEventListener('input', function() {
            const value = parseInt(this.value) || 0;
            if (value <= 50000) {
                minSlider.value = value;
            }
        });

        maxInput.addEventListener('input', function() {
            const value = parseInt(this.value) || 50000;
            if (value <= 50000) {
                maxSlider.value = value;
            }
        });
    }

    // Job Card Actions
    const saveJobBtns = document.querySelectorAll('.save-job-btn');
    const shareJobBtns = document.querySelectorAll('.share-job-btn');
    const applyBtns = document.querySelectorAll('.apply-btn');

    // Save job functionality
    saveJobBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('saved');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('saved')) {
                icon.classList.remove('bi-bookmark');
                icon.classList.add('bi-bookmark-fill');
                showNotification('تم حفظ الوظيفة', 'success');
            } else {
                icon.classList.remove('bi-bookmark-fill');
                icon.classList.add('bi-bookmark');
                showNotification('تم إلغاء حفظ الوظيفة', 'info');
            }
        });
    });

    // Share job functionality
    shareJobBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            const jobUrl = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: jobTitle,
                    text: 'شاهد هذه الفرصة الوظيفية المميزة!',
                    url: jobUrl
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(jobUrl).then(() => {
                    showNotification('تم نسخ رابط الوظيفة', 'success');
                });
            }
        });
    });

    // Apply for job functionality
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            
            // Show loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري التقديم...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification(`تم التقديم على وظيفة: ${jobTitle}`, 'success');
            }, 2000);
        });
    });

    // View Toggle (List/Grid)
    const viewBtns = document.querySelectorAll('.view-btn');
    const jobCardsContainer = document.querySelector('.job-cards-container');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const view = this.dataset.view;
            
            if (view === 'grid') {
                jobCardsContainer.classList.add('grid-view');
                showNotification('تم التبديل إلى عرض الشبكة', 'info');
            } else {
                jobCardsContainer.classList.remove('grid-view');
                showNotification('تم التبديل إلى عرض القائمة', 'info');
            }
        });
    });

    // Sort Dropdown
    const sortDropdown = document.querySelector('.sort-dropdown .form-select');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            const sortValue = this.value;
            showNotification(`تم الترتيب حسب: ${this.options[this.selectedIndex].text}`, 'info');
            
            // Here you would typically re-sort the job cards
            // For demo purposes, we'll just show a notification
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                const btn = this.querySelector('.newsletter-btn');
                const originalText = btn.textContent;
                btn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري الاشتراك...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    emailInput.value = '';
                    showNotification('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
                }, 1500);
            } else {
                showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'warning');
            }
        });
    }

    // Pagination
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link (if not disabled)
            if (!this.parentElement.classList.contains('disabled')) {
                this.parentElement.classList.add('active');
                
                // Scroll to top of results
                document.querySelector('.main-content').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                showNotification(`تم الانتقال إلى الصفحة ${this.textContent}`, 'info');
            }
        });
    });

    // Utility Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;
        
        // Add styles
        const notificationStyles = document.createElement('style');
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
            
            .spin-animation {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(notificationStyles);
        document.body.appendChild(notification);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            removeNotification(notification, notificationStyles);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification, notificationStyles);
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

    function removeNotification(notification, styles) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
            if (styles.parentNode) {
                document.head.removeChild(styles);
            }
        }, 300);
    }

    // Add grid view styles
    const gridStyles = document.createElement('style');
    gridStyles.textContent = `
        .job-cards-container.grid-view {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }
        
        .job-cards-container.grid-view .job-card {
            height: 100%;
        }
    `;
    document.head.appendChild(gridStyles);
});
