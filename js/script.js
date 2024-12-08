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


// Project Section data
const projects = [
    {
      title: "Pneumonia Detection Web App",
      techStack: "Python, Flask, CNN, AWS-EC2",
      description:
        "Developed a web-based application for pneumonia detection using CNNs and deep learning. Achieved 94% sensitivity in detecting pneumonia from X-ray scans.",
      githubLink: "https://github.com/yourusername/pneumonia-detection",
    },
    {
      title: "Socio-Economic Welfare Analysis",
      techStack: "Python, Pandas, Matplotlib",
      description:
        "Performed socio-economic welfare analysis to identify countries in need of aid using clustering techniques like K-Means.",
      githubLink: "https://github.com/yourusername/socio-economic-analysis",
    },
    {
      title: "Rental Service Demand Prediction",
      techStack: "Python, Seaborn, Pandas",
      description:
        "Built a predictive model to understand demand for shared bikes post-COVID-19 lockdown, achieving an R-squared score of 83%.",
      githubLink: "https://github.com/yourusername/rental-demand-prediction",
    },
    // Add more projects here
  ];
  
  const visibleCount = 6;
  let showingAll = false;
  
  function renderProjects() {
    const container = document.getElementById("project-cards-container");
    container.innerHTML = ""; // Clear existing cards
  
    const projectsToDisplay = showingAll ? projects : projects.slice(0, visibleCount);
  
    projectsToDisplay.forEach((project) => {
      const card = document.createElement("div");
      card.className = "project-card";
  
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p><strong>Tech Stack:</strong> ${project.techStack}</p>
        <p>${project.description}</p>
        <a href="${project.githubLink}" target="_blank" class="github-link">View on GitHub</a>
      `;
  
      container.appendChild(card);
    });
  }
  
  document.getElementById("toggle-projects-button").addEventListener("click", () => {
    showingAll = !showingAll;
    renderProjects();
  
    const button = document.getElementById("toggle-projects-button");
    button.textContent = showingAll ? "See Less" : "See More";
  });
  
  // Initial render
  renderProjects();
  