import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/About.css';

const About = () => {
  const skills = [
    { title: "Programming", items: ["C", "C#", "C++", "JavaScript", "Python"] },
    { title: "Systems", items: ["ML/DL", "Data Mining", "Cloud Computing", "Server-Client Communication"] },
    { title: "Databases", items: ["SQL", "NoSQL"] },
    { title: "Tools", items: ["Git", "Linux", "Vercel", "Heroku"] },
    { title: "Frameworks", items: ["React", "Next.js", "Preact", "JavaFX"] },
    { title: "UI/UX", items: ["Web", "GUI", "Android"] },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Show 2 skills per row on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // Below 768px, show only 1 skill at a time
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleDownload = () => {
    // Path to the resume file inside the public folder
    const resumePath = "/Majd_Salameh_CV_Graduate.pdf"; // No need for process.env.PUBLIC_URL

    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Majd_Salameh_CV_2025.pdf"; // Rename file when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="about">
      

      {/* ✅ Introduction */}
      <div className="intro">
        {/* ✅ Show image on small screens */}
        <picture>
          <source srcSet={require('../public/pic.jpg')} media="(max-width: 768px)" />
          <img src={require('../public/pic.jpg')} alt="Majd Salameh" className="about-image" />
        </picture>
        <h3 className="about-heading">Majd Salameh – Software Engineer in the Making</h3>
      </div>

      <div className="resume-container">
          <button className="download-resume-btn" onClick={handleDownload}>
            📄 Download Resume
          </button>
        </div>
      


      <div className="about-container">
        <div className="about-text">
        <p className="about-text">
          Hello, I’m <strong>Majd Salameh</strong>, a dedicated <strong>Software Engineering student</strong> in my final year at <strong>Braude College</strong>.
          Passionate about <strong>building scalable, efficient, and impactful software</strong>, I specialize in <strong>full-stack development, deep learning, and system optimization</strong>.
          My journey in software engineering is fueled by curiosity, innovation, and the drive to solve real-world problems.
        </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2 className="page-title">💻 My Technical Arsenal</h2>

        <Slider {...sliderSettings}>
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.title}</h3>
              <ul>
                {skill.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default About;
