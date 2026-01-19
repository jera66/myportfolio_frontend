import React, { useEffect } from 'react';
import { Download, Mail, Phone, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { personalInfo, experience, education, skills } from '../mockData';

const Resume = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    // Download the PDF with a clean filename
    const pdfUrl = 'Jerathel-Czerny-Resume.pdf';
    
    // Create a temporary link to download with custom filename
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Jerathel-Czerny-Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with Download Button */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {personalInfo.name}
              </h1>
              <p className="text-xl font-semibold" style={{ color: 'var(--text-secondary)' }}>{personalInfo.title}</p>
            </div>
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: '#8b2635',
                color: '#ffffff',
                boxShadow: '3px 3px 10px rgba(10, 15, 26, 0.4), -3px -3px 10px rgba(155, 54, 69, 0.2)'
              }}
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>

          {/* Resume Content */}
          <div className="rounded-2xl overflow-hidden" style={{
            backgroundColor: 'var(--bg-card)',
            boxShadow: '4px 4px 16px var(--shadow-color-1), -4px -4px 16px var(--shadow-color-2)'
          }}>
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
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Design & Methodologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.design.map((skill, index) => (
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
