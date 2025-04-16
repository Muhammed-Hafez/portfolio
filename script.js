document.addEventListener("DOMContentLoaded", () => {
  const caseStudiesBtn = document.getElementById("case-studies");
  const uiDesignBtn = document.getElementById("ui-design");
  const portfolioSection = document.getElementById("portfolio-section");
  const uiDesignSection = document.getElementById("ui-design-section");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const logo = document.querySelector(".logo");

  // Hamburger Menu Functionality
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

  let currentView = "case-studies"; // Track current view

  if (!caseStudiesBtn || !uiDesignBtn || !portfolioSection) {
    console.error("One or more elements not found. Check IDs in HTML.");
    return;
  }

  showCaseStudies();

  function updatePortfolio(content) {
    portfolioSection.innerHTML = content;
    // Ensure images are properly loaded
    const images = portfolioSection.querySelectorAll("img");
    images.forEach((img) => {
      img.style.opacity = "0"; // Initially hide
      img.onload = () => {
        img.style.opacity = "1"; // Show when loaded
      };
    });

    // Only apply shadow effect when in case studies mode
    if (currentView === "case-studies") {
      applyShadowEffect();
    }
  }

  function showCaseStudies() {
    currentView = "case-studies";
    caseStudiesBtn.classList.add("active");
    uiDesignBtn.classList.remove("active");

    // Show case studies section and hide UI design section
    portfolioSection.style.display = "flex";
    const uiSection = document.getElementById("ui-design-section");
    if (uiDesignSection) uiDesignSection.style.display = "none";

    updatePortfolio(`
            <a href="case-study-1.html" style="text-decoration: none; color: inherit;">
                <div class="case-study-card">
                    <div class="case-study-image-container">
                        <div class="read-time">5 mins read</div>
                        <div class="case-study-image">
                            <img src="assets/MacBook13.png" alt="Case Study Preview" style="transition: opacity 0.3s ease;">
                        </div>
                    </div>
                    <div class="case-study-content">
                        <h3 class="case-study-title">End-to-End Redesign of Isekai Code's Landing Page</h3>
                        <p class="case-study-description">The redesign significantly boosted business performance, profitability, and engagement.</p>
                        <span class="case-study-tag">UX/UI Case Study</span>
                    </div>
                </div>
            </a>
            
            <a href="case-study-2.html" style="text-decoration: none; color: inherit;">
                <div class="case-study-card">
                    <div class="case-study-image-container">
                        <div class="read-time">7 mins read</div>
                        <div class="case-study-image">
                            <img src="assets/desktop15.png" alt="Case Study Preview" style="transition: opacity 0.3s ease;">
                        </div>
                    </div>
                    <div class="case-study-content">
                        <h3 class="case-study-title">Leading the Design of Learn2Earn SaaS Project</h3>
                        <p class="case-study-description">Redefining user engagement by designing an intuitive platform that motivates learning.</p>
                        <span class="case-study-tag">UX/UI Case Study</span>
                    </div>
                </div>
            </a>
            
            <a href="case-study-3.html" style="text-decoration: none; color: inherit;">
                <div class="case-study-card">
                    <div class="case-study-image-container">
                        <div class="read-time">4 mins read</div>
                        <div class="case-study-image">
                            <img src="assets/Frame 3.png" alt="Case Study Preview" style="transition: opacity 0.3s ease;">
                        </div>
                    </div>
                    <div class="case-study-content">
                        <h3 class="case-study-title">Supporting the Design of an Engaging IsekaiClinic SaaS Solution</h3>
                        <p class="case-study-description">Worked closely with a cross-functional team to craft intuitive interfaces and improve user experiences.</p>
                        <span class="case-study-tag">UX/UI Case Study</span>
                    </div>
                </div>
            </a>
        `);
  }

  function showUIDesign() {
    currentView = "ui-design";
    uiDesignBtn.classList.add("active");
    caseStudiesBtn.classList.remove("active");
    // Hide portfolio section completely
    portfolioSection.style.display = "none";

    // Create or show UI design section
    let uiSection = document.getElementById("ui-design-section");
    if (!uiSection) {
      uiSection = document.createElement("div");
      uiSection.id = "ui-design-section";
      document.body.insertBefore(uiSection, portfolioSection.nextSibling);
    }
    uiSection.style.display = "block";

    // Create a style element to override any CSS hover effects
    const styleEl = document.createElement("style");
    styleEl.id = "ui-design-style-override";
    styleEl.textContent = `
            .grid-item, .grid-item img {
                transition: none !important;
                transform: none !important;
                box-shadow: none !important;
                opacity: 1 !important;
                filter: none !important;
                -webkit-filter: none !important;
            }
            .grid-item:hover, .grid-item:hover img {
                transition: none !important;
                transform: none !important;
                box-shadow: none !important;
                opacity: 1 !important;
                filter: none !important;
                -webkit-filter: none !important;
            }
        `;
    document.head.appendChild(styleEl);

    updatePortfolio(`
            <div class="grid-container">
                <!-- Restaurant Menu Project -->
                <div class="grid-item">
                    <img src="assets/Desktop - 27 1.png" alt="Restaurant menu UI design">
                </div>
                
                <!-- Construction Website -->
                <div class="grid-item">
                    <img src="assets/Desktop - 29.png" alt="Construction company website">
                </div>
                
                <!-- Beverage Product Page -->
                <div class="grid-item">
                    <img src="assets/0.png" alt="Beverage product page">
                </div>
                
                <!-- Dashboard UI -->
                <div class="grid-item">
                    <img src="assets/Dashboard 1.0.png" alt="Analytics dashboard UI">
                </div>
                
                <!-- Fashion E-commerce -->
                <div class="grid-item">
                    <img src="assets/iPhone 15 Pro.png" alt="Fashion e-commerce website">
                </div>
                
                <!-- Mobile App Screens -->
                <div class="grid-item">
                    <img src="assets/Desktop - 9.png" alt="Mobile app screens">
                </div>
                
                <!-- Watch Product Page -->
                <div class="grid-item">
                    <img src="assets/Nokia XR21.png" alt="Watch product page">
                </div>
                
                <!-- Customer Management UI -->
                <div class="grid-item">
                    <img src="assets/customers 1.png" alt="Customer management interface">
                </div>
                
                <!-- Login/Signup Form -->
                <div class="grid-item">
                    <img src="assets/Register.jpg" alt="Account creation form">
                </div>
                
                <!-- Interior Design Website -->
                <div class="grid-item">
                    <img src="assets/Frame 31.png" alt="Interior design website">
                </div>
                
                <!-- Food Delivery Banner -->
                <div class="grid-item">
                    <img src="assets/Desktop - 28 1.png" alt="Food delivery banner">
                </div>
                
                <!-- Textile Collection Page -->
                <div class="grid-item">
                    <img src="assets/Frame 427320261.png" alt="Textile collection webpage">
                </div>

                <!-- Textile Collection Page -->
                <div class="grid-item">
                    <img src="assets/Frame 427320265.png" alt="Textile collection webpage">
                </div>

                <!-- Textile Collection Page -->
                <div class="grid-item">
                </div>

                <!-- Textile Collection Page -->
                <div class="grid-item">
                    <img src="assets/Frame 427320262.png" alt="Textile collection webpage">
                </div>
            </div>
        `);
  }

  caseStudiesBtn.addEventListener("click", () => {
    // Remove the UI design style override if it exists
    const styleOverride = document.getElementById("ui-design-style-override");
    if (styleOverride) {
      styleOverride.remove();
    }
    showCaseStudies();
  });

  uiDesignBtn.addEventListener("click", showUIDesign);

  function applyShadowEffect() {
    const caseStudyImages = document.querySelectorAll(
      ".case-study-image-container"
    );

    caseStudyImages.forEach((container) => {
      const image = container.querySelector(".case-study-image");

      if (!image) return;

      container.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const shadowX = 10 * (0.5 - x);
        const shadowY = 10 * (0.5 - y);
        const purpleShadow = `${shadowX}px ${shadowY}px 5px  rgba(212, 212, 212, 0.19)`;
        const blackShadow = `0 0 100px rgba(0, 0, 0, 0.5)`;

        container.style.boxShadow = `${purpleShadow}, ${blackShadow}`;
      });

      container.addEventListener("mouseleave", () => {
        // Keep the last shadow instead of resetting it
        container.style.boxShadow = `0 0 5px rgba(212, 212, 212, 0.19), 0 0 100px rgba(0, 0, 0, 0.5)`;
      });
    });
  }

  function adjustFontSizes() {
    const screenWidth = window.innerWidth;
    const heroTitle = document.querySelector(".hero-section h1");
    const heroSection = document.querySelector(".hero-section");
    const caseStudyTitles = document.querySelectorAll(".case-study-title");
    const caseStudyDescriptions = document.querySelectorAll(
      ".case-study-description"
    );

    // if (screenWidth <= 768) {
    //     // Adjust hero section height and positioning
    //     if (heroSection) {
    //         heroSection.style.height = '10vh';
    //         heroSection.style.minHeight = '500px';
    //         heroSection.style.padding = '100px 20px';
    //         heroSection.style.borderRadius = '40px';
    //     }

    //     // Adjust hero title and info positioning
    //     if (heroTitle) {
    //         heroTitle.style.position = 'absolute';
    //         heroTitle.style.top = '70%';
    //         heroTitle.style.transform = 'translateY(-50%)';
    //         heroTitle.style.fontSize = '24px';
    //     }

    //     const heroInfo = document.querySelector('.hero-info');
    //     if (heroInfo) {
    //         heroInfo.style.position = 'absolute';
    //         heroInfo.style.bottom = '-40px';
    //         heroInfo.style.left = '20px';
    //         heroInfo.style.flexDirection = 'column';
    //         heroInfo.style.gap = '10px';
    //     }

    //     // Adjust portfolio section
    //     const portfolioSection = document.getElementById('portfolio-section');
    //     if (portfolioSection) {
    //         portfolioSection.style.transform = 'scale(1)';
    //         portfolioSection.style.marginTop = '30px';
    //         portfolioSection.style.marginBottom = '0';
    //     }

    //     // Adjust case study titles and descriptions
    //     caseStudyTitles.forEach(title => {
    //         title.style.fontSize = '1.3rem';
    //     });

    //     caseStudyDescriptions.forEach(desc => {
    //         desc.style.fontSize = '1rem';
    //     });
    // } else {
    //     // Reset styles for larger screens
    //     if (heroSection) {
    //         heroSection.style.height = '400px';
    //         heroSection.style.minHeight = 'auto';
    //         heroSection.style.padding = '150px 50px';
    //     }

    //     if (heroTitle) {
    //         heroTitle.style.position = 'absolute';
    //         heroTitle.style.top = '250px';
    //         heroTitle.style.transform = 'none';
    //         heroTitle.style.fontSize = '43px';
    //     }

    //     const heroInfo = document.querySelector('.hero-info');
    //     if (heroInfo) {
    //         heroInfo.style.position = 'absolute';
    //         heroInfo.style.top = '530px';
    //         heroInfo.style.left = '32px';
    //         heroInfo.style.flexDirection = 'row';
    //         heroInfo.style.gap = '283px';
    //     }

    //     const portfolioSection = document.getElementById('portfolio-section');
    //     if (portfolioSection) {
    //         portfolioSection.style.transform = 'scale(0.63)';
    //         portfolioSection.style.marginTop = '100px';
    //         portfolioSection.style.marginBottom = '-880px';
    //     }

    //     // Reset case study titles and descriptions
    //     caseStudyTitles.forEach(title => {
    //         title.style.fontSize = '1.70rem';
    //     });

    //     caseStudyDescriptions.forEach(desc => {
    //         desc.style.fontSize = '1.2rem';
    //     });
    // }
  }

  // Call on page load and resize
  adjustFontSizes();
  window.addEventListener("resize", adjustFontSizes);
});

// When the page loads, check if there's a hash in the URL and scroll to it
document.addEventListener("DOMContentLoaded", () => {
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
