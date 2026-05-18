/**
 * About Component — fancier redesign with parallax + typewriter + count-up
 *
 * Highlights:
 * - Subtle parallax-shifted background photo
 * - Animated radial blobs (navy + burgundy)
 * - Glassmorphism bio card with animated gradient border
 * - Terminal code window that types itself out on first view
 * - Stats row with animated count-up
 * - Cards match the section background (no white standout in light mode)
 * - Smooth keyframe fade-in (parent class triggers staggered animation-delay)
 * - Expandable cone/fan social FAB with pulsing accent ring (theme-aware GitHub)
 */

import React, { useEffect, useRef, useState } from 'react';
import { Code2, Rocket, Users, Zap, Share2, X, Facebook, Instagram, Linkedin, Github } from 'lucide-react';
import { personalInfo } from '../mockData';

// GitHub uses var(--text-primary) so it's visible in both themes.
const SOCIAL_LINKS = [
  { name: 'Facebook',  icon: Facebook,  url: 'https://www.facebook.com/jerathel.czerny',             color: '#1877F2' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/cufflinks35/',               color: '#E1306C' },
  { name: 'LinkedIn',  icon: Linkedin,  url: 'https://www.linkedin.com/in/jerathel-czerny-323132163/', color: '#0A66C2' },
  { name: 'GitHub',    icon: Github,    url: 'https://github.com/jera66',                            color: 'var(--text-primary)' }
];

const HIGHLIGHTS = [
  { icon: <Code2 size={28} />,  title: 'Clean Code',    description: 'Maintainable, efficient code following modern best practices.' },
  { icon: <Rocket size={28} />, title: 'Performance',   description: 'Optimizing applications for speed, scale, and reliability.' },
  { icon: <Users size={28} />,  title: 'Collaboration', description: 'Working effectively with designers, PMs, and engineers.' },
  { icon: <Zap size={28} />,    title: 'Architecture',  description: 'Designing modular, testable, cloud-native systems.' }
];

const STATS = [
  { target: 5,   suffix: '+',  label: 'Years Experience' },
  { target: 30,  suffix: '+',  label: 'Projects Delivered' },
  { target: 12,  suffix: '+',  label: 'Technologies' },
  { target: 100, suffix: '%',  label: 'Commitment' }
];

// Lines of the "typed" terminal output. Each entry is one line.
// Using arrays of segments lets us color individual tokens.
const CODE_LINES = [
  [{ t: 'const dev = {', c: '#cbd5e0' }],
  [{ t: '  name: ', c: '#cbd5e0' }, { t: '"Jerathel"', c: '#f6ad55' }, { t: ',', c: '#cbd5e0' }],
  [{ t: '  role: ', c: '#cbd5e0' }, { t: '"Software Developer"', c: '#f6ad55' }, { t: ',', c: '#cbd5e0' }],
  [{ t: '  stack: [', c: '#cbd5e0' }, { t: '"React"', c: '#7fd1c3' }, { t: ', ', c: '#cbd5e0' }, { t: '"Node"', c: '#7fd1c3' }, { t: ',', c: '#cbd5e0' }],
  [{ t: '          ', c: '#cbd5e0' }, { t: '"Python"', c: '#7fd1c3' }, { t: ', ', c: '#cbd5e0' }, { t: '"Cloud"', c: '#7fd1c3' }, { t: '],', c: '#cbd5e0' }],
  [{ t: '  shipsWith: ', c: '#cbd5e0' }, { t: '"clean code"', c: '#f687b3' }, { t: ',', c: '#cbd5e0' }],
  [{ t: '};', c: '#cbd5e0' }]
];

/**
 * Animated count-up from 0 → target. Returns the current displayed integer.
 * Starts only when `active` is true.
 */
const useCountUp = (target, durationMs = 1600, active = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, active]);
  return value;
};

const StatItem = ({ stat, active, delayMs, testId }) => {
  const value = useCountUp(stat.target, 1700, active);
  return (
    <div className="about-reveal text-center" style={{ animationDelay: `${delayMs}ms` }} data-testid={testId}>
      <div className="text-2xl md:text-3xl font-bold tabular-nums" style={{ color: 'var(--text-secondary)' }}>
        {value}{stat.suffix}
      </div>
      <div className="text-[11px] uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
        {stat.label}
      </div>
    </div>
  );
};

/**
 * Typewriter rendering of CODE_LINES. Reveals one character at a time across
 * the flattened segment list. Triggered once `active` becomes true.
 */
const useTypewriter = (lines, charsPerSec = 55, active = false) => {
  const totalChars = lines.reduce((acc, line) => acc + line.reduce((a, s) => a + s.t.length, 0), 0);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame;
    const start = performance.now();
    const duration = (totalChars / charsPerSec) * 1000;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(totalChars * t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, totalChars, charsPerSec]);
  return { shown, totalChars };
};

const TerminalCode = ({ active }) => {
  const { shown, totalChars } = useTypewriter(CODE_LINES, 65, active);

  // Render character-budgeted segments
  let remaining = shown;
  const rendered = [];
  for (let li = 0; li < CODE_LINES.length; li++) {
    const line = CODE_LINES[li];
    const lineNodes = [];
    let lineLen = 0;
    for (let si = 0; si < line.length; si++) {
      const seg = line[si];
      if (remaining <= 0) break;
      const take = Math.min(remaining, seg.t.length);
      lineNodes.push(
        <span key={`${li}-${si}`} style={{ color: seg.c }}>
          {seg.t.slice(0, take)}
        </span>
      );
      remaining -= take;
      lineLen += take;
      if (take < seg.t.length) break;
    }
    rendered.push(
      <div key={li} style={{ minHeight: '1.5em' }}>
        {lineNodes.length ? lineNodes : <span>&nbsp;</span>}
      </div>
    );
    if (remaining <= 0 && lineLen === 0) break;
  }

  const caretVisible = shown < totalChars || true; // always show; blink via CSS
  return (
    <pre className="px-5 py-4 text-[12.5px] leading-relaxed font-mono whitespace-pre-wrap m-0"
         style={{ color: '#cbd5e0' }}>
      {rendered}
      {caretVisible && <span className="about-caret" style={{ color: '#8b2635' }}>▍</span>}
    </pre>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coneOpen, setConeOpen]   = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef(null);

  // Trigger fade-in / count-up / typewriter once the section enters viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Parallax: shift the background based on the section's position in viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        // Map section midpoint relative to viewport center into a translateY offset.
        const viewportH = window.innerHeight || 1;
        const sectionMid = rect.top + rect.height / 2;
        const progress = (sectionMid - viewportH / 2) / viewportH; // -1..1 roughly
        setParallaxY(progress * -60); // negative -> image drifts opposite scroll
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cone geometry: 4 icons spread across a ~120° upper arc
  const RADIUS = 95;
  const angles = [152, 117, 83, 48];
  const iconOffset = (deg) => {
    const r = (deg * Math.PI) / 180;
    return { x: Math.cos(r) * RADIUS, y: -Math.sin(r) * RADIUS };
  };
  const revealStyle = (delayMs) => ({ animationDelay: `${delayMs}ms` });

  // Glassmorphic cards: semi-transparent + backdrop blur so they pick up
  // the background image and blobs behind them instead of looking like
  // solid white rectangles in light mode.
  const cardBgLight = 'rgba(255, 255, 255, 0.08)';   // very faint tint, lets bg through
  const cardBorder  = '1px solid rgba(139, 38, 53, 0.18)';
  const cardClass   = 'backdrop-blur-md';

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${isVisible ? 'about-visible' : ''}`}
      style={{ backgroundColor: 'var(--bg-section)' }}
      data-testid="about-section"
    >
      {/* =====================================
          PARALLAX BACKGROUND IMAGE LAYER
          ===================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: -80, bottom: -80,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=2200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.38,
          filter: 'blur(2px) brightness(0.6) saturate(1.15)',
          transform: `translate3d(0, ${parallaxY}px, 0)`,
          willChange: 'transform'
        }}
      />

      {/* Animated colored blobs — navy + burgundy */}
      <div
        aria-hidden="true"
        className="about-blob-1 absolute pointer-events-none rounded-full"
        style={{
          top: '-120px', left: '-80px',
          width: 520, height: 520,
          background: 'radial-gradient(circle, rgba(30,58,95,0.55) 0%, rgba(30,58,95,0) 70%)',
          filter: 'blur(20px)'
        }}
      />
      <div
        aria-hidden="true"
        className="about-blob-2 absolute pointer-events-none rounded-full"
        style={{
          bottom: '-180px', right: '-120px',
          width: 620, height: 620,
          background: 'radial-gradient(circle, rgba(139,38,53,0.40) 0%, rgba(139,38,53,0) 70%)',
          filter: 'blur(22px)'
        }}
      />

      {/* Soft top/bottom mask to blend with adjacent sections */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 pointer-events-none"
           style={{ background: 'linear-gradient(180deg, var(--bg-section) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
           style={{ background: 'linear-gradient(0deg, var(--bg-section) 0%, transparent 100%)' }} />

      {/* =====================================
          CONTENT
          ===================================== */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="about-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs uppercase tracking-[0.25em]"
                 style={{
                   ...revealStyle(0),
                   color: 'var(--text-secondary)',
                   border: '1px solid rgba(139, 38, 53, 0.35)',
                   backgroundColor: 'rgba(139, 38, 53, 0.08)'
                 }}
                 data-testid="about-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8b2635' }} />
              About Me
            </div>
            <h2 className="about-reveal text-4xl md:text-5xl font-bold mb-4"
                style={{ ...revealStyle(100), color: 'var(--text-primary)' }}
                data-testid="about-heading">
              Engineering Beyond the Surface
            </h2>
            <div className="about-reveal w-24 h-1 mx-auto rounded-full"
                 style={{ ...revealStyle(200), backgroundColor: 'var(--text-secondary)' }} />
          </div>

          {/* Two-column layout: bio card (left) + decorative side (right) */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center mb-16">

            {/* LEFT — BIO inside a glass card with subtle burgundy edge */}
            <div className="about-reveal" style={revealStyle(300)}>
              <div className={`relative rounded-2xl p-7 md:p-9 ${cardClass}`}
                   style={{
                     backgroundColor: cardBgLight,
                     border: '1px solid rgba(139, 38, 53, 0.35)',
                     boxShadow: '6px 6px 22px var(--shadow-color-1), -6px -6px 22px var(--shadow-color-2), inset 0 0 0 1px rgba(255,255,255,0.04)'
                   }}>
                {/* corner accent */}
                <span aria-hidden="true" className="absolute -top-px -left-px h-8 w-8 rounded-tl-2xl pointer-events-none"
                      style={{ borderTop: '2px solid #8b2635', borderLeft: '2px solid #8b2635' }} />
                <span aria-hidden="true" className="absolute -bottom-px -right-px h-8 w-8 rounded-br-2xl pointer-events-none"
                      style={{ borderBottom: '2px solid #1e3a5f', borderRight: '2px solid #1e3a5f' }} />
                <h3 className="text-2xl md:text-3xl font-bold mb-5"
                    style={{ color: 'var(--text-primary)' }}
                    data-testid="about-tagline">
                  Crafting Digital Experiences
                </h3>

                <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <p className="about-reveal" style={revealStyle(450)}>{personalInfo.bio}</p>
                  <p className="about-reveal" style={revealStyle(600)}>
                    Across React, Node.js, Python, and cloud-native architectures, I turn complex requirements into
                    robust, scalable software that ships on time and stays maintainable.
                  </p>
                  <p className="about-reveal" style={revealStyle(750)}>
                    I pair technical depth with a collaborative mindset — code reviews, mentoring, and clear
                    documentation are first-class citizens of every project I touch.
                  </p>
                </div>

                {/* Stats strip — animated count-up */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-7 pt-6"
                     style={{ borderTop: '1px solid rgba(139, 38, 53, 0.18)' }}>
                  {STATS.map((s, i) => (
                    <StatItem
                      key={s.label}
                      stat={s}
                      active={isVisible}
                      delayMs={850 + i * 100}
                      testId={`about-stat-${i}`}
                    />
                  ))}
                </div>
                </div>
              </div>

            {/* RIGHT — Code window + Social cone */}
            <div className="flex flex-col items-center gap-10">

              {/* Terminal-style code card with typewriter */}
              <div className="about-reveal w-full max-w-sm rounded-xl overflow-hidden"
                   style={{
                     ...revealStyle(400),
                     backgroundColor: 'rgba(10, 15, 26, 0.92)',
                     border: '1px solid rgba(139, 38, 53, 0.25)',
                     boxShadow: '0 20px 50px rgba(0,0,0,0.45)'
                   }}
                   data-testid="about-code-card">
                <div className="flex items-center gap-2 px-4 py-2"
                     style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
                  <span className="ml-3 text-[11px] text-gray-400 font-mono">~/jerathel/about.ts</span>
                </div>
                <TerminalCode active={isVisible} />
              </div>

              {/* Social cone */}
              <div className="about-reveal flex flex-col items-center" style={revealStyle(550)} data-testid="social-cone-container">
                <div className="relative" style={{ width: 230, height: 230 }}>
                  <span aria-hidden="true"
                        className="about-pulse-ring absolute top-1/2 left-1/2 rounded-full"
                        style={{ width: 80, height: 80, border: '2px solid rgba(139, 38, 53, 0.5)' }} />

                  {SOCIAL_LINKS.map((social, idx) => {
                    const { x, y } = iconOffset(angles[idx]);
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        data-testid={`social-link-${social.name.toLowerCase()}`}
                        className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                        style={{
                          transform: coneOpen
                            ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                            : 'translate(-50%, -50%) scale(0)',
                          opacity: coneOpen ? 1 : 0,
                          transition:
                            `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 70}ms,` +
                            `opacity 0.3s ease ${idx * 70}ms`,
                          backgroundColor: cardBgLight,
                          border: cardBorder,
                          color: social.color,
                          boxShadow: '4px 4px 14px var(--shadow-color-1), -4px -4px 14px var(--shadow-color-2)',
                          pointerEvents: coneOpen ? 'auto' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.18)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
                        }}
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setConeOpen(v => !v)}
                    aria-expanded={coneOpen}
                    aria-label={coneOpen ? 'Close social links' : 'Open social links'}
                    data-testid="social-cone-toggle"
                    className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: coneOpen ? '#8b2635' : cardBgLight,
                      border: coneOpen ? 'none' : cardBorder,
                      color: coneOpen ? '#ffffff' : 'var(--text-primary)',
                      boxShadow: coneOpen
                        ? 'inset 3px 3px 8px rgba(10,15,26,0.5), inset -3px -3px 8px rgba(155,54,69,0.3)'
                        : '5px 5px 15px var(--shadow-color-1), -5px -5px 15px var(--shadow-color-2)',
                      transition: 'all 0.35s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      transform: coneOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.35s ease'
                    }}>
                      {coneOpen ? <X size={24} /> : <Share2 size={24} />}
                    </div>
                  </button>
                </div>

                <div className="text-xs uppercase tracking-[0.3em] mt-2"
                     style={{
                       color: 'var(--text-muted)',
                       opacity: coneOpen ? 0 : 0.75,
                       transition: 'opacity 0.3s ease'
                     }}>
                  {coneOpen ? '' : 'Let’s Connect'}
                </div>
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS GRID — glass cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item, index) => (
              <div
                key={item.title}
                className={`about-reveal rounded-xl p-6 transition-all duration-300 group hover:-translate-y-1 ${cardClass}`}
                style={{
                  ...revealStyle(1200 + index * 120),
                  backgroundColor: cardBgLight,
                  border: cardBorder,
                  boxShadow: '3px 3px 10px var(--shadow-color-1), -3px -3px 10px var(--shadow-color-2)'
                }}
                data-testid={`highlight-card-${index}`}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--text-secondary)' }}>
                  {item.icon}
                </div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
