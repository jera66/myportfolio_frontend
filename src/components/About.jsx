import React from 'react'
import { Code2, Rocket, Users, Zap } from 'lucide-react'
import { personalInfo } from '../mockData'

const About = () => {
  const highlights = [
    {
      icon: <Code2 size={32} />,
      title: 'Clean Code',
      description:
        'Writing maintainable, efficient code following best practices and modern standards.'
    },
    {
      icon: <Rocket size={32} />,
      title: 'Performance',
      description:
        'Optimizing web applications for speed, accessibility, and seamless user experience.'
    },
    {
      icon: <Users size={32} />,
      title: 'Collaboration',
      description:
        'Working effectively with designers and project managers in agile workflows.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Responsive Design',
      description:
        'Building mobile-first, responsive interfaces that work perfectly on all devices.'
    }
  ]

  return (
    <section
      id='about'
      className='py-20 relative'
      style={{ backgroundColor: 'var(--bg-section)' }}
    >
      <div className='container mx-auto px-6'>
        <div className='max-w-6xl mx-auto'>
          {/* Section Header */}
          <div className='text-center mb-16'>
            <h2
              className='text-4xl md:text-5xl font-bold mb-4'
              style={{ color: 'var(--text-primary)' }}
            >
              About Me
            </h2>
            <div
              className='w-24 h-1 mx-auto rounded-full'
              style={{ backgroundColor: 'var(--text-secondary)' }}
            ></div>
          </div>

          {/* Content */}
          <div className='max-w-4xl mx-auto mb-16'>
            <h3
              className='text-2xl font-bold mb-6 text-center'
              style={{ color: 'var(--text-primary)' }}
            >
              Crafting Digital Experiences
            </h3>
            <div
              className='space-y-6 leading-relaxed text-center'
              style={{ color: 'var(--text-muted)' }}
            >
              <p>
                Full‑stack software developer with 5+ years of experience
                building scalable, high‑performance applications across modern
                web, mobile, and backend ecosystems. I specialize in designing
                clean architectures, developing reliable APIs, and crafting
                intuitive, responsive user interfaces that deliver real business
                value. I bring strong engineering fundamentals, a
                product‑focused mindset, and a track record of owning features
                end‑to‑end—from planning and architecture to implementation,
                testing, deployment, and long‑term maintenance. I thrive in
                collaborative environments, work seamlessly with designers and
                stakeholders, and write clean, maintainable code that scales
                with the product. I’m passionate about performance,
                accessibility, automation, and building systems that are robust,
                secure, and easy to evolve. Whether improving an existing
                codebase or architecting something new, I focus on clarity,
                reliability, and delivering solutions that make teams faster and
                users happier. With expertise in React, JavaScript, HTML5, CSS3,
                WordPress/PHP, java, and C#. I transform ideas into functional,
                beautiful web applications that users love. My approach combines
                technical excellence with user-centric design, ensuring every
                project delivers measurable business impact.
              </p>
            </div>
         
            {/* Highlights */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className='rounded-xl p-6 transition-all duration-300 group'
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    boxShadow:
                      '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                  }}
                >
                  <div
                    className='mb-4 group-hover:scale-110 transition-transform'
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.icon}
                  </div>
                  <h4
                    className='font-semibold mb-2'
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className='text-sm leading-relaxed'
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
