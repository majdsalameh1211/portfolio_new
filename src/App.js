import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import FinalProject from './components/FinalProject';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <FinalProject />   
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
