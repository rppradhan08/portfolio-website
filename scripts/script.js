// Global variables to control project visibility
let showingAll = false;
const visibleCount = 3;

// Scroll to section smooth behavior
function scrollToSection(anchor) {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
  });
}

// Dark Mode Toggle
function toggleDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
  });
}

// Highlight the current section
function highlightCurrentSection() {
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
}

// Back to Top Button
function setupBackToTopButton() {
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
      backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
  });

  backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Fetch and render skills
function renderSkills() {
  fetch('/data/skills.json')
      .then(response => response.json())
      .then(data => {
          const skillsContainer = document.getElementById('skills-container');
          skillsContainer.innerHTML = ''; // Clear existing content
          data.skills.forEach(skill => {
              const bubble = document.createElement('div');
              bubble.classList.add('skill-bubble');
              bubble.textContent = skill;
              skillsContainer.appendChild(bubble);
          });
      })
      .catch(error => console.error('Error fetching skills:', error));
}

// Fetch and render projects
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

  // Update button text after rendering projects
  const button = document.getElementById("toggle-projects-button");
  if (button) {
      button.textContent = showingAll ? "See Less" : "See More";
  }
}

// Fetch and render projects data
function fetchAndRenderProjects() {
  fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => {
          renderProjects(data.projects);

          // Add event listener to toggle button after projects are rendered
          const button = document.getElementById("toggle-projects-button");
          if (button) {
              button.addEventListener("click", () => {
                  showingAll = !showingAll;
                  renderProjects(data.projects); // Re-render projects with updated visibility
              });
          }
      })
      .catch(error => console.error('Error fetching projects:', error));
}

// Fetch and render social media links
function renderSocialLinks() {
  fetch('data/socials.json')
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
}

// Initialize all features
function initializePage() {
  // Scroll functionality
  document.querySelectorAll('a[href^="#"]').forEach(scrollToSection);

  // Dark mode toggle
  toggleDarkMode();

  // Highlight current section
  highlightCurrentSection();

  // Back to top button
  setupBackToTopButton();

  // Fetch and render skills
  renderSkills();

  // Fetch and render projects
  fetchAndRenderProjects();

  // Fetch and render social links
  renderSocialLinks();
}

// Initialize the page on load
window.addEventListener('load', initializePage);

// Collapsing the hero section and showing the navbar on scroll
let lastScrollTop = 0; // Variable to track last scroll position
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const navbar = document.querySelector('nav');

  let currentScroll = window.scrollY; // Using scrollY instead of pageYOffset
  console.log("Current Scroll Position:", currentScroll);

  if (currentScroll > lastScrollTop) {
    console.log("Scrolling down");
    hero.classList.add('collapsed');
    navbar.style.display = 'flex'; // Show navbar
  } else {
    console.log("Scrolling up");
    hero.classList.remove('collapsed');
    navbar.style.display = 'none'; // Hide navbar
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});
