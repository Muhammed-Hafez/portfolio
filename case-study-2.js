document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  const animateElements = document.querySelectorAll(".animate-on-scroll");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".on-this-page-links a");
  const problemImages = document.querySelectorAll(".problem-img");
  const heroSection = document.querySelector(".case-study-hero");
  const onThisPageContainer = document.querySelector(".on-this-page-container");

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

  // Make hero section elements visible immediately without animation
  document
    .querySelectorAll(".case-study-hero .animate-on-scroll")
    .forEach((el) => {
      // Remove animation classes from hero section elements
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    });

  // Setup image scroll animation
  setupImageScroll();

  // Handle scroll animations and image sizing
  function checkInView() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // For each problem image (except the first one which is always 100%)
    // problemImages.forEach((img, index) => {
    //   if (index > 0) {
    //     // Skip the first image
    //     const rect = img.getBoundingClientRect();
    //     const visiblePercentage = getVisiblePercentage(img);

    //     // Scale from 80% to 100% based on visibility
    //     const scaleFactor = 0.8 + visiblePercentage * 0.2;
    //     img.style.width = `${scaleFactor * 100}%`;
    //   }
    // });

    // Animate elements as they enter viewport (excluding hero section)
    animateElements.forEach((element) => {
      // Skip hero section elements
      if (!element.closest(".case-study-hero")) {
        const rect = element.getBoundingClientRect();
        const elementVisible = 150; // Offset from bottom of viewport to trigger animation

        if (rect.top < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      }
    });

    // Update active section in navigation
    updateActiveSection();
  }

  // Function to setup the image scroll animation
  function setupImageScroll() {
    const imageScroll = document.querySelector(".image-scroll");
    if (!imageScroll) return;

    // Get all image items
    const imageItems = imageScroll.querySelectorAll(".image-item");
    if (imageItems.length === 0) return;

    // Calculate the total width of all images plus margins
    let totalWidth = 0;
    imageItems.forEach((item) => {
      // Get the actual width including margins
      const style = window.getComputedStyle(item);
      const width =
        item.offsetWidth +
        parseInt(style.marginRight) +
        parseInt(style.marginLeft);
      totalWidth += width;
    });

    // Update the keyframes animation dynamically
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
            @keyframes scrollImages {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-${totalWidth}px + 100vw)); }
            }
            
            .image-scroll {
                display: flex;
                width: fit-content;
                animation: scrollImages 40s linear infinite;
            }
        `;
    document.head.appendChild(styleSheet);
  }

  // Updated function to handle active section tracking during scroll
  function updateActiveSection() {
    // Collect all potential target sections (both .section elements and elements with IDs that match navigation)
    const allTargetSections = [...sections];

    // Add other elements that have IDs matching our navigation links
    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").substring(1); // Remove the # from href
      const targetElement = document.getElementById(targetId);
      if (targetElement && !allTargetSections.includes(targetElement)) {
        allTargetSections.push(targetElement);
      }
    });

    // Find the active section (one that's currently in the viewport)
    let activeSection = null;
    let activePosition = -Infinity;

    allTargetSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const id = section.getAttribute("id");

      // Consider a section "active" if:
      // 1. Its top is above the middle of the viewport (or just below the header), and
      // 2. Its position is lower (more negative) than the currently active section
      if (rect.top <= 200 && rect.top > activePosition) {
        activePosition = rect.top;
        activeSection = section;
      }
    });

    // Update the navigation links
    if (activeSection) {
      const activeId = activeSection.getAttribute("id");

      // Remove active class from all links
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Find matching link and make it active
      navLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href").substring(1); // Remove the # from href
        if (linkTarget === activeId) {
          link.classList.add("active");
        }
      });
    }
  }

  // Calculate what percentage of an element is visible in the viewport
  function getVisiblePercentage(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= windowHeight || rect.bottom <= 0) {
      return 0; // Not visible at all
    }

    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    return Math.min(visibleHeight / rect.height, 1);
  }

  // Initialize scroll animations
  checkInView();

  // Handle navbar style changes based on section background
  function updateNavbarStyle() {
    const navbar = document.querySelector(".navbar");
    const scrollPosition = window.scrollY;

    // Change navbar style based on scroll position
    if (scrollPosition > 100) {
      navbar.style.background = "rgba(38, 38, 38, 0.9)";
    } else {
      navbar.style.background = "#262626";
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Offset for the sticky header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Manually set this link as active when clicked
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // UPDATED FUNCTION: Hide on-this-page during hero section
  function updateOnThisPageContainer() {
    // Get both the container and the inner element
    const onThisPageContainer = document.querySelector(
      ".on-this-page-container"
    );
    const onThisPage = document.querySelector(".on-this-page");

    if (!onThisPageContainer || !onThisPage) return;

    const heroSection = document.querySelector(".case-study-hero");
    const overviewSection = document.querySelector(".overview-container");

    if (heroSection && overviewSection) {
      const heroBottom =
        heroSection.getBoundingClientRect().bottom + window.pageYOffset;
      const scrollPosition = window.pageYOffset;

      // Hide the element when in hero section
      if (scrollPosition < heroBottom - 50) {
        // subtract a small offset for better transition
        onThisPageContainer.style.display = "none"; // Hide the entire container
      } else {
        onThisPageContainer.style.display = "block"; // Show the container after hero
      }
    }

    if (window.innerWidth <= 768) {
      onThisPageContainer.style.display = "none";
    }
  }

  // Listen for scroll events
  window.addEventListener("scroll", () => {
    checkInView();
    updateNavbarStyle();
    updateOnThisPageContainer();
  });

  // Listen for resize events to recheck visibility
  window.addEventListener("resize", () => {
    checkInView();
    updateOnThisPageContainer();
    // Re-setup image scroll on resize
    setupImageScroll();
  });

  // Initial updates
  updateNavbarStyle();
  updateOnThisPageContainer();
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollContent = document.getElementById("scrollContent");
  const deviceFrame = document.getElementById("deviceFrame");
  const progressDots = document.querySelectorAll(".progress-dot");
  const frameHeight = deviceFrame.clientHeight;
  const totalSections = progressDots.length;

  // Create a full-page content item first to ensure proper measurement
  const initialItem = document.createElement("div");
  initialItem.className = "content-item";
  initialItem.style.height = frameHeight + "px"; // Set to frame height initially
  scrollContent.appendChild(initialItem);

  // Using an image to ensure correct loading and dimensions
  const img = new Image();
  img.src = "assets/Desktop - 31.png";

  img.onload = function () {
    // Get natural dimensions of the image
    const imgRatio = img.height / img.width;
    const contentWidth = deviceFrame.clientWidth;

    // Calculate the exact height the image should display at
    // Calculate the height based on the image's aspect ratio
    const sectionHeight = contentWidth * imgRatio;
    // Remove initial item
    scrollContent.removeChild(initialItem);

    // Create content for each section
    for (let i = 0; i < totalSections * 2; i++) {
      // Double the sections for smooth scrolling
      const contentItem = document.createElement("div");
      contentItem.className = "content-item";
      contentItem.style.height = sectionHeight + "px";
      scrollContent.appendChild(contentItem);
    }

    // Set the total height of the scroll content
    scrollContent.style.height = totalSections * 2 * sectionHeight + "px";

    // Variables for scrolling
    let scrollPosition = 0;
    let scrolling = false;
    let autoScrollInterval;
    const scrollSpeed = 1; // Pixels per frame
    let currentSection = 0;
    let totalScrolled = 0;
    const sectionScrollThreshold = sectionHeight * 0.9; // 90% of section height to trigger section change

    // Start auto-scrolling
    startAutoScroll();

    // Auto-scroll function
    function startAutoScroll() {
      if (autoScrollInterval) clearInterval(autoScrollInterval);

      autoScrollInterval = setInterval(function () {
        if (!scrolling) {
          scrollPosition += scrollSpeed;
          totalScrolled += scrollSpeed;

          // When we've scrolled enough to consider it a new section
          if (totalScrolled >= sectionScrollThreshold) {
            totalScrolled = 0;
            currentSection = (currentSection + 1) % totalSections;
            updateProgressDots();
          }

          // Reset scroll position when we reach the end of our duplicated content
          if (scrollPosition >= totalSections * sectionHeight) {
            scrollPosition = 0;
          }

          // Apply the transform
          scrollContent.style.transform = `translateY(-${scrollPosition}px)`;
        }
      }, 30);
    }

    // Update progress dots
    function updateProgressDots() {
      progressDots.forEach((dot, index) => {
        if (index === currentSection) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // Handle progress dot clicks
    progressDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const sectionIndex = parseInt(this.getAttribute("data-section"));
        currentSection = sectionIndex;
        scrollPosition = sectionIndex * sectionHeight;
        totalScrolled = 0;
        scrollContent.style.transform = `translateY(-${scrollPosition}px)`;
        updateProgressDots();
      });
    });
  };
});
document.querySelector(".floating-button").addEventListener("click", () => {});
