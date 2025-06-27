import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Contact.css';

const Contact = () => {


  return (
    <section id="contact" className="contact">
      
      {/* 🎯 My Vision & Career Goals Section */}
      <div className="career-goals">
        <h3>🎯 My Vision & Career Goals</h3>
        <p>
          I’m eager to step into the <strong>tech industry</strong>, contribute to <strong>innovative projects</strong>,
          and work alongside <strong>skilled professionals</strong>. Whether it’s <strong>software development</strong>,
          <strong>AI-driven solutions</strong>, or <strong>system optimization</strong>, I’m ready to make an impact.
        </p>
      </div>

      {/* 🔗 Contact & Resume Section */}
      <div className="contact-section">
        <h2 className="page-title">🔗 Let’s Connect & Build Something Great!</h2>
{/*
        <div className="resume-container">
          <button className="download-resume-btn" onClick={handleDownload}>
            📄 Download Resume
          </button>
        </div>

*/}
      </div>

      {/* 📩 Contact Information */}
      <div className="contact-info">
        <p>📩 <strong>Email:</strong> majdsalameh9@gmail.com</p>
        <p>🌐 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/majd-salameh-96745524b/" target="_blank" rel="noopener noreferrer">Visit My Profile</a></p>
        <p>💻 <strong>GitHub:</strong> <a href="https://github.com/majdsalameh1211" target="_blank" rel="noopener noreferrer">Explore My Work</a></p>
      </div>

    </section>
  );
};

export default Contact;
