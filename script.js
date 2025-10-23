// ---- main.js ----
// Main application functionality
class PortfolioApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSkillsSection();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupToast();
        this.setupProgressBars();
    }
    
    // Skills Section
    setupSkillsSection() {
        const skillsData = [
            { name: "Data Analysis", category: "core", level: 90 },
            { name: "Python", category: "language", level: 85 },
            { name: "SQL", category: "language", level: 80 },
            { name: "Tableau", category: "tool", level: 85 },
            { name: "PowerBI", category: "tool", level: 85 },
            { name: "R", category: "language", level: 75 },
            { name: "Machine Learning", category: "core", level: 75 },
            { name: "Statistical Analysis", category: "core", level: 80 },
            { name: "Data Visualization", category: "core", level: 90 },
            { name: "Deep Learning", category: "core", level: 70 },
            { name: "Excel", category: "tool", level: 90 },
            { name: "Pandas", category: "library", level: 85 },
            { name: "NumPy", category: "library", level: 80 },
            { name: "Scikit-Learn", category: "library", level: 75 },
            { name: "TensorFlow", category: "library", level: 65 }
        ];
        
        const categoryLabels = {
            core: "Core",
            language: "Language", 
            tool: "Tool",
            library: "Library"
        };
        
        const categoryProgress = {
            core: "progress-core",
            language: "progress-language",
            tool: "progress-tool", 
            library: "progress-library"
        };
        
        this.renderSkills(skillsData, categoryLabels, categoryProgress);
    }
    
    renderSkills(skills, categoryLabels, categoryProgress) {
        const skillsGrid = document.getElementById('skillsGrid');
        if (!skillsGrid) return;
        
        skillsGrid.innerHTML = '';
        
        skills.forEach((skill, index) => {
            const skillCard = this.createSkillCard(skill, categoryLabels, categoryProgress, index);
            skillsGrid.appendChild(skillCard);
        });
    }
    
    createSkillCard(skill, categoryLabels, categoryProgress, index) {
        const card = document.createElement('div');
        card.className = `glass-card skill-card fade-in-up animate-stagger-${(index % 6) + 1}`;
        
        card.innerHTML = `
            <div class="skill-header">
                <span class="skill-badge">${categoryLabels[skill.category]}</span>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-progress">
                <div class="skill-progress-bar ${categoryProgress[skill.category]}" 
                     data-width="${skill.level}" style="width: 0%"></div>
            </div>
        `;
        
        return card;
    }
    
    // Progress Bars Animation
    // Progress Bars Animation
    setupProgressBars() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Skills section is visible, animating progress bars');
                    this.animateProgressBars(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe skills section
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
            console.log('Progress bar observer set up successfully');
        } else {
            console.error('Skills section not found');
        }
        
        // Fallback: animate after a short delay to ensure visibility
        setTimeout(() => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                this.animateProgressBars(skillsSection);
            }
        }, 1000);
    }
    
    animateProgressBars(section) {
        const progressBars = section.querySelectorAll('.skill-progress-bar');
        console.log('Found progress bars:', progressBars.length);
        
        // Animate all progress bars simultaneously to match React version
        progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            console.log(`Animating bar ${index} to ${width}%`);
            
            // Use a small delay to ensure the transition is visible
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
    // setupProgressBars() {
    //     const observerOptions = {
    //         threshold: 0.5,
    //         rootMargin: '0px 0px -100px 0px'
    //     };
        
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 this.animateProgressBars(entry.target);
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     }, observerOptions);
        
    //     // Observe skills section
    //     const skillsSection = document.getElementById('skills');
    //     if (skillsSection) {
    //         observer.observe(skillsSection);
    //     }
    // }
    
    // animateProgressBars(section) {
    //     const progressBars = section.querySelectorAll('.skill-progress-bar');
        
    //     progressBars.forEach((bar, index) => {
    //         setTimeout(() => {
    //             const width = bar.getAttribute('data-width');
    //             bar.style.width = width + '%';
    //         }, index * 100);
    //     });
    // }
    
    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(form);
        });
    }
    
    async handleContactSubmission(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'), 
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!this.validateContactForm(data)) {
            this.showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        form.classList.add('loading');
        
        try {
            // Simulate form submission (replace with actual implementation)
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showToast('Failed to send message. Please try again later.', 'error');
        } finally {
            form.classList.remove('loading');
        }
    }
    
    validateContactForm(data) {
        return data.name && data.email && data.subject && data.message && 
               this.validateEmail(data.email);
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    async simulateFormSubmission(data) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Randomly simulate success/failure for demo
                if (Math.random() > 0.1) {
                    console.log('Form submitted:', data);
                    resolve(data);
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }
    
    // Toast Notifications
    setupToast() {
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toastMessage');
    }
    
    showToast(message, type = 'info') {
        if (!this.toast || !this.toastMessage) return;
        
        this.toastMessage.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add('show');
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 4000);
    }
    
    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe elements with fade-in classes
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }
}

// Utility Functions
class Utils {
    static throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = Utils.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        requestAnimationFrame(animation);
    }
    
    static easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        this.measureLoadTime();
        this.measureFPS();
    }
    
    measureLoadTime() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            this.metrics.loadTime = loadTime;
            
            console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
        });
    }
    
    measureFPS() {
        let fps = 0;
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFrame = (currentTime) => {
            frameCount++;
            
            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                this.metrics.fps = fps;
                
                frameCount = 0;
                lastTime = currentTime;
                
                // Log FPS every 5 seconds in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log(`Current FPS: ${fps}`);
                }
            }
            
            requestAnimationFrame(measureFrame);
        };
        
        requestAnimationFrame(measureFrame);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new PortfolioApp();
    
    // Initialize performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new PerformanceMonitor();
    }
    
    // Add some nice console styling for developers
    console.log('%cWelcome to Deepak\'s Portfolio! 🚀', 'color: #00C2FF; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'color: #9B5DE5; font-size: 12px;');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations, stop timers, etc.
        console.log('Page hidden - optimizing performance');
    } else {
        // Page is visible - resume normal operation
        console.log('Page visible - resuming normal operation');
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // In production, you might want to send this to an error tracking service
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Send to error tracking service
    }
});

// Export utilities for global use
window.PortfolioUtils = Utils;

// ---- navigation.js ----
// Navigation functionality
class Navigation {
    constructor() {
        this.nav = document.getElementById('navigation');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollHandler();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
    }
    
    setupScrollHandler() {
        let ticking = false;
        
        const updateNavigation = () => {
            const scrolled = window.scrollY > 10;
            this.nav.classList.toggle('scrolled', scrolled);
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        });
    }
    
    setupMobileMenu() {
        this.mobileMenuBtn.addEventListener('click', () => {
            const isOpen = this.mobileMenu.classList.contains('active');
            this.mobileMenu.classList.toggle('active', !isOpen);
            
            // Update ARIA attributes
            this.mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        });
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && this.mobileMenu.classList.contains('active')) {
                this.mobileMenu.classList.remove('active');
                this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        let ticking = false;
        
        const updateActiveLink = () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove active class from all links
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current section link
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveLink);
                ticking = true;
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// ---- projects.js ----
// Projects data and functionality
const projectsData = [
    {
        id: 1,
        title: "Coffee Shop Sales Dashboard",
        description: "Comprehensive Excel-based analysis of coffee shop sales data providing insights into revenue trends, product performance, and customer behavior patterns.",
        category: "data-analysis",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        technologies: ["Excel", "Data Analysis", "DAX", "Power Query"],
        overview: "This Excel workbook provides an in-depth analysis of sales data for a coffee shop business, enabling stakeholders to gain insights into sales performance, identify trends, and make informed, data-driven decisions.",
        problem: "The workbook is designed to address key business questions about coffee shop sales. By analyzing sales metrics such as revenue, item popularity, and time-based trends, the report helps identify both high-performing products and opportunities for growth.",
        solution: "Developed a comprehensive Excel-based analytical solution with interactive dashboards, slicers for dynamic filtering, and key performance indicators to help optimize inventory, enhance customer engagement, and improve overall profitability.",
        results: {
            achievements: ["Identified top revenue-generating products", "Discovered seasonal sales patterns", "Created actionable insights for inventory optimization"],
            metrics: ["Total Revenue: SUM(Sales_Data[Revenue])", "Product Popularity %: Custom DAX formula", "Average Order Value: Revenue/Order count"],
            insights: ["Top performers identified across product categories", "Monthly and seasonal revenue growth patterns discovered", "Sales volume trends analyzed across multiple locations"]
        }
    },
    {
        id: 2,
        title: "Indian Sales Insights",
        description: "Comprehensive analysis of regional sales performance across Indian markets with predictive forecasting.",
        category: "data-analysis",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        technologies: ["PowerBI", "SQL", "DAX"],
        overview: "A regional sales analytics platform providing deep insights into market performance across different Indian states and territories.",
        problem: "Sales teams lacked regional visibility and couldn't identify growth opportunities or underperforming markets effectively.",
        solution: "Built a PowerBI solution with advanced DAX calculations to analyze regional performance, forecast trends, and identify market opportunities.",
        results: {
            achievements: ["20% improvement in regional targeting", "Enhanced market penetration", "Better resource allocation"],
            metrics: ["Report refresh time: 5 minutes", "Data latency: 1 hour", "Regional coverage: 100%"],
            insights: ["North region outperforms by 25%", "Seasonal patterns vary by region", "Urban vs rural market differences identified"]
        }
    },
    {
        id: 3,
        title: "Customer Segmentation Model",
        description: "Machine learning model that segments customers based on purchasing behavior and demographics.",
        category: "data-science",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        technologies: ["Python", "Scikit-Learn", "Pandas"],
        overview: "An advanced customer segmentation system using machine learning to identify distinct customer groups for targeted marketing strategies.",
        problem: "Company had a diverse customer base but lacked understanding of distinct customer segments, leading to ineffective marketing campaigns.",
        solution: "Developed a clustering model using RFM analysis and demographic data to identify customer segments and recommend personalized marketing strategies.",
        results: {
            achievements: ["40% increase in campaign effectiveness", "25% improvement in customer retention", "Personalized marketing strategies"],
            metrics: ["Model accuracy: 87%", "Segment stability: 92%", "Processing time: 15 minutes"],
            insights: ["5 distinct customer segments identified", "High-value customers prefer premium products", "Seasonal buyers need targeted timing"]
        }
    },
    {
        id: 4,
        title: "Retail Price Optimization",
        description: "Predictive model for optimal product pricing based on demand elasticity and market conditions.",
        category: "data-science",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        technologies: ["Python", "TensorFlow", "Pandas"],
        overview: "A dynamic pricing optimization system that uses machine learning to recommend optimal prices based on demand patterns and market conditions.",
        problem: "Retail chain struggled with pricing decisions, often leading to overpricing (lost sales) or underpricing (reduced margins).",
        solution: "Built a neural network model that analyzes historical sales, competitor prices, and market conditions to recommend optimal pricing strategies.",
        results: {
            achievements: ["12% revenue increase", "18% margin improvement", "Automated pricing decisions"],
            metrics: ["Prediction accuracy: 91.5%", "Response time: <100ms", "Price update frequency: Daily"],
            insights: ["Price elasticity varies by product category", "Competitor pricing significantly impacts demand", "Seasonal adjustments crucial for profitability"]
        }
    },
    {
        id: 5,
        title: "Financial Market Prediction",
        description: "Time-series analysis and prediction system for financial market trends using deep learning.",
        category: "data-science",
        image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
        technologies: ["Python", "PyTorch", "Pandas", "NumPy"],
        overview: "A sophisticated financial forecasting system using LSTM networks to predict market trends and identify trading opportunities.",
        problem: "Investment firm needed accurate market predictions to improve trading strategies and risk management decisions.",
        solution: "Developed an LSTM-based deep learning model that analyzes multiple market indicators and economic factors to forecast price movements.",
        results: {
            achievements: ["85% improvement in risk-adjusted returns", "Reduced drawdowns", "Automated trading signals"],
            metrics: ["Model training time: 4 hours", "Prediction latency: 50ms", "Backtesting period: 5 years"],
            insights: ["Market volatility patterns identified", "Correlation between sentiment and price movements", "Optimal rebalancing frequency determined"]
        }
    },
    {
        id: 6,
        title: "Sentiment Analysis Dashboard",
        description: "Real-time dashboard analyzing customer sentiment from social media and review platforms.",
        category: "data-analysis",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        technologies: ["R", "Shiny", "NLP", "Tableau"],
        overview: "A real-time sentiment monitoring system that tracks brand perception across multiple social media platforms and review sites.",
        problem: "Brand management team lacked real-time insights into customer sentiment and couldn't respond quickly to negative feedback.",
        solution: "Created a Shiny dashboard that aggregates social media data, performs sentiment analysis, and provides actionable insights for brand management.",
        results: {
            achievements: ["50% faster response to negative sentiment", "Improved brand perception", "Proactive crisis management"],
            metrics: ["Processing speed: 1000 posts/minute", "Sentiment accuracy: 89%", "Dashboard uptime: 99.9%"],
            insights: ["Peak sentiment activity during business hours", "Product launches drive sentiment spikes", "Customer service issues require immediate attention"]
        }
    },
    {
        id: 7,
        title: "Healthcare Outcomes Predictor",
        description: "Machine learning system to predict patient outcomes based on treatment variables and historical data.",
        category: "data-science",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
        overview: "A predictive healthcare analytics system that helps medical professionals make informed treatment decisions by predicting patient outcomes.",
        problem: "Healthcare providers needed better tools to predict patient outcomes and optimize treatment plans based on historical data.",
        solution: "Developed a machine learning model that analyzes patient data, treatment history, and clinical variables to predict outcomes and recommend optimal treatments.",
        results: {
            achievements: ["15% improvement in treatment outcomes", "Reduced hospital readmissions", "Enhanced clinical decision making"],
            metrics: ["Model accuracy: 87%", "Prediction time: <1 second", "Feature importance identified"],
            insights: ["Early intervention crucial for high-risk patients", "Treatment combinations affect outcomes", "Patient history strongly predictive"]
        }
    },
    {
        id: 8,
        title: "Neural Style Transfer Experiment",
        description: "Experimental AI project applying artistic styles to images using convolutional neural networks.",
        category: "ai",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        technologies: ["Python", "TensorFlow", "Keras", "Computer Vision"],
        overview: "An experimental deep learning project that transfers artistic styles from famous paintings to photographs using neural networks.",
        problem: "Exploring the creative potential of AI by developing a system that can apply artistic styles to any image while preserving content.",
        solution: "Implemented a neural style transfer algorithm using pre-trained VGG networks to separate and recombine content and style features.",
        results: {
            achievements: ["Successful artistic style transfer", "High-quality output images", "Experimental AI showcase"],
            metrics: ["Processing time: 3 minutes average", "Output resolution: 512x512", "Style preservation: Excellent"],
            insights: ["Different layers capture different style elements", "Content-style balance affects results", "Optimization iterations impact quality"]
        }
    }
];

class ProjectManager {
    constructor() {
        this.projects = projectsData;
        this.currentFilter = 'all';
        this.modal = document.getElementById('projectModal');
        this.modalBody = document.getElementById('modalBody');
        this.modalClose = document.getElementById('modalClose');
        
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.setupFilters();
        this.setupModal();
        this.setupIntersectionObserver();
    }
    
    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            grid.appendChild(projectCard);
        });
    }
    
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = `glass-card project-card fade-in-up animate-stagger-${(index % 6) + 1}`;
        card.dataset.category = project.category;
        card.addEventListener('click', () => this.openModal(project));
        
        card.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}')">
                <div class="project-overlay">
                    <span>View Details</span>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        return card;
    }
    
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                this.filterProjects(filter);
            });
        });
    }
    
    filterProjects(filter) {
        this.currentFilter = filter;
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    }
    
    setupModal() {
        // Close modal handlers
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(project) {
        this.modalBody.innerHTML = this.createModalContent(project);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    createModalContent(project) {
        return `
            <div class="modal-project">
                <div class="modal-header">
                    <div class="project-image" style="background-image: url('${project.image}'); height: 300px; margin-bottom: 2rem;"></div>
                    <h2 class="gradient-text" style="font-size: 2rem; margin-bottom: 1rem;">${project.title}</h2>
                    <div class="project-tech" style="margin-bottom: 2rem;">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-sections">
                    <div class="modal-section">
                        <h3 style="color: var(--primary-blue); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            Overview
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${project.overview}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3 style="color: var(--primary-purple); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                            </svg>
                            Problem Statement
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${project.problem}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3 style="color: var(--primary-blue); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            Solution
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${project.solution}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3 style="color: var(--primary-purple); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 3v18h18"/>
                                <path d="M18 17V9"/>
                                <path d="M13 17V5"/>
                                <path d="M8 17v-3"/>
                            </svg>
                            Results & Impact
                        </h3>
                        <div class="results-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
                            <div class="result-card" style="background: rgba(0, 194, 255, 0.1); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(0, 194, 255, 0.2);">
                                <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">Achievements</h4>
                                <ul style="list-style: none; color: var(--text-secondary);">
                                    ${project.results.achievements.map(achievement => `
                                        <li style="margin-bottom: 0.25rem; display: flex; align-items: start; gap: 0.5rem;">
                                            <span style="color: var(--primary-blue); margin-top: 0.5rem;">•</span>
                                            <span>${achievement}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            
                            <div class="result-card" style="background: rgba(155, 93, 229, 0.1); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(155, 93, 229, 0.2);">
                                <h4 style="color: var(--primary-purple); margin-bottom: 0.5rem;">Key Metrics</h4>
                                <ul style="list-style: none; color: var(--text-secondary);">
                                    ${project.results.metrics.map(metric => `
                                        <li style="margin-bottom: 0.25rem; display: flex; align-items: start; gap: 0.5rem;">
                                            <span style="color: var(--primary-purple); margin-top: 0.5rem;">•</span>
                                            <span>${metric}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="insights-section" style="margin-top: 1.5rem; background: rgba(0, 194, 255, 0.05); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(0, 194, 255, 0.1);">
                            <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">Key Insights</h4>
                            <ul style="list-style: none; color: var(--text-secondary);">
                                ${project.results.insights.map(insight => `
                                    <li style="margin-bottom: 0.25rem; display: flex; align-items: start; gap: 0.5rem;">
                                        <span style="color: var(--primary-blue); margin-top: 0.5rem;">💡</span>
                                        <span>${insight}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all project cards
        setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => observer.observe(card));
        }, 100);
    }
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});
