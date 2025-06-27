import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "🤖💬 WhatsApp ChatBot",
      description: 
        "A smart WhatsApp chatbot powered by the Green API, designed to streamline " +
        "client interactions and automate messaging workflows. It offers:\n\n" +
        "✅ Automated responses to user queries\n" +
        "✅ Dynamic conversation handling\n" +
        "✅ JSON-based conversation storage\n" +
        "✅ Export functionality to Google Docs or CRM systems\n" +
        "✅ Seamless API integration for extended automation\n\n" +
        "🔹 Technologies Used: Node.js, Express.js, Green API, JSON, Google Docs API",
      link: "https://github.com/majdsalameh1211/WhatsApp-ChatBot-JS-and-GreenAPI-"
    },
    {
      title: "🌿 GoNature – Park Management System",
      description: 
        "GoNature is an intelligent park management system designed for seamless visitor " +
        "reservations and real-time park operations. Built with Java, JavaFX, and SQL, it " +
        "optimizes park workflow with:\n\n" +
        "✅ Multi-user authentication\n" +
        "✅ Real-time reservation management\n" +
        "✅ Waiting list system for full bookings\n" +
        "✅ Automated SMS notifications for approvals\n" +
        "✅ Data-driven reports for park usage and visitor trends 📊\n\n" +
        "🔹 Technologies Used: Java, JavaFX, MySQL, JDBC",
      link: "https://github.com/majdsalameh1211/GoNature"
    },
    
    {
      title: "🌐 Networking - Social Media Web App",
      description: 
        "Networking is a full-stack social media platform that enables users to:\n\n" +
        "✅ Register, log in, and recover passwords\n" +
        "✅ Create posts, like, and comment\n" +
        "✅ Follow and interact with friends\n" +
        "✅ Engage in real-time messaging with WebSockets\n\n" +
        "🔹 Technologies Used: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, WebSockets, JWT Authentication\n" +
        "🔹 Deployment: Hosted on Vercel (Frontend & Backend), database managed with MongoDB Atlas",
      link: "https://github.com/majdsalameh1211/Networking"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Shows 2 projects at a time on larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // Below 768px, adjust to show only 1 project
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="projects" className="projects">
      <h2 className="page-title">🚀 My Key Projects</h2>

      <Slider {...sliderSettings} className="projects-slider">
        {projects.map((project, index) => (
          <div key={index} className="project-slide">
            <div className="project-card">
              <h3>{project.title}</h3>
              {/* Properly format new lines */}
              <p>
                {project.description.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Projects;
