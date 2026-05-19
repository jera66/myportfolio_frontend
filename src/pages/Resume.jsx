import React, { useEffect, useRef, useState } from 'react';
import { Download, Mail, Phone, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { personalInfo, experience, education, skills } from '../mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const RESUME_DOWNLOAD_URL = `${BACKEND_URL}/api/download/resume`;

const Resume = () => {
  const [downloading, setDownloading] = useState(false);

  // Reveal-on-scroll
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const reveal = (delayMs) => ({ animationDelay: `${delayMs}ms` });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Bulletproof download: fetch the streamed PDF as a Blob and trigger a real
  // save-as dialog. Falls back to opening the URL in a new tab if anything
  // goes wrong (e.g. mobile browser blocks blob downloads).
  const handleDownload = async (e) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    try {
      const response = await fetch(RESUME_DOWNLOAD_URL, { mode: 'cors', cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Jerathel-Czerny-Resume.pdf';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Revoke after a tick so the click has time to register
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Resume download failed, opening in a new tab:', err);
      window.open(RESUME_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div ref={sectionRef} className={`min-h-screen py-20 relative overflow-hidden ${isVisible ? 'about-visible' : ''}`} style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Unified theme: drifting radial blobs (navy + burgundy) */}
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full"
           style={{ top: '8%', left: '-120px', width: 460, height: 460,
                    background: 'radial-gradient(circle, rgba(30,58,95,0.30) 0%, rgba(30,58,95,0) 70%)',
                    filter: 'blur(40px)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full"
           style={{ bottom: '5%', right: '-120px', width: 520, height: 520,
                    background: 'radial-gradient(circle, rgba(139,38,53,0.20) 0%, rgba(139,38,53,0) 70%)',
                    filter: 'blur(40px)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-6">
            <div className="about-reveal section-eyebrow" style={reveal(0)} data-testid="resume-eyebrow">Resume</div>
          </div>

          {/* Header with Download Button */}
          <div className="flex justify-between items-start mb-12">
            <div className="about-reveal" style={reveal(120)}>
              <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {personalInfo.name}
              </h1>
              <p className="text-xl font-semibold" style={{ color: 'var(--text-secondary)' }}>{personalInfo.title}</p>
            </div>
            <a
              href={RESUME_DOWNLOAD_URL}
              download="Jerathel-Czerny-Resume.pdf"
              onClick={handleDownload}
              data-testid="resume-download-btn"
              rel="noopener"
              className="about-reveal px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] no-underline select-none"
              style={{
                ...reveal(220),
                backgroundColor: '#8b2635',
                color: '#ffffff',
                boxShadow: '3px 3px 10px rgba(10, 15, 26, 0.4), -3px -3px 10px rgba(155, 54, 69, 0.2)',
                opacity: downloading ? 0.7 : 1,
                pointerEvents: downloading ? 'none' : 'auto'
              }}
            >
              <Download size={20} className={downloading ? 'animate-pulse' : ''} />
              {downloading ? 'Preparing…' : 'Download PDF'}
            </a>
          </div>

          {/* Resume Content */}
          <div className="about-reveal rounded-2xl overflow-hidden section-glass-card" style={reveal(360)}>
            <div className="p-8 md:p-12">
              {/* Contact Information */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(30, 58, 95, 0.2)' }}>
                <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={16} />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <Mail size={16} />
                  <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-[#8b2635] transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <Phone size={16} />
                  <a href={`tel:${personalInfo.phone}`} className="text-sm hover:text-[#8b2635] transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  Professional Summary
                </h2>
                <div className="pl-4" style={{ borderLeft: '4px solid var(--text-secondary)' }}>
                  <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {personalInfo.bio}
                  </p>
                </div>
              </section>

              {/* Employment History */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  Employment History
                </h2>
                <div className="space-y-8">
                  {experience.map((job) => (
                    <div key={job.id} className="relative pl-8" style={{ borderLeft: '2px solid rgba(139, 38, 53, 0.3)' }}>
                      <div className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px]" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
                      <div className="mb-3">
                        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <span className="font-semibold">{job.company}</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {job.period}
                          </span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--text-muted)' }}>
                            <span className="mt-1.5 flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="rounded-lg p-6" style={{
                      backgroundColor: 'var(--bg-section)',
                      boxShadow: 'inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)'
                    }}>
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                        <h3 className="text-lg font-bold uppercase" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h3>
                        <div className="text-sm flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <Calendar size={14} />
                          {edu.period}
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{edu.institution}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{edu.format}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  Skills
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Programming Languages & Frameworks</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.languages.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-lg text-sm"
                          style={{
                            backgroundColor: 'var(--bg-section)',
                            color: 'var(--text-primary)',
                            boxShadow: 'inset 1px 1px 3px var(--shadow-color-1), inset -1px -1px 3px var(--shadow-color-2)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Tools & Libraries</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-lg text-sm"
                          style={{
                            backgroundColor: 'var(--bg-section)',
                            color: 'var(--text-primary)',
                            boxShadow: 'inset 1px 1px 3px var(--shadow-color-1), inset -1px -1px 3px var(--shadow-color-2)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Other Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.otherSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-lg text-sm"
                          style={{
                            backgroundColor: 'var(--bg-section)',
                            color: 'var(--text-primary)',
                            boxShadow: 'inset 1px 1px 3px var(--shadow-color-1), inset -1px -1px 3px var(--shadow-color-2)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Links */}
              <section>
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  Links
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://${personalInfo.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ExternalLink size={16} />
                    Portfolio
                  </a>
                  <a
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ExternalLink size={16} />
                    LinkedIn
                  </a>
                  <a
                    href={`https://${personalInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ExternalLink size={16} />
                    GitHub
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
