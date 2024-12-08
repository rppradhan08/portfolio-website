document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Form Validation
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (e) => {
    let isValid = true;

    // Name Validation
    if (nameInput.value.trim() === '') {
        isValid = false;
        alert('Please enter your name.');
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        alert('Please enter a valid email address.');
    }

    // Message Validation
    if (messageInput.value.trim() === '') {
        isValid = false;
        alert('Please enter a message.');
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
});

const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Toggle the icon
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = "☀️"; // Sun icon for light mode
    } else {
        darkModeToggle.textContent = "🌙"; // Moon icon for dark mode
    }
});


// Skills List
const skills = [
    "HTML", "CSS", "JavaScript", "Python", "Machine Learning",
    "Data Visualization", "React.js", "Node.js", "AWS", "SQL", 
    "SQL", "MongoDB", "Pandas", "TensorFlow", "Matplotlib", "Docker"
];

// Generate Skill Bubbles
const skillsContainer = document.getElementById('skills-container');

skills.forEach(skill => {
    const bubble = document.createElement('div');
    bubble.classList.add('skill-bubble');
    bubble.textContent = skill;
    skillsContainer.appendChild(bubble);
});



// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// highlight the current section 
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});