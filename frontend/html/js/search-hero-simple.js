// Simple Search Hero JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // CV Upload Functionality
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
                
                cvFileName.innerHTML = `<i class="bi bi-check-circle-fill"></i> تم اختيار: ${file.name}`;
                cvFileName.classList.add('show');
                
                cvUploadBtn.style.borderColor = '#4ade80';
                cvUploadBtn.style.background = 'rgba(74, 222, 128, 0.1)';
                
                localStorage.setItem('userCV', JSON.stringify({
                    name: file.name,
                    size: file.size,
                    type: file.type
                }));
                
                alert('تم رفع السيرة الذاتية بنجاح!');
            } else {
                cvFileName.classList.remove('show');
                cvFileName.innerHTML = '';
                cvUploadBtn.style.borderColor = '';
                cvUploadBtn.style.background = '';
            }
        });
    }
    
    // Simple Search Function
    window.performSearch = function() {
        const jobTitle = document.querySelector('.search-box input[placeholder="المسمى الوظيفي، كلمات مفتاحية..."]').value;
        const location = document.querySelector('.search-box input[placeholder="الموقع"]').value;
        
        if (!jobTitle && !location) {
            alert('الرجاء إدخال وظيفة أو موقع للبحث');
            return;
        }
        
        // Show loading
        const searchBtn = document.getElementById('searchBtn');
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = 'جاري البحث...';
        searchBtn.disabled = true;
        
        setTimeout(() => {
            // Show job results
            showJobResults(jobTitle, location);
            
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
        }, 1500);
    };
    
    function showJobResults(jobTitle, location) {
        const jobResultsSection = document.getElementById('jobResults');
        const jobsList = document.querySelector('.simple-jobs-list');
        
        // Sample jobs data
        const jobs = [
            {
                title: 'مطور واجهات أمامية',
                company: 'شركة التقنية المتقدمة',
                location: 'الرياض',
                salary: '10,000 - 15,000 ريال',
                type: 'دوام كامل'
            },
            {
                title: 'محاسب مالي',
                company: 'البنك السعودي',
                location: 'جدة',
                salary: '8,000 - 12,000 ريال',
                type: 'دوام كامل'
            },
            {
                title: 'مصمم جرافيك',
                company: 'وكالة إبداعية',
                location: 'الدمام',
                salary: '6,000 - 10,000 ريال',
                type: 'دوام جزئي'
            }
        ];
        
        // Clear existing jobs
        jobsList.innerHTML = '';
        
        // Add jobs to the list
        jobs.forEach((job, index) => {
            const jobCard = document.createElement('div');
            jobCard.className = 'simple-job-card';
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>الشركة:</strong> ${job.company}</p>
                <p><strong>الموقع:</strong> ${job.location}</p>
                <p><strong>الراتب:</strong> ${job.salary}</p>
                <p><strong>النوع:</strong> ${job.type}</p>
                <button class="apply-simple-btn" onclick="applyToJob('${job.title}')">
                    <i class="bi bi-send"></i> التقديم الآن
                </button>
            `;
            jobsList.appendChild(jobCard);
        });
        
        // Show results section
        jobResultsSection.style.display = 'block';
        
        // Scroll to results
        jobResultsSection.scrollIntoView({ behavior: 'smooth' });
        
        alert(`تم العثور على ${jobs.length} وظيفة في ${location || 'جميع المواقع'}`);
    }
    
    window.applyToJob = function(jobTitle) {
        const cvData = localStorage.getItem('userCV');
        if (!cvData) {
            alert('يرجى رفع السيرة الذاتية أولاً');
            return;
        }
        
        alert(`جاري التقديم على وظيفة: ${jobTitle}`);
    };
    
    // Add enter key support
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
});
