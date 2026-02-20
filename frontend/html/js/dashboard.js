// Dashboard Page JavaScript
AOS.init({ duration: 1000, once: true });
requireAuth();

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Applications Chart
    const ctxApplications = document.getElementById('applicationsChart');
    if (ctxApplications) {
        new Chart(ctxApplications, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'عدد التقديمات',
                    data: [12, 19, 15, 25, 22, 30],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Status Chart
    const ctxStatus = document.getElementById('statusChart');
    if (ctxStatus) {
        new Chart(ctxStatus, {
            type: 'doughnut',
            data: {
                labels: ['مقبول', 'مقابلة', 'معلق', 'مرفوض'],
                datasets: [{
                    data: [12, 8, 15, 5],
                    backgroundColor: [
                        '#198754',
                        '#ffc107',
                        '#0dcaf0',
                        '#dc3545'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Animate progress rings
    animateProgressRings();
});

function animateProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring circle');
    progressRings.forEach(ring => {
        const radius = ring.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const percent = ring.dataset.percent || 75;
        const offset = circumference - (percent / 100) * circumference;
        
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        ring.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            ring.style.strokeDashoffset = offset;
        }, 100);
    });
}

function toggleAutoApply() {
    const toggle = document.getElementById('autoApplyToggle');
    const status = toggle.checked;
    
    showAlert(status ? 'تم تفعيل التقديم التلقائي' : 'تم إيقاف التقديم التلقائي', 'success');
    
    // Update UI
    const statusText = document.querySelector('.auto-apply-status');
    if (statusText) {
        statusText.textContent = status ? 'نشط' : 'غير نشط';
        statusText.className = `badge bg-${status ? 'success' : 'secondary'}`;
    }
}

function refreshData() {
    showAlert('جاري تحديث البيانات...', 'info');
    setTimeout(() => {
        showAlert('تم تحديث البيانات بنجاح', 'success');
        animateProgressRings();
    }, 1500);
}

function exportData() {
    showAlert('جاري تصدير البيانات...', 'info');
    setTimeout(() => {
        showAlert('تم تصدير البيانات بنجاح', 'success');
    }, 1000);
}
