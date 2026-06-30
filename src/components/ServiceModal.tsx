import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight } from "lucide-react";
import { Service } from "../types";

interface ServiceModalProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
  onContact: () => void;
}

export default function ServiceModal({ isOpen, service, onClose, onContact }: ServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-none border border-[#333333] bg-[#121212] p-8 text-cream md:p-10"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 h-[2px] w-12 bg-bronze" />
            <div className="absolute top-0 right-0 h-12 w-[2px] bg-bronze" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 transition-colors hover:text-bronze"
              aria-label="Close service modal"
              id="close-service-modal"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* Header */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-bronze uppercase">
                CAPABILITY DEEP DIVE
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light tracking-tight text-cream md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-3 font-sans text-sm text-gray-400">
                {service.description}
              </p>
            </div>

            {/* Core Competencies List */}
            <div className="mt-6 space-y-4">
              <h4 className="font-mono text-[11px] tracking-widest text-bronze uppercase border-b border-[#262626] pb-2">
                CORE WORK SCOPE
              </h4>
              <div className="space-y-3">
                {service.details.map((detail, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="flex items-start space-x-3 text-sm text-gray-300 font-sans"
                  >
                    <Check className="h-4 w-4 text-bronze shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Paragraph of Philosophy */}
            <p className="mt-6 font-sans text-xs text-gray-500 leading-relaxed">
              At TerraForma, every project is anchored in site integration and premium architectural values. We engage heavily in early modeling, structural analysis, and physical prototyping to ensure total site synchronization.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-[#262626]">
              <button
                onClick={onClose}
                className="font-mono text-[10px] tracking-wider text-gray-400 uppercase hover:text-bronze transition-colors"
                id="close-service"
              >
                CLOSE DETAILS
              </button>
              <button
                onClick={() => {
                  onClose();
                  onContact();
                }}
                className="group inline-flex items-center justify-center bg-bronze hover:bg-bronze-dark text-black font-mono text-[10px] tracking-wider px-5 py-3 uppercase transition-all duration-300"
              >
                REQUEST SCOPE ME <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
