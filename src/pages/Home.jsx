import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BackToTop from '../components/BackToTop';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <BackToTop />
    </div>
  );
};

export default Home;
