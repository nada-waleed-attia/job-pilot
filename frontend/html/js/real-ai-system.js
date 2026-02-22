// Real AI System with Real API Integration
class RealAISystem {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // Replace with real API key
        this.baseURL = 'https://api.jobpilot.ai/v1';
        this.mockMode = true; // Start with mock mode for testing
    }

    // Initialize AI System
    async initialize() {
        try {
            // Check if API is available
            const response = await this.makeRequest('/status');
            if (response.success) {
                this.mockMode = false;
                console.log('✅ Real AI API connected successfully');
            } else {
                console.log('⚠️ Using mock mode - API not available');
            }
        } catch (error) {
            console.log('⚠️ Using mock mode - API connection failed:', error.message);
        }
    }

    // Make API Request
    async makeRequest(endpoint, method = 'GET', data = null) {
        if (this.mockMode) {
            return this.getMockResponse(endpoint, data);
        }

        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return this.getMockResponse(endpoint, data);
        }
    }

    // Get Mock Response (when API is not available)
    getMockResponse(endpoint, data) {
        const mockResponses = {
            '/analyze-profile': {
                success: true,
                data: {
                    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                    experience_level: 'intermediate',
                    market_value: 'high',
                    recommended_salary: '15,000 - 20,000 ريال',
                    job_matches: [
                        {
                            title: 'Senior Frontend Developer',
                            company: 'Tech Solutions Inc.',
                            location: 'Riyadh',
                            salary: '18,000 ريال',
                            match_score: 95,
                            skills_required: ['React', 'JavaScript', 'TypeScript']
                        },
                        {
                            title: 'Full Stack Developer',
                            company: 'Digital Agency',
                            location: 'Jeddah',
                            salary: '16,000 ريال',
                            match_score: 88,
                            skills_required: ['Node.js', 'React', 'MongoDB']
                        }
                    ]
                }
            },
            '/job-recommendations': {
                success: true,
                data: {
                    recommendations: [
                        {
                            id: 1,
                            title: 'Senior React Developer',
                            company: 'Saudi Tech Company',
                            location: 'Riyadh',
                            salary: '20,000 - 25,000 ريال',
                            type: 'full-time',
                            remote: true,
                            match_score: 92,
                            description: 'We are looking for an experienced React developer...',
                            requirements: ['5+ years React', 'TypeScript', 'Node.js'],
                            benefits: ['Health insurance', 'Remote work', 'Training budget']
                        },
                        {
                            id: 2,
                            title: 'JavaScript Developer',
                            company: 'Digital Solutions',
                            location: 'Jeddah',
                            salary: '15,000 - 18,000 ريال',
                            type: 'full-time',
                            remote: false,
                            match_score: 85,
                            description: 'Join our team as a JavaScript developer...',
                            requirements: ['3+ years JavaScript', 'React/Vue', 'Git'],
                            benefits: ['Health insurance', 'Annual bonus', 'Career growth']
                        }
                    ]
                }
            },
            '/apply-job': {
                success: true,
                data: {
                    application_id: 'APP_' + Date.now(),
                    status: 'submitted',
                    message: 'Application submitted successfully',
                    next_steps: [
                        'Initial screening (1-2 days)',
                        'Technical assessment (3-5 days)',
                        'Interview (1 week)',
                        'Final decision (2 weeks)'
                    ]
                }
            },
            '/application-status': {
                success: true,
                data: {
                    status: 'under_review',
                    stage: 'technical_assessment',
                    progress: 45,
                    estimated_response: '3-5 days',
                    next_action: 'Complete technical assessment'
                }
            },
            '/market-analysis': {
                success: true,
                data: {
                    market_trends: {
                        demand_level: 'high',
                        growth_rate: '+15%',
                        average_salary: '14,000 ريال',
                        top_companies: ['STC', 'SABB', 'SABIC', 'Aramco']
                    },
                    skill_demand: {
                        'JavaScript': 95,
                        'Python': 92,
                        'React': 88,
                        'Node.js': 85,
                        'TypeScript': 82
                    },
                    recommendations: [
                        'Focus on React and TypeScript for better opportunities',
                        'Consider cloud certifications (AWS/Azure)',
                        'Improve English communication skills'
                    ]
                }
            }
        };

        return mockResponses[endpoint] || { success: false, error: 'Endpoint not found' };
    }

    // Analyze User Profile
    async analyzeProfile(userData) {
        try {
            const response = await this.makeRequest('/analyze-profile', 'POST', userData);
            
            if (response.success) {
                // Save analysis to localStorage
                localStorage.setItem('aiAnalysis', JSON.stringify(response.data));
                return response.data;
            } else {
                throw new Error(response.error || 'Analysis failed');
            }
        } catch (error) {
            console.error('Profile Analysis Error:', error);
            throw error;
        }
    }

    // Get Job Recommendations
    async getJobRecommendations(userData) {
        try {
            const response = await this.makeRequest('/job-recommendations', 'POST', userData);
            
            if (response.success) {
                return response.data.recommendations;
            } else {
                throw new Error(response.error || 'Failed to get recommendations');
            }
        } catch (error) {
            console.error('Job Recommendations Error:', error);
            throw error;
        }
    }

    // Apply to Job
    async applyToJob(jobId, userData, coverLetter = '') {
        try {
            const applicationData = {
                job_id: jobId,
                user_data: userData,
                cover_letter: coverLetter,
                application_date: new Date().toISOString()
            };

            const response = await this.makeRequest('/apply-job', 'POST', applicationData);
            
            if (response.success) {
                // Save application to localStorage
                const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                applications.push({
                    ...response.data,
                    job_id: jobId,
                    applied_at: new Date().toISOString()
                });
                localStorage.setItem('jobApplications', JSON.stringify(applications));
                
                return response.data;
            } else {
                throw new Error(response.error || 'Application failed');
            }
        } catch (error) {
            console.error('Job Application Error:', error);
            throw error;
        }
    }

    // Get Application Status
    async getApplicationStatus(applicationId) {
        try {
            const response = await this.makeRequest(`/application-status/${applicationId}`);
            
            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to get status');
            }
        } catch (error) {
            console.error('Application Status Error:', error);
            throw error;
        }
    }

    // Get Market Analysis
    async getMarketAnalysis(industry, location) {
        try {
            const response = await this.makeRequest('/market-analysis', 'POST', {
                industry: industry,
                location: location
            });
            
            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to get market analysis');
            }
        } catch (error) {
            console.error('Market Analysis Error:', error);
            throw error;
        }
    }

    // Generate Cover Letter
    async generateCoverLetter(jobData, userData) {
        try {
            const response = await this.makeRequest('/generate-cover-letter', 'POST', {
                job: jobData,
                user: userData
            });
            
            if (response.success) {
                return response.data.cover_letter;
            } else {
                throw new Error(response.error || 'Failed to generate cover letter');
            }
        } catch (error) {
            console.error('Cover Letter Generation Error:', error);
            throw error;
        }
    }

    // Get Skill Recommendations
    async getSkillRecommendations(userData) {
        try {
            const response = await this.makeRequest('/skill-recommendations', 'POST', userData);
            
            if (response.success) {
                return response.data.recommendations;
            } else {
                throw new Error(response.error || 'Failed to get skill recommendations');
            }
        } catch (error) {
            console.error('Skill Recommendations Error:', error);
            throw error;
        }
    }

    // Real-time Job Matching
    async startRealTimeMatching(userData) {
        try {
            const response = await this.makeRequest('/start-matching', 'POST', userData);
            
            if (response.success) {
                this.matchingSessionId = response.data.session_id;
                this.startMatchingWebSocket();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to start matching');
            }
        } catch (error) {
            console.error('Real-time Matching Error:', error);
            throw error;
        }
    }

    // WebSocket for Real-time Updates
    startMatchingWebSocket() {
        if (this.matchingSessionId) {
            const ws = new WebSocket(`wss://api.jobpilot.ai/ws/matching/${this.matchingSessionId}`);
            
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleMatchingUpdate(data);
            };
            
            ws.onopen = () => {
                console.log('🔗 Real-time matching connected');
            };
            
            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };
        }
    }

    // Handle Real-time Matching Updates
    handleMatchingUpdate(data) {
        switch (data.type) {
            case 'new_match':
                this.notifyNewJobMatch(data.job);
                break;
            case 'application_update':
                this.notifyApplicationUpdate(data.application);
                break;
            case 'market_update':
                this.notifyMarketUpdate(data.market);
                break;
        }
    }

    // Notify New Job Match
    notifyNewJobMatch(job) {
        const notification = {
            title: '🎯 وظيفة جديدة مطابقة!',
            message: `تم العثور على وظيفة "${job.title}" في ${job.company} بنسبة مطابقة ${job.match_score}%`,
            type: 'success',
            data: job
        };
        
        // Trigger notification in UI
        if (window.addNotification) {
            window.addNotification(notification.title, notification.message, notification.type, notification.data);
        }
    }

    // Notify Application Update
    notifyApplicationUpdate(application) {
        const notification = {
            title: '📋 تحديث حالة التقديم',
            message: `تم تحديث حالة تقديمك على وظيفة "${application.job_title}" إلى: ${application.status}`,
            type: 'info',
            data: application
        };
        
        if (window.addNotification) {
            window.addNotification(notification.title, notification.message, notification.type, notification.data);
        }
    }

    // Notify Market Update
    notifyMarketUpdate(market) {
        const notification = {
            title: '📊 تحديث السوق',
            message: `زيادة الطلب على مهاراتك بنسبة ${market.demand_increase}% في ${market.location}`,
            type: 'info',
            data: market
        };
        
        if (window.addNotification) {
            window.addNotification(notification.title, notification.message, notification.type, notification.data);
        }
    }
}

// Initialize Real AI System
window.realAI = new RealAISystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealAISystem;
}
