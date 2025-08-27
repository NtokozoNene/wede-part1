// Quantum Motors - Advanced JavaScript
class QuantumMotors {
    constructor() {
        this.init();
    }

    init() {
        this.handleSplashScreen();
        this.initSmoothScrolling();
        this.initParallax();
        this.initFormValidation();
        this.initScrollAnimations();
        this.initCarConfigurator();
    }

    handleSplashScreen() {
        const splash = document.getElementById('quantum-splash');
        if (splash) {
            setTimeout(() => {
                splash.style.opacity = '0';
                setTimeout(() => {
                    splash.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    this.dispatchEvent('quantum:loaded');
                }, 1000);
            }, 2500);
        }
    }

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    initFormValidation() {
        const forms = document.querySelectorAll('form[data-quantum-form]');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    this.handleFormSubmission(form);
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showError(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(input, message) {
        this.clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'quantum-error';
        errorDiv.style.color = '#ff4757';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ff4757';
    }

    clearError(input) {
        const error = input.parentNode.querySelector('.quantum-error');
        if (error) error.remove();
        input.style.borderColor = '';
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Simulate API call
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            await this.simulateApiCall();
            this.showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `quantum-notification quantum-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            animation: 'slideInRight 0.3s ease'
        });

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('quantum-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card, .car-card, .tech-item').forEach(el => {
            el.classList.add('quantum-hidden');
            observer.observe(el);
        });
    }

    initCarConfigurator() {
        // Advanced car configuration logic would go here
        console.log('Car configurator initialized');
    }

    dispatchEvent(name, detail = {}) {
        window.dispatchEvent(new CustomEvent(name, { detail }));
    }
}

// Initialize Quantum Motors
document.addEventListener('DOMContentLoaded', () => {
    window.QuantumMotors = new QuantumMotors();
});

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    .quantum-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .quantum-visible {
        opacity: 1;
        transform: translateY(0);
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
`;
document.head.appendChild(style);