export interface Residence {
  id: string;
  name: string;
  location: string;
  image: string;
  area: string;
  year: string;
  description: string;
  specs: string[];
}

export interface Material {
  id: string;
  number: string;
  name: string;
  accent: string;
  detail: string;
  application: string;
  properties: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  extendedDetail: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: "custom-homes",
    title: "CUSTOM HOMES",
    description: "Bespoke residences, designed and built around your lifestyle and the land.",
    details: [
      "Site-specific micro-climate integration",
      "Tailored space planning for modern desert living",
      "Curated luxury material palettes",
      "Full construction management"
    ]
  },
  {
    id: "design-build",
    title: "DESIGN + BUILD",
    description: "A seamless, collaborative process from concept to completion.",
    details: [
      "In-house architectural designers and builders",
      "Single-point of communication and accountability",
      "Continuous cost-estimating and value engineering",
      "Faster delivery schedule with minimized conflict"
    ]
  },
  {
    id: "renovations",
    title: "RENOVATIONS",
    description: "Thoughtful transformations that respect the architecture and site.",
    details: [
      "Mid-century modern restoration expertise",
      "Structural re-configuration for open indoor-outdoor flow",
      "Premium thermal envelope upgrades",
      "High-end custom cabinetry and finish carpentry"
    ]
  },
  {
    id: "land-planning",
    title: "LAND + PLANNING",
    description: "Guidance in selecting and planning the perfect setting for your home.",
    details: [
      "Topography and soil evaluation",
      "Solar path, wind, and view analysis",
      "Civil feasibility and utility access assessments",
      "Native desert preservation planning"
    ]
  }
];

export const RESIDENCES_DATA: Residence[] = [
  {
    id: "ocotillo-ridge",
    name: "OCOTILLO RIDGE",
    location: "Scottsdale, Arizona",
    image: "/src/assets/images/residence_ocotillo_1782758120280.jpg",
    area: "6,200 sq ft",
    year: "2024",
    description: "Sited to frame sweeping views of the McDowell Mountains, this residence uses native stone massing and cantilevered metal overhangs to merge with the desert ridge.",
    specs: ["Steel Frame Structure", "Rammed Earth Walls", "Passive Solar Design"]
  },
  {
    id: "black-mountain",
    name: "BLACK MOUNTAIN HOUSE",
    location: "Carefree, Arizona",
    image: "/src/assets/images/residence_black_mountain_1782758136526.jpg",
    area: "5,400 sq ft",
    year: "2023",
    description: "Tucked into the rugged slope of Black Mountain, this residence is defined by thin, horizontal slabs of raw concrete, expansive floor-to-ceiling glass, and custom weathered corten cladding.",
    specs: ["Exposed Cast-in-place Concrete", "Corten Steel Panels", "Zero-edge Lap Pool"]
  },
  {
    id: "saguaro-view",
    name: "SAGUARO VIEW",
    location: "Tucson, Arizona",
    image: "/src/assets/images/residence_saguaro_view_1782758153008.jpg",
    area: "4,800 sq ft",
    year: "2025",
    description: "A minimalist villa that opens entirely to the desert breeze, structured with thick timber ceilings and rich earthen plasters that capture the changing colors of sunset.",
    specs: ["Charred Wood Finishes", "Earthen Clay Plasters", "Rainwater Harvesting System"]
  }
];

export const MATERIALS_DATA: Material[] = [
  {
    id: "stone",
    number: "01",
    name: "NATURAL STONE",
    accent: "Locally Sourced Sandstone",
    detail: "Hand-selected split-face sandstone quarried from northern Arizona. Providing structural density and organic connection, it grounds the home into the site's geologic timeline.",
    application: "Retaining walls, exterior cladding, focal chimneys.",
    properties: "Thermal massing, high durability, maintenance-free."
  },
  {
    id: "steel",
    number: "02",
    name: "WEATHERED STEEL",
    accent: "Corten Alloys",
    detail: "Rich pre-oxidized steel panels that develop a beautiful, protective rust-colored patina when exposed to the arid desert climate, shifting from orange to deep bronze over decades.",
    application: "Exterior facade, custom window deep-sets, architectural louvers.",
    properties: "Self-healing oxide layer, low solar absorption, recyclable."
  },
  {
    id: "earth",
    number: "03",
    name: "RAMMED EARTH",
    accent: "Native Clay & Aggregate",
    detail: "Constructed using raw soil sourced directly from the site, mixed with aggregates and compacted inside formwork. It provides extraordinary thermal properties and unique layered bands.",
    application: "Primary load-bearing structural walls, interior feature walls.",
    properties: "Excellent acoustic insulation, fire-resistant, high thermal mass."
  },
  {
    id: "wood",
    number: "04",
    name: "CHARRED WOOD",
    accent: "Yakisugi Cedar",
    detail: "An ancient Japanese method of wood preservation (Shou Sugi Ban) where the surface is carefully charred, cooled, brushed, and sealed with natural oils, protecting it against decay, pests, and fire.",
    application: "Soffits, interior accents, shaded courtyard screens.",
    properties: "Waterproof, UV-resistant, natural charcoal-textured finish."
  },
  {
    id: "bronze",
    number: "05",
    name: "BRONZE + BRASS",
    accent: "Hand-patinated Hardware",
    detail: "Solid copper alloys utilized for custom hardware and tactile interfaces. These materials age gracefully, tarnishing in response to human touch, leaving a historical record of interaction.",
    application: "Entry portals, custom light fixtures, tactile handles.",
    properties: "Natural antimicrobial, heavy and solid, rich color patina."
  }
];

export const PROCESS_STEPS_DATA: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "We listen, learn, and explore the possibilities together.",
    extendedDetail: "A comprehensive deep dive into your lifestyle, aesthetic aspirations, and budget, paired with walking and reading the topography, solar vectors, and views of your specific parcel of land."
  },
  {
    number: "02",
    title: "DESIGN",
    description: "Our team designs a home that reflects your vision and the land.",
    extendedDetail: "An iterative, collaborative process where architectural plans, 3D renderings, and physical material palettes are developed to ensure harmony between internal volumes and the external desert floor."
  },
  {
    number: "03",
    title: "PLAN",
    description: "Thoughtful planning and documentation ensure clarity.",
    extendedDetail: "Securing permits, final structural drafting, and full technical specifications. We provide clear, transparent pricing down to the linear foot, establishing confidence before ground is broken."
  },
  {
    number: "04",
    title: "BUILD",
    description: "Expert craft, transparent communication, and unwavering standards.",
    extendedDetail: "Our dedicated site managers and master tradespeople bring the plans to life. We utilize high-precision structural detailing, custom-fabricated architectural finishes, and provide real-time photo logs."
  },
  {
    number: "05",
    title: "LIVE",
    description: "Move in and experience a home that's built to endure.",
    extendedDetail: "After passing rigorous multi-point quality inspections, we hand over the keys and walk you through every automated smart system, mechanical asset, and material maintenance guideline."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "marshall",
    quote: "TerraForma brought our dream to life with integrity, creativity, and an incredible attention to detail. We couldn't imagine building with anyone else.",
    author: "THE MARSHALL FAMILY",
    location: "Carefree, Arizona"
  },
  {
    id: "reid",
    quote: "The team possesses an unmatched understanding of how light, shadow, and materials interact with the desert landscape. Our home feels like an organic extension of the ridge.",
    author: "DR. ARLO & KATHERINE REID",
    location: "Scottsdale, Arizona"
  },
  {
    id: "vance",
    quote: "From the raw sandstone walls to the perfectly aligned steel details, every square inch of our home reflects their obsessive pursuit of craft.",
    author: "MARCUS & LINDA VANCE",
    location: "Tucson, Arizona"
  }
];
