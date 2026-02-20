// AI System JavaScript - Complete Smart Job Matching System

// Global Variables
let userData = {};
let cvData = null;
let analysisResults = {};
let matchedJobs = [];
let applications = [];

// Mock Job Database
const jobDatabase = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "STC - Saudi Telecom Company",
        location: "Riyadh",
        type: "full-time",
        industry: "it",
        experienceLevel: "senior",
        salary: "15,000 - 25,000",
        skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
        description: "We are looking for an experienced Frontend Developer to join our digital transformation team.",
        matchScore: 0
    },
    {
        id: 2,
        title: "Financial Analyst",
        company: "SABB - Saudi British Bank",
        location: "Jeddah",
        type: "full-time",
        industry: "finance",
        experienceLevel: "mid",
        salary: "12,000 - 18,000",
        skills: ["Financial Analysis", "Excel", "SQL", "Power BI", "Accounting"],
        description: "Join our finance team as a Financial Analyst responsible for financial reporting and analysis.",
        matchScore: 0
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "Careem",
        location: "Riyadh",
        type: "hybrid",
        industry: "it",
        experienceLevel: "mid",
        salary: "10,000 - 16,000",
        skills: ["UX Design", "UI Design", "Figma", "Adobe XD", "Prototyping"],
        description: "Looking for a creative UX/UI Designer to design amazing user experiences.",
        matchScore: 0
    },
    {
        id: 4,
        title: "Data Scientist",
        company: "Aramco",
        location: "Dhahran",
        type: "full-time",
        industry: "it",
        experienceLevel: "senior",
        salary: "20,000 - 35,000",
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
        description: "Join our data science team to work on cutting-edge AI and ML projects.",
        matchScore: 0
    },
    {
        id: 5,
        title: "Marketing Manager",
        company: "Jarir Bookstore",
        location: "Riyadh",
        type: "full-time",
        industry: "marketing",
        experienceLevel: "senior",
        salary: "8,000 - 14,000",
        skills: ["Digital Marketing", "Strategy", "Team Leadership", "Analytics", "Campaign Management"],
        description: "We need an experienced Marketing Manager to lead our marketing team.",
        matchScore: 0
    }
];

// Initialize System
document.addEventListener("DOMContentLoaded", function() {
    // Show loading screen
    setTimeout(() => {
        document.getElementById('aiLoadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('aiLoadingScreen').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
            document.getElementById('mainContainer').style.opacity = '1';
        }, 500);
    }, 2000);

    // Initialize CV upload
    initializeCVUpload();
});

// Initialize CV Upload
function initializeCVUpload() {
    const cvInput = document.getElementById('cvInput');
    const cvDropZone = document.getElementById('cvDropZone');
    
    // File input change
    cvInput.addEventListener('change', handleCVFile);
    
    // Drag and drop
    cvDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        cvDropZone.classList.add('drag-over');
    });
    
    cvDropZone.addEventListener('dragleave', () => {
        cvDropZone.classList.remove('drag-over');
    });
    
    cvDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        cvDropZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleCVFile({ target: { files: files } });
        }
    });
}

// Handle CV File
function handleCVFile(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
        alert('الرجاء اختيار ملف PDF أو Word فقط');
        return;
    }
    
    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        alert('حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت');
        return;
    }
    
    // Store CV data
    cvData = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
    };
    
    // Show CV preview
    showCVPreview(file);
    
    // Simulate CV analysis
    analyzeCV(file);
}

// Show CV Preview
function showCVPreview(file) {
    const cvDropZone = document.getElementById('cvDropZone');
    const cvPreview = document.getElementById('cvPreview');
    
    cvDropZone.style.display = 'none';
    cvPreview.style.display = 'block';
    
    document.getElementById('cvFileName').textContent = file.name;
    document.getElementById('cvFileSize').textContent = formatFileSize(file.size);
}

// Remove CV
function removeCV() {
    cvData = null;
    document.getElementById('cvDropZone').style.display = 'block';
    document.getElementById('cvPreview').style.display = 'none';
    document.getElementById('cvInput').value = '';
}

// Analyze CV (Simulated)
function analyzeCV(file) {
    // Simulate CV analysis
    setTimeout(() => {
        console.log('CV Analysis Complete - Extracted skills and experience');
    }, 1000);
}

// Submit User Data
function submitUserData() {
    // Collect form data
    userData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        city: document.getElementById('city').value,
        nationality: document.getElementById('nationality').value,
        currentJob: document.getElementById('currentJob').value,
        experienceLevel: document.getElementById('experienceLevel').value,
        industry: document.getElementById('industry').value,
        currentSalary: document.getElementById('currentSalary').value,
        skills: document.getElementById('skills').value,
        targetSalary: document.getElementById('targetSalary').value,
        workType: document.getElementById('workType').value,
        preferredLocation: document.getElementById('preferredLocation').value,
        companySize: document.getElementById('companySize').value,
        cv: cvData
    };
    
    // Validate required fields
    if (!validateUserData()) {
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Save applied jobs to localStorage for index-backup
    if (!window.appliedJobs) {
        window.appliedJobs = [];
    }
    
    // Add current job to applied jobs
    const currentJob = {
        id: Date.now(),
        title: 'تطبيقك الحالي',
        company: 'JobPilot AI',
        type: 'success',
        salary: userData.targetSalary || 'غير محدد',
        location: userData.preferredLocation || 'غير محدد',
        status: 'تم التقديم',
        date: new Date()
    };
    
    window.appliedJobs.push(currentJob);
    localStorage.setItem('appliedJobs', JSON.stringify(window.appliedJobs));
    
    // Show success message and redirect
    showNotification('تم حفظ بياناتك بنجاح! جاري التحويل إلى الصفحة الرئيسية...', 'success');
    
    // Redirect to index-backup after 2 seconds
    setTimeout(() => {
        window.location.href = 'index-backup.html';
    }, 2000);
}

// Validate User Data
function validateUserData() {
    const required = ['fullName', 'email', 'phone', 'age', 'city', 'currentJob', 'experienceLevel', 'industry', 'skills'];
    
    for (let field of required) {
        if (!userData[field] || userData[field].trim() === '') {
            alert(`الرجاء ملء حقل ${getFieldLabel(field)}`);
            return false;
        }
    }
    
    if (!cvData) {
        alert('الرجاء رفع السيرة الذاتية');
        return false;
    }
    
    return true;
}

// Get Field Label
function getFieldLabel(field) {
    const labels = {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        age: 'العمر',
        city: 'المدينة',
        currentJob: 'المسمى الوظيفي الحالي',
        experienceLevel: 'المستوى الوظيفي',
        industry: 'المجال المهني',
        skills: 'المهارات'
    };
    return labels[field] || field;
}

// Start AI Analysis
function startAIAnalysis() {
    // Hide registration, show analysis
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('analysisSection').style.display = 'block';
    
    // Simulate AI analysis steps
    simulateAIAnalysis();
}

// Simulate AI Analysis
function simulateAIAnalysis() {
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const statusItems = document.querySelectorAll('.status-item');
    
    const interval = setInterval(() => {
        progress += 5;
        
        // Update progress
        progressFill.style.width = progress + '%';
        progressText.textContent = progress + '% مكتمل';
        
        // Update status items
        if (progress >= 25) {
            statusItems[3].classList.add('active');
            statusItems[3].classList.remove('processing');
            statusItems[3].querySelector('.status-icon i').className = 'bi bi-check-circle-fill';
        }
        
        if (progress >= 50) {
            statusItems[4].classList.add('processing');
            statusItems[4].querySelector('.status-icon i').className = 'bi bi-arrow-repeat spin-animation';
        }
        
        if (progress >= 75) {
            statusItems[4].classList.add('active');
            statusItems[4].classList.remove('processing');
            statusItems[4].querySelector('.status-icon i').className = 'bi bi-check-circle-fill';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Complete analysis
            setTimeout(() => {
                completeAIAnalysis();
            }, 1000);
        }
    }, 100);
}

// Complete AI Analysis
function completeAIAnalysis() {
    // Perform job matching
    performJobMatching();
    
    // Generate analysis results
    generateAnalysisResults();
    
    // Show results
    showResults();
}

// Perform Job Matching
function performJobMatching() {
    const userSkills = userData.skills.toLowerCase().split(',').map(s => s.trim());
    const userIndustry = userData.industry;
    const userExperience = userData.experienceLevel;
    const userLocation = userData.preferredLocation;
    
    matchedJobs = jobDatabase.map(job => {
        let score = 0;
        
        // Industry match (30%)
        if (job.industry === userIndustry) score += 30;
        
        // Experience level match (25%)
        if (job.experienceLevel === userExperience) score += 25;
        
        // Skills match (25%)
        const jobSkills = job.skills.map(s => s.toLowerCase());
        const skillMatches = userSkills.filter(skill => 
            jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
        );
        score += (skillMatches.length / Math.max(userSkills.length, jobSkills.length)) * 25;
        
        // Location match (20%)
        if (job.location === userLocation || userLocation === 'remote' || userLocation === 'any') score += 20;
        
        return {
            ...job,
            matchScore: Math.round(score)
        };
    }).filter(job => job.matchScore > 40) // Only show jobs with >40% match
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score
}

// Generate Analysis Results
function generateAnalysisResults() {
    analysisResults = {
        profileSummary: generateProfileSummary(),
        growthOpportunities: calculateGrowthOpportunities(),
        expectedSalary: calculateExpectedSalary(),
        matchedJobsCount: matchedJobs.length
    };
}

// Generate Profile Summary
function generateProfileSummary() {
    const experience = userData.experienceLevel;
    const industry = userData.industry;
    const jobTitle = userData.currentJob;
    
    const experienceLabels = {
        entry: 'مبتدئ',
        junior: 'مبتدئ',
        mid: 'متوسط الخبرة',
        senior: 'خبير',
        expert: 'خبير جداً'
    };
    
    const industryLabels = {
        it: 'في مجال تقنية المعلومات',
        finance: 'في مجال التمويل والمحاسبة',
        marketing: 'في مجال التسويق',
        hr: 'في مجال الموارد البشرية',
        sales: 'في مجال المبيعات',
        engineering: 'في مجال الهندسة',
        healthcare: 'في مجال الرعاية الصحية',
        education: 'في مجال التعليم'
    };
    
    return `${jobTitle} ${experienceLabels[experience]} ${industryLabels[industry]}`;
}

// Calculate Growth Opportunities
function calculateGrowthOpportunities() {
    const baseScore = matchedJobs.length > 0 ? 70 : 30;
    const experienceBonus = userData.experienceLevel === 'mid' ? 10 : 0;
    const skillsBonus = userData.skills.split(',').length > 5 ? 10 : 0;
    
    return Math.min(95, baseScore + experienceBonus + skillsBonus);
}

// Calculate Expected Salary
function calculateExpectedSalary() {
    const currentSalary = parseInt(userData.currentSalary) || 0;
    const targetSalary = parseInt(userData.targetSalary) || 0;
    const experience = userData.experienceLevel;
    
    let minSalary = currentSalary * 1.1; // 10% increase minimum
    let maxSalary = targetSalary || currentSalary * 1.5; // 50% increase or target
    
    // Adjust based on experience
    const experienceMultiplier = {
        entry: 0.8,
        junior: 0.9,
        mid: 1.0,
        senior: 1.2,
        expert: 1.5
    };
    
    minSalary *= experienceMultiplier[experience];
    maxSalary *= experienceMultiplier[experience];
    
    return `${Math.round(minSalary).toLocaleString()} - ${Math.round(maxSalary).toLocaleString()} ريال`;
}

// Show Results
function showResults() {
    // Hide analysis, show results
    document.getElementById('analysisSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // Update results
    updateResultsDisplay();
    
    // Start auto-application
    setTimeout(() => {
        startAutoApplication();
    }, 2000);
}

// Update Results Display
function updateResultsDisplay() {
    // Update counts
    document.getElementById('matchedJobsCount').textContent = analysisResults.matchedJobsCount;
    
    // Update summary cards
    document.getElementById('profileSummary').textContent = analysisResults.profileSummary;
    document.getElementById('growthOpportunities').textContent = `${analysisResults.growthOpportunities}% فرصة للنمو المهني في الوظائف المطابقة`;
    document.getElementById('expectedSalary').textContent = analysisResults.expectedSalary;
    
    // Display matched jobs
    displayMatchedJobs();
}

// Display Matched Jobs
function displayMatchedJobs() {
    const jobsList = document.getElementById('matchedJobsList');
    jobsList.innerHTML = '';
    
    matchedJobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company"><strong>الشركة:</strong> ${job.company}</p>
            <p class="location"><strong>الموقع:</strong> ${job.location}</p>
            <p class="salary"><strong>الراتب:</strong> ${job.salary} ريال</p>
            <div class="match-score">مطابقة: ${job.matchScore}%</div>
            <p><strong>الوصف:</strong> ${job.description}</p>
        `;
        
        // Add animation
        jobCard.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        jobCard.style.opacity = '0';
        
        jobsList.appendChild(jobCard);
    });
}

// Start Auto Application
function startAutoApplication() {
    const statusCard = document.querySelector('.auto-application-status .status-card');
    const statusIcon = statusCard.querySelector('.status-icon');
    const statusText = statusCard.querySelector('.status-content h3');
    const statusDesc = statusCard.querySelector('.status-content p');
    
    // Show processing state
    statusIcon.className = 'status-icon processing';
    statusIcon.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i>';
    statusIcon.style.background = '#ffc107';
    statusText.textContent = 'جاري التقديم التلقائي';
    statusDesc.textContent = 'يتم التقديم على الوظائف المطابقة تلقائياً باستخدام الذكاء الاصطناعي...';
    
    // Simulate auto-application process
    setTimeout(() => {
        // Apply to matched jobs
        applications = matchedJobs.map(job => ({
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            appliedAt: new Date().toISOString(),
            matchScore: job.matchScore,
            method: 'AI Auto-Application',
            status: 'submitted'
        }));
        
        // Save applications
        localStorage.setItem('aiApplications', JSON.stringify(applications));
        
        // Update status
        statusIcon.className = 'status-icon success';
        statusIcon.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
        statusIcon.style.background = '#28a745';
        statusText.textContent = 'التقديم التلقائي مكتمل';
        statusDesc.textContent = `تم التقديم على ${applications.length} وظيفة مطابقة بناءً على بياناتك`;
        
        // Show success notification
        showNotification(`تم التقديم التلقائي على ${applications.length} وظيفة بنجاح!`, 'success');
    }, 3000);
}

// View Applications
function viewApplications() {
    const applicationsList = applications.map(app => 
        `• ${app.jobTitle} في ${app.company} (مطابقة: ${app.matchScore}%)`
    ).join('\n');
    
    alert(`التقديمات المكتملة:\n\n${applicationsList}\n\nسيتم إشعارك بالرد من الشركات قريباً.`);
}

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showNotification(message, type = 'info') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                min-width: 300px;
                max-width: 500px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                animation: slideDown 0.3s ease;
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
            
            .notification-info {
                border-right: 4px solid #17a2b8;
            }
            
            @keyframes slideDown {
                from {
                    transform: translate(-50%, -100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle-fill',
        info: 'info-circle-fill',
        warning: 'exclamation-triangle-fill',
        error: 'x-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}

// Redirect to index-backup after successful submission
function redirectToMainPage() {
    // Save user data to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Show success notification
    showNotification('تم حفظ بياناتك بنجاح! جاري التحويل...', 'success');
    
    // Redirect to index-backup after 2 seconds
    setTimeout(() => {
        window.location.href = 'index-backup.html';
    }, 2000);
}
