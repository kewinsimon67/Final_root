import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
}

export default function Navbar({ activeSection, onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-warm-bg/80 backdrop-blur-md py-4 border-b border-border-custom"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center space-x-2 text-xl font-bold tracking-tight cursor-pointer"
            id="nav-logo"
          >
            <span className="w-8 h-8 rounded-full bg-primary-accent text-pure-white flex items-center justify-center font-extrabold text-sm transition-transform duration-300 group-hover:rotate-12">
              KS
            </span>
            <span className="text-primary-text font-black tracking-tighter">KEWIN.SIMON</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer ${
                  activeSection === item.id ? "text-primary-accent" : "text-secondary-text hover:text-primary-text"
                }`}
                id={`nav-item-${item.id}`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary-text hover:text-primary-accent transition-colors duration-200 cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] bg-warm-bg border-b border-border-custom py-6 px-6 z-40 md:hidden flex flex-col gap-4 shadow-xl"
            id="mobile-drawer"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`py-3 px-4 rounded-xl text-left font-semibold tracking-wide uppercase text-base flex items-center justify-between transition-colors duration-200 ${
                  activeSection === item.id ? "bg-primary-accent/10 text-primary-accent" : "hover:bg-primary-text/5 text-primary-text"
                }`}
                id={`mobile-nav-item-${item.id}`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-2 h-2 rounded-full bg-primary-accent" />
                )}
              </button>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
