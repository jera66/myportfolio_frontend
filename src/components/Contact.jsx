/**
 * Contact Component
 * 
 * A fully functional contact form section with validation, API integration,
 * and neumorphic styling. Stores submissions in MongoDB and sends email notifications.
 * 
 * @component
 * 
 * FEATURES:
 * - Real-time form validation with user-friendly error messages
 * - Backend API integration for form submission
 * - Email notification to admin on successful submission
 * - Loading state with animated spinner
 * - Success/error feedback with themed messages
 * - Contact info cards (email, phone, location)
 * 
 * VALIDATION RULES:
 * - Name: Required, min 2 characters
 * - Email: Required, valid email format
 * - Subject: Required, min 3 characters
 * - Message: Required, min 10 characters
 * 
 * API ENDPOINT: POST /api/contact
 */

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo } from '../mockData';
import axios from 'axios';

// =========================================
// API CONFIGURATION
// =========================================

/**
 * Backend URL from environment variable
 * Set in frontend/.env as REACT_APP_BACKEND_URL
 */
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}api`;

const Contact = () => {
  // =========================================
  // STATE MANAGEMENT
  // =========================================
  
  /**
   * formData - Controlled form input values
   * All fields start empty
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  /**
   * errors - Validation error messages for each field
   * Empty string = no error, string = error message
   */
  const [errors, setErrors] = useState({});
  
  /**
   * isSubmitting - Loading state during API call
   * Disables submit button and shows spinner
   */
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * submitStatus - Result of form submission
   * null = not submitted, 'success' = sent, 'error' = failed
   */
  const [submitStatus, setSubmitStatus] = useState(null);

  // Reveal-on-scroll
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const reveal = (delayMs) => ({ animationDelay: `${delayMs}ms` });

  // =========================================
  // AUTO-DISMISS MESSAGES
  // =========================================
  
  /**
   * Auto-dismiss success/error messages after 5 seconds
   */
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  /**
   * Auto-dismiss validation errors after 4 seconds
   */
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // =========================================
  // VALIDATION
  // =========================================
  
  /**
   * validateForm - Validates all form fields
   * @returns {boolean} True if all fields are valid
   * 
   * Validation rules:
   * - name: Required, minimum 2 characters
   * - email: Required, must match email regex
   * - subject: Required, minimum 3 characters
   * - message: Required, minimum 10 characters
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation with regex
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================================
  // EVENT HANDLERS
  // =========================================
  
  /**
   * handleChange - Updates form data and clears field error
   * @param {React.ChangeEvent} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * handleSubmit - Form submission handler
   * @param {React.FormEvent} e - Form submit event
   * 
   * Flow:
   * 1. Prevent default form submission
   * 2. Clear previous submit status
   * 3. Validate form
   * 4. If valid, call API
   * 5. Show success/error feedback
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Hold the dual-ring overlay for at least 3 seconds so the animation
    // gets to fully play, even if the API responds faster.
    const minSpinner = new Promise((r) => setTimeout(r, 3000));

    try {
      const [response] = await Promise.all([
        axios.post(`${API}/contact`, formData),
        minSpinner
      ]);

      if (response.data.success) {
        setIsSubmitting(false);                  // hide overlay
        setSubmitStatus('success');              // show success toast
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Brief moment to read the toast, then send the user back to the home page.
        setTimeout(() => { window.location.href = '/'; }, 1800);
      } else {
        setIsSubmitting(false);
        setSubmitStatus('error');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Contact form submission error:', error);
      // Make sure the spinner still finishes its full cycle before the error toast.
      await minSpinner;
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  // =========================================
  // CONTACT INFO DATA
  // =========================================
  
  /**
   * contactInfo - Array of contact details for info cards
   * Each item has icon, title, display value, and optional link
   */
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: personalInfo.location,
      link: null // Location has no link
    }
  ];

  // =========================================
  // RENDER
  // =========================================
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-20 relative overflow-hidden ${isVisible ? 'about-visible' : ''}`}
      style={{ backgroundColor: 'var(--bg-section)' }}
    >
      {/* ============================================
          SUBMISSION OVERLAY — dual counter-rotating rings
          ============================================ */}
      {isSubmitting && (
        <div
          className="contact-submit-overlay fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(10, 15, 26, 0.55)' }}
          data-testid="contact-submit-overlay"
          role="status"
          aria-live="polite"
          aria-label="Sending your message"
        >
          <div className="relative" style={{ width: 180, height: 180 }}>
            {/* Outer ring — clockwise (burgundy) */}
            <svg
              className="contact-ring-cw absolute inset-0"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 0 12px rgba(139,38,53,0.6))' }}
            >
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#8b2635"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="80 220"
              />
            </svg>
            {/* Inner ring — counter-clockwise (navy) */}
            <svg
              className="contact-ring-ccw absolute inset-0"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 0 10px rgba(30,58,95,0.7))' }}
            >
              <circle
                cx="50" cy="50" r="34"
                fill="none"
                stroke="#1e3a5f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="60 180"
              />
              <circle
                cx="50" cy="50" r="34"
                fill="none"
                stroke="#e8d5c4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="20 220"
                strokeDashoffset="-110"
                opacity="0.6"
              />
            </svg>
            {/* Centered label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#e8d5c4' }}>
                Sending
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Unified theme: drifting radial blobs (navy + burgundy) */}
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full"
           style={{ top: '10%', left: '-120px', width: 460, height: 460,
                    background: 'radial-gradient(circle, rgba(30,58,95,0.30) 0%, rgba(30,58,95,0) 70%)',
                    filter: 'blur(40px)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full"
           style={{ bottom: '5%', right: '-120px', width: 520, height: 520,
                    background: 'radial-gradient(circle, rgba(139,38,53,0.20) 0%, rgba(139,38,53,0) 70%)',
                    filter: 'blur(40px)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* ============================================
              SECTION HEADER
              ============================================ */}
          <div className="text-center mb-16">
            <div className="about-reveal section-eyebrow mb-5" style={reveal(0)} data-testid="contact-eyebrow">Contact</div>
            <h2 
              className="about-reveal text-4xl md:text-5xl font-bold mb-4" 
              style={{ ...reveal(100), color: 'var(--text-primary)' }}
            >
              Get In Touch
            </h2>
            {/* Decorative line */}
            <div 
              className="about-reveal w-24 h-1 mx-auto rounded-full mb-6" 
              style={{ ...reveal(200), backgroundColor: 'var(--text-secondary)' }}
            ></div>
            <p 
              className="about-reveal max-w-2xl mx-auto" 
              style={{ ...reveal(300), color: 'var(--text-muted)' }}
            >
              Have a project in mind? Let&apos;s work together to bring your ideas to life.
            </p>
          </div>

          {/* ============================================
              MAIN CONTENT GRID
              - Left column: Contact info cards
              - Right column: Contact form (spans 2 cols on lg)
              ============================================ */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* CONTACT INFO CARDS */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="about-reveal rounded-xl p-6 transition-all duration-300 section-glass-card"
                  style={reveal(400 + index * 120)}
                  data-testid={`contact-info-${info.title.toLowerCase()}`}
                >
                  {/* Icon */}
                  <div className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {info.icon}
                  </div>
                  {/* Title */}
                  <h4 
                    className="font-semibold mb-2" 
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {info.title}
                  </h4>
                  {/* Value (with optional link) */}
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm hover:text-[#8b2635] transition-colors break-all"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* ============================================
                CONTACT FORM
                - Takes 2 columns on large screens
                - Neumorphic card styling
                ============================================ */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="about-reveal rounded-2xl p-8 section-glass-card"
                style={reveal(500)}
                data-testid="contact-form"
              >
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  
                  {/* NAME FIELD */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-[#e8d5c4] font-medium mb-2 text-sm"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'ring-2 ring-red-500' : 'focus:ring-[#8b2635]'
                      }`}
                      style={{
                        backgroundColor: 'var(--bg-section)',
                        color: 'var(--text-primary)',
                        // Inset neumorphic shadow for inputs
                        boxShadow: 'inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)'
                      }}
                      placeholder="John Doe"
                      data-testid="contact-name-input"
                    />
                    {/* Error Message */}
                    {errors.name && (
                      <div 
                        className="mt-2 flex items-start gap-2 rounded-lg p-3" 
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          boxShadow: '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                        }}
                      >
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-xs leading-relaxed">{errors.name}</p>
                      </div>
                    )}
                  </div>

                  {/* EMAIL FIELD */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-[#e8d5c4] font-medium mb-2 text-sm"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'ring-2 ring-red-500' : 'focus:ring-[#8b2635]'
                      }`}
                      style={{
                        backgroundColor: 'var(--bg-section)',
                        color: 'var(--text-primary)',
                        boxShadow: 'inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)'
                      }}
                      placeholder="john@example.com"
                      data-testid="contact-email-input"
                    />
                    {errors.email && (
                      <div 
                        className="mt-2 flex items-start gap-2 rounded-lg p-3" 
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          boxShadow: '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                        }}
                      >
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-xs leading-relaxed">{errors.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUBJECT FIELD */}
                <div className="mb-6">
                  <label 
                    htmlFor="subject" 
                    className="block text-[#e8d5c4] font-medium mb-2 text-sm"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.subject ? 'ring-2 ring-red-500' : 'focus:ring-[#8b2635]'
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-section)',
                      color: 'var(--text-primary)',
                      boxShadow: 'inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)'
                    }}
                    placeholder="Project Inquiry"
                    data-testid="contact-subject-input"
                  />
                  {errors.subject && (
                    <div 
                      className="mt-2 flex items-start gap-2 rounded-lg p-3" 
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        boxShadow: '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                      }}
                    >
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-xs leading-relaxed">{errors.subject}</p>
                    </div>
                  )}
                </div>

                {/* MESSAGE FIELD */}
                <div className="mb-6">
                  <label 
                    htmlFor="message" 
                    className="block text-[#e8d5c4] font-medium mb-2 text-sm"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message ? 'ring-2 ring-red-500' : 'focus:ring-[#8b2635]'
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-section)',
                      color: 'var(--text-primary)',
                      boxShadow: 'inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)'
                    }}
                    placeholder="Tell me about your project..."
                    data-testid="contact-message-input"
                  />
                  {errors.message && (
                    <div 
                      className="mt-2 flex items-start gap-2 rounded-lg p-3" 
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        boxShadow: '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                      }}
                    >
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-xs leading-relaxed">{errors.message}</p>
                    </div>
                  )}
                </div>

                {/* ============================================
                    SUBMIT BUTTON
                    - Soft neumorphic shadow
                    - Inset shadow on hover
                    - Loading spinner when submitting
                    ============================================ */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#8b2635] text-white rounded-lg font-medium shadow-[3px_3px_8px_rgba(10,15,26,0.3),-3px_-3px_8px_rgba(155,54,69,0.2)] hover:shadow-[inset_3px_3px_6px_#7b1625,inset_-3px_-3px_6px_#9b3645] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  data-testid="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      {/* Loading spinner */}
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>

                {/* ============================================
                    SUCCESS MESSAGE
                    - Green themed neumorphic card
                    ============================================ */}
                {submitStatus === 'success' && (
                  <div 
                    className="mt-6 flex items-start gap-3 rounded-lg p-4" 
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      boxShadow: '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                    }}
                    data-testid="contact-success-message"
                  >
                    <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
                    <div>
                      <h5 className="text-green-400 font-semibold mb-1">Message Sent Successfully!</h5>
                      <p className="text-green-400/80 text-sm leading-relaxed">
                        Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                )}

                {/* ============================================
                    ERROR MESSAGE
                    - Red themed neumorphic card
                    ============================================ */}
                {submitStatus === 'error' && (
                  <div 
                    className="mt-6 flex items-start gap-3 rounded-lg p-4" 
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      boxShadow: '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                    }}
                    data-testid="contact-error-message"
                  >
                    <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
                    <div>
                      <h5 className="text-red-400 font-semibold mb-1">Something Went Wrong</h5>
                      <p className="text-red-400/80 text-sm leading-relaxed">
                        Unable to send your message. Please try again or contact me directly at {personalInfo.email}.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
