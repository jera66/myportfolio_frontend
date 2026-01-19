import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
          <Footer />
          <Analytics />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
