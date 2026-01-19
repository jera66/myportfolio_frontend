import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../mockData';

const Footer = () => {
  return (
    <footer className="border-t py-12" style={{ backgroundColor: 'var(--bg-section)', borderColor: 'rgba(30, 58, 95, 0.3)' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Jerathel Czerny
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Front End Developer crafting beautiful, functional web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="transition-colors text-sm" style={{ color: 'var(--text-muted)' }}>
                  About
                </a>
              </li>
              <li>
                <a href="/#projects" className="transition-colors text-sm" style={{ color: 'var(--text-muted)' }}>
                  Projects
                </a>
              </li>
              <li>
                <a href="/resume" className="transition-colors text-sm" style={{ color: 'var(--text-muted)' }}>
                  Resume
                </a>
              </li>
              <li>
                <a href="/#contact" className="transition-colors text-sm" style={{ color: 'var(--text-muted)' }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Connect</h4>
            <div className="space-y-3 mb-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="transition-colors text-sm block"
                style={{ color: 'var(--text-muted)' }}
              >
                {personalInfo.email}
              </a>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{personalInfo.phone}</p>
            </div>
            <div className="flex space-x-4">
              <a
                href={`https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Github"
              >
                <Github size={20} />
              </a>
              <a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-8 text-center" style={{ borderColor: 'rgba(30, 58, 95, 0.3)' }}>
          <p className="text-sm flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Jerathel Czerny. Built with
            <Heart size={14} className="text-[#8b2635] fill-[#8b2635]" />
            and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
