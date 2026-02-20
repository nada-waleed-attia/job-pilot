// Search Results Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializePage();
    
    // Load saved jobs from localStorage
    loadSavedJobs();
    
    // Check for AI results
    checkAIResults();
});

function initializePage() {
    // Add animations to job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        card.style.opacity = '0';
    });
}

// Toggle Refine Search Panel
function toggleRefineSearch() {
    const panel = document.getElementById('refineSearchPanel');
    const btn = document.querySelector('.refine-search-btn');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.innerHTML = '<i class="bi bi-x"></i> إغلاق';
        btn.style.background = '#dc3545';
        btn.style.color = 'white';
    } else {
        panel.style.display = 'none';
        btn.innerHTML = '<i class="bi bi-sliders"></i> تحسين البحث';
        btn.style.background = '#f8f9fa';
        btn.style.color = '#333';
    }
}

// Apply Refine Search
function applyRefineSearch() {
    const jobType = document.querySelector('.refine-group select').value;
    const experience = document.querySelectorAll('.refine-group select')[1].value;
    const salaryMin = document.querySelector('.salary-range input[placeholder="من"]').value;
    const salaryMax = document.querySelector('.salary-range input[placeholder="إلى"]').value;
    const city = document.querySelectorAll('.refine-group select')[2].value;
    const skills = document.querySelector('.refine-group input[type="text"]').value;
    
    // Show loading state
    showNotification('جاري تطبيق الفلاتر...', 'info');
    
    // Simulate filtering
    setTimeout(() => {
        filterJobs(jobType, experience, salaryMin, salaryMax, city, skills);
        showNotification('تم تطبيق الفلاتر بنجاح', 'success');
    }, 1500);
}

// Reset Refine Search
function resetRefineSearch() {
    document.querySelectorAll('.refine-group select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    document.querySelectorAll('.refine-group input').forEach(input => {
        input.value = '';
    });
    
    showNotification('تم إعادة تعيين الفلاتر', 'info');
    
    // Reset job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.style.display = 'block';
    });
    
    updateJobCount(jobCards.length);
}

// Filter Jobs
function filterJobs(jobType, experience, salaryMin, salaryMax, city, skills) {
    const jobCards = document.querySelectorAll('.job-card');
    let visibleCount = 0;
    
    jobCards.forEach(card => {
        let shouldShow = true;
        
        // Apply filters (this is a simplified version)
        if (jobType && jobType !== 'جميع الأنواع') {
            // In real app, this would check against actual job data
            shouldShow = Math.random() > 0.3; // Simulate filtering
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    updateJobCount(visibleCount);
}

// Update Job Count
function updateJobCount(count) {
    const jobCountElement = document.getElementById('jobCount');
    if (jobCountElement) {
        jobCountElement.textContent = count;
    }
}

// Perform AI Search
function performAISearch() {
    const aiResults = document.getElementById('aiResults');
    const aiBtn = document.querySelector('.ai-search-btn');
    
    // Show loading state
    aiBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري البحث الذكي...';
    aiBtn.disabled = true;
    
    setTimeout(() => {
        // Generate AI job recommendations
        generateAIJobs();
        
        // Show AI results
        aiResults.style.display = 'block';
        
        // Reset button
        aiBtn.innerHTML = '<i class="bi bi-cpu"></i> بحث ذكي بالذكاء الاصطناعي';
        aiBtn.disabled = false;
        
        showNotification('تم العثور على توصيات ذكية!', 'success');
        
        // Scroll to AI results
        aiResults.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Generate AI Jobs
function generateAIJobs() {
    const aiJobsContainer = document.querySelector('.ai-jobs-container');
    
    const aiJobs = [
        {
            title: 'مطور واجهات أمامية متخصص',
            company: 'شركة التقنية المتقدمة',
            location: 'الرياض',
            type: 'دوام كامل',
            salary: '10,000 - 16,000 ريال',
            skills: ['React', 'TypeScript', 'Tailwind CSS'],
            match: '95%',
            reason: 'مطابق تماماً لمهاراتك في React'
        },
        {
            title: 'محلل بيانات',
            company: 'شركة البيانات الذكية',
            location: 'جدة',
            type: 'عن بعد',
            salary: '12,000 - 18,000 ريال',
            skills: ['Python', 'SQL', 'Machine Learning'],
            match: '88%',
            reason: 'خبرتك في تحليل البيانات مطابقة'
        },
        {
            title: 'مدير منتج رقمي',
            company: 'منصة التجارة الإلكترونية',
            location: 'الدمام',
            type: 'دوام كامل',
            salary: '15,000 - 22,000 ريال',
            skills: ['Product Management', 'Agile', 'Analytics'],
            match: '92%',
            reason: 'خبرتك في إدارة المنتجات مناسبة جداً'
        }
    ];
    
    aiJobsContainer.innerHTML = aiJobs.map((job, index) => `
        <div class="ai-job-card" style="animation: fadeIn 0.5s ease ${index * 0.1}s forwards; opacity: 0;">
            <div class="ai-job-header">
                <div class="ai-match-score">
                    <span class="match-percentage">${job.match}</span>
                    <span class="match-label">مطابقة</span>
                </div>
                <div class="ai-job-info">
                    <h4>${job.title}</h4>
                    <p class="ai-company">${job.company}</p>
                </div>
            </div>
            <div class="ai-job-description">
                <p><strong>لماذا هذه الوظيفة مناسبة:</strong> ${job.reason}</p>
                <div class="ai-job-skills">
                    ${job.skills.map(skill => `<span class="ai-skill">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="ai-job-footer">
                <div class="ai-job-meta">
                    <span><i class="bi bi-geo-alt"></i> ${job.location}</span>
                    <span><i class="bi bi-clock"></i> ${job.type}</span>
                    <span><i class="bi bi-currency-dollar"></i> ${job.salary}</span>
                </div>
                <button class="ai-apply-btn" onclick="applyAIJob('${job.title}')">
                    <i class="bi bi-robot"></i> تقديم ذكي
                </button>
            </div>
        </div>
    `).join('');
    
    // Add AI job styles
    if (!document.querySelector('#ai-job-styles')) {
        const aiJobStyles = document.createElement('style');
        aiJobStyles.id = 'ai-job-styles';
        aiJobStyles.textContent = `
            .ai-job-card {
                background: linear-gradient(135deg, #f8f9ff, #e3f2fd);
                border: 2px solid #667eea;
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 15px;
            }
            
            .ai-job-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
            }
            
            .ai-match-score {
                text-align: center;
                background: #667eea;
                color: white;
                padding: 10px;
                border-radius: 10px;
                min-width: 80px;
            }
            
            .match-percentage {
                display: block;
                font-size: 1.2rem;
                font-weight: 700;
            }
            
            .match-label {
                font-size: 0.8rem;
                opacity: 0.9;
            }
            
            .ai-job-info h4 {
                color: #333;
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .ai-company {
                color: #666;
                font-size: 0.9rem;
            }
            
            .ai-job-description {
                margin-bottom: 15px;
            }
            
            .ai-job-description strong {
                color: #667eea;
            }
            
            .ai-job-skills {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                margin-top: 10px;
            }
            
            .ai-skill {
                background: #667eea;
                color: white;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
            }
            
            .ai-job-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 15px;
                border-top: 1px solid #e9ecef;
            }
            
            .ai-job-meta {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                font-size: 0.85rem;
                color: #666;
            }
            
            .ai-apply-btn {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }
            
            .ai-apply-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
            }
            
            .spin-animation {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(aiJobStyles);
    }
}

// Apply AI Job
function applyAIJob(jobTitle) {
    showNotification(`جاري التقديم الذكي على: ${jobTitle}`, 'info');
    
    setTimeout(() => {
        showNotification('تم التقديم بنجاح باستخدام الذكاء الاصطناعي!', 'success');
    }, 2000);
}

// Save Job
function saveJob(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (savedJobs.includes(jobId)) {
        showNotification('هذه الوظيفة محفوظة بالفعل', 'warning');
        return;
    }
    
    savedJobs.push(jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    
    // Update button state
    const saveBtn = document.querySelector(`[data-job-id="${jobId}"] .save-btn`);
    if (saveBtn) {
        saveBtn.classList.add('saved');
        saveBtn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
    }
    
    showNotification('تم حفظ الوظيفة بنجاح', 'success');
}

// Apply for Job
function applyJob(jobId) {
    const jobCard = document.querySelector(`[data-job-id="${jobId}"]`);
    const jobTitle = jobCard.querySelector('.job-title').textContent;
    const company = jobCard.querySelector('.company-name').textContent;
    
    // Check if CV is uploaded
    const cvData = localStorage.getItem('userCV');
    if (!cvData) {
        showNotification('يرجى رفع السيرة الذاتية أولاً', 'warning');
        return;
    }
    
    // Show loading state
    const applyBtn = jobCard.querySelector('.apply-btn');
    const originalText = applyBtn.textContent;
    applyBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري التقديم...';
    applyBtn.disabled = true;
    
    setTimeout(() => {
        applyBtn.innerHTML = originalText;
        applyBtn.disabled = false;
        
        showNotification(`تم التقديم على وظيفة: ${jobTitle} في ${company}`, 'success');
        
        // Save application
        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
        applications.push({
            jobId: jobId,
            jobTitle: jobTitle,
            company: company,
            appliedAt: new Date().toISOString(),
            cvData: JSON.parse(cvData)
        });
        localStorage.setItem('jobApplications', JSON.stringify(applications));
    }, 2000);
}

// Load More Jobs
function loadMoreJobs() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const jobsContainer = document.querySelector('.jobs-container');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري التحميل...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // Generate more job cards
        const newJobs = generateMoreJobs();
        jobsContainer.insertAdjacentHTML('beforeend', newJobs);
        
        // Reset button
        loadMoreBtn.innerHTML = '<i class="bi bi-arrow-down-circle"></i> عرض المزيد من الوظائف';
        loadMoreBtn.disabled = false;
        
        // Update job count
        const currentCount = document.querySelectorAll('.job-card').length;
        updateJobCount(currentCount);
        
        showNotification('تم تحميل المزيد من الوظائف', 'success');
    }, 1500);
}

// Generate More Jobs
function generateMoreJobs() {
    const companies = ['سابك', 'بنك الراجحي', 'شركة الاتصالات', 'أسواق.com', 'نماء'];
    const positions = ['مطور Backend', 'مصمم UX', 'محلل أعمال', 'مدير مشروع', 'مهندس شبكات'];
    const locations = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
    
    let jobsHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const company = companies[Math.floor(Math.random() * companies.length)];
        const position = positions[Math.floor(Math.random() * positions.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const jobId = Date.now() + i;
        
        jobsHTML += `
            <div class="job-card" data-job-id="${jobId}" style="animation: fadeIn 0.5s ease ${i * 0.1}s forwards; opacity: 0;">
                <div class="job-header">
                    <div class="company-info">
                        <img src="https://picsum.photos/seed/${company}${jobId}/60/60" alt="شركة" class="company-logo">
                        <div class="job-details">
                            <h4 class="job-title">${position}</h4>
                            <p class="company-name">${company}</p>
                            <div class="job-meta">
                                <span class="location"><i class="bi bi-geo-alt"></i> ${location}</span>
                                <span class="type"><i class="bi bi-clock"></i> دوام كامل</span>
                                <span class="posted"><i class="bi bi-calendar"></i> منذ ${Math.floor(Math.random() * 7) + 1} يوم</span>
                            </div>
                        </div>
                    </div>
                    <div class="job-actions">
                        <button class="save-btn" onclick="saveJob(${jobId})">
                            <i class="bi bi-bookmark"></i>
                        </button>
                        <button class="apply-btn" onclick="applyJob(${jobId})">التقدم الآن</button>
                    </div>
                </div>
                
                <div class="job-description">
                    <p>نبحث عن ${position} محترف للانضمام إلى فريقنا في ${company}. هذه فرصة ممتازة للتطور المهني.</p>
                    
                    <div class="job-skills">
                        <span class="skill">المهارات المطلوبة</span>
                        <span class="skill">التطوير المهني</span>
                        <span class="skill">العمل الجماعي</span>
                    </div>
                </div>
                
                <div class="job-footer">
                    <div class="salary">
                        <i class="bi bi-currency-dollar"></i>
                        <span>${Math.floor(Math.random() * 10 + 8)},000 - ${Math.floor(Math.random() * 10 + 15)},000 ريال</span>
                    </div>
                    <div class="job-source">
                        <i class="bi bi-linkedin"></i>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    return jobsHTML;
}

// Load Saved Jobs
function loadSavedJobs() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    savedJobs.forEach(jobId => {
        const saveBtn = document.querySelector(`[data-job-id="${jobId}"] .save-btn`);
        if (saveBtn) {
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
        }
    });
}

// Toggle AI Assistant
function toggleAIAssistant() {
    const assistant = document.getElementById('aiAssistant');
    const floatingBtn = document.querySelector('.floating-ai-btn');
    
    if (assistant.classList.contains('show')) {
        assistant.classList.remove('show');
        floatingBtn.classList.remove('hidden');
    } else {
        assistant.classList.add('show');
        floatingBtn.classList.add('hidden');
    }
}

// Handle AI Chat
function handleAIChat(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

// Send AI Message
function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    chatMessages.innerHTML += `
        <div class="user-message">
            <p>${message}</p>
        </div>
    `;
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        chatMessages.innerHTML += `
            <div class="ai-message">
                <p>${aiResponse}</p>
            </div>
        `;
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Generate AI Response
function generateAIResponse(message) {
    const responses = {
        'مطور': 'بناءً على بحثك، أوصي بالوظائف التالية: مطور Full Stack في STC، مطور Frontend في شركة التقنية المتقدمة، أو مطور Backend في أرامكو. جميع هذه الوظائف تتطلب مهارات في React و Node.js.',
        'محاسب': 'وجدت وظائف محاسب ممتازة: محاسب مالي في SABB، محقق حسابات في بنك الراجحي، ومحاسب عام في سابك. هل تريد أن أصف لك أي منها بالتفصيل؟',
        'تصميم': 'للتصميم، هناك فرص رائعة: مصمم UI/UX في بنك نور، مصمم جرافيك في وكالة إبداعية، ومصمم مواقع في شركة التقنية. أي مجال تصميم تفضله؟',
        'تسويق': 'في مجال التسويق، أوصي بـ: مدير تسويق رقمي في نماء، أخصائي تسويق في أسواق.com، ومسؤول وسائل التواصل في STC. أي نوع تسويق تهتم؟',
        'default': 'فهمت طلبك. سأقوم بالبحث عن أفضل الوظائف المطابقة لمهاراتك وخبراتك. هل يمكنك أن تخبرني بالمسمى الوظيفي المحدد الذي تبحث عنه؟'
    };
    
    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }
    
    return responses.default;
}

// Check AI Results
function checkAIResults() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ai') === 'true') {
        performAISearch();
    }
}

// Show Notification
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

// Get Notification Icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle-fill',
        warning: 'exclamation-triangle-fill',
        info: 'info-circle-fill',
        error: 'x-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}
