

// ---------------------------------------------
// Imports
// ---------------------------------------------

// React core + hooks for state and lifecycle control
import React, { useEffect, useRef, useState } from "react";

// Icon components used for UI clarity and visual cues
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Centralized personal data (email, phone, location)
import { personalInfo } from "../mockData";

// HTTP client for communicating with the backend API
import axios from "axios";



// ---------------------------------------------
// Backend Configuration
// ---------------------------------------------

// Backend base URL loaded from environment variables
// This allows different URLs for dev / prod without code changes
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// API namespace used for all backend routes
const API = `${BACKEND_URL}/api`;

// ---------------------------------------------
// Contact Component
// ---------------------------------------------
const Contact = () => {
  // ---------------------------------------------
  // Form Input State
  // ---------------------------------------------

  // Holds all user-entered form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Stores validation error messages per field
  const [errors, setErrors] = useState({});

  // Controls submit button loading / disabled state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracks overall submission status for user feedback
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Reference to store the timer ID for auto-dismissing messages
  const dismissTimerRef = useRef(null);

  // ---------------------------------------------
  // Auto-dismiss Success / Error Messages
  // ---------------------------------------------

  // When submitStatus changes to success or error,
  // start a 7-second timer to clear the message
  useEffect(() => {
    // Only set timer if there's an active status message
    if (submitStatus === 'success' || submitStatus === 'error') {
      // Clear any existing timer before starting a new one
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = null;
      }

      // Set new timer to auto-dismiss after 7 seconds
      dismissTimerRef.current = setTimeout(() => {
        setSubmitStatus(null);
        dismissTimerRef.current = null;
      }, 7000);
    }

    // Cleanup function: clear timer when component unmounts or status changes
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = null;
      }
    };
  }, [submitStatus]);


  // ---------------------------------------------
  // Form Validation Logic
  // ---------------------------------------------

  // Validates all form fields before submission
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    // Persist validation errors to state
    setErrors(newErrors);

    // Return true only if no errors exist
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------
  // Input Change Handler
  // ---------------------------------------------

  // Updates form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the relevant field without mutating state
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------------------------------------------
  // Form Submission Handler
  // ---------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) {
      return;
    }

    // Lock the form while submitting
    setIsSubmitting(true);

    try {
      // Send form data to backend contact endpoint
      const response = await axios.post(`${API}/contact`, formData);

      // Backend explicitly reports success
      if (response.data.success) {
        setSubmitStatus("success");

        // Reset form fields after successful submission
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: personalInfo.location,
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 relative"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Get In Touch
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full mb-6"
              style={{ backgroundColor: "var(--text-secondary)" }}
            ></div>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Have a project in mind? Let's work together to bring your ideas to
              life.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="rounded-xl p-6 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    boxShadow:
                      "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {info.icon}
                  </div>
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {info.title}
                  </h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm hover:text-[#8b2635] transition-colors break-all"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "var(--bg-card)",
                  boxShadow:
                    "3px 3px 12px var(--shadow-color-1), -3px -3px 12px var(--shadow-color-2)",
                }}
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
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
                        errors.name
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#8b2635]"
                      }`}
                      style={{
                        backgroundColor: "var(--bg-section)",
                        color: "var(--text-primary)",
                        boxShadow:
                          "inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)",
                      }}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <div
                        className="mt-2 flex items-start gap-2 rounded-lg p-3"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          boxShadow:
                            "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                        }}
                      >
                        <AlertCircle
                          size={16}
                          className="text-red-400 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-red-400 text-xs leading-relaxed">
                          {errors.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
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
                        errors.email
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#8b2635]"
                      }`}
                      style={{
                        backgroundColor: "var(--bg-section)",
                        color: "var(--text-primary)",
                        boxShadow:
                          "inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)",
                      }}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <div
                        className="mt-2 flex items-start gap-2 rounded-lg p-3"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          boxShadow:
                            "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                        }}
                      >
                        <AlertCircle
                          size={16}
                          className="text-red-400 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-red-400 text-xs leading-relaxed">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
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
                      errors.subject
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#8b2635]"
                    }`}
                    style={{
                      backgroundColor: "var(--bg-section)",
                      color: "var(--text-primary)",
                      boxShadow:
                        "inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)",
                    }}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && (
                    <div
                      className="mt-2 flex items-start gap-2 rounded-lg p-3"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        boxShadow:
                          "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                      }}
                    >
                      <AlertCircle
                        size={16}
                        className="text-red-400 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-red-400 text-xs leading-relaxed">
                        {errors.subject}
                      </p>
                    </div>
                  )}
                </div>

                {/* Message Field */}
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
                      errors.message
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#8b2635]"
                    }`}
                    style={{
                      backgroundColor: "var(--bg-section)",
                      color: "var(--text-primary)",
                      boxShadow:
                        "inset 1px 1px 4px var(--shadow-color-1), inset -1px -1px 4px var(--shadow-color-2)",
                    }}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <div
                      className="mt-2 flex items-start gap-2 rounded-lg p-3"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        boxShadow:
                          "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                      }}
                    >
                      <AlertCircle
                        size={16}
                        className="text-red-400 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-red-400 text-xs leading-relaxed">
                        {errors.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#8b2635] text-white rounded-lg font-medium shadow-[8px_8px_16px_#0a0f1a,-8px_-8px_16px_#9b3645] hover:shadow-[inset_8px_8px_16px_#7b1625,inset_-8px_-8px_16px_#9b3645] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
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

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div
                    className="mt-6 flex items-start gap-3 rounded-lg p-4"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      boxShadow:
                        "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                    }}
                  >
                    <CheckCircle
                      size={24}
                      className="text-green-400 flex-shrink-0"
                    />
                    <div>
                      <h5 className="text-green-400 font-semibold mb-1">
                        Message Sent Successfully!
                      </h5>
                      <p className="text-green-400/80 text-sm leading-relaxed">
                        Thank you for reaching out. I'll get back to you as soon
                        as possible.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div
                    className="mt-6 flex items-start gap-3 rounded-lg p-4"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      boxShadow:
                        "2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)",
                    }}
                  >
                    <AlertCircle
                      size={24}
                      className="text-red-400 flex-shrink-0"
                    />
                    <div>
                      <h5 className="text-red-400 font-semibold mb-1">
                        Something Went Wrong
                      </h5>
                      <p className="text-red-400/80 text-sm leading-relaxed">
                        Unable to send your message. Please try again or contact
                        me directly at {personalInfo.email}.
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

