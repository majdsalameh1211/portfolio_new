import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import Sun and Moon icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Header.css';

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [activeThemeButton, setActiveThemeButton] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      document.body.className = newTheme ? 'dark-theme' : 'light-theme';
      setActiveThemeButton(true); // Activate border for the theme button
      return newTheme;
    });

    // Remove border from theme button after a short delay
    setTimeout(() => {
      setActiveThemeButton(false);
    }, 2000);
  };

  // Handle scroll event and detect the active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["about", "projects", "contact"];
      let currentSection = activeSection;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = section;
          }
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(section);
    }
  };

  return (
    <header
      className={`header ${isScrolled ? 'scrolled' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="header-content">
        {(!isScrolled || isHovered) && (
          <>
            <img
              src={require('../public/pic.jpg')}
              alt="Majd Salameh"
              className="header-image"
            />
            <div className="header-text">
              <h3>Majd Salameh</h3>
              <li>Software Engineering Student</li>
            </div>
          </>
        )}
        <nav>
          <ul>
            <li>
              <a
                href="#about"
                className={activeSection === "about" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("about");
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeSection === "projects" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("projects");
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === "contact" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        {/* Theme Toggle Button with Sun & Moon Icons */}
        <button
          className={`theme-toggle ${activeThemeButton ? "active" : ""}`}
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
