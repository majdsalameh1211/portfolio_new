import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Projects.css';

const Projects = () => {
 const projects = [
  {
    title: "WhatsApp ChatBot",
    description:
      "A smart chatbot for WhatsApp using Green API to automate user communication. Features include dynamic responses, JSON-based conversation storage, export to Google Docs or CRM systems, and seamless API integration for automation workflows.\n\n" +
      "Technologies Used: Node.js, Express.js, Green API, Google Docs API",
    link: "https://github.com/majdsalameh1211/WhatsApp-ChatBot-JS-and-GreenAPI-"
  },
  {
    title: "Android Development Projects (Flutter)",
    description:
      "A collection of mobile apps built with Flutter, focusing on design, user interaction, and backend integration. Projects include a kids book reader with age grouping, dark mode, and animation, and a Firebase demo app with phone authentication and modular navigation.\n\n" +
      "Technologies Used: Flutter, Dart, Firebase, Material Design",
    link: "https://github.com/majdsalameh1211/Android_Course/tree/main"
  },
  {
    title: "GoNature – Park Management System",
    description:
      "A full-stack system for managing reservations, visitor access, and park operations. Key features include multi-user authentication, real-time booking and waiting lists, SMS alerts for approvals, and reports for monitoring park activity and traffic.\n\n" +
      "Technologies Used: Java, JavaFX, MySQL, JDBC",
    link: "https://github.com/majdsalameh1211/GoNature"
  },
  {
    title: "Networking – Social Media Platform",
    description:
      "A complete social media web application with authentication, real-time messaging, and post interaction. Includes login, password recovery, content sharing, following system, WebSocket-based chat, and is deployed with cloud-based tools for scalability.\n\n" +
      "Technologies Used: React, Tailwind, Node.js, Express, MongoDB, WebSockets, JWT",
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
      <h2 className="page-title"> My Key Projects</h2>

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
