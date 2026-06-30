import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Home, Maximize, ArrowRight, Layers, MapPin } from "lucide-react";
import { Residence } from "../types";

interface ResidenceModalProps {
  isOpen: boolean;
  residence: Residence | null;
  onClose: () => void;
  onInquire: (residenceName: string) => void;
}

export default function ResidenceModal({ isOpen, residence, onClose, onInquire }: ResidenceModalProps) {
  if (!residence) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative grid w-full max-w-5xl overflow-hidden rounded-none border border-[#333333] bg-[#0f0f0f] text-cream grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 left-0 h-[2px] w-12 bg-bronze z-10" />
            <div className="absolute top-0 left-0 h-12 w-[2px] bg-bronze z-10" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center bg-black/50 backdrop-blur-sm border border-[#333333] text-gray-400 transition-colors hover:text-bronze"
              aria-label="Close residence modal"
              id="close-residence-modal"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* Left Column: Architectural Photo */}
            <div className="relative h-64 md:h-full md:col-span-6 bg-[#1a1a1a] overflow-hidden">
              <img
                src={residence.image}
                alt={residence.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-[2000ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0f0f0f]/30" />
              
              {/* Overline Badge inside Photo */}
              <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.2em] text-cream/80 bg-black/45 px-3 py-1.5 border border-white/10 uppercase backdrop-blur-sm">
                SITE-INTEGRATED MODERNISM
              </div>
            </div>

            {/* Right Column: Editorial Specs and Copy */}
            <div className="p-8 md:p-12 md:col-span-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-bronze">
                    <MapPin className="h-4 w-4 stroke-[1.5]" />
                    <span className="font-mono text-xs tracking-widest uppercase">{residence.location}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-3xl font-light tracking-tight text-cream md:text-4xl">
                    {residence.name}
                  </h3>
                </div>

                {/* Technical Grid */}
                <div className="grid grid-cols-3 gap-4 border-y border-[#262626] py-5 text-left font-mono">
                  <div>
                    <div className="flex items-center space-x-1.5 text-gray-500 text-[10px] tracking-wider uppercase">
                      <Maximize className="h-3 w-3 text-bronze" />
                      <span>Scale</span>
                    </div>
                    <div className="mt-1.5 text-sm text-cream font-light">{residence.area}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 text-gray-500 text-[10px] tracking-wider uppercase">
                      <Calendar className="h-3 w-3 text-bronze" />
                      <span>Completed</span>
                    </div>
                    <div className="mt-1.5 text-sm text-cream font-light">{residence.year}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 text-gray-500 text-[10px] tracking-wider uppercase">
                      <Home className="h-3 w-3 text-bronze" />
                      <span>Typology</span>
                    </div>
                    <div className="mt-1.5 text-sm text-cream font-light">Custom Villa</div>
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-4">
                  <h4 className="font-mono text-[11px] tracking-widest text-bronze uppercase">
                    ARCHITECTURAL BRIEF
                  </h4>
                  <p className="font-sans text-sm leading-relaxed text-gray-400">
                    {residence.description}
                  </p>
                </div>

                {/* Materials & Systems Specs */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-[11px] tracking-widest text-bronze uppercase">
                    CRAFTED SPECIFICATIONS
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-gray-400 font-sans">
                    {residence.specs.map((spec, index) => (
                      <li key={index} className="flex items-center space-x-2.5">
                        <span className="h-1.5 w-1.5 bg-bronze shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                    <li className="flex items-center space-x-2.5">
                      <span className="h-1.5 w-1.5 bg-bronze shrink-0" />
                      <span>Fully engineered HVAC zoning for desert extremes</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="h-1.5 w-1.5 bg-bronze shrink-0" />
                      <span>UV-blocking low-iron insulated glazing units</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 mt-6 border-t border-[#262626] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
                  PROJECT ID: TFR-{residence.id.toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onInquire(residence.name);
                  }}
                  className="group inline-flex items-center justify-center border border-bronze bg-[#1a1a1a]/40 hover:bg-bronze hover:text-black text-cream px-6 py-3 text-[11px] font-mono tracking-[0.15em] uppercase transition-all duration-300"
                >
                  INQUIRE ABOUT DESIGN <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
