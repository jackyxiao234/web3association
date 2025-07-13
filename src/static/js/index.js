// Data for partners and team members
const foundingPartners = [
    { name: 'Asia CEO Community', logo: 'images/asia_ceo.jpg' },
    { name: 'Asia Family Office foundation', logo: 'images/afof.png' },
    { name: 'Female Entrepreneurs WorldWide', logo: 'images/femaleentrepreneurs.png' },
    { name: 'Women in Web3 HK', logo: 'images/women_in_web3.png' }
];

const leadershipTeam = [
    {
        name: 'Gary Liu',
        title: 'Co-founder & CEO, Terminal 3',
        role: 'Founding Chair'
    },
    {
        name: 'Lawrence Chu',
        title: 'Co-founder & CEO, IDA',
        role: 'Founding Vice-Chair'
    },
    {
        name: 'Angelina Kwan',
        title: 'MD, Stratford Finance',
        role: 'Advisory Committee Member'
    },
    {
        name: 'Ben Wong',
        title: 'CEO, Riverchain',
        role: 'Advisory Committee Member'
    },
    {
        name: 'Edith Yeung',
        title: 'Partner, Race Capital',
        role: 'Advisory Committee Member'
    },
    {
        name: 'Karena Belin',
        title: 'Co-founder, WHub & AngelHub',
        role: 'Advisory Committee Member'
    },
    {
        name: 'Kristi Swartz',
        title: 'Partner, DLA Piper',
        role: 'Advisory Committee Member'
    },
    {
        name: 'Minh Do',
        title: 'COO, Animoca Brands',
        role: 'Advisory Committee Member'
    },
    {
        name: 'Peter Brewin',
        title: 'Partner, PwC',
        role: 'Advisory Committee Member'
    }
];

const associationTeam = [
    {
        name: 'Jeffrey Tchui',
        title: 'Executive Director',
        subtitle: 'Vice President, Hedera Foundation'
    },
    {
        name: 'Kathy Brewin',
        title: 'Head of Association'
    },
    {
        name: 'Andrew Mak',
        title: 'Head of Partnerships'
    },
    {
        name: 'Rebecca Chan',
        title: 'Marketing and Events Manager'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Populate partner logos
    populatePartners();
    
    // Populate team members
    populateTeam();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize form handling
    initFormHandling();
});

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

// Populate Partners
function populatePartners() {
    const foundingPartnersContainer = document.getElementById('founding-partners');
    const membersContainer = document.getElementById('members');
    
    if (foundingPartnersContainer) {
        foundingPartners.forEach(partner => {
            const partnerElement = createPartnerElement(partner);
            foundingPartnersContainer.appendChild(partnerElement);
        });
    }
    
    if (membersContainer) {
        members.forEach(member => {
            const memberElement = createPartnerElement(member);
            membersContainer.appendChild(memberElement);
        });
    }
}

function createPartnerElement(partner) {
    const div = document.createElement('div');
    div.className = 'partner-logo';
    div.innerHTML = `<img src="${partner.logo}" alt="${partner.name}" loading="lazy">`;
    return div;
}

// Populate Team
function populateTeam() {
    const leadershipContainer = document.getElementById('leadership-team');
    const associationContainer = document.getElementById('association-team');
    
    if (leadershipContainer) {
        leadershipTeam.forEach(member => {
            const memberElement = createLeadershipMemberElement(member);
            leadershipContainer.appendChild(memberElement);
        });
    }
    
    if (associationContainer) {
        associationTeam.forEach(member => {
            const memberElement = createAssociationMemberElement(member);
            associationContainer.appendChild(memberElement);
        });
    }
}

function createLeadershipMemberElement(member) {
    const div = document.createElement('div');
    div.className = 'team-member';
    div.innerHTML = `
        <h3 class="member-name">${member.name}</h3>
        <p class="member-title">${member.title}</p>
        <p class="member-role">${member.role}</p>
    `;
    return div;
}

function createAssociationMemberElement(member) {
    const div = document.createElement('div');
    div.className = 'team-member';
    div.innerHTML = `
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.title}</p>
        ${member.subtitle ? `<p class="member-subtitle">${member.subtitle}</p>` : ''}
    `;
    return div;
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Form Handling
function initFormHandling() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const subscribeBtn = document.querySelector('.newsletter .btn-primary');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Update button state
            subscribeBtn.textContent = 'Subscribing...';
            subscribeBtn.disabled = true;

            // Send email to backend
            fetch('/api/send-newsletter-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Thank you for subscribing to our newsletter! The administrator has been notified.');
                emailInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error processing your subscription. Please try again later.');
            })
            .finally(() => {
                subscribeBtn.textContent = 'Subscribe';
                subscribeBtn.disabled = false;
            });
        });
        
        // Handle Enter key in email input
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const navToggle = document.getElementById('nav-toggle');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scrolling for anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const navToggle = document.getElementById('nav-toggle');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active navigation on scroll
window.addEventListener('scroll', updateActiveNavigation);

// Update active navigation on page load
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

