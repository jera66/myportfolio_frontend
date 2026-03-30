// Mock data for portfolio

export const personalInfo = {
  name: "Jerathel Czerny",
  title: "Front End Developer",
  location: "Derry, NH, United States",
  email: "jerathelczerny@yahoo.com",
  phone: "(917)751-7033",
  bio: "Front End Web Developer with 5+ years of experience building responsive, mobile-first web applications using React, JavaScript, HTML5, CSS3, WordPress/PHP, Java, and C#. Passionate about crafting fast, accessible, user-focused websites that follow modern web standards and best practices. Experienced in collaborating with designers and project managers in agency-style workflows, maintaining existing websites, and building scalable front-end architectures with clean, efficient code.",
  portfolio: "a-jerathel-portfolio.vercel.app",
  linkedin: "www.linkedin.com",
  github: "github.com"
};

export const projects = [
  {
    id: 1,
    name: "Marketing Agency Website",
    description: "Designed and developed a fully custom WordPress theme from scratch using PHP. Implemented custom post types, reusable template components inspired by React, and focused on performance, accessibility, and SEO. Delivered a responsive, agency-quality website without page builders.",
    technologies: ["WordPress", "PHP", "HTML5", "CSS3", "JavaScript"],
    category: "PHP",
    image: "/assets/marketing_agency.png",
    link: "https://github.com/jera66/marketing-agency",
    featured: true
  },
  {
    id: 2,
    name: "Dayding",
    description: "Dayding is a revolutionary Christian dating platform designed to connect believers through shared faith, integrity, and love. It redefines modern dating with elegance, technological precision, and divine inspiration. It merges the discipline of engineering, the beauty of art, and the foundation of biblical principles into one platform that is as visually captivating as it is spiritually meaningful.",
    technologies: ["React Native", "PostgreSQL", "Node.js", "Express"],
    category: "React Native",
    image: "/assets/dayding_screenshot.png",
    link: "https://github.com/jera66/dayding-frontend",
    featured: true
  },
  {
    id: 3,
    name: "Rosathel Suites",
    description: "A luxury hotel booking application built with the MERN stack. Features include personalized guest dashboards, reward points system, digital room keys, booking management, and seamless check-in experience. Emphasizes elegant UI design, component reusability, clean state management, and premium user experience.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    category: "React",
    image: "/assets/rosathel_suites.png",
    link: "https://github.com/jera66/rosathel-suites-client",
    featured: true
  }
];

export const experience = [
  {
    id: 1,
    title: "Front End Developer",
    company: "Independent / Project-Based",
    period: "2022 - Present",
    location: "Remote",
    responsibilities: [
      "Developed React interfaces and API integrations that reduced page load times and improved data accuracy.",
      "Built reusable component library to accelerate feature delivery and simplify cross-team maintenance.",
      "Implemented automated testing and CI/CD pipelines to increase deployment reliability and shorten release cycles.",
      "Collaborated with stakeholders to translate requirements into secure, scalable web solutions with measurable business impact."
    ]
  },
  {
    id: 2,
    title: "React Developer",
    company: "Ali Tech Solutions",
    period: "Mar 2023 - Aug 2024",
    location: "Remote",
    responsibilities: [
      "Developed multi-tier API services to integrate large datasets, improving data availability for web apps.",
      "Built React-based interfaces that improved user task completion rates and responsiveness.",
      "Designed and deployed scalable backend components that increased throughput with measurable results.",
      "Collaborated with cross-functional teams to deliver client-specific web applications on schedule."
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Data Science",
    institution: "Arizona State University Digital Immersion",
    period: "Jan 2025 - Aug 2025",
    format: "Online"
  },
  {
    id: 2,
    degree: "Software Engineering",
    institution: "Southern New Hampshire University",
    period: "Apr 2019 - Jan 2023",
    format: "Online"
  }
];

export const skills = {
  languages: ["JavaScript", "React", "HTML5", "CSS3", "WordPress", "PHP", "Git", "Java"],
  design: ["Mobile-First Design", "Responsive Design", "Accessibility", "Cross-Browser Compatibility", "Performance Optimization", "Component-Based Architecture", "Agile Workflows"],
  tools: ["Gulp", "Grunt", "Postman", "Figma"]
};
