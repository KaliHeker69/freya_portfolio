// Portfolio JavaScript with Anime.js animations
// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize all components
    initializeNavigation();
    initializeHero();
    initializeScrollAnimations();
    initializeSkills();
    initializeProjects();
    initializeDemo();
    initializeContact();
    initializeIntersectionObserver();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (!prefersReducedMotion) {
            if (navMenu.classList.contains('active')) {
                anime({
                    targets: '.nav-link',
                    translateY: [20, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        }
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navigation background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Hero section animations
function initializeHero() {
    const animatedText = document.getElementById('animated-text');
    const heroCard = document.getElementById('hero-card');
    const particles = document.getElementById('particles');
    
    // Animated text cycle
    const textOptions = [
        'Generative AI enthusiast',
        'Software developer',
        'Final-year student',
        'Creative technologist'
    ];
    
    let currentIndex = 0;
    
    function cycleText() {
        if (prefersReducedMotion) {
            animatedText.textContent = textOptions[currentIndex];
            currentIndex = (currentIndex + 1) % textOptions.length;
            setTimeout(cycleText, 3000);
            return;
        }
        
        anime({
            targets: animatedText,
            opacity: [1, 0],
            translateY: [0, -20],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                currentIndex = (currentIndex + 1) % textOptions.length;
                animatedText.textContent = textOptions[currentIndex];
                
                anime({
                    targets: animatedText,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
    }
    
    // Start text animation after initial load
    setTimeout(cycleText, 2000);
    setInterval(cycleText, 4000);
    
    // Hero card interactions
    if (heroCard && !prefersReducedMotion) {
        heroCard.addEventListener('mouseenter', () => {
            anime({
                targets: heroCard,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
            
            createParticles(particles);
        });
        
        heroCard.addEventListener('mouseleave', () => {
            anime({
                targets: heroCard,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        // Parallax effect on mouse move
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            anime({
                targets: heroCard,
                rotateX: -y / 10,
                rotateY: x / 10,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    }
    
    // Initial hero animations
    if (!prefersReducedMotion) {
        anime.timeline()
            .add({
                targets: '.hero-headline',
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutQuart'
            })
            .add({
                targets: '.hero-subline',
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutQuart'
            }, '-=400')
            .add({
                targets: '.hero-ctas .btn',
                translateY: [30, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                duration: 600,
                easing: 'easeOutQuart'
            }, '-=300')
            .add({
                targets: '.hero-card',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutBack'
            }, '-=600');
    }
}

// Create particle effect
function createParticles(container) {
    if (!container || prefersReducedMotion) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(240, 147, 251, 0.8);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        anime({
            targets: particle,
            translateX: () => anime.random(-150, 150),
            translateY: () => anime.random(-150, 150),
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            duration: anime.random(1000, 2000),
            easing: 'easeOutQuart',
            complete: () => particle.remove()
        });
    }
}

// Scroll animations using Intersection Observer
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animate based on element type
                if (target.classList.contains('timeline-item')) {
                    animateTimelineItem(target);
                } else if (target.classList.contains('project-card')) {
                    animateProjectCard(target);
                } else if (target.classList.contains('skill-category')) {
                    animateSkills(target);
                } else if (target.classList.contains('section-header')) {
                    animateSectionHeader(target);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.timeline-item, .project-card, .skill-category, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Animation functions
function animateTimelineItem(element) {
    if (prefersReducedMotion) {
        element.classList.add('stagger-animate');
        return;
    }
    
    anime({
        targets: element,
        translateX: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart'
    });
}

function animateProjectCard(element) {
    if (prefersReducedMotion) {
        element.classList.add('animate-in');
        return;
    }
    
    anime({
        targets: element,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart'
    });
}

function animateSectionHeader(element) {
    if (prefersReducedMotion) {
        element.style.opacity = '1';
        return;
    }
    
    anime({
        targets: element.children,
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 600,
        easing: 'easeOutQuart'
    });
}

// Skills section functionality
function initializeSkills() {
    // Animate skill progress bars when section is visible
    const skillsSection = document.getElementById('skills');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

function animateSkills(categoryElement) {
    if (prefersReducedMotion) {
        categoryElement.style.opacity = '1';
        return;
    }
    
    const chips = categoryElement.querySelectorAll('.skill-chip');
    
    anime({
        targets: chips,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart'
    });
}

function animateSkillBars() {
    const skillChips = document.querySelectorAll('.skill-chip');
    
    skillChips.forEach(chip => {
        const level = chip.getAttribute('data-level');
        const progressBar = chip.querySelector('.skill-progress');
        
        if (progressBar && level) {
            if (prefersReducedMotion) {
                progressBar.style.width = level + '%';
            } else {
                anime({
                    targets: progressBar,
                    width: level + '%',
                    duration: 1000,
                    delay: anime.random(0, 500),
                    easing: 'easeOutQuart'
                });
            }
        }
    });
    
    // Animate skill graph path
    const skillPath = document.querySelector('.skill-path');
    if (skillPath && !prefersReducedMotion) {
        anime({
            targets: skillPath,
            strokeDashoffset: [500, 0],
            duration: 2000,
            delay: 500,
            easing: 'easeOutQuart'
        });
    }
}

// Projects section functionality
function initializeProjects() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
    
    // Project card hover effects
    projectCards.forEach(card => {
        if (!prefersReducedMotion) {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -8,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    translateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        }
    });
}

function filterProjects(filter, cards) {
    cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (prefersReducedMotion) {
            card.style.display = shouldShow ? 'block' : 'none';
            return;
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            anime({
                targets: card,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutQuart'
            });
        } else {
            anime({
                targets: card,
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// Demo section functionality
function initializeDemo() {
    const generateBtn = document.getElementById('generate-btn');
    const textInput = document.getElementById('demo-text');
    const transformType = document.getElementById('transform-type');
    const thinking = document.getElementById('thinking');
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');
    
    generateBtn.addEventListener('click', () => {
        const inputText = textInput.value.trim();
        if (!inputText) return;
        
        // Show thinking animation
        showThinking();
        
        // Simulate processing delay
        setTimeout(() => {
            const result = transformText(inputText, transformType.value);
            showResult(result);
        }, 2000);
    });
    
    copyBtn.addEventListener('click', () => {
        const text = outputText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
        });
    });
    
    function showThinking() {
        thinking.style.display = 'flex';
        outputText.style.display = 'none';
        copyBtn.style.display = 'none';
        
        if (!prefersReducedMotion) {
            // Animate progress bar
            anime({
                targets: '.progress-fill',
                width: '100%',
                duration: 1800,
                easing: 'easeInOutQuart'
            });
            
            // Animate dots
            anime({
                targets: '.dots span',
                scale: [1, 1.2, 1],
                duration: 600,
                delay: anime.stagger(200),
                loop: true,
                easing: 'easeInOutQuart'
            });
        }
    }
    
    function showResult(result) {
        thinking.style.display = 'none';
        outputText.style.display = 'block';
        copyBtn.style.display = 'flex';
        
        // Reset progress bar
        document.querySelector('.progress-fill').style.width = '0';
        
        if (prefersReducedMotion) {
            outputText.textContent = result;
            return;
        }
        
        // Type-in effect
        outputText.textContent = '';
        typeText(outputText, result, 30);
        
        anime({
            targets: copyBtn,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 300,
            delay: 500,
            easing: 'easeOutBack'
        });
    }
    
    function typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }
    
    function showCopySuccess() {
        const originalText = copyBtn.querySelector('.copy-text').textContent;
        const originalIcon = copyBtn.querySelector('.copy-icon').textContent;
        
        copyBtn.querySelector('.copy-text').textContent = 'Copied!';
        copyBtn.querySelector('.copy-icon').textContent = '✓';
        
        if (!prefersReducedMotion) {
            // Confetti effect
            createConfetti();
            
            anime({
                targets: copyBtn,
                scale: [1, 1.1, 1],
                duration: 300,
                easing: 'easeOutBack'
            });
        }
        
        setTimeout(() => {
            copyBtn.querySelector('.copy-text').textContent = originalText;
            copyBtn.querySelector('.copy-icon').textContent = originalIcon;
        }, 2000);
    }
    
    function createConfetti() {
        if (prefersReducedMotion) return;
        
        const colors = ['#667eea', '#764ba2', '#f093fb'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 1000;
                pointer-events: none;
                left: 50%;
                top: 50%;
            `;
            
            document.body.appendChild(confetti);
            
            anime({
                targets: confetti,
                translateX: () => anime.random(-200, 200),
                translateY: () => anime.random(-200, 200),
                rotate: () => anime.random(0, 360),
                scale: [1, 0],
                opacity: [1, 0],
                duration: anime.random(1000, 1500),
                easing: 'easeOutQuart',
                complete: () => confetti.remove()
            });
        }
    }
}

// Simple text transformation (deterministic for demo purposes)
function transformText(text, type) {
    switch (type) {
        case 'shorten':
            const words = text.split(' ');
            return words.slice(0, Math.ceil(words.length * 0.6)).join(' ') + '...';
            
        case 'formal':
            return text
                .replace(/\bi'm\b/gi, 'I am')
                .replace(/\bdon't\b/gi, 'do not')
                .replace(/\bcan't\b/gi, 'cannot')
                .replace(/\bwon't\b/gi, 'will not')
                .replace(/\bisn't\b/gi, 'is not');
                
        case 'casual':
            return text
                .replace(/\bI am\b/gi, "I'm")
                .replace(/\bdo not\b/gi, "don't")
                .replace(/\bcannot\b/gi, "can't")
                .replace(/\bwill not\b/gi, "won't")
                .replace(/\bis not\b/gi, "isn't");
                
        case 'tweet':
            const shortText = text.length > 240 ? text.substring(0, 237) + '...' : text;
            return shortText + ' #AI #TechInnovation';
            
        default:
            return text;
    }
}

// Contact form functionality
function initializeContact() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        if (!prefersReducedMotion) {
            anime({
                targets: contactForm,
                scale: [1, 0.95, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
        
        // Show success message (in a real app, you'd handle the actual submission)
        alert('Thank you for your message! This is a demo portfolio.');
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll animations for various elements
function initializeScrollAnimations() {
    if (prefersReducedMotion) return;
    
    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add mouse parallax to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            document.querySelectorAll('.shape').forEach((shape, index) => {
                const multiplier = (index + 1) * 0.5;
                shape.style.transform = `translateX(${xPos * multiplier}px) translateY(${yPos * multiplier}px)`;
            });
        });
    }
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        if (prefersReducedMotion) return;
        
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                translateY: -2,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                translateY: 0,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('click', () => {
            anime({
                targets: button,
                scale: [1, 0.95, 1],
                duration: 150,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Resume download functionality
document.getElementById('resume-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create a simple text resume for demo purposes
    const resumeContent = `FREYA - PORTFOLIO RESUME

Generative AI Enthusiast & Software Developer
Final-Year Computer Science Student
Stanford University

EMAIL: freya@example.com
LINKEDIN: linkedin.com/in/freya
GITHUB: github.com/freya
LOCATION: San Francisco, CA

SKILLS:
- Generative AI: PyTorch, Transformers, Diffusion Models, GANs
- Frontend: JavaScript, React, TypeScript, CSS/Tailwind
- Backend: Python, Node.js, PostgreSQL, Docker
- Tools: Git, AWS, Jupyter, Figma

PROJECTS:
1. Neural Style Transfer Studio - Real-time artistic style transfer
2. Intelligent Chat Interface - Context-aware chatbot with personality adaptation
3. Data Visualization Platform - Interactive dashboard with AI insights
4. Multimodal Learning Framework - Research project combining vision and language

EDUCATION:
- Computer Science, Stanford University (Expected 2025)
- Focus: Artificial Intelligence and Machine Learning

EXPERIENCE:
- AI Research Internship (2023)
- Multiple generative AI projects and publications

This is a demo portfolio. Visit the live site for interactive examples!`;

    // Create and download the resume file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Freya_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show download animation
    if (!prefersReducedMotion) {
        anime({
            targets: e.target,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus indicators for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (!prefersReducedMotion) {
                anime({
                    targets: this,
                    scale: [1, 1.02, 1],
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
});
