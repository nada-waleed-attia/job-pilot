// Real API Integration for JobPilot
class JobPilotAPI {
    constructor() {
        this.baseURL = 'https://api.jobpilot.ai/v1';
        this.apiKey = 'YOUR_API_KEY'; // Replace with real API key
        this.useRealAPI = false; // Set to true when API is ready
    }

    // Real Job Search API
    async searchJobs(params = {}) {
        if (this.useRealAPI) {
            return await this.realJobSearch(params);
        } else {
            return await this.mockJobSearch(params);
        }
    }

    // Real Job Search
    async realJobSearch(params) {
        const url = new URL(`${this.baseURL}/jobs/search`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Real API Error:', error);
            return await this.mockJobSearch(params);
        }
    }

    // Mock Job Search (with realistic data)
    async mockJobSearch(params) {
        const { keyword = '', location = '', industry = '', experience = 'all' } = params;
        
        // Realistic job database
        const realJobs = [
            {
                id: 'SA-001',
                title: 'Senior Frontend Developer',
                company: 'Saudi Digital Solutions',
                location: 'Riyadh',
                salary: '18,000 - 25,000 SAR',
                type: 'full-time',
                remote: true,
                posted: '2024-01-15',
                deadline: '2024-02-15',
                description: 'We are looking for an experienced Frontend Developer to join our team...',
                requirements: ['5+ years React', 'TypeScript', 'Node.js', 'AWS'],
                benefits: ['Health insurance', 'Remote work', 'Training budget', 'Annual bonus'],
                industry: 'technology',
                experience_level: 'senior'
            },
            {
                id: 'SA-002',
                title: 'Full Stack JavaScript Developer',
                company: 'Tech Innovation Hub',
                location: 'Jeddah',
                salary: '15,000 - 20,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-14',
                deadline: '2024-02-10',
                description: 'Join our innovative team as a Full Stack Developer...',
                requirements: ['3+ years JavaScript', 'React/Vue', 'Node.js', 'MongoDB'],
                benefits: ['Health insurance', 'Career growth', 'Flexible hours'],
                industry: 'technology',
                experience_level: 'intermediate'
            },
            {
                id: 'SA-003',
                title: 'Marketing Manager',
                company: 'Growth Agency',
                location: 'Dammam',
                salary: '12,000 - 18,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-13',
                deadline: '2024-02-05',
                description: 'We need a creative Marketing Manager to lead our marketing efforts...',
                requirements: ['5+ years marketing', 'Digital marketing', 'Team leadership', 'Analytics'],
                benefits: ['Health insurance', 'Performance bonus', 'Company car'],
                industry: 'marketing',
                experience_level: 'senior'
            },
            {
                id: 'SA-004',
                title: 'Financial Analyst',
                company: 'Investment Bank',
                location: 'Riyadh',
                salary: '14,000 - 22,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-12',
                deadline: '2024-02-20',
                description: 'Seeking a detail-oriented Financial Analyst for our investment team...',
                requirements: ['3+ years finance', 'Excel expert', 'Financial modeling', 'CFA preferred'],
                benefits: ['Health insurance', 'Stock options', 'Training allowance'],
                industry: 'finance',
                experience_level: 'intermediate'
            },
            {
                id: 'SA-005',
                title: 'HR Business Partner',
                company: 'Saudi Industrial Company',
                location: 'Jeddah',
                salary: '10,000 - 15,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-11',
                deadline: '2024-02-08',
                description: 'Looking for an HR Business Partner to support our business units...',
                requirements: ['3+ years HR', 'Saudi labor law', 'Employee relations', 'Recruitment'],
                benefits: ['Health insurance', 'Housing allowance', 'Transport allowance'],
                industry: 'hr',
                experience_level: 'intermediate'
            },
            {
                id: 'SA-006',
                title: 'Sales Executive',
                company: 'Trading Company',
                location: 'Dammam',
                salary: '8,000 - 12,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-10',
                deadline: '2024-02-03',
                description: 'We need motivated Sales Executives to expand our market...',
                requirements: ['2+ years sales', 'Customer service', 'Negotiation skills', 'Driving license'],
                benefits: ['Commission', 'Car allowance', 'Phone allowance'],
                industry: 'sales',
                experience_level: 'junior'
            },
            {
                id: 'SA-007',
                title: 'Civil Engineer',
                company: 'Construction Giant',
                location: 'Riyadh',
                salary: '12,000 - 18,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-09',
                deadline: '2024-02-25',
                description: 'Seeking experienced Civil Engineers for major projects...',
                requirements: ['3+ years experience', 'AutoCAD', 'Project management', 'Saudi license'],
                benefits: ['Health insurance', 'Housing', 'Transport', 'Annual tickets'],
                industry: 'engineering',
                experience_level: 'intermediate'
            },
            {
                id: 'SA-008',
                title: 'Registered Nurse',
                company: 'Private Hospital',
                location: 'Jeddah',
                salary: '8,000 - 12,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-08',
                deadline: '2024-02-12',
                description: 'We need qualified Registered Nurses for our medical facility...',
                requirements: ['Nursing degree', 'SCFHS license', '2+ years experience', 'English'],
                benefits: ['Health insurance', 'Overtime pay', 'Training opportunities'],
                industry: 'healthcare',
                experience_level: 'intermediate'
            },
            {
                id: 'SA-009',
                title: 'Mathematics Teacher',
                company: 'International School',
                location: 'Riyadh',
                salary: '10,000 - 15,000 SAR',
                type: 'full-time',
                remote: false,
                posted: '2024-01-07',
                deadline: '2024-02-18',
                description: 'Looking for passionate Mathematics Teachers for our school...',
                requirements: ['Teaching degree', 'Math major', '2+ years teaching', 'English'],
                benefits: ['Health insurance', 'Housing', 'Summer vacation', 'Professional development'],
                industry: 'education',
                experience_level: 'intermediate'
            },
            {
                id: 'SA-010',
                title: 'DevOps Engineer',
                company: 'Cloud Solutions Provider',
                location: 'Riyadh',
                salary: '20,000 - 30,000 SAR',
                type: 'full-time',
                remote: true,
                posted: '2024-01-06',
                deadline: '2024-02-28',
                description: 'Seeking experienced DevOps Engineer for our cloud infrastructure...',
                requirements: ['5+ years DevOps', 'Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD'],
                benefits: ['Health insurance', 'Remote work', 'Stock options', 'Training budget'],
                industry: 'technology',
                experience_level: 'senior'
            }
        ];

        // Filter jobs based on search parameters
        let filteredJobs = realJobs;

        if (keyword) {
            const searchTerms = keyword.toLowerCase().split(' ');
            filteredJobs = filteredJobs.filter(job => {
                return searchTerms.every(term => 
                    job.title.toLowerCase().includes(term) ||
                    job.company.toLowerCase().includes(term) ||
                    job.description.toLowerCase().includes(term) ||
                    job.requirements.some(req => req.toLowerCase().includes(term))
                );
            });
        }

        if (location) {
            filteredJobs = filteredJobs.filter(job => 
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (industry) {
            filteredJobs = filteredJobs.filter(job => 
                job.industry.toLowerCase().includes(industry.toLowerCase())
            );
        }

        if (experience && experience !== 'all') {
            filteredJobs = filteredJobs.filter(job => 
                job.experience_level === experience
            );
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            success: true,
            data: {
                jobs: filteredJobs,
                total: filteredJobs.length,
                page: 1,
                per_page: 20,
                total_pages: Math.ceil(filteredJobs.length / 20)
            }
        };
    }

    // Apply to Job
    async applyToJob(jobId, applicationData) {
        if (this.useRealAPI) {
            return await this.realApplyToJob(jobId, applicationData);
        } else {
            return await this.mockApplyToJob(jobId, applicationData);
        }
    }

    // Real Job Application
    async realApplyToJob(jobId, applicationData) {
        try {
            const response = await fetch(`${this.baseURL}/jobs/${jobId}/apply`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicationData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Real API Error:', error);
            return await this.mockApplyToJob(jobId, applicationData);
        }
    }

    // Mock Job Application
    async mockApplyToJob(jobId, applicationData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        return {
            success: true,
            data: {
                application_id: 'APP_' + Date.now(),
                job_id: jobId,
                status: 'submitted',
                submitted_at: new Date().toISOString(),
                message: 'Application submitted successfully',
                next_steps: [
                    'Initial screening (1-2 business days)',
                    'Technical assessment (3-5 business days)',
                    'Interview (1 week)',
                    'Final decision (2 weeks)'
                ],
                tracking_number: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
            }
        };
    }

    // Get Application Status
    async getApplicationStatus(applicationId) {
        if (this.useRealAPI) {
            return await this.realGetApplicationStatus(applicationId);
        } else {
            return await this.mockGetApplicationStatus(applicationId);
        }
    }

    // Real Application Status
    async realGetApplicationStatus(applicationId) {
        try {
            const response = await fetch(`${this.baseURL}/applications/${applicationId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Real API Error:', error);
            return await this.mockGetApplicationStatus(applicationId);
        }
    }

    // Mock Application Status
    async mockGetApplicationStatus(applicationId) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const statuses = ['under_review', 'screening', 'technical_assessment', 'interview', 'final_review', 'accepted', 'rejected'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        const statusMessages = {
            'under_review': 'Your application is under review',
            'screening': 'Initial screening in progress',
            'technical_assessment': 'Technical assessment required',
            'interview': 'Interview scheduled',
            'final_review': 'Final review stage',
            'accepted': 'Congratulations! You have been accepted',
            'rejected': 'Unfortunately, your application was not successful'
        };

        return {
            success: true,
            data: {
                application_id: applicationId,
                status: randomStatus,
                status_message: statusMessages[randomStatus],
                progress: this.calculateProgress(randomStatus),
                last_updated: new Date().toISOString(),
                next_action: this.getNextAction(randomStatus)
            }
        };
    }

    // Calculate Progress Percentage
    calculateProgress(status) {
        const progressMap = {
            'under_review': 20,
            'screening': 35,
            'technical_assessment': 50,
            'interview': 70,
            'final_review': 85,
            'accepted': 100,
            'rejected': 0
        };
        return progressMap[status] || 0;
    }

    // Get Next Action
    getNextAction(status) {
        const actionMap = {
            'under_review': 'Wait for initial screening',
            'screening': 'Complete technical assessment',
            'technical_assessment': 'Schedule interview',
            'interview': 'Wait for final decision',
            'final_review': 'Decision pending',
            'accepted': 'Accept job offer',
            'rejected': 'Apply for other positions'
        };
        return actionMap[status] || 'Contact support';
    }

    // Get Market Data
    async getMarketData(industry, location) {
        if (this.useRealAPI) {
            return await this.realGetMarketData(industry, location);
        } else {
            return await this.mockGetMarketData(industry, location);
        }
    }

    // Real Market Data
    async realGetMarketData(industry, location) {
        try {
            const response = await fetch(`${this.baseURL}/market/data`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ industry, location })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Real API Error:', error);
            return await this.mockGetMarketData(industry, location);
        }
    }

    // Mock Market Data
    async mockGetMarketData(industry, location) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const marketData = {
            'technology': {
                'riyadh': {
                    average_salary: '18,000 SAR',
                    demand_level: 'high',
                    growth_rate: '+15%',
                    top_skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
                    top_companies: ['STC', 'SABB', 'SABIC', 'Aramco Digital'],
                    job_openings: 1250
                },
                'jeddah': {
                    average_salary: '16,000 SAR',
                    demand_level: 'high',
                    growth_rate: '+12%',
                    top_skills: ['JavaScript', 'React', 'Python', 'Docker'],
                    top_companies: ['Jeddah Tech', 'Red Sea Global', 'Islamic Development Bank'],
                    job_openings: 850
                },
                'dammam': {
                    average_salary: '17,000 SAR',
                    demand_level: 'medium',
                    growth_rate: '+10%',
                    top_skills: ['JavaScript', 'Python', 'AWS', 'DevOps'],
                    top_companies: ['Aramco', 'SABIC', 'Sadara', 'Maaden'],
                    job_openings: 650
                }
            },
            'finance': {
                'riyadh': {
                    average_salary: '15,000 SAR',
                    demand_level: 'medium',
                    growth_rate: '+8%',
                    top_skills: ['Excel', 'Financial Analysis', 'SAP', 'Risk Management'],
                    top_companies: ['SABB', 'Riyadh Bank', 'Al Rajhi Bank', 'SAMA'],
                    job_openings: 420
                },
                'jeddah': {
                    average_salary: '14,000 SAR',
                    demand_level: 'medium',
                    growth_rate: '+7%',
                    top_skills: ['Excel', 'Financial Analysis', 'Accounting', 'Banking'],
                    top_companies: ['National Commercial Bank', 'Jeddah Islamic Bank', 'SABB'],
                    job_openings: 280
                },
                'dammam': {
                    average_salary: '13,500 SAR',
                    demand_level: 'low',
                    growth_rate: '+5%',
                    top_skills: ['Excel', 'Accounting', 'Financial Reporting', 'Treasury'],
                    top_companies: ['Aramco', 'SABIC', 'Eastern Province Bank'],
                    job_openings: 180
                }
            }
        };

        return {
            success: true,
            data: marketData[industry]?.[location] || {
                average_salary: '12,000 SAR',
                demand_level: 'medium',
                growth_rate: '+5%',
                top_skills: ['Communication', 'Team Work', 'Problem Solving'],
                top_companies: ['Local Companies'],
                job_openings: 100
            }
        };
    }
}

// Initialize API
window.jobPilotAPI = new JobPilotAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JobPilotAPI;
}
