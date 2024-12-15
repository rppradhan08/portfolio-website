document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
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


// // Skills List
// const skills = [
//     "HTML", "CSS", "JavaScript", "Python", "Machine Learning",
//     "Data Visualization", "React.js", "Node.js", "AWS", "SQL", 
//     "SQL", "MongoDB", "Pandas", "TensorFlow", "Matplotlib", "Docker"
// ];

// // Generate Skill Bubbles
// const skillsContainer = document.getElementById('skills-container');

// skills.forEach(skill => {
//     const bubble = document.createElement('div');
//     bubble.classList.add('skill-bubble');
//     bubble.textContent = skill;
//     skillsContainer.appendChild(bubble);
// });

// Fetch and render skills
fetch('/data/skills.json')
  .then(response => response.json())
  .then(data => {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = ""; // Clear any existing content
    data.skills.forEach(skill => {
      const bubble = document.createElement('div');
      bubble.classList.add('skill-bubble');
      bubble.textContent = skill;
      skillsContainer.appendChild(bubble);
    });
  })
  .catch(error => console.error('Error fetching skills:', error));

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


// Fetch and render projects
let showingAll = false;
const visibleCount = 3;

function renderProjects(projects) {
  const container = document.getElementById('project-cards-container');
  container.innerHTML = ""; // Clear existing cards

  const projectsToDisplay = showingAll ? projects : projects.slice(0, visibleCount);

  projectsToDisplay.forEach(project => {
    const card = document.createElement('div');
    card.className = "project-card";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p><strong>Tech Stack:</strong> ${project.techStack}</p>
      <p>${project.description}</p>
      <a href="${project.githubLink}" target="_blank" class="github-link">View on GitHub</a>
    `;

    container.appendChild(card);
  });

  // Update button text
  const button = document.getElementById("toggle-projects-button");
  button.textContent = showingAll ? "See Less" : "See More";
}

// Initial fetch and render
fetch('/data/projects.json')
  .then(response => response.json())
  .then(data => {
    renderProjects(data.projects);

    // Add event listener to toggle button
    document.getElementById("toggle-projects-button").addEventListener("click", () => {
      showingAll = !showingAll;
      renderProjects(data.projects);
    });
  })
  .catch(error => console.error('Error fetching projects:', error));


// Fetch and render social media links
fetch('data/socials.json') // Adjusted to load JSON from the `data` folder
    .then(response => response.json())
    .then(data => {
        const socialsContainer = document.getElementById('socials-container');
        socialsContainer.innerHTML = ''; // Clear any existing content

        data.socials.forEach(social => {
            const socialLink = document.createElement('a');
            socialLink.href = social.url;
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.classList.add('social-link');

            const iconImg = document.createElement('img');
            iconImg.src = social.iconPath; // Use the icon path from JSON
            iconImg.alt = `${social.name} Icon`;
            iconImg.classList.add('social-icon'); // Add styling class

            socialLink.appendChild(iconImg);
            socialsContainer.appendChild(socialLink);
        });
    })
    .catch(error => console.error('Error loading socials:', error));


  // Initial render
  renderProjects();
  