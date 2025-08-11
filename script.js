// script.js

// Predefined curated resources by skill for demonstration; can be replaced by backend API calls
const RESOURCE_DATA = {
  "data science": [
    {
      title: "Kaggle Learn - Data Science",
      url: "https://www.kaggle.com/learn/data-science",
      description: "Hands-on micro-courses and projects to build data science expertise."
    },
    {
      title: "edX - Data Science Essentials",
      url: "https://www.edx.org/course/data-science-essentials",
      description: "Fundamental concepts and skills, including statistics and Python."
    },
    {
      title: "Coursera - IBM Data Science Professional Certificate",
      url: "https://www.coursera.org/professional-certificates/ibm-data-science",
      description: "Comprehensive path covering data analysis, visualization, and machine learning."
    },
    {
      title: "Google Data Analytics Certificate",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics",
      description: "Beginner-friendly program focusing on real-world data analytics skills."
    }
  ],

  "machine learning": [
    {
      title: "Coursera - Machine Learning by Andrew Ng",
      url: "https://www.coursera.org/learn/machine-learning",
      description: "Classic introductory course with algorithms and practical examples."
    },
    {
      title: "fast.ai - Practical Deep Learning",
      url: "https://course.fast.ai/",
      description: "Hands-on deep learning course with a focus on real coding skills."
    },
    {
      title: "Google AI - Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course",
      description: "Google's free refresher with videos, exercises, and case studies."
    }
  ],

  "web development": [
    {
      title: "freeCodeCamp - Web Development",
      url: "https://www.freecodecamp.org/learn",
      description: "Free, comprehensive tutorials spanning front-end and back-end technologies."
    },
    {
      title: "The Odin Project",
      url: "https://www.theodinproject.com/",
      description: "Project-based full-stack curriculum with community support."
    },
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Learn",
      description: "Mozilla's authoritative web development documentation for all skill levels."
    }
  ],

  default: [
    {
      title: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      description: "Wide-ranging tutorials on programming, web development, and more."
    },
    {
      title: "Coursera",
      url: "https://www.coursera.org/",
      description: "University-level courses across many disciplines, many free to audit."
    },
    {
      title: "Khan Academy",
      url: "https://www.khanacademy.org/",
      description: "Extensive video lessons on a variety of academic and technical subjects."
    },
    {
      title: "edX",
      url: "https://www.edx.org/",
      description: "High-quality courses from top universities and institutions."
    }
  ]
};

// Normalize input skill string to lowercase trimmed key
function normalizeSkillInput(input) {
  return input.toLowerCase().trim();
}

// Create an article element for a resource card
function createResourceCard(resource) {
  const card = document.createElement("article");
  card.className = "resource-card";
  card.tabIndex = 0; // Accessible focusable

  // Resource title with link
  const titleLink = document.createElement("a");
  titleLink.href = resource.url;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";
  titleLink.className = "resource-title";
  titleLink.textContent = resource.title;

  // Description paragraph
  const description = document.createElement("p");
  description.className = "resource-description";
  description.textContent = resource.description;

  // Visit button
  const visitBtn = document.createElement("a");
  visitBtn.href = resource.url;
  visitBtn.target = "_blank";
  visitBtn.rel = "noopener noreferrer";
  visitBtn.className = "visit-btn";
  visitBtn.setAttribute("aria-label", `Visit ${resource.title}`);
  visitBtn.textContent = "Visit";

  // Compose the card
  card.appendChild(titleLink);
  card.appendChild(description);
  card.appendChild(visitBtn);

  return card;
}

// Display resources in results section
function displayResources(skill, resources) {
  const resultsSection = document.getElementById("resources-section");
  const resourceCardsContainer = resultsSection.querySelector(".resource-cards");
  const noResultsMsg = document.getElementById("no-results-text");
  const heading = resultsSection.querySelector("h3");

  // Clear previous results
  resourceCardsContainer.innerHTML = "";
  noResultsMsg.style.display = "none";

  if (resources.length === 0) {
    noResultsMsg.textContent = `No resources found for "${skill}". Please try another skill.`;
    noResultsMsg.style.display = "block";
    heading.textContent = "Top Free Resources";
    return;
  }

  // Update heading with current skill
  heading.textContent = `Top Free Resources for "${skill}"`;

  // Append resource cards with fade-in animation
  resources.forEach(resource => {
    const card = createResourceCard(resource);
    card.classList.add("fade-in");
    resourceCardsContainer.appendChild(card);
  });

  // Set focus to first resource card for accessibility
  if (resourceCardsContainer.firstChild) {
    resourceCardsContainer.firstChild.focus();
  }
}

// Mock fetch for resources by skill input; return resources array
function fetchResourcesForSkill(skillInput) {
  const key = normalizeSkillInput(skillInput);
  if (RESOURCE_DATA.hasOwnProperty(key)) {
    return RESOURCE_DATA[key];
  } else {
    return RESOURCE_DATA.default;
  }
}

// Clear previous validation errors on inputs
function clearValidationErrors() {
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  emailError.textContent = "";
  messageError.textContent = "";
}

// Basic validation for email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate contact form fields and return boolean; show errors if any
function validateContactForm(email, message) {
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  let valid = true;

  // Clear previous errors
  clearValidationErrors();

  if (!email) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (!message) {
    messageError.textContent = "Message cannot be empty.";
    valid = false;
  } else if (message.length > 1000) {
    messageError.textContent = "Message must be less than 1000 characters.";
    valid = false;
  }

  return valid;
}

// Handle search button click event
function handleSearchClick() {
  const skillInputElement = document.getElementById("skillInput");
  const skill = skillInputElement.value.trim();
  const resultsSection = document.getElementById("resources-section");
  const noResultsMsg = document.getElementById("no-results-text");
  const resourceCardsContainer = resultsSection.querySelector(".resource-cards");
  const heading = resultsSection.querySelector("h3");

  if (!skill) {
    noResultsMsg.textContent = "Please enter a skill to search.";
    noResultsMsg.style.display = "block";
    heading.textContent = "Top Free Resources";
    resourceCardsContainer.innerHTML = "";
    skillInputElement.focus();
    return;
  }

  // Show loading message
  noResultsMsg.textContent = `Loading top free resources for "${skill}"...`;
  noResultsMsg.style.display = "block";
  heading.textContent = "";
  resourceCardsContainer.innerHTML = "";

  // Simulate loading delay
  setTimeout(() => {
    const resources = fetchResourcesForSkill(skill);
    displayResources(skill, resources);
  }, 1500);
}

// Handle enter key in skill input triggering search
function handleSkillInputKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
}

// Handle contact form submission with validation and feedback
function handleContactFormSubmit(event) {
  event.preventDefault();
  clearValidationErrors();

  const form = event.target;
  const email = form.elements["email"].value.trim();
  const message = form.elements["message"].value.trim();
  const statusDiv = document.getElementById("form-status");
  const submitBtn = form.querySelector(".contact-submit-btn");

  if (!validateContactForm(email, message)) {
    statusDiv.textContent = "Please fix the errors above and try again.";
    statusDiv.style.color = "#b44a4a";
    statusDiv.style.fontWeight = "700";
    return;
  }

  // Disable button and show sending state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusDiv.textContent = "";
  statusDiv.style.color = "";

  // Simulate sending delay
  setTimeout(() => {
    statusDiv.textContent = "Thank you! Your message has been sent successfully.";
    statusDiv.style.color = "#3a663a";
    statusDiv.style.fontWeight = "600";
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }, 2200);
}

// Initialization on page load: attach event listeners and setup resource container
function init() {
  const searchBtn = document.getElementById("searchBtn");
  const skillInput = document.getElementById("skillInput");
  const contactForm = document.querySelector(".contact-form");
  const resultsSection = document.getElementById("resources-section");

  // Ensure resource cards container exists
  if (!resultsSection.querySelector(".resource-cards")) {
    const div = document.createElement("div");
    div.className = "resource-cards";
    div.setAttribute("aria-live", "polite");
    div.setAttribute("aria-relevant", "additions removals");
    resultsSection.appendChild(div);
  }

  // Attach event listeners
  searchBtn.addEventListener("click", handleSearchClick);
  skillInput.addEventListener("keydown", handleSkillInputKeydown);

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
}

// Run init on DOM load
document.addEventListener("DOMContentLoaded", init);
