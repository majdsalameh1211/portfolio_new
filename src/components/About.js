import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/About.css';

const About = () => {
 const skills = [
  { title: "Programming", items: ["Python", "C", "C++", "C#", "JavaScript", "Dart"] },
  { title: "Frameworks & Libraries", items: ["React", "Next.js", "Flutter", "Unity", "Preact", "JavaFX"] },
  { title: "Systems & Concepts", items: ["AI/ML/DL", "AR/VR Development", "Cloud Computing", "Server-Client Communication", "Cybersecurity", "Data Compression"] },
  { title: "Databases & Backend", items: ["SQL", "NoSQL", "SQLite", "Shared Preferences", "REST APIs", "Firebase"] },
  { title: "Tools & DevOps", items: ["Git", "Linux", "Vercel", "Heroku", "Google Colab", "Google Drive"] },
  { title: "UI/UX & Platforms", items: ["Web Applications", "Mobile Apps", "Simulation GUIs", "Android", "Cross-platform Apps", "Desktop Apps"] },
];


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleDownload = () => {
    const resumePath = "/Majd_Salameh_CV_Graduate.pdf";

    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Majd_Salameh_CV_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="about">

      {/* Introduction Section */}
      <div className="intro">
        <picture>
          <source srcSet={require('../public/pic.jpg')} media="(max-width: 768px)" />
          <img src={require('../public/pic.jpg')} alt="Majd Salameh" className="about-image" />
        </picture>
        <h3 className="about-heading">Majd Salameh – Software Engineer</h3>
      </div>

      {/* Resume Download Button */}
      <div className="resume-container">
        <button className="download-resume-btn" onClick={handleDownload}>
          <span className="emoji">📄</span> Download Resume
        </button>
      </div>

      {/* Professional Intro */}
      <div className="about-container">
        <div className="about-text">
          <p className="about-text">
            I’m <strong>Majd Salameh</strong>, a 25‑year‑old newly graduated <strong>Software Engineer</strong> from <strong>ORT Braude College</strong>. 
            I have hands-on experience from both academic and personal projects in <strong>AI</strong>, <strong>full‑stack</strong>, and <strong>AR/VR development</strong>. 
            My background includes <strong>backend systems</strong> with SQL/NoSQL databases and REST APIs, <strong>mobile development</strong> using Flutter (Dart), and <strong>building and training deep learning models</strong> with cloud‑based pipelines for real‑world applications. 
            I’m passionate about building scalable, efficient, and impactful software—driven by curiosity, innovation, and solving real-world problems.
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2 className="page-title">
          <span className="emoji"></span> My Technical Arsenal
        </h2>

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
