import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Check,
  Linkedin,
  Github,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Award,
  Database,
  Terminal,
  Cpu,
  Workflow,
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Briefcase,
  Layers,
  MonitorCheck,
  Flame,
  Send,
  ExternalLink,
  AlertCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  PROJECTS_DATA,
  SKILLS_DATA,
  TECH_STACK_DATA,
  EXPERIENCE_DATA,
  ACHIEVEMENTS_DATA,
  Project
} from "./data";

import Navbar from "./components/Navbar";
import AutomationCanvas from "./components/AutomationCanvas";
import ProjectModal from "./components/ProjectModal";
import ResumeModal from "./components/ResumeModal";

// Define generated portrait path dynamically
const simonPortrait = "/src/assets/images/simon_portrait_1782931694163.jpg";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState<string>("all");

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Track cursor follow coordinates for hero glow
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMouseCoord({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["hero", "projects", "skills", "contact"];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openCaseStudy = (proj: Project) => {
    if (proj.id === "lead-ledger") {
      window.open("https://claude.ai/public/artifacts/60ba3d6b-4bc6-4bd1-87b6-084ca712aa5c", "_blank", "noopener,noreferrer");
      return;
    }
    if (proj.id === "idea-forge") {
      window.open("https://5f2b85d7-78a5-4197-8dcd-9f28f9f5e0f9-00-1gk2aqahrdu9d.spock.replit.dev/", "_blank", "noopener,noreferrer");
      return;
    }
    if (proj.id === "automatescale-core") {
      window.open("https://drive.google.com/file/d/1lxNc0sz7Rlc1rI1Hbib3alhFr9hBAGzq/view?usp=drive_link", "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedProject(proj);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const filteredSkills = skillFilter === "all" 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === skillFilter);

  return (
    <div className="relative selection:bg-primary-accent selection:text-pure-white min-h-screen flex flex-col font-sans" id="applet-viewport-root">
      {/* Noise Texture Overlay for high-end organic paper feel */}
      <div className="noise-overlay" />

      {/* Glass Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Sections Body */}
      <main className="flex-1">

        {/* 1. CINEMATIC HERO SECTION */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen bg-warm-bg pt-28 pb-16 flex flex-col justify-center overflow-hidden grid-bg-subtle"
        >
          {/* Follow mouse glow effect */}
          <div
            className="absolute hidden md:block w-[500px] h-[500px] rounded-full bg-primary-accent/5 pointer-events-none blur-[120px] transition-all duration-300"
            style={{
              left: `${mouseCoord.x - 250}px`,
              top: `${mouseCoord.y - 250}px`,
            }}
          />

          <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Headline Column */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-8">
              
              {/* Core Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pure-white border border-border-custom shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-accent animate-ping" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-text">
                  Growth & Performance Marketing
                </span>
              </div>

              {/* Title Header (Uppercase, tight leading, huge size) */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-primary-text leading-[0.9] text-left">
                I Build Marketing<br />
                <span className="text-primary-accent">That Drives Business.</span>
              </h1>

              {/* Subheading intro */}
              <p className="text-lg sm:text-xl text-secondary-text font-medium max-w-[620px] leading-relaxed text-left">
                Performance Marketing professional with 5+ years of experience building scalable growth systems through paid media, automation, and analytics. I specialize in turning marketing challenges into measurable results using data-driven strategy, experimentation, and customer-focused execution.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("projects");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-primary-accent text-pure-white font-extrabold text-sm uppercase tracking-wider rounded-full hover:bg-hover-accent transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-primary-accent/20 hover:-translate-y-0.5"
                  id="hero-btn-works"
                >
                  View Featured Works
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                
                <a
                  href="https://drive.google.com/file/d/1CHSZg-CYRLC8hddj8bUQaA8z-VUOLM1z/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-pure-white text-primary-text border border-border-custom font-extrabold text-sm uppercase tracking-wider rounded-full hover:bg-primary-text hover:text-pure-white hover:border-primary-text transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
                  id="hero-btn-resume"
                >
                  View Resume
                  <FileText className="w-4 h-4 text-primary-accent" />
                </a>
              </div>

              {/* Quick stats ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-border-custom w-full">
                {ACHIEVEMENTS_DATA.map((item) => (
                  <div key={item.id} className="text-left">
                    <div className="text-2xl sm:text-3xl font-black text-primary-accent tracking-tighter">
                      {item.value}
                      {item.suffix}
                    </div>
                    <div className="text-xs uppercase font-extrabold tracking-wider text-secondary-text mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Interactive Portfolio Asset Column */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Stylized Portrait Wrapper */}
              <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-3xl overflow-hidden border border-border-custom shadow-xl group bg-pure-white p-2">
                {/* Visual Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/d/1MDwp7cIlbVjnfLqXyx5JsyAUxI_I-QnW"
                    alt="Kewin Simon"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>



            </div>

          </div>

          {/* Quick Section Separator Anchor */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce text-secondary-text/60">
            <span className="text-[10px] uppercase tracking-wider font-extrabold">Scroll Down</span>
            <span className="w-[1px] h-4 bg-secondary-text/30" />
          </div>
        </section>





        {/* 2. SELECTED PROJECTS (DARK IMMERSIVE WORKSHOP SECTION) */}
        <section
          id="projects"
          className="relative py-28 bg-dark-bg text-pure-white overflow-hidden grid-bg-dark border-b border-white/5"
        >
          {/* Subtle decoration line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 relative z-10">
            
            {/* Section Header */}
            <div className="mb-16 text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                PROJECTS
              </h2>
            </div>

            {/* Projects Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
              {PROJECTS_DATA.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => openCaseStudy(proj)}
                  className="group relative bg-[#1A1815] border border-white/5 rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:border-primary-accent/30 hover:shadow-primary-accent/5 flex flex-col justify-between"
                  id={`project-card-${proj.id}`}
                >
                  
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Zoom Overlay trigger */}
                    <div className="absolute inset-0 bg-[#111111]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-primary-accent text-pure-white text-xs font-extrabold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-lg">
                        {proj.id === "lead-ledger" || proj.id === "idea-forge" || proj.id === "automatescale-core" ? "View Project" : "Read Case Study"}
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {proj.id !== "lead-ledger" && proj.id !== "automatescale-core" && proj.id !== "revengine-dashboard" && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary-accent text-pure-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                        {proj.metrics}
                      </div>
                    )}
                  </div>

                  {/* Core Details */}
                  <div className="p-8 text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-primary-accent">
                        {proj.category}
                      </span>
                      {proj.id !== "lead-ledger" && proj.id !== "automatescale-core" && proj.id !== "revengine-dashboard" && (
                        <span className="text-[10px] font-mono text-white/30 uppercase">
                          {proj.technologies.slice(0, 3).join(" • ")}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                      {proj.title}
                    </h3>
                    
                    {proj.id !== "automatescale-core" && proj.id !== "revengine-dashboard" && (
                      <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    )}

                    {/* Horizontal badges and clicker */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 bg-white/5 text-[10px] font-semibold rounded text-white/70 border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-primary-accent uppercase tracking-widest flex items-center gap-1 group-hover:underline">
                        {proj.id === "lead-ledger" || proj.id === "idea-forge" || proj.id === "automatescale-core" ? "view project" : "View Study"}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>


        {/* 3. SKILLS SECTION */}
        <section
          id="skills"
          className="relative py-28 bg-warm-bg grid-bg-subtle border-b border-border-custom"
        >
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="text-left">
                <span className="text-xs font-bold tracking-widest text-primary-accent uppercase block mb-1">
                  Skills Taxonomy
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-primary-text">
                  skills.
                </h2>
              </div>
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-1 bg-pure-white p-1 rounded-xl border border-border-custom shadow-sm" id="skills-filter-tabs">
                {[
                  { id: "all", label: "All Skills" },
                  { id: "performance", label: "Performance Marketing" },
                  { id: "conversion", label: "Conversion & Lifecycle" },
                  { id: "organic", label: "Organic & Social" },
                  { id: "leadership", label: "Leadership" },
                  { id: "analytics", label: "Analytics & Tools" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSkillFilter(tab.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      skillFilter === tab.id 
                        ? "bg-primary-accent text-pure-white" 
                        : "text-secondary-text hover:text-primary-text"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-grid-wrapper">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-pure-white border border-border-custom rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 relative group"
                    id={`skill-card-${skill.id}`}
                  >
                    <div>
                      {/* Skill Category Icon */}
                      <div className="w-10 h-10 rounded-xl bg-warm-bg flex items-center justify-center text-primary-text font-bold mb-4 border border-border-custom">
                        {skill.category === "performance" && <TrendingUp className="w-5 h-5 text-primary-accent" />}
                        {skill.category === "conversion" && <Workflow className="w-5 h-5 text-primary-accent" />}
                        {skill.category === "organic" && <Sparkles className="w-5 h-5 text-primary-accent" />}
                        {skill.category === "leadership" && <UserCheck className="w-5 h-5 text-primary-accent" />}
                        {skill.category === "analytics" && <Database className="w-5 h-5 text-primary-accent" />}
                      </div>

                      <h4 className="font-extrabold text-base tracking-tight text-primary-text uppercase">
                        {skill.title}
                      </h4>
                      <p className="text-xs text-secondary-text mt-2 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Proficiency progress indicators */}
                    <div className="mt-6 pt-4 border-t border-border-custom/60">
                      <div className="flex justify-between items-center text-xs font-bold text-primary-text mb-1">
                        <span className="uppercase text-[10px] tracking-wider text-secondary-text">Proficiency</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-warm-bg rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </section>
        {/* 6. TECH STACK (LOGO CLOUD WITH CUSTOM INTERACTIVE STATES) */}
        <section
          id="tech-stack"
          className="relative py-24 bg-warm-bg border-t border-border-custom"
        >
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-primary-accent uppercase block">
                Technical Stack
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-primary-text">
                THE CORE TOOLBOX.
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed">
                A selection of modern engineering, growth automation, and artificial intelligence frameworks used to construct solutions.
              </p>
            </div>

            {/* Grid of technologies */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" id="tech-logo-cloud">
              {TECH_STACK_DATA.map((tech) => (
                <div
                  key={tech.name}
                  className="p-5 bg-pure-white border border-border-custom rounded-2xl flex flex-col items-center justify-center text-center group hover:border-primary-accent/40 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  {/* Technology Icon Representer */}
                  <div className="w-12 h-12 flex items-center justify-center mb-3">
                    {tech.url ? (
                      <img
                        src={tech.url}
                        alt={tech.name}
                        className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center text-primary-accent font-black text-xs">
                        {tech.iconType === "zapier" && <Flame className="w-6 h-6 text-primary-accent" />}
                        {tech.iconType === "n8n" && <Workflow className="w-6 h-6 text-primary-accent" />}
                        {tech.iconType === "openai" && <Cpu className="w-6 h-6 text-primary-accent" />}
                        {tech.iconType === "gemini" && <Sparkles className="w-6 h-6 text-primary-accent animate-pulse" />}
                        {tech.iconType === "claudecode" && <Terminal className="w-6 h-6 text-primary-accent" />}
                        {tech.iconType === "grok" && <Cpu className="w-6 h-6 text-primary-accent" />}
                      </div>
                    )}
                  </div>

                  <span className="font-extrabold text-xs tracking-wide uppercase text-primary-text block">
                    {tech.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-secondary-text font-bold mt-1 block">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* 9. CONTACT FORM SECTION (DARK HIGH-CONTRAST CONSOLE ENVIRONMENT) */}
        <section
          id="contact"
          className="relative py-28 bg-dark-bg text-pure-white grid-bg-dark overflow-hidden"
        >
          {/* Top light line separator */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center justify-center">
            {/* Soft background orange glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-primary-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-4xl text-center space-y-12">
              
              {/* Highlighted Direct Channels Deck */}
              <div 
                id="contact-chips-wrapper" 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10"
              >
                {/* Mail Card */}
                <a 
                  href="mailto:IamSimonKewin@gmail.com"
                  className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl flex flex-col items-center text-center space-y-5 hover:border-primary-accent/40 hover:bg-white/[0.04] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary-accent/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-accent group-hover:scale-110 group-hover:bg-primary-accent group-hover:text-white transition-all duration-500 shadow-inner">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block font-mono">
                      Direct Mail
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-primary-accent transition-colors block break-all font-sans">
                      IamSimonKewin@gmail.com
                    </span>
                  </div>
                </a>

                {/* Phone Card */}
                <a 
                  href="tel:+919082657977"
                  className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl flex flex-col items-center text-center space-y-5 hover:border-primary-accent/40 hover:bg-white/[0.04] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary-accent/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-accent group-hover:scale-110 group-hover:bg-primary-accent group-hover:text-white transition-all duration-500 shadow-inner">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block font-mono">
                      Mobile Secure
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-primary-accent transition-colors block font-sans">
                      +91 90826 57977
                    </span>
                  </div>
                </a>

                {/* Operations base Card */}
                <div 
                  className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl flex flex-col items-center text-center space-y-5 hover:border-primary-accent/40 hover:bg-white/[0.04] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary-accent/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-accent group-hover:scale-110 group-hover:bg-primary-accent group-hover:text-white transition-all duration-500 shadow-inner">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block font-mono">
                      Operations base
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-primary-accent transition-colors block font-sans">
                      Mumbai, Maharashtra
                    </span>
                  </div>
                </div>
              </div>

              {/* Secure Channels Loop */}
              <div className="pt-6 flex flex-col items-center space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block font-mono">
                  Secure Channels
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 hover:bg-primary-accent hover:text-pure-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 hover:bg-primary-accent hover:text-pure-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 hover:bg-primary-accent hover:text-pure-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>



      {/* Rises smoothly when open */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
