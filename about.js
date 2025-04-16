document.addEventListener("DOMContentLoaded", function () {
  // Add click event to all add buttons

  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    mobileNav.style.display = hamburgerMenu.classList.contains("active")
      ? "flex"
      : "none";
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active");
      mobileNav.style.display = "none";
    });
  });
  const addButtons = document.querySelectorAll(".add-button");

  addButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const galleryItem = this.closest(".gallery-item");
      const itemTitle = galleryItem.querySelector(
        ".gallery-item-title"
      ).textContent;

      // Check if this card is already expanded
      const isExpanded = galleryItem.classList.contains("expanded");

      // First collapse any currently expanded cards
      document.querySelectorAll(".gallery-item.expanded").forEach((item) => {
        if (item !== galleryItem) {
          collapseCard(item);
        }
      });

      // Toggle current card
      if (isExpanded) {
        collapseCard(galleryItem);
      } else {
        expandCard(galleryItem, itemTitle);
      }
    });
  });

  // Function to expand a card
  function expandCard(card, title) {
    // Content for each gallery item
    const cardContents = {
      "Fluid Curiosity":
        "From psychology to design, I explore, connect, and rethink ideas with curiosity and creativity",
      "Fast Learner":
        "I have taught myself languages, design, and psychology—I never stop learning and improving.",
      "Fluent in People":
        "Helping students of different ages and cultures learn Arabic strengthened my ability to create user-centered, accessible designs.",
      "Empath by Nature":
        "Understanding struggles and finding solutions has been second nature to me since childhood.",
    };

    // Add expanded class
    card.classList.add("expanded");

    // Hide the title
    const titleElement = card.querySelector(".gallery-item-title");
    titleElement.style.display = "none";

    // Change plus to X
    const addButton = card.querySelector(".add-button");
    addButton.textContent = "✕";

    // Create and add the content overlay
    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = `
            <p>${cardContents[title]}</p>
        `;

    card.appendChild(overlay);

    // Animate in
    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 10);
  }

  // Function to collapse a card
  function collapseCard(card) {
    const overlay = card.querySelector(".card-overlay");
    const addButton = card.querySelector(".add-button");
    const titleElement = card.querySelector(".gallery-item-title");

    // Animate out
    if (overlay) {
      overlay.style.opacity = "0";

      // Remove overlay after animation
      setTimeout(() => {
        card.removeChild(overlay);
        card.classList.remove("expanded");
        addButton.textContent = "+";

        // Restore the title
        titleElement.style.display = "";
      }, 300);
    }
  }

  // Close expanded card when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".gallery-item") &&
      !e.target.closest(".add-button")
    ) {
      document.querySelectorAll(".gallery-item.expanded").forEach((item) => {
        collapseCard(item);
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Get all skill categories
  const skillCategories = document.querySelectorAll(".skill-category");

  // Function to adjust border height based on content
  function adjustBorderHeight() {
    skillCategories.forEach((category) => {
      // Get content height (category name + skill list)
      const contentHeight =
        category.querySelector(".category-name").offsetHeight +
        category.querySelector(".skill-list").offsetHeight;

      // Find the pseudo-element and adjust its height
      // We can't directly access pseudo-elements with JS, so we set a custom property
      category.style.setProperty("--content-height", contentHeight + "px");

      // Use the custom property in CSS if needed
      // This is handled by the ::before in CSS, but we can make it precise
      const beforeElement = document.createElement("style");
      beforeElement.textContent = `
          .skill-category[style*="--content-height"]::before {
            height: var(--content-height) !important;
          }
        `;
      document.head.appendChild(beforeElement);
    });
  }

  // Run once on load
  adjustBorderHeight();

  // Also run on window resize
  window.addEventListener("resize", adjustBorderHeight);
});
// When the page loads, check if there's a hash in the URL and scroll to it
document.addEventListener("DOMContentLoaded", () => {
  // Your existing DOMContentLoaded code here

  // Handle hash navigation more reliably for cross-page navigation
  if (window.location.hash) {
    // A slight delay to ensure everything is rendered
    setTimeout(() => {
      navigateToHash(window.location.hash);
    }, 300); // Slightly longer timeout for cross-page navigation
  }
});

// Function to handle hash navigation
function navigateToHash(hash) {
  const targetElement = document.querySelector(hash);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80, // Adjust for navbar height
      behavior: "smooth",
    });
  }
}

// For same-page navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const hash = this.getAttribute("href");

    // Only prevent default for same-page navigation
    if (
      window.location.pathname.includes("index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/")
    ) {
      e.preventDefault();
      navigateToHash(hash);
    }
    // For cross-page navigation, let the default behavior happen
  });
});

// Additional handler for the "popstate" event (browser back/forward)
window.addEventListener("popstate", function () {
  if (window.location.hash) {
    setTimeout(() => {
      navigateToHash(window.location.hash);
    }, 100);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const logo = document.querySelector(".logo"); // Make sure this selector matches your logo element

  function getSectionUnderNavbar() {
    const sections = document.querySelectorAll("section, .hero-section");
    const navbarHeight = navbar.offsetHeight;

    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navbarHeight && rect.bottom >= 0) {
        return section;
      }
    }
    return null;
  }

  function getBackgroundColor(element) {
    return window.getComputedStyle(element).backgroundColor;
  }

  function getBrightness(color) {
    // Handle different color format possibilities
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;

    return (
      parseInt(rgb[0]) * 0.299 +
      parseInt(rgb[1]) * 0.587 +
      parseInt(rgb[2]) * 0.114
    );
  }

  function updateNavbarStyle() {
    if (!navbar) return;

    const currentSection = getSectionUnderNavbar();
    if (!currentSection) return;

    const bgColor = getBackgroundColor(currentSection);
    const brightness = getBrightness(bgColor);

    if (brightness > 128) {
      // Light background section
      navbar.style.background = "rgba(255, 255, 255, 0.8)";
      navbar.style.color = "black";

      navLinks.forEach((link) => {
        link.style.color = "black";
      });

      if (logo) logo.style.color = "black";
    } else {
      // Dark background section
      navbar.style.background = "rgba(43, 43, 43, 0.8)";
      navbar.style.color = "rgba(255, 254, 254, 0.8)";

      navLinks.forEach((link) => {
        link.style.color = "rgba(206, 206, 206, 0.8)";
      });

      if (logo) logo.style.color = "white";
    }
  }

  // Initial call
  updateNavbarStyle();

  // Add event listeners
  window.addEventListener("scroll", updateNavbarStyle);
  window.addEventListener("resize", updateNavbarStyle);
});
