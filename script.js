// Loader control
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize project cards to be visible
    document.querySelectorAll('.project-card').forEach(card => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 300);
    });
    
    // Theme Switcher
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    
    // Check for saved theme preference or use user's system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
    } else if (prefersDarkScheme.matches) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Listen for button click
    themeToggleBtn.addEventListener('click', function() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // About section tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Skills section tab functionality
    const skillTabButtons = document.querySelectorAll('.skill-tab-btn');
    const skillCategories = document.querySelectorAll('.skills-category');
    
    skillTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            skillTabButtons.forEach(btn => btn.classList.remove('active'));
            skillCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show the corresponding skill category
            const categoryName = button.getAttribute('data-category');
            document.querySelector(`.skills-category[data-category="${categoryName}"]`).classList.add('active');
        });
    });
    
    // Add hover effect to hexagon skills
    const hexagonSkills = document.querySelectorAll('.hexagon-skill');
    
    hexagonSkills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.classList.add('hover');
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.classList.remove('hover');
        });
    });
    
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    // Update custom cursor position
    document.addEventListener('mousemove', (e) => {
        if (cursor && cursorFollower) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }
    });
    
    // Custom cursor effects for interactive elements
    document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .skill-item, .info-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderWidth = '3px';
                cursorFollower.style.opacity = '0';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.borderWidth = '2px';
                cursorFollower.style.opacity = '1';
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    const scrollWatcher = () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', scrollWatcher);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile nav when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active Navigation Links on Scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to the clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, 50);
                } else {
                    card.classList.remove('animate-in');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            console.log('Form Submitted:', { name, email, subject, message });
            
            // Show success message (you could replace this with a better UI)
            alert('Thank you for your message. I will get back to you soon!');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Add Floating Elements
    const addFloatingElements = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Add floating elements to sections
            const float1 = document.createElement('div');
            float1.classList.add('floating-element', 'float-1');
            
            const float2 = document.createElement('div');
            float2.classList.add('floating-element', 'float-2');
            
            section.appendChild(float1);
            section.appendChild(float2);
        });
    };
    
    // Call the function to add floating elements
    addFloatingElements();

    // Enhanced Scroll Reveal Animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .zoom-in, .rotate-in, .bounce-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.visibility = 'visible';
                element.style.opacity = 1;
            }
        });
    };
    
    // Add Enhanced Animation Classes
    const addAnimationClasses = () => {
        // Hero section
        document.querySelector('.hero h1').classList.add('fade-in');
        document.querySelector('.hero h2').classList.add('slide-up');
        document.querySelector('.hero p').classList.add('bounce-in');
        document.querySelector('.cta-buttons').classList.add('fade-in');
        document.querySelector('.hero .social-links').classList.add('slide-up');
        
        // About section
        if (document.querySelector('.about-image-wrapper')) {
            document.querySelector('.about-image-wrapper').classList.add('slide-in-left');
        }
        if (document.querySelector('.about-right')) {
            document.querySelector('.about-right').classList.add('slide-in-right');
        }
        
        if (document.querySelector('.personal-summary')) {
            document.querySelector('.personal-summary').classList.add('slide-up');
            document.querySelector('.personal-summary').style.animationDelay = '0.3s';
        }
        
        // About section text elements
        document.querySelectorAll('.about-text h3').forEach((el, index) => {
            el.classList.add('zoom-in');
            el.style.animationDelay = `${index * 0.2}s`;
        });
        
        document.querySelectorAll('.about-text p').forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${0.2 + index * 0.2}s`;
        });
        
        // Personal info items
        document.querySelectorAll('.personal-info .info-item').forEach((el, index) => {
            el.classList.add('slide-up');
            el.style.animationDelay = `${0.4 + index * 0.1}s`;
        });
        
        // Section titles
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('zoom-in');
        });
        
        // Project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.classList.add('slide-up');
            card.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach((btn, index) => {
            btn.classList.add('fade-in');
            btn.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Skill items
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.classList.add('zoom-in');
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Skill category titles
        document.querySelectorAll('.skills-category h3').forEach((el, index) => {
            el.classList.add('rotate-in');
            el.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Contact section
        if (document.querySelector('.contact-info')) {
            document.querySelector('.contact-info').classList.add('slide-in-left');
        }
        
        // Contact info items
        document.querySelectorAll('.contact-info .info-item').forEach((item, index) => {
            item.classList.add('bounce-in');
            item.style.animationDelay = `${index * 0.2}s`;
        });
        
        if (document.querySelector('.contact-form')) {
            document.querySelector('.contact-form').classList.add('slide-in-right');
        }
        
        // Form elements
        document.querySelectorAll('.form-group').forEach((el, index) => {
            el.classList.add('slide-up');
            el.style.animationDelay = `${0.3 + index * 0.1}s`;
        });
    };
    
    // Call the function to add animation classes
    addAnimationClasses();
    
    // Initial check for animations
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);

    // Typing Animation for Hero Title
    const initTypingAnimation = () => {
        const heroName = document.querySelector('.hero h1 .highlight');
        if (!heroName) return;
        
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '0.1em solid var(--primary-color)';
        
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < text.length) {
                heroName.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                heroName.style.borderRight = 'none';
            }
        };
        
        setTimeout(() => {
            typeWriter();
        }, 1000);
    };
    
    // Call typing animation
    initTypingAnimation();

    // Smooth Scrolling for Anchor Links with Enhanced Animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add a flash animation to the target section
                targetElement.classList.add('section-highlight');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Remove the highlight class after animation
                setTimeout(() => {
                    targetElement.classList.remove('section-highlight');
                }, 1500);
            }
        });
    });
    
    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Apply parallax to floating elements
        document.querySelectorAll('.floating-element').forEach(element => {
            const speed = 0.05;
            element.style.transform = `translateY(${scrollPosition * speed}px) rotate(${scrollPosition * 0.02}deg)`;
        });
    });

    // Animation for progress circles in skills section
    function initProgressCircles() {
        // Get all progress circles
        const progressCircles = document.querySelectorAll('.progress-ring-circle');
        
        // For each progress circle
        progressCircles.forEach(circle => {
            // Get the parent element with data-percent attribute
            const parent = circle.closest('.skill-card-progress');
            const percent = parent.getAttribute('data-percent');
            
            // Calculate circle properties
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            // Set the stroke-dasharray property to the circumference
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            
            // Initially set the stroke-dashoffset to the circumference (empty circle)
            circle.style.strokeDashoffset = circumference;
            
            // Calculate the stroke-dashoffset based on the percentage
            const offset = circumference - (percent / 100) * circumference;
            
            // Create intersection observer to animate when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate the stroke-dashoffset when the circle is in view
                        setTimeout(() => {
                            circle.style.strokeDashoffset = offset;
                        }, 300);
                        
                        // Stop observing once animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Start observing the progress circle
            observer.observe(parent);
        });
    }

    // Initialize all components when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Existing initializations
        initAnimations();
        initThemeToggle();
        initMobileMenu();
        initScrollSpy();
        
        // Initialize new components
        initProgressCircles();
        
        // Add any other initializations here
    });
}); 