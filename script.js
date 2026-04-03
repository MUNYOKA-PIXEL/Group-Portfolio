document.body.classList.add('js-ready');

const rotatingMessages = [
    {
        heading: 'AI for smarter decisions',
        text: 'Building ideas that connect data, people, and opportunity.'
    },
    {
        heading: 'Automation that saves time',
        text: 'Designing efficient systems that reduce manual work and improve flow.'
    },
    {
        heading: 'Strategy with real impact',
        text: 'Blending business thinking with modern technology for meaningful results.'
    }
];

const heading = document.getElementById('dynamic-heading');
const text = document.getElementById('dynamic-text');
const year = document.getElementById('year');
const pageViews = document.querySelectorAll('.page-view');

if (year) {
    year.textContent = new Date().getFullYear();
}

const showView = (viewId, updateHash = true) => {
    const targetView = document.getElementById(viewId);

    if (!targetView || !targetView.classList.contains('page-view')) {
        return;
    }

    pageViews.forEach((view) => {
        view.classList.toggle('active-view', view.id === viewId);
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${viewId}`);
    });

    targetView.querySelectorAll('.reveal').forEach((element) => {
        element.classList.add('visible');
    });

    if (updateHash) {
        window.location.hash = viewId;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', () => {
    const viewLinks = document.querySelectorAll('a[href^="#"]');
    
    viewLinks.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');

            if (!href || !href.startsWith('#')) {
                return;
            }

            const targetId = href.slice(1);
            const targetView = document.getElementById(targetId);

            if (!targetView || !targetView.classList.contains('page-view')) {
                return;
            }

            event.preventDefault();
            showView(targetId);
        });
    });

    if (heading && text) {
        let index = 0;

        setInterval(() => {
            index = (index + 1) % rotatingMessages.length;
            heading.textContent = rotatingMessages[index].heading;
            text.textContent = rotatingMessages[index].text;
        }, 3200);
    }
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const charCount = document.getElementById('char-count');
    const formMessage = document.getElementById('form-message');

    // Real-time validation
    const validateField = (field) => {
        const isValid = field.checkValidity();
        field.classList.toggle('valid', isValid && field.value.trim() !== '');
        field.classList.toggle('invalid', !isValid && field.value.trim() !== '');
        return isValid;
    };

    // Check overall form validity
    const checkFormValidity = () => {
        const nameValid = validateField(nameInput);
        const emailValid = validateField(emailInput);
        const messageValid = validateField(messageTextarea);
        const inquirySelected = document.querySelector('input[name="inquiry"]:checked');
        
        submitBtn.disabled = !(nameValid && emailValid && messageValid && inquirySelected);
    };

    // Event listeners
    nameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    messageTextarea.addEventListener('input', () => {
        charCount.textContent = messageTextarea.value.length;
        checkFormValidity();
    });

    document.querySelectorAll('input[name="inquiry"]').forEach(radio => {
        radio.addEventListener('change', checkFormValidity);
    });

    // Show toast notification function
    const showToast = (text, type) => {
        formMessage.textContent = text;
        formMessage.className = `form-toast ${type} show`;
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000); // Hide after 5 seconds
    };

    // Form submission (handled by Formspree)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                form.reset();
                submitBtn.textContent = 'Send Message';
                charCount.textContent = '0';
                checkFormValidity();
                showToast('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            showToast('Oops! Something went wrong. Please try again or contact us directly.', 'error');
        }
    });
});

const initialView = window.location.hash.replace('#', '') || 'home';
showView(initialView, false);

window.addEventListener('hashchange', () => {
    const nextView = window.location.hash.replace('#', '') || 'home';
    showView(nextView, false);
});

console.log('Single-file GroupAlpha view switching is active.');