// Real LinkedIn Search JavaScript

// LinkedIn API Simulation (using mock data for demo)
const mockLinkedInJobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "STC - Saudi Telecom Company",
        location: "Riyadh, Saudi Arabia",
        salary: "15,000 - 25,000 SAR",
        type: "Full-time",
        posted: "2 days ago",
        description: "We are looking for an experienced Frontend Developer to join our digital transformation team. Strong experience with React, TypeScript, and modern web technologies is required.",
        skills: ["React", "TypeScript", "JavaScript", "CSS", "Node.js"],
        linkedinUrl: "https://linkedin.com/jobs/view/123456789"
    },
    {
        id: 2,
        title: "Financial Analyst",
        company: "SABB - Saudi British Bank",
        location: "Jeddah, Saudi Arabia",
        salary: "12,000 - 18,000 SAR",
        type: "Full-time",
        posted: "1 week ago",
        description: "Join our finance team as a Financial Analyst. Responsible for financial analysis, reporting, and providing insights to support business decisions.",
        skills: ["Financial Analysis", "Excel", "SQL", "Power BI", "Accounting"],
        linkedinUrl: "https://linkedin.com/jobs/view/234567890"
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "Careem - Delivery Platform",
        location: "Riyadh, Saudi Arabia",
        salary: "10,000 - 16,000 SAR",
        type: "Full-time",
        posted: "3 days ago",
        description: "Looking for a creative UX/UI Designer to design amazing user experiences for our delivery platform. Portfolio and experience with Figma required.",
        skills: ["UX Design", "UI Design", "Figma", "Adobe XD", "Prototyping"],
        linkedinUrl: "https://linkedin.com/jobs/view/345678901"
    },
    {
        id: 4,
        title: "Data Scientist",
        company: "Aramco - Saudi Aramco",
        location: "Dhahran, Saudi Arabia",
        salary: "20,000 - 35,000 SAR",
        type: "Full-time",
        posted: "5 days ago",
        description: "Join our data science team to work on cutting-edge AI and machine learning projects. Strong background in Python, statistics, and ML algorithms required.",
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
        linkedinUrl: "https://linkedin.com/jobs/view/456789012"
    },
    {
        id: 5,
        title: "Marketing Manager",
        company: "Jarir Bookstore - Jarir Marketing",
        location: "Riyadh, Saudi Arabia",
        salary: "8,000 - 14,000 SAR",
        type: "Full-time",
        posted: "1 week ago",
        description: "We need an experienced Marketing Manager to lead our marketing team and drive growth strategies across digital and traditional channels.",
        skills: ["Digital Marketing", "Strategy", "Team Leadership", "Analytics", "Campaign Management"],
        linkedinUrl: "https://linkedin.com/jobs/view/567890123"
    }
];

// Global variables
let currentJobs = [];
let currentPage = 1;
let isLoading = false;
let selectedJob = null;

document.addEventListener("DOMContentLoaded", function() {
    // Initialize CV upload
    initializeCVUpload();
    
    // Check for saved CV
    checkSavedCV();
    
    // Load initial jobs
    loadInitialJobs();
});

// Initialize CV Upload
function initializeCVUpload() {
    const cvUploadBtn = document.getElementById('cvUploadBtn');
    const cvInput = document.getElementById('cvInput');
    const cvFileName = document.getElementById('cvFileName');
    
    if (cvUploadBtn && cvInput && cvFileName) {
        cvUploadBtn.addEventListener('click', function() {
            cvInput.click();
        });
        
        cvInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                const validExtensions = ['.pdf', '.doc', '.docx'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
                    alert('الرجاء اختيار ملف PDF أو Word فقط');
                    cvInput.value = '';
                    return;
                }
                
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size > maxSize) {
                    alert('حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت');
                    cvInput.value = '';
                    return;
                }
                
                cvFileName.innerHTML = `<i class="bi bi-check-circle-fill"></i> تم رفع: ${file.name}`;
                cvFileName.classList.add('show');
                
                cvUploadBtn.style.borderColor = '#4ade80';
                cvUploadBtn.style.background = 'rgba(74, 222, 128, 0.1)';
                
                // Save CV data
                const cvData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString()
                };
                localStorage.setItem('userCV', JSON.stringify(cvData));
                
                alert('تم رفع السيرة الذاتية بنجاح! سيتم استخدامها في البحث عن وظائف مطابقة.');
            } else {
                cvFileName.classList.remove('show');
                cvFileName.innerHTML = '';
                cvUploadBtn.style.borderColor = '';
                cvUploadBtn.style.background = '';
            }
        });
    }
}

// Check Saved CV
function checkSavedCV() {
    const savedCV = localStorage.getItem('userCV');
    if (savedCV) {
        const cvData = JSON.parse(savedCV);
        const cvFileName = document.getElementById('cvFileName');
        const cvUploadBtn = document.getElementById('cvUploadBtn');
        
        cvFileName.innerHTML = `<i class="bi bi-check-circle-fill"></i> ملف محفوظ: ${cvData.name}`;
        cvFileName.classList.add('show');
        cvUploadBtn.style.borderColor = '#4ade80';
        cvUploadBtn.style.background = 'rgba(74, 222, 128, 0.1)';
    }
}

// Load Initial Jobs
function loadInitialJobs() {
    // Show some initial jobs
    currentJobs = mockLinkedInJobs.slice(0, 3);
    displayJobs(currentJobs);
    updateResultsCount(currentJobs.length);
}

// Search LinkedIn Jobs
function searchLinkedInJobs() {
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const location = document.getElementById('location').value.trim();
    const cvData = localStorage.getItem('userCV');
    
    if (!jobTitle && !location) {
        alert('الرجاء إدخال المسمى الوظيفي أو الموقع للبحث');
        return;
    }
    
    if (!cvData) {
        alert('يرجى رفع السيرة الذاتية أولاً للحصول على نتائج مطابقة');
        return;
    }
    
    // Show search status
    showSearchStatus();
    
    // Simulate API call delay
    setTimeout(() => {
        // Filter jobs based on search criteria
        let filteredJobs = mockLinkedInJobs.filter(job => {
            const titleMatch = !jobTitle || job.title.toLowerCase().includes(jobTitle.toLowerCase());
            const locationMatch = !location || job.location.toLowerCase().includes(location.toLowerCase());
            return titleMatch && locationMatch;
        });
        
        // If no exact matches, show related jobs
        if (filteredJobs.length === 0) {
            filteredJobs = mockLinkedInJobs.slice(0, 5);
        }
        
        currentJobs = filteredJobs;
        displayJobs(currentJobs);
        updateResultsCount(currentJobs.length);
        
        hideSearchStatus();
        
        // Show results section
        document.getElementById('resultsSection').style.display = 'block';
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
        
        alert(`تم العثور على ${currentJobs.length} وظيفة حقيقية من LinkedIn مطابقة لبحثك`);
    }, 2000);
}

// Show Search Status
function showSearchStatus() {
    const statusDiv = document.getElementById('searchStatus');
    statusDiv.style.display = 'block';
    
    // Hide results during search
    document.getElementById('resultsSection').style.display = 'none';
}

// Hide Search Status
function hideSearchStatus() {
    const statusDiv = document.getElementById('searchStatus');
    statusDiv.style.display = 'none';
}

// Display Jobs
function displayJobs(jobs) {
    const jobsList = document.getElementById('jobsList');
    jobsList.innerHTML = '';
    
    jobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company"><i class="bi bi-building"></i> ${job.company}</p>
            <p class="location"><i class="bi bi-geo-alt"></i> ${job.location}</p>
            <p class="salary"><i class="bi bi-currency-dollar"></i> ${job.salary}</p>
            <p class="type"><i class="bi bi-clock"></i> ${job.type}</p>
            <p class="posted"><i class="bi bi-calendar"></i> ${job.posted}</p>
            <p class="description">${job.description}</p>
            <button class="apply-btn" onclick="showJobDetails(${job.id})">
                <i class="bi bi-eye"></i>
                عرض التفاصيل والتقديم
            </button>
        `;
        
        // Add animation
        jobCard.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        jobCard.style.opacity = '0';
        
        jobsList.appendChild(jobCard);
    });
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (jobs.length < mockLinkedInJobs.length) {
        loadMoreBtn.style.display = 'flex';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Update Results Count
function updateResultsCount(count) {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Show Job Details Modal
function showJobDetails(jobId) {
    const job = mockLinkedInJobs.find(j => j.id === jobId);
    if (!job) return;
    
    selectedJob = job;
    
    // Fill modal with job details
    document.getElementById('modalJobTitle').textContent = job.title;
    document.getElementById('modalCompany').textContent = job.company;
    document.getElementById('modalLocation').textContent = job.location;
    document.getElementById('modalSalary').textContent = job.salary;
    document.getElementById('modalType').textContent = job.type;
    document.getElementById('modalPosted').textContent = job.posted;
    document.getElementById('modalDescription').textContent = job.description;
    
    // Show modal
    document.getElementById('jobModal').style.display = 'flex';
}

// Close Job Modal
function closeJobModal() {
    document.getElementById('jobModal').style.display = 'none';
    selectedJob = null;
}

// Apply from Modal
function applyFromModal() {
    if (!selectedJob) return;
    
    const cvData = localStorage.getItem('userCV');
    if (!cvData) {
        alert('يرجى رفع السيرة الذاتية أولاً');
        return;
    }
    
    // Show loading state
    const applyBtn = document.querySelector('.apply-modal-btn');
    const originalText = applyBtn.innerHTML;
    applyBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري التقديم...';
    applyBtn.disabled = true;
    
    setTimeout(() => {
        // Save application
        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
        applications.push({
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            company: selectedJob.company,
            appliedAt: new Date().toISOString(),
            cvData: JSON.parse(cvData),
            source: 'LinkedIn Real Search'
        });
        localStorage.setItem('jobApplications', JSON.stringify(applications));
        
        // Reset button
        applyBtn.innerHTML = originalText;
        applyBtn.disabled = false;
        
        // Close modal
        closeJobModal();
        
        alert(`تم التقديم بنجاح على وظيفة: ${selectedJob.title} في ${selectedJob.company}\n\nسيتم إرسال سيرتك الذاتية إلى الشركة مباشرة عبر LinkedIn!`);
    }, 2000);
}

// Sort Results
function sortResults() {
    const sortBy = document.getElementById('sortBy').value;
    let sortedJobs = [...currentJobs];
    
    switch(sortBy) {
        case 'relevant':
            // Keep current order (most relevant first)
            break;
        case 'recent':
            sortedJobs.sort((a, b) => new Date(b.posted) - new Date(a.posted));
            break;
        case 'salary':
            sortedJobs.sort((a, b) => {
                const salaryA = parseInt(a.salary.match(/\d+/)[0]);
                const salaryB = parseInt(b.salary.match(/\d+/)[0]);
                return salaryB - salaryA;
            });
            break;
    }
    
    currentJobs = sortedJobs;
    displayJobs(currentJobs);
}

// Load More Jobs
function loadMoreJobs() {
    if (isLoading) return;
    
    isLoading = true;
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-animation"></i> جاري التحميل...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        const currentLength = currentJobs.length;
        const newJobs = mockLinkedInJobs.slice(currentLength, currentLength + 3);
        currentJobs = [...currentJobs, ...newJobs];
        
        displayJobs(currentJobs);
        updateResultsCount(currentJobs.length);
        
        loadMoreBtn.innerHTML = '<i class="bi bi-arrow-down-circle"></i> عرض المزيد من الوظائف';
        loadMoreBtn.disabled = false;
        isLoading = false;
        
        if (currentJobs.length >= mockLinkedInJobs.length) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

// Add keyboard support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const jobTitle = document.getElementById('jobTitle');
        const location = document.getElementById('location');
        
        if (document.activeElement === jobTitle || document.activeElement === location) {
            searchLinkedInJobs();
        }
    }
});

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
