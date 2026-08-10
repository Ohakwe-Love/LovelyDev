// Theme Toggle implementation
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-theme');
    
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    // Toggle icon between sun and moon
    themeIcon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    
    localStorage.setItem('theme', newTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            themeIcon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });
});

// Preloader
const loader = document.querySelector('.loaderDiv')

window.onload = function () {
    loader.style.display = 'none'
}



// Active nav
const navLinks = document.querySelectorAll('nav ul li a')
navLinks.forEach((link)=>{
    link.addEventListener('click', ()=>{
        navLinks.forEach((link) =>{link.classList.remove('active-link')})
        link.classList.add('active-link')
    })
})

// Active nav based on scroll
const sections = document.querySelectorAll("section");

// Add scroll event listener
window.addEventListener("scroll", () => {
  let current = "";

  // Determine the current section in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 5) {
      current = section.getAttribute("id");
    }
  });

  // Remove active class from all links and add it to the current one
  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active-link");
    }
  });
});


// Header responsiveness
// const headerNav = document.querySelector("header nav"),
// hideMenu = document.querySelector(".hideNavMenu"),
// showMenu = document.querySelector(".showNavMenu");

// showMenu.addEventListener("click", ()=>{
//     headerNav.style.width = "180px";
//     headerNav.setAttribute("cl", "fade-left")
//     headerNav.classList.add("animate__animated")
//     headerNav.classList.add("animate__fadeInRight")
// })

// hideMenu.addEventListener("click", ()=>{
//     headerNav.style.width = "0px";
// })

// Header responsiveness
const headerNav = document.querySelector("header nav"),
    hideMenu = document.querySelector(".hideNavMenu"),
    showMenu = document.querySelector(".showNavMenu"),
    overlay = document.querySelector(".nav-overlay");

function openMenu() {
    headerNav.style.width = "250px";
    headerNav.classList.add("animate__animated", "animate__fadeInRight");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    headerNav.style.width = "0px";
    headerNav.classList.remove("animate__animated", "animate__fadeInRight");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

showMenu.addEventListener("click", openMenu);
hideMenu.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Close menu when clicking nav links on mobile
const mobileNavLinks = headerNav.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 800 && headerNav.style.width !== "0px") {
            e.preventDefault();
            const href = this.getAttribute('href');
            closeMenu();
            setTimeout(() => {
                // Scroll to anchor after menu closes
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({behavior: "smooth"});
                } else {
                    window.location.href = href;
                }
            }, 350); // Match your nav transition duration
        }
    });
});


// swiper animation styles
new Swiper('.portfolio-wrapper', {
    loop: true,
    spaceBetween: 30,
    // If we need pagination
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
    },

    autoplay:{
        delay:2000,
        pauseOnMouseEnter: true,
    },

    // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0:{
            slidesPerView: 1
        },
        768:{
            slidesPerView: 2
        },
        1024:{
            slidesPerView: 3
        }
    }
});


// get date
const currentDate = new Date().getFullYear();
const footerDate = document.querySelector(".footerDate");
footerDate.textContent = currentDate;


// Initialize EmailJS
emailjs.init("9vLLVYFSMFFrwEmPq");

// Form validation class
class FormValidator {
    constructor() {
        this.setupEventListeners();
        this.isFormValid = false;
    }
    
    // Sanitize input to prevent XSS attacks
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    
    // Validate name field
    validateName(name) {
        const errors = [];
        const sanitized = this.sanitizeInput(name.trim());
        
        if (!sanitized) {
            errors.push('Name is required');
        } else if (sanitized.length < 2) {
            errors.push('Name must be at least 2 characters');
        } else if (sanitized.length > 50) {
            errors.push('Name must be less than 50 characters');
        } else if (!/^[a-zA-Z\s\-'\.]+$/.test(sanitized)) {
            errors.push('Name can only contain letters, spaces, hyphens, apostrophes, and periods');
        }
        
        return { isValid: errors.length === 0, errors, sanitized };
    }
    
    // Validate email field
    validateEmail(email) {
        const errors = [];
        const sanitized = this.sanitizeInput(email.trim().toLowerCase());
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!sanitized) {
            errors.push('Email is required');
        } else if (!emailRegex.test(sanitized)) {
            errors.push('Please enter a valid email address');
        } else if (sanitized.length > 100) {
            errors.push('Email must be less than 100 characters');
        }
        
        return { isValid: errors.length === 0, errors, sanitized };
    }
    
    // Validate subject field
    validateSubject(subject) {
        const errors = [];
        const sanitized = this.sanitizeInput(subject.trim());
        
        if (!sanitized) {
            errors.push('Subject is required');
        } else if (sanitized.length < 3) {
            errors.push('Subject must be at least 3 characters');
        } else if (sanitized.length > 100) {
            errors.push('Subject must be less than 100 characters');
        }
        
        return { isValid: errors.length === 0, errors, sanitized };
    }
    
    // Validate message field
    validateMessage(message) {
        const errors = [];
        const sanitized = this.sanitizeInput(message.trim());
        
        if (!sanitized) {
            errors.push('Message is required');
        } else if (sanitized.length < 10) {
            errors.push('Message must be at least 10 characters');
        } else if (sanitized.length > 1000) {
            errors.push('Message must be less than 1000 characters');
        }
        
        return { isValid: errors.length === 0, errors, sanitized };
    }
    
    // Display validation errors
    displayError(fieldId, errors) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errors.length > 0) {
            errorElement.textContent = errors[0];
            errorElement.style.display = 'block';
            inputElement.classList.add('input-error');
            inputElement.classList.remove('input-valid');
        } else {
            errorElement.style.display = 'none';
            inputElement.classList.remove('input-error');
            inputElement.classList.add('input-valid');
        }
    }
    
    // Update character count
    updateCharCount(fieldId, currentLength, maxLength) {
        const countElement = document.getElementById(fieldId + 'Count');
        if (countElement) {
            countElement.textContent = `${currentLength}/${maxLength}`;
            if (currentLength > maxLength) {
                countElement.classList.add('over-limit');
            } else {
                countElement.classList.remove('over-limit');
            }
        }
    }
    
    // Validate individual field
    validateField(fieldId, value) {
        let result;
        
        switch (fieldId) {
            case 'name':
                result = this.validateName(value);
                this.updateCharCount(fieldId, value.length, 50);
                break;
            case 'email':
                result = this.validateEmail(value);
                break;
            case 'subject':
                result = this.validateSubject(value);
                this.updateCharCount(fieldId, value.length, 100);
                break;
            case 'message':
                result = this.validateMessage(value);
                this.updateCharCount(fieldId, value.length, 1000);
                break;
            default:
                return false;
        }
        
        this.displayError(fieldId, result.errors);
        return result.isValid;
    }
    
    // Validate entire form
    validateForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        const nameValid = this.validateField('name', name);
        const emailValid = this.validateField('email', email);
        const subjectValid = this.validateField('subject', subject);
        const messageValid = this.validateField('message', message);
        
        this.isFormValid = nameValid && emailValid && subjectValid && messageValid;
        
        // Update submit button state
        const submitBtn = document.getElementById('submitBtn');
        if (this.isFormValid) {
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        }
        
        return this.isFormValid;
    }
    
    // Get sanitized form data
    getSanitizedFormData() {
        return {
            name: this.sanitizeInput(document.getElementById('name').value.trim()),
            email: this.sanitizeInput(document.getElementById('email').value.trim().toLowerCase()),
            subject: this.sanitizeInput(document.getElementById('subject').value.trim()),
            message: this.sanitizeInput(document.getElementById('message').value.trim())
        };
    }
    
    // Setup event listeners
    setupEventListeners() {
        const fields = ['name', 'email', 'subject', 'message'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            
            // Real-time validation on input
            field.addEventListener('input', (e) => {
                this.validateField(fieldId, e.target.value);
                this.validateForm();
            });
            
            // Validation on blur (when user leaves field)
            field.addEventListener('blur', (e) => {
                this.validateField(fieldId, e.target.value);
                this.validateForm();
            });
        });
    }
}

// Initialize form validator
const validator = new FormValidator();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validator.validateForm()) {
        document.getElementById('messageDiv').innerHTML = 
            '<div class="message error">Please fix the errors above before submitting.</div>';
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('messageDiv');
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    messageDiv.innerHTML = '';
    
    // Get sanitized form data
    const formData = validator.getSanitizedFormData();
    
    // Additional server-side validation simulation
    if (formData.message.toLowerCase().includes('script') || 
        formData.message.includes('<') || 
        formData.message.includes('>')) {
        messageDiv.innerHTML = '<div class="message error">Invalid content detected. Please remove any HTML or script tags.</div>';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        return;
    }
    
    // Send email using EmailJS
    emailjs.send(
        'service_uf021hp',   
        'template_ehuccn3',
        formData
    ).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        messageDiv.innerHTML = '<div class="message success">Message sent successfully! I\'ll get back to you soon.</div>';
        document.getElementById('contactForm').reset();
        
        // Reset validation states
        const fields = ['name', 'email', 'subject', 'message'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.classList.remove('input-valid', 'input-error');
            document.getElementById(fieldId + 'Error').style.display = 'none';
        });
        
        // Reset character counts
        document.getElementById('nameCount').textContent = '0/50';
        document.getElementById('subjectCount').textContent = '0/100';
        document.getElementById('messageCount').textContent = '0/1000';
        
        validator.isFormValid = false;
        
    }, function(error) {
        console.log('FAILED...', error);
        messageDiv.innerHTML = '<div class="message error">Failed to send message. Please try again or contact me directly.</div>';
    }).finally(function() {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
});

// Prevent form submission with Enter key if form is invalid
document.getElementById('contactForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
        e.preventDefault();
        if (validator.isFormValid) {
            document.getElementById('submitBtn').click();
        }
    }
});