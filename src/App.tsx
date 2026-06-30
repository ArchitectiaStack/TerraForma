import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Home,
  Layers,
  Hammer,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Maximize2,
  Building2,
  Award,
  BookOpen,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

import {
  SERVICES_DATA,
  RESIDENCES_DATA,
  MATERIALS_DATA,
  PROCESS_STEPS_DATA,
  TESTIMONIALS_DATA,
  Residence,
  Service,
  Material
} from "./types";

import ContactModal from "./components/ContactModal";
import ResidenceModal from "./components/ResidenceModal";
import ServiceModal from "./components/ServiceModal";

export default function App() {
  // Navigation states
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledResidence, setPrefilledResidence] = useState<string | undefined>(undefined);
  
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);
  const [residenceModalOpen, setResidenceModalOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  // Content Selection states
  const [activeMaterialId, setActiveMaterialId] = useState("stone");
  const [activeStepNumber, setActiveStepNumber] = useState("01");
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Stat Counters
  const [stats, setStats] = useState({
    years: 0,
    homes: 0,
    awards: 0,
    commitment: 0,
  });

  // Track scroll position for header sticky effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats Counter Interval
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setStats({
        years: Math.min(Math.round((14 / steps) * stepCount), 14),
        homes: Math.min(Math.round((80 / steps) * stepCount), 80),
        awards: Math.min(Math.round((12 / steps) * stepCount), 12),
        commitment: Math.min(Math.round((100 / steps) * stepCount), 100),
      });

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Modal launcher helper for Contact Portal
  const launchContactPortal = (residenceName?: string) => {
    setPrefilledResidence(residenceName);
    setContactModalOpen(true);
  };

  const activeMaterial = MATERIALS_DATA.find((m) => m.id === activeMaterialId) || MATERIALS_DATA[0];
  const activeStep = PROCESS_STEPS_DATA.find((s) => s.number === activeStepNumber) || PROCESS_STEPS_DATA[0];
  const activeTestimonial = TESTIMONIALS_DATA[testimonialIndex];

  // Testimonial Navigation
  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  // Helper to get service icons
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "custom-homes":
        return <Home className="h-6 w-6 stroke-[1]" />;
      case "design-build":
        return <Compass className="h-6 w-6 stroke-[1]" />;
      case "renovations":
        return <Hammer className="h-6 w-6 stroke-[1]" />;
      case "land-planning":
        return <Layers className="h-6 w-6 stroke-[1]" />;
      default:
        return <Home className="h-6 w-6 stroke-[1]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] font-sans text-gray-400 select-none overflow-x-hidden antialiased">
      
      {/* 1. HEADER & NAVIGATION */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          headerScrolled
            ? "bg-[#0f0f0f]/90 border-b border-[#222222]/80 py-4 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo Brand Block */}
          <a href="#hero" className="flex items-center space-x-3 text-cream group">
            {/* Geometric custom line icon */}
            <div className="relative flex h-9 w-9 items-center justify-center border border-bronze bg-transparent transition-all duration-300 group-hover:bg-bronze group-hover:text-black">
              <span className="font-serif text-lg font-light tracking-widest">T</span>
              <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-r border-b border-bronze group-hover:border-cream" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-serif text-lg tracking-[0.2em] uppercase font-light text-cream">
                TERRAFORMA
              </span>
              <span className="mt-0.5 font-mono text-[9px] tracking-[0.3em] text-bronze uppercase">
                RESIDENCES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Deck */}
          <nav className="hidden items-center space-x-8 md:flex">
            {["ABOUT", "SERVICES", "RESIDENCES", "MATERIALS", "PROCESS"].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="font-mono text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-bronze"
              >
                {section}
              </a>
            ))}
          </nav>

          {/* Let's Build CTA Action Button */}
          <div className="hidden items-center md:flex">
            <button
              onClick={() => launchContactPortal()}
              className="group border border-bronze bg-[#1a1a1a]/25 px-6 py-2.5 font-mono text-xs tracking-[0.15em] text-cream uppercase transition-all duration-300 hover:bg-bronze hover:text-black"
              id="header-cta"
            >
              LET'S BUILD
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center border border-[#333333] text-cream transition-colors hover:text-bronze md:hidden"
            aria-label="Open mobile menu"
            id="mobile-menu-trigger"
          >
            <Menu className="h-5 w-5 stroke-[1.5]" />
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0f0f0f] p-8"
          >
            <div className="flex items-center justify-between border-b border-[#222222] pb-6">
              <span className="font-serif text-xl tracking-[0.15em] text-cream">TERRAFORMA</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-[#333333] text-cream"
                id="mobile-menu-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col space-y-6 text-left">
              {["ABOUT", "SERVICES", "RESIDENCES", "MATERIALS", "PROCESS"].map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl tracking-wider text-cream transition-colors hover:text-bronze"
                >
                  {section}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  launchContactPortal();
                }}
                className="mt-8 border border-bronze py-4 font-mono text-xs tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze hover:text-black"
              >
                LET'S BUILD
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 2. HERO SECTION */}
      <section id="hero" className="relative flex min-h-screen items-center justify-center bg-[#121212] pt-20">
        {/* Large Cinematic Hero Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/hero_desert_residence_1782758070525.jpg"
            alt="TerraForma Luxury High Desert Residence"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          {/* Elegant radial/linear dark overlays for editorial contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f]/30" />
        </div>

        {/* Content Overlay Container */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Overline Accent */}
              <span className="font-mono text-[10px] tracking-[0.3em] text-bronze uppercase block">
                BUILDING WITH LAND. DESIGNING FOR LIFE.
              </span>

              {/* Majestic Serif Heading */}
              <h1 className="font-serif text-5xl font-light leading-[1.1] text-cream md:text-7xl tracking-tight">
                High Desert <br />
                Living. Crafted <br />
                to Endure.
              </h1>

              {/* Body Brief Description */}
              <p className="mt-6 font-sans text-sm md:text-base leading-relaxed text-gray-300 max-w-lg">
                TerraForma Residences is a premier high-desert design and construction firm. We create timeless, site-driven luxury homes that honor the geology of the land and elevate daily life.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#residences"
                  className="group inline-flex items-center justify-center border border-bronze bg-transparent hover:bg-bronze hover:text-black text-cream px-8 py-4 text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300"
                >
                  EXPLORE OUR WORK{" "}
                  <span className="ml-2 font-sans group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
                <button
                  onClick={() => launchContactPortal()}
                  className="inline-flex items-center justify-center border border-[#333333] hover:border-bronze bg-[#0f0f0f]/40 backdrop-blur-sm text-cream hover:text-bronze px-8 py-4 text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300"
                >
                  BEGIN DIALOGUE
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subtle scroll down helper */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden flex-col items-center space-y-2 md:flex">
          <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">SCROLL</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-bronze" />
        </div>
      </section>


      {/* 3. CORE SERVICES SECTION (4-COLUMN GRID) */}
      <section id="services" className="relative bg-[#0f0f0f] py-28 border-t border-[#222222]/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Block Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-16 border-b border-[#222222]/80">
            <div className="md:col-span-8 text-left">
              <span className="font-mono text-xs tracking-[0.2em] text-bronze uppercase">OUR REPERTOIRE</span>
              <h2 className="mt-2 font-serif text-4xl font-light text-cream md:text-5xl tracking-tight">
                Architectural Expertise
              </h2>
            </div>
            <div className="md:col-span-4 text-left md:text-right">
              <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-sm">
                From landscape hydrology assessment to high-precision structural steel fabrication, we unify all disciplines under a single standards code.
              </p>
            </div>
          </div>

          {/* 4-Column Service Grid */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES_DATA.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between border border-[#222222] bg-[#121212]/40 p-8 hover:border-bronze transition-all duration-300 h-80"
              >
                <div>
                  {/* Service Accent Number */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-600">0{index + 1}</span>
                    <div className="text-bronze transition-transform duration-300 group-hover:scale-110">
                      {getServiceIcon(service.id)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 font-serif text-xl font-light text-cream group-hover:text-bronze transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 font-sans text-xs leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="pt-6 border-t border-[#222222]/60 group-hover:border-bronze/40 transition-colors">
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setServiceModalOpen(true);
                    }}
                    className="inline-flex items-center text-[11px] font-mono tracking-widest text-bronze uppercase hover:text-cream transition-colors"
                    id={`learn-more-${service.id}`}
                  >
                    LEARN MORE <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. FEATURED RESIDENCES SECTION (ASYMMETRICAL LAYOUT) */}
      <section id="residences" className="relative bg-[#121212] py-28 border-y border-[#222222]/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Text & Header Info */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 text-left space-y-6">
              <span className="font-mono text-xs tracking-[0.2em] text-bronze uppercase block">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="font-serif text-4xl font-light text-cream md:text-5xl tracking-tight leading-tight">
                Homes in Harmony with the Desert
              </h2>
              <p className="font-sans text-sm leading-relaxed text-gray-400">
                Explore our portfolio of desert sanctuaries. Each structure is sculpted from raw materials to align with mountain grids, wind pathways, and solar tracks.
              </p>
              <div className="pt-6">
                <button
                  onClick={() => launchContactPortal()}
                  className="group inline-flex items-center justify-center border border-bronze bg-transparent hover:bg-bronze hover:text-black text-cream px-6 py-3.5 text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300"
                  id="residences-view-all"
                >
                  VIEW ALL RESIDENCES{" "}
                  <span className="ml-2 font-sans group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: 3-Image/Card Grid */}
            <div className="lg:col-span-8 space-y-12">
              {RESIDENCES_DATA.map((residence) => (
                <motion.div
                  key={residence.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  onClick={() => {
                    setSelectedResidence(residence);
                    setResidenceModalOpen(true);
                  }}
                  className="group cursor-pointer overflow-hidden border border-[#222222] bg-[#0f0f0f]/60 hover:border-bronze transition-all duration-500"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Residence Image */}
                    <div className="md:col-span-7 relative h-72 md:h-80 overflow-hidden bg-[#1a1a1a]">
                      <img
                        src={residence.image}
                        alt={residence.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* Residence Specs & Details */}
                    <div className="md:col-span-5 p-8 flex flex-col justify-between text-left">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-bronze">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="font-mono text-[10px] tracking-wider uppercase">{residence.location}</span>
                        </div>
                        <h3 className="font-serif text-2xl font-light text-cream group-hover:text-bronze transition-colors">
                          {residence.name}
                        </h3>
                        <p className="font-sans text-xs leading-relaxed text-gray-500 line-clamp-3">
                          {residence.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[#222222] flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-500">{residence.area}</span>
                        <span className="text-bronze flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                          VIEW DETAILS <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* 5. INTERACTIVE MATERIALS EXPLORER (SPLIT SCREEN 50/50) */}
      <section id="materials" className="relative bg-[#0f0f0f] py-28 border-b border-[#222222]/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Frame: Dynamic Materials card & Static Photo */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-square relative overflow-hidden border border-[#222222] bg-[#121212]">
                <img
                  src="/src/assets/images/desert_materials_1782758087964.jpg"
                  alt="High desert architectural material aggregates"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Overlaid Material details container with custom fade */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0f0f0f]/95 border border-[#333333] p-6 text-left">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-3">
                    <span className="font-mono text-[10px] tracking-widest text-bronze uppercase">
                      ACTIVE PALETTE / {activeMaterial.number}
                    </span>
                    <span className="font-mono text-[11px] text-gray-500 uppercase">
                      {activeMaterial.accent}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-cream mb-2">
                    {activeMaterial.name}
                  </h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-400 mb-4">
                    {activeMaterial.detail}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-[#222222] pt-3 text-[10px] font-mono uppercase">
                    <div>
                      <span className="text-gray-500 block">APPLICATION</span>
                      <span className="text-cream mt-0.5 block">{activeMaterial.application}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">KEY PROPERTY</span>
                      <span className="text-bronze mt-0.5 block">{activeMaterial.properties}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Frame: Active Material Selections list */}
            <div className="lg:col-span-6 text-left space-y-8 lg:pl-8">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-bronze uppercase block">
                  OUR GEOLOGIC STORY
                </span>
                <h2 className="mt-2 font-serif text-4xl font-light text-cream md:text-5xl tracking-tight leading-tight">
                  Rooted in Place. Built to Last.
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-gray-400">
                  We believe the best architecture emerges from geological respect—for the sand, natural boulders, and elements. Our material selection is elemental, warm, and highly structured.
                </p>
              </div>

              {/* Vertical Interactive Selections list */}
              <div className="space-y-4 pt-4 border-t border-[#222222]">
                {MATERIALS_DATA.map((material) => {
                  const isActive = material.id === activeMaterialId;
                  return (
                    <button
                      key={material.id}
                      onClick={() => setActiveMaterialId(material.id)}
                      className={`flex w-full items-center justify-between border-b border-[#222222]/60 pb-3 text-left transition-all duration-300 group ${
                        isActive ? "border-bronze" : "hover:border-gray-700"
                      }`}
                      id={`material-btn-${material.id}`}
                    >
                      <div className="flex items-center space-x-6">
                        <span className={`font-mono text-xs ${isActive ? "text-bronze" : "text-gray-600"}`}>
                          {material.number}
                        </span>
                        <span className={`font-serif text-lg tracking-wider transition-colors ${
                          isActive ? "text-cream" : "text-gray-500 group-hover:text-gray-300"
                        }`}>
                          {material.name}
                        </span>
                      </div>
                      
                      {/* Active Indicator or arrow */}
                      <div className="flex items-center space-x-3">
                        <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-gray-600 uppercase">
                          {material.accent}
                        </span>
                        <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isActive ? "bg-bronze scale-125 shadow-[0_0_8px_rgba(191,163,124,0.6)]" : "bg-transparent"
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => launchContactPortal()}
                  className="group inline-flex items-center text-xs font-mono tracking-widest text-bronze uppercase hover:text-cream transition-all duration-300"
                >
                  EXPLORE OUR SITE PALETTE <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 6. METRICS STATS BAR */}
      <section className="relative bg-[#121212] py-20 border-b border-[#222222]/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* 4-column metric layout */}
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 divide-y-0 md:divide-x divide-[#222222]">
            
            {/* Stat 1 */}
            <div className="text-center flex flex-col items-center justify-center space-y-2 px-4">
              <div className="flex items-center space-x-2 text-bronze">
                <Building2 className="h-4 w-4 stroke-[1.5]" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Timeline</span>
              </div>
              <span className="font-serif text-5xl font-light text-cream tracking-tight md:text-6xl">
                {stats.years}+
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase text-center max-w-[150px]">
                YEARS BUILDING IN THE DESERT
              </span>
            </div>

            {/* Stat 2 */}
            <div className="text-center flex flex-col items-center justify-center space-y-2 px-4">
              <div className="flex items-center space-x-2 text-bronze">
                <Home className="h-4 w-4 stroke-[1.5]" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Portfolio</span>
              </div>
              <span className="font-serif text-5xl font-light text-cream tracking-tight md:text-6xl">
                {stats.homes}+
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase text-center max-w-[150px]">
                CUSTOM HOMES COMPLETED
              </span>
            </div>

            {/* Stat 3 */}
            <div className="text-center flex flex-col items-center justify-center space-y-2 px-4">
              <div className="flex items-center space-x-2 text-bronze">
                <Award className="h-4 w-4 stroke-[1.5]" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Laurels</span>
              </div>
              <span className="font-serif text-5xl font-light text-cream tracking-tight md:text-6xl">
                {stats.awards}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase text-center max-w-[150px]">
                AWARDS FOR DESIGN + CRAFT
              </span>
            </div>

            {/* Stat 4 */}
            <div className="text-center flex flex-col items-center justify-center space-y-2 px-4">
              <div className="flex items-center space-x-2 text-bronze">
                <Check className="h-4 w-4 stroke-[1.5]" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Guarantee</span>
              </div>
              <span className="font-serif text-5xl font-light text-cream tracking-tight md:text-6xl">
                {stats.commitment}%
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase text-center max-w-[150px]">
                COMMITMENT TO QUALITY
              </span>
            </div>

          </div>
        </div>
      </section>


      {/* 7. OUR PROCESS SECTION (HORIZONTAL TIMELINE) */}
      <section id="process" className="relative bg-[#0f0f0f] py-28 border-b border-[#222222]/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="text-left max-w-2xl pb-16">
            <span className="font-mono text-xs tracking-[0.2em] text-bronze uppercase block">THE METHODOLOGY</span>
            <h2 className="mt-2 font-serif text-4xl font-light text-cream md:text-5xl tracking-tight leading-tight">
              A Clear Path to Your Home
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-gray-400">
              Building a custom desert villa requires deep design alignment and zero-fault planning. Click on each step below to inspect our detailed workflow checkpoints.
            </p>
          </div>

          {/* Stepper Grid (5 steps) */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 border-t border-b border-[#222222]/80 py-8">
            {PROCESS_STEPS_DATA.map((step) => {
              const isSelected = step.number === activeStepNumber;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepNumber(step.number)}
                  className={`relative p-6 text-left transition-all duration-300 group border ${
                    isSelected ? "border-bronze bg-[#121212]" : "border-transparent hover:bg-[#121212]/30"
                  }`}
                  id={`process-step-${step.number}`}
                >
                  {/* Step Accent Number */}
                  <span className={`font-mono text-xs tracking-widest block transition-colors ${
                    isSelected ? "text-bronze" : "text-gray-600 group-hover:text-gray-400"
                  }`}>
                    PHASE {step.number}
                  </span>

                  {/* Step Title */}
                  <h4 className="mt-3 font-serif text-lg tracking-wider text-cream group-hover:text-bronze transition-colors">
                    {step.title}
                  </h4>

                  {/* Fast desc */}
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-gray-500 line-clamp-2">
                    {step.description}
                  </p>

                  {/* Active bottom border accent */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Step Detail Box */}
          <div className="mt-8 bg-[#121212] border border-[#222222] p-8 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#222222]/60 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-lg text-bronze">{activeStep.number}</span>
                <h4 className="font-serif text-2xl font-light text-cream tracking-tight uppercase">
                  {activeStep.title} PROCESS
                </h4>
              </div>
              <span className="font-mono text-xs text-gray-500 uppercase mt-2 sm:mt-0">
                Phase Checkpoint
              </span>
            </div>
            
            <p className="font-sans text-sm leading-relaxed text-gray-300 max-w-3xl">
              {activeStep.extendedDetail}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-gray-500 uppercase">
              <span className="flex items-center space-x-2 bg-[#0f0f0f] px-3 py-1.5 border border-[#222222]">
                <Check className="h-3 w-3 text-bronze" />
                <span>Transparent Cost Estimation</span>
              </span>
              <span className="flex items-center space-x-2 bg-[#0f0f0f] px-3 py-1.5 border border-[#222222]">
                <Check className="h-3 w-3 text-bronze" />
                <span>Geological Compliance Seal</span>
              </span>
              <span className="flex items-center space-x-2 bg-[#0f0f0f] px-3 py-1.5 border border-[#222222]">
                <Check className="h-3 w-3 text-bronze" />
                <span>High-Precision BIM Modeling</span>
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* 8. TESTIMONIAL/SLIDER (IMMERSIVE FULL-WIDTH BACKDROP) */}
      <section className="relative min-h-[70vh] flex items-center bg-[#1a1a1a]">
        
        {/* Immersive background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/desert_terrace_interior_1782758102801.jpg"
            alt="TerraForma sunset patio looking at mountains"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          {/* Intense dark radial and dark-wash gradient overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0f0f0f]/80 to-transparent" />
        </div>

        {/* Testimonial slider text layout */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* The main quote container */}
            <div className="lg:col-span-8 space-y-6">
              {/* Custom quotation mark */}
              <span className="font-serif text-6xl text-bronze/40 block leading-none">“</span>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-cream leading-snug tracking-wide"
                >
                  {activeTestimonial.quote}
                </motion.p>
              </AnimatePresence>

              {/* Author & Location */}
              <div className="pt-4 border-t border-[#333333] max-w-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs tracking-[0.2em] text-cream uppercase block font-medium">
                        {activeTestimonial.author}
                      </span>
                      <span className="mt-0.5 font-mono text-[10px] tracking-wider text-gray-500 uppercase block">
                        Client Partner
                      </span>
                    </div>
                    <span className="font-mono text-xs tracking-wider text-bronze uppercase">
                      {activeTestimonial.location}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Slider Navigation controls (bottom right) */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end items-center space-x-4">
              <button
                onClick={prevTestimonial}
                className="flex h-12 w-12 items-center justify-center border border-gray-600 hover:border-bronze text-gray-400 hover:text-cream transition-colors rounded-none"
                aria-label="Previous testimonial"
                id="testimonial-prev"
              >
                <ArrowLeft className="h-5 w-5 stroke-[1.5]" />
              </button>
              <div className="font-mono text-xs tracking-widest text-gray-500 uppercase">
                {testimonialIndex + 1} / {TESTIMONIALS_DATA.length}
              </div>
              <button
                onClick={nextTestimonial}
                className="flex h-12 w-12 items-center justify-center border border-gray-600 hover:border-bronze text-gray-400 hover:text-cream transition-colors rounded-none"
                aria-label="Next testimonial"
                id="testimonial-next"
              >
                <ArrowRight className="h-5 w-5 stroke-[1.5]" />
              </button>
            </div>

          </div>
        </div>

      </section>


      {/* 9. FOOTER CALL TO ACTION & CONTACT DETAILS */}
      <section className="relative bg-[#0f0f0f] py-28 border-t border-[#222222]/40 overflow-hidden">
        
        {/* Subtle decorative high-desert vector-ish shadows / background elements */}
        <div className="absolute right-0 bottom-0 h-96 w-96 opacity-10 bg-gradient-to-tr from-bronze to-transparent rounded-full filter blur-3xl z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Box: Title & Large CTA Link button */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="font-mono text-xs tracking-[0.2em] text-bronze uppercase block">
                LET'S BUILD SOMETHING ENDURING.
              </span>
              <h2 className="font-serif text-4xl font-light text-cream md:text-5xl tracking-tight leading-tight">
                Start the <br />
                Conversation
              </h2>
              <p className="font-sans text-sm leading-relaxed text-gray-400 max-w-md">
                Ready to begin your custom desert architectural journey? Connect with our master builders and design principals in our Carefree studio.
              </p>
              
              <div className="pt-6">
                <button
                  onClick={() => launchContactPortal()}
                  className="group inline-flex items-center justify-center border border-bronze bg-[#121212] hover:bg-bronze hover:text-black text-cream px-8 py-4 text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300"
                  id="footer-contact-trigger"
                >
                  CONTACT US{" "}
                  <span className="ml-2 font-sans group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Right Box: Direct studio coordinates & coordinates map card placeholder */}
            <div className="lg:col-span-6 space-y-8 lg:pl-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left font-sans">
                
                {/* Phones & Hours */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] tracking-widest text-gray-500 uppercase border-b border-[#222222] pb-2">
                    DIRECT PORTAL
                  </h4>
                  <div className="flex items-center space-x-3 text-sm text-cream font-mono">
                    <Phone className="h-4 w-4 text-bronze shrink-0" />
                    <span>480.555.0134</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <Mail className="h-4 w-4 text-bronze shrink-0" />
                    <span className="font-mono">hello@terraformaresidences.com</span>
                  </div>
                </div>

                {/* Studio address */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] tracking-widest text-gray-500 uppercase border-b border-[#222222] pb-2">
                    STUDIO COORDINATES
                  </h4>
                  <div className="flex items-start space-x-3 text-sm text-cream">
                    <MapPin className="h-4 w-4 text-bronze shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans">120 Saguaro Way</p>
                      <p className="font-sans text-xs text-gray-400">Carefree, Arizona 85377</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Minimalist styled coordinates display / visual banner */}
              <div className="border border-[#222222] bg-[#121212]/50 p-6 text-left">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-gray-500 uppercase border-b border-[#222222]/80 pb-3 mb-3">
                  <span>CAREFREE REGIONAL STUDIO</span>
                  <span className="text-bronze">GPS: 33.7995° N, 111.9101° W</span>
                </div>
                <p className="font-sans text-xs leading-relaxed text-gray-400">
                  Our principal studio, nestled in Carefree, serves as a physical showcase for our rammed-earth prototypes, stone samples, and glass-engineering mockups. Scheduled appointments required.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 10. MAIN FOOTER END SECTION */}
      <footer className="relative bg-[#0c0c0c] pt-20 pb-12 border-t border-[#222222]/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-16 border-b border-[#222222]/40">
            
            {/* Logo box */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-7 w-7 border border-bronze flex items-center justify-center font-serif text-sm font-light text-cream">
                  T
                </div>
                <span className="font-serif text-lg tracking-[0.2em] text-cream uppercase">TERRAFORMA</span>
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-gray-500 max-w-xs">
                Exacting architectural design and high-precision desert home engineering. Sculpted with native elements to endure the test of geological time.
              </p>
            </div>

            {/* Quick Links Column 1 */}
            <div className="md:col-span-2 space-y-4">
              <h5 className="font-mono text-[10px] tracking-widest text-bronze uppercase">
                ABOUT
              </h5>
              <ul className="space-y-2 text-xs font-sans text-gray-500">
                <li><a href="#hero" className="hover:text-cream transition-colors">Our Story</a></li>
                <li><a href="#services" className="hover:text-cream transition-colors">Our Team</a></li>
                <li><a href="#process" className="hover:text-cream transition-colors">Awards</a></li>
                <li><a href="#materials" className="hover:text-cream transition-colors">Client Journals</a></li>
              </ul>
            </div>

            {/* Quick Links Column 2 */}
            <div className="md:col-span-2 space-y-4">
              <h5 className="font-mono text-[10px] tracking-widest text-bronze uppercase">
                SERVICES
              </h5>
              <ul className="space-y-2 text-xs font-sans text-gray-500">
                <li><button onClick={() => { setSelectedService(SERVICES_DATA[0]); setServiceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Custom Homes</button></li>
                <li><button onClick={() => { setSelectedService(SERVICES_DATA[1]); setServiceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Design + Build</button></li>
                <li><button onClick={() => { setSelectedService(SERVICES_DATA[2]); setServiceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Renovations</button></li>
                <li><button onClick={() => { setSelectedService(SERVICES_DATA[3]); setServiceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Land Planning</button></li>
              </ul>
            </div>

            {/* Quick Links Column 3 */}
            <div className="md:col-span-2 space-y-4">
              <h5 className="font-mono text-[10px] tracking-widest text-bronze uppercase">
                RESIDENCES
              </h5>
              <ul className="space-y-2 text-xs font-sans text-gray-500">
                <li><button onClick={() => { setSelectedResidence(RESIDENCES_DATA[0]); setResidenceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Ocotillo Ridge</button></li>
                <li><button onClick={() => { setSelectedResidence(RESIDENCES_DATA[1]); setResidenceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Black Mountain</button></li>
                <li><button onClick={() => { setSelectedResidence(RESIDENCES_DATA[2]); setResidenceModalOpen(true); }} className="hover:text-cream text-left transition-colors">Saguaro View</button></li>
              </ul>
            </div>

            {/* Quick Links Column 4 */}
            <div className="md:col-span-2 space-y-4">
              <h5 className="font-mono text-[10px] tracking-widest text-bronze uppercase">
                RESOURCES
              </h5>
              <ul className="space-y-2 text-xs font-sans text-gray-500">
                <li><a href="#materials" className="hover:text-cream transition-colors">Raw Materials</a></li>
                <li><a href="#process" className="hover:text-cream transition-colors">Process Guide</a></li>
                <li><a href="#hero" className="hover:text-cream transition-colors">Sustainability Code</a></li>
              </ul>
            </div>

          </div>

          {/* Socials & Legal */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-gray-600 uppercase gap-6">
            <div className="flex space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors">INSTAGRAM</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors">PINTEREST</a>
              <a href="https://houzz.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors">HOUZZ</a>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-center md:text-right text-gray-600">
              <span>© {new Date().getFullYear()} TerraForma Residences. All Rights Reserved.</span>
              <a href="#hero" className="hover:text-cream transition-colors">Privacy Policy</a>
              <a href="#hero" className="hover:text-cream transition-colors">Terms of Use</a>
            </div>
          </div>

        </div>
      </footer>


      {/* 11. INTERACTIVE PORTALS (MODAL OVERLAYS) */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefilledResidence={prefilledResidence}
      />

      <ResidenceModal
        isOpen={residenceModalOpen}
        residence={selectedResidence}
        onClose={() => {
          setResidenceModalOpen(false);
          setSelectedResidence(null);
        }}
        onInquire={(resName) => launchContactPortal(resName)}
      />

      <ServiceModal
        isOpen={serviceModalOpen}
        service={selectedService}
        onClose={() => {
          setServiceModalOpen(false);
          setSelectedService(null);
        }}
        onContact={() => launchContactPortal()}
      />

    </div>
  );
}
