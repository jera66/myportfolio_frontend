import React, { useEffect, useRef, useState } from 'react'
import {
  Code2,
  Rocket,
  Users,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Share2
} from 'lucide-react'
import { personalInfo } from '../mockData'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [socialExpanded, setSocialExpanded] = useState(false)
  const sectionRef = useRef(null)
  const skillsContainerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const highlights = [
    {
      icon: <Code2 size={24} />,
      title: 'Clean Code',
      description:
        'Writing maintainable, efficient code following best practices',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Rocket size={24} />,
      title: 'Performance First',
      description: 'Optimizing for speed, accessibility, and user experience',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Users size={24} />,
      title: 'Team Player',
      description: 'Collaborating seamlessly in agile environments',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <Zap size={24} />,
      title: 'Adaptive Design',
      description: 'Building responsive interfaces that work everywhere',
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  const skills = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'HTML5',
    'CSS3',
    'WordPress',
    'PHP',
    'Java',
    'C#',
    'REST APIs',
    'Git'
  ]

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      url: personalInfo?.github,
      color: '#333'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      url: personalInfo?.linkedin,
      color: '#0077b5'
    },
    {
      icon: <Twitter size={20} />,
      label: 'Twitter',
      url: personalInfo?.twitter,
      color: '#1da1f2'
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      url: `mailto:${personalInfo?.email}`,
      color: '#ea4335'
    }
  ]

  return (
    <section
      id='about'
      ref={sectionRef}
      className='py-32 relative overflow-hidden'
      style={{ backgroundColor: 'var(--bg-section)' }}
    >
      {/* Animated gradient mesh background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl animate-blob'></div>
        <div className='absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-pink-600/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-6xl mx-auto'>
          {/* Header with decorative line */}
          <div
            className={`mb-24 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='flex items-center gap-4 mb-6'>
              <div
                className='h-1 w-12 rounded-full'
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                }}
              ></div>
              <span
                className='text-sm font-semibold uppercase tracking-widest'
                style={{ color: '#1e3a8a' }}
              >
                About Me
              </span>
            </div>
            <h2
              className='text-6xl md:text-7xl font-black leading-tight'
              style={{ color: '#1e3a8a' }}
            >
              Crafting{' '}
              <span
                style={{
                  background:
                    'linear-gradient(120deg, #3b82f6, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Digital
              </span>
              <br />
              Experiences
            </h2>
          </div>

          {/* Main Content Grid */}
          <div
            className={`grid lg:grid-cols-3 gap-16 mb-24 transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Left Column - Bio */}
            <div className='lg:col-span-2 space-y-8'>
              <div className='space-y-6'>
                <p
                  className='text-lg leading-relaxed'
                  style={{ color: '#1e3a8a' }}
                >
                  I'm a{' '}
                  <strong style={{ color: '#1e3a8a' }}>
                    full-stack software developer
                  </strong>{' '}
                  with <strong style={{ color: '#1e3a8a' }}>5+ years</strong> of
                  experience building scalable, high-performance applications
                  across web, mobile, and backend ecosystems.
                </p>

                <p
                  className='text-lg leading-relaxed'
                  style={{ color: '#1e3a8a' }}
                >
                  I specialize in designing clean architectures, developing
                  reliable APIs, and crafting intuitive, responsive user
                  interfaces that deliver real business value. My focus is on{' '}
                  <strong style={{ color: '#1e3a8a' }}>
                    performance, accessibility, and code quality
                  </strong>
                  .
                </p>

                <p
                  className='text-lg leading-relaxed'
                  style={{ color: '#1e3a8a' }}
                >
                  I thrive in collaborative environments, work seamlessly with
                  designers and stakeholders, and write code that scales with
                  your product. I'm passionate about building systems that are{' '}
                  <strong style={{ color: '#1e3a8a' }}>
                    robust, secure, and easy to evolve
                  </strong>
                  .
                </p>
              </div>

              {/* Stats Row */}
              <div className='grid grid-cols-3 gap-4 pt-8'>
                {[
                  { label: 'Years Exp.', value: '5+' },
                  { label: 'Projects', value: '50+' },
                  { label: 'Happy Clients', value: '30+' }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className='p-6 rounded-2xl transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      boxShadow:
                        '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                    }}
                  >
                    <div
                      className='text-3xl font-bold mb-2'
                      style={{ color: '#1e3a8a' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className='text-xs uppercase tracking-wider'
                      style={{ color: '#1e3a8a' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Expandable Social Icons */}
            <div className='flex justify-start lg:justify-center items-start pt-4'>
              <div
                className='relative'
                onMouseEnter={() => setSocialExpanded(true)}
                onMouseLeave={() => setSocialExpanded(false)}
              >
                {/* Main Trigger Icon */}
                <div
                  className='w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 relative z-20'
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    boxShadow: '0 4px 20px rgba(30, 58, 138, 0.3)',
                    border: '2px solid #3b82f6'
                  }}
                >
                  <Share2 size={28} style={{ color: '#1e3a8a' }} />
                </div>

                {/* Expanded Social Icons in Fan Pattern */}
                {socialLinks.map((social, idx) => {
                  const angle = idx * 45 - 67.5 // Spread icons in a cone/fan pattern
                  const radius = 110 // Distance from center
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius

                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-125 z-10'
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        boxShadow: '0 2px 15px rgba(0,0,0,0.2)',
                        border: `2px solid ${social.color}`,
                        transform: socialExpanded
                          ? `translate(${x}px, ${y}px) scale(1)`
                          : `translate(0, 0) scale(0)`,
                        opacity: socialExpanded ? 1 : 0,
                        transitionDelay: socialExpanded
                          ? `${idx * 50}ms`
                          : '0ms'
                      }}
                      aria-label={social.label}
                    >
                      <div style={{ color: social.color }}>{social.icon}</div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div
            className={`mb-24 transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3
              className='text-2xl font-bold mb-12'
              style={{ color: '#1e3a8a' }}
            >
              What I Bring
            </h3>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className='group relative rounded-2xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden'
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    boxShadow:
                      '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className='relative'>
                    <div
                      className='mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300'
                      style={{
                        color: '#1e3a8a'
                      }}
                    >
                      {item.icon}
                    </div>
                    <h4
                      className='font-bold mb-3 text-lg'
                      style={{ color: '#1e3a8a' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className='text-sm leading-relaxed'
                      style={{ color: '#1e3a8a', opacity: 0.8 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            ref={skillsContainerRef}
          >
            <h3
              className='text-2xl font-bold mb-12'
              style={{ color: '#1e3a8a' }}
            >
              Tech Stack
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className='relative group'
                  onMouseEnter={() => setHoveredSkill(idx)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className='px-6 py-4 rounded-xl text-center text-sm font-semibold transition-all duration-300 cursor-default'
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      color: '#1e3a8a',
                      boxShadow:
                        '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)',
                      transform:
                        hoveredSkill === idx
                          ? 'translateY(-8px) scale(1.05)'
                          : 'translateY(0)'
                    }}
                  >
                    {skill}
                  </div>
                  {/* Floating dot on hover */}
                  <div
                    className='absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-0 transition-opacity'
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      opacity: hoveredSkill === idx ? 1 : 0
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default About
