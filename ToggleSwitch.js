import { useState } from "react";

// Toggle Switch Component
const ToggleSwitch = () => {
  const [activeTab, setActiveTab] = useState("Case Studies");
  return (
    <div className="flex justify-center mt-4">
      <div className="relative flex bg-[#292929] rounded-[50px] p-1 w-[1404px] h-[57px]">
        <button
          className={`flex-1 flex items-center justify-center rounded-[46px] transition-all duration-300 text-white ${
            activeTab === "Case Studies" ? "bg-[#090909]" : "text-[#949494]"
          }`}
          onClick={() => setActiveTab("Case Studies")}
        >
          Case Studies
        </button>
        <button
          className={`flex-1 flex items-center justify-center rounded-[46px] transition-all duration-300 ${
            activeTab === "UI Design" ? "bg-[#090909] text-white" : "text-[#949494]"
          }`}
          onClick={() => setActiveTab("UI Design")}
        >
          UI Design
        </button>
      </div>
    </div>
  );
};

// Portfolio Page Component
const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="px-12 py-4 flex justify-between items-center fixed w-full top-0 z-50 bg-black/10 backdrop-blur-sm">
        <div className="text-xl font-light tracking-wider">ENGY</div>
        <div className="flex items-center">
          {["Work", "About", "Resume", "Contact"].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="ml-8 text-[20px] opacity-60 hover:opacity-100 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-8 pt-24 pb-16">
        <div
          className="absolute inset-0 rounded-[50px] mx-4 overflow-hidden"
          style={{
            backgroundImage: 'url("/path-to-your-gradient.gif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-5xl font-['Almarai'] leading-tight mb-32 max-w-4xl">
            ENGY IS A PRODUCT DESIGNER
            <br />
            SPECIALIZING IN CRAFTING ENGAGING INTERFACES
            <br />
            THAT DRIVE RESULTS.
          </h1>

          <div className="flex justify-between items-center mt-16">
            <div className="text-[#6E6E6E] text-sm">+2 YRS OF DESIGN EXPERIENCE</div>
            <div className="text-[#6E6E6E] text-sm">Based in Egypt</div>
            <div className="text-[#6E6E6E] text-sm">Creating With Purpose.</div>
          </div>
        </div>
      </div>

      {/* Toggle Section */}
      <div className="px-8">
        <ToggleSwitch />
      </div>

      {/* Reading Time */}
      <div className="px-8 mt-6 opacity-52 text-[#272727]">5 mins read</div>

      {/* Case Studies */}
      <div className="px-8 mt-8 space-y-8">
        <div className="bg-[#090909] rounded-2xl p-6 opacity-50 hover:opacity-100 transition-all">
          <img
            src="/api/placeholder/1200/600"
            alt="Case Study Preview"
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h3 className="text-2xl mb-2">End-to-End Redesign of Isekai Code's Landing Page</h3>
          <p className="text-[#6E6E6E]">
            The redesign significantly boosted business performance, profitability, and engagement.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-12 py-6 border-t border-[#292929] mt-16">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#6E6E6E]">© 2024 Engy</div>
          <div className="flex gap-4">
            <a href="#" className="text-[#6E6E6E] hover:text-white">
              Email
            </a>
            <a href="#" className="text-[#6E6E6E] hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;
