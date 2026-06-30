import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Mail, Phone, MapPin } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledResidence?: string;
}

export default function ContactModal({ isOpen, onClose, prefilledResidence }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "Carefree",
    projectType: prefilledResidence ? "Custom Home" : "Custom Home",
    budget: "$2.5M - $5M",
    landStatus: "Searching for land",
    message: prefilledResidence ? `I am interested in learning more about a build inspired by the ${prefilledResidence} residence.` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury submission experience
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      region: "Carefree",
      projectType: "Custom Home",
      budget: "$2.5M - $5M",
      landStatus: "Searching for land",
      message: "",
    });
    setIsSuccess(false);
    onClose();
  };

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-none border border-[#333333] bg-[#121212] p-8 text-cream md:p-12"
          >
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 h-[2px] w-12 bg-bronze" />
            <div className="absolute top-0 right-0 h-12 w-[2px] bg-bronze" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 transition-colors hover:text-bronze"
              aria-label="Close modal"
              id="close-contact-modal"
            >
              <X className="h-6 w-6 stroke-[1.5]" />
            </button>

            {!isSuccess ? (
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-bronze uppercase">
                  {prefilledResidence ? `Inquire: ${prefilledResidence}` : "CONVERSATION PORTAL"}
                </span>
                <h3 className="mt-2 font-serif text-3xl font-light text-cream md:text-4xl">
                  Start the Conversation
                </h3>
                <p className="mt-3 font-sans text-sm text-gray-400">
                  Begin your design journey with TerraForma. Share your parameters, and our design partners will connect with you.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                        placeholder="Elizabeth Vance"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                        placeholder="elizabeth@vance.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Phone */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                        placeholder="480.555.0134"
                      />
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Build Location
                      </label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                      >
                        <option value="Carefree" className="bg-[#121212]">Carefree, AZ</option>
                        <option value="Scottsdale" className="bg-[#121212]">Scottsdale, AZ</option>
                        <option value="Tucson" className="bg-[#121212]">Tucson, AZ</option>
                        <option value="Other" className="bg-[#121212]">Other Region</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Project Type */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Service Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                      >
                        <option value="Custom Home" className="bg-[#121212]">Custom Home</option>
                        <option value="Design + Build" className="bg-[#121212]">Design + Build</option>
                        <option value="Renovation" className="bg-[#121212]">Renovation</option>
                        <option value="Land Planning" className="bg-[#121212]">Land Planning</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                      >
                        <option value="$1.5M - $2.5M" className="bg-[#121212]">$1.5M - $2.5M</option>
                        <option value="$2.5M - $5M" className="bg-[#121212]">$2.5M - $5M</option>
                        <option value="$5M - $10M" className="bg-[#121212]">$5M - $10M</option>
                        <option value="$10M+" className="bg-[#121212]">$10M+</option>
                      </select>
                    </div>

                    {/* Land Status */}
                    <div>
                      <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                        Land Status
                      </label>
                      <select
                        value={formData.landStatus}
                        onChange={(e) => setFormData({ ...formData, landStatus: e.target.value })}
                        className="mt-2 w-full border-b border-[#333333] bg-transparent py-2 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                      >
                        <option value="Own Land" className="bg-[#121212]">I Own Land</option>
                        <option value="Under Contract" className="bg-[#121212]">Under Contract</option>
                        <option value="Searching for land" className="bg-[#121212]">Searching for land</option>
                        <option value="No land needed" className="bg-[#121212]">No land needed</option>
                      </select>
                    </div>
                  </div>

                  {/* Vision message */}
                  <div>
                    <label className="block font-mono text-xs tracking-wider text-gray-400 uppercase">
                      Your Architectural Vision
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 w-full border border-[#333333] bg-transparent p-3 font-sans text-sm text-cream transition-colors focus:border-bronze focus:outline-none"
                      placeholder="Describe your design aspirations, preferred architectural materials, or unique site parameters..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex w-full items-center justify-center border border-bronze bg-transparent py-4 text-xs font-mono tracking-[0.2em] text-cream uppercase transition-all duration-300 hover:bg-bronze hover:text-black disabled:border-gray-700 disabled:text-gray-500"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 animate-spin text-bronze group-hover:text-black" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>SECURELY TRANSMITTING...</span>
                        </div>
                      ) : (
                        <span className="flex items-center">
                          INITIATE CONSULTATION <span className="ml-2 font-sans group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-none border border-bronze bg-transparent text-bronze">
                  <Check className="h-8 w-8 stroke-[1.5]" />
                </div>
                <h3 className="mt-6 font-serif text-3xl font-light text-cream">
                  Connection Established
                </h3>
                <p className="mx-auto mt-4 max-w-md font-sans text-sm text-gray-400">
                  Thank you, <span className="text-bronze font-medium">{formData.name}</span>. Your architectural brief has been securely cataloged. An advisor from our <span className="text-cream">Carefree Studio</span> will reach out within 48 hours to begin the dialogue.
                </p>

                <div className="mt-8 grid w-full max-w-sm grid-cols-1 gap-4 border-t border-[#333333] pt-6 text-left text-xs font-mono tracking-wider text-gray-500 uppercase">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-bronze shrink-0" />
                    <span>STUDIO: 120 Saguaro Way, Carefree AZ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-bronze shrink-0" />
                    <span>DIRECT: 480.555.0134</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-bronze shrink-0" />
                    <span>SECURE: hello@terraformaresidences.com</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-10 border border-[#333333] px-8 py-3 text-xs font-mono tracking-[0.15em] text-gray-400 uppercase transition-colors hover:border-bronze hover:text-bronze"
                  id="close-success-portal"
                >
                  RETURN TO RESIDENCES
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
