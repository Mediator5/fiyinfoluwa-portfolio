// Your website portfolio. Screenshots live in /public/projects/<slug>.jpg
// (and <slug>-mobile.jpg when available). Run `npm run capture` to refresh them.

export type Project = {
  slug: string;
  name: string;
  url: string;
  industry: string;
  filter: "Finance" | "Consulting" | "Logistics" | "Lifestyle" | "Food";
  location?: string;
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  stack: string[];
  accent: string;
  mobile?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "carter-cole",
    name: "Carter Cole & Associates",
    url: "https://carter-cole-nextjs.vercel.app/",
    industry: "Tax, Credit & Business Services",
    filter: "Finance",
    location: "Detroit, MI",
    headline: "Clarity in your taxes. Confidence in your credit.",
    summary:
      "A full multi-service website for a Detroit firm offering tax preparation, credit repair, business formation and bookkeeping since 2003.",
    challenge:
      "Five different services, two brands (Carter Cole and its SmartTaxIQ tax division) and a lot of trust to earn — all needed to live on one site without overwhelming visitors.",
    solution:
      "I built an editorial, founder-led design with clear service paths, a ‘Book Consultation’ CTA that follows you everywhere, trust stats above the fold and a dedicated route into the tax division.",
    features: [
      "Consultation booking flow",
      "‘Start your tax return’ intake",
      "Lead-magnet checklist signup",
      "Secure client portal entry",
      "Locations & resources hub",
      "Client testimonials",
    ],
    stack: ["Next.js", "Tailwind CSS", "Responsive", "SEO"],
    accent: "#E0B84A",
    mobile: true,
    featured: true,
  },
  {
    slug: "smarttaxiq",
    name: "SmartTaxIQ",
    url: "https://smarttaxiqnext.vercel.app/",
    industry: "Tax Preparation",
    filter: "Finance",
    location: "Detroit, MI · Nationwide",
    headline: "Your taxes, done right — and explained so they make sense.",
    summary:
      "A conversion-focused site for a licensed tax preparer filing remotely across all 50 states.",
    challenge:
      "Tax clients are anxious and comparison-shopping. The site had to explain pricing, deadlines and the process quickly — and get people to start filing.",
    solution:
      "A bold, plain-language layout with a live ‘next federal deadline’ bar, transparent pricing, a 3-step ‘How it works’ and a ‘File My Taxes’ intake with secure document upload.",
    features: [
      "Live deadline countdown bar",
      "Secure document upload intake",
      "Transparent pricing tables",
      "Deadline calendar & reminders",
      "Academy / resources section",
      "FAQ with structured answers",
    ],
    stack: ["Next.js", "Tailwind CSS", "Forms", "SEO"],
    accent: "#E3B341",
    mobile: true,
    featured: true,
  },
  {
    slug: "get-your-credit-poppin",
    name: "Get Your Credit Poppin",
    url: "https://getyourcreditpoppin.vercel.app/",
    industry: "Credit Repair",
    filter: "Finance",
    location: "Oklahoma City, OK",
    headline: "Poor credit? No problem. Let’s get it poppin’!",
    summary:
      "A high-energy lead-generation site for an Oklahoma City credit repair and credit building company serving clients nationwide.",
    challenge:
      "Credit repair is a low-trust industry. The brand needed to feel friendly and human while still pushing visitors to book a free consultation.",
    solution:
      "Warm lifestyle photography, an animated credit-score card, social proof right under the CTA and a consultation form with goal selection and SMS consent.",
    features: [
      "Free consultation booking form",
      "Goal-based photo galleries",
      "Animated credit score widget",
      "Click-to-call everywhere",
      "3-step process section",
      "FAQ & office hours",
    ],
    stack: ["Next.js", "Tailwind CSS", "Lead forms", "SEO"],
    accent: "#FFA51F",
    mobile: true,
    featured: true,
  },
  {
    slug: "quantum-district",
    name: "Quantum District",
    url: "https://quantum-district.vercel.app/",
    industry: "Technology & Management Consulting",
    filter: "Consulting",
    location: "Washington, DC",
    headline: "Turning complex challenges into measurable progress.",
    summary:
      "A polished corporate site for a strategy and technology consulting firm serving government, healthcare, finance and education.",
    challenge:
      "Enterprise buyers expect credibility and clarity. The firm needed to look established and make it easy to start a scoped conversation.",
    solution:
      "A dark, grid-textured corporate design with an AI chat assistant for scoping questions, a 4-phase approach section, discovery-call booking and a client portal entry.",
    features: [
      "AI-assisted Q&A chat",
      "Discovery call booking",
      "Six service pillars",
      "4-phase approach timeline",
      "Client portal for proposals",
      "Insights / blog",
    ],
    stack: ["Next.js", "AI chat", "Tailwind CSS", "SEO"],
    accent: "#7FA2FF",
    mobile: true,
    featured: true,
  },
  {
    slug: "legacy-marketing",
    name: "Legacy Marketing & Consulting",
    url: "https://legacymarketing-rho.vercel.app/",
    industry: "Luxury Beauty & Image Consulting",
    filter: "Lifestyle",
    location: "Wilmington, DE",
    headline: "You already have it. We make the world see it.",
    summary:
      "An upscale, editorial website for a beauty, image and fine-jewelry consultancy that also offers business consulting.",
    challenge:
      "Premium services need a premium first impression — and a booking experience that feels as personal as the consultation itself.",
    solution:
      "Cream-and-gold luxury styling, elegant serif typography, priced service cards and a multi-step booking form (service → date/time → details → confirmation).",
    features: [
      "Multi-step booking form",
      "Priced service menu",
      "Free discovery call CTA",
      "Work gallery",
      "Client testimonials",
      "Business consulting section",
    ],
    stack: ["Next.js", "Tailwind CSS", "Booking flow", "SEO"],
    accent: "#C9A14A",
    mobile: true,
    featured: true,
  },
  {
    slug: "do-cargo-connect",
    name: "D&O Cargo Connect",
    url: "https://docargoconnect.com/",
    industry: "Freight Forwarding & Logistics",
    filter: "Logistics",
    location: "Houston, TX",
    headline: "Expertly managing your supply chain.",
    summary:
      "A bold, quote-driven website for a Houston freight forwarder serving e-commerce, manufacturing, retail and tech businesses.",
    challenge:
      "Logistics buyers want speed and certainty. The site needed to communicate reliability at a glance and turn visitors into quote requests.",
    solution:
      "A punchy, high-contrast design with stat badges, a 6-step process, industry pages and a detailed quote request form with service and shipment details.",
    features: [
      "Free quote request form",
      "Air, road & customs services",
      "6-step shipping process",
      "Industries served",
      "Testimonials & FAQ",
      "Click-to-call",
    ],
    stack: ["Custom build", "Responsive", "Lead forms", "SEO"],
    accent: "#F7C531",
    mobile: true,
    featured: true,
  },
  {
    slug: "aos-tradelines",
    name: "AOS Tradelines",
    url: "https://www.aostradelines.com/",
    industry: "Credit Building",
    filter: "Finance",
    headline: "Credit solutions that make an impact.",
    summary:
      "A sleek black-and-gold site for a premium tradeline provider, built around inventory, a utilization calculator and proof of results.",
    challenge:
      "The business sells a technical product. Visitors needed to understand it, see proof and browse inventory without friction.",
    solution:
      "A luxury dark theme, an interactive utilization calculator, a 4-step ‘How it works’, a comparison table against standard providers and a results gallery.",
    features: [
      "Tradeline inventory",
      "Utilization calculator",
      "Provider comparison table",
      "Proof-of-performance gallery",
      "4-step process",
      "Telegram & phone contact",
    ],
    stack: ["Custom build", "Calculator", "Responsive", "SEO"],
    accent: "#C9A44C",
    mobile: true,
  },
  {
    slug: "mable-logistics",
    name: "Mable Logistics",
    url: "https://mablelogistics.vercel.app/",
    industry: "Freight & Dispatch",
    filter: "Logistics",
    location: "Sugar Land, TX",
    headline: "We move what matters.",
    summary:
      "A dependable, industrial-feel website for a Texas freight, dispatching and courier company with national reach.",
    challenge:
      "A growing carrier needed to look as reliable as the big players and make getting a quote effortless.",
    solution:
      "Cinematic truck imagery, a ‘48 States’ coverage card, trust checkmarks under the hero, a 3-step quote-to-delivery process and a dedicated quote page.",
    features: [
      "Free quote request page",
      "Coverage & stats cards",
      "4 core services",
      "3-step process",
      "Testimonials",
      "24/7 dispatch messaging",
    ],
    stack: ["Next.js", "Tailwind CSS", "Responsive", "SEO"],
    accent: "#E5B63A",
  },
  {
    slug: "the-que-guy",
    name: "The Que Guy",
    url: "https://the-que-guy.vercel.app/",
    industry: "BBQ Catering",
    filter: "Food",
    location: "Columbus, OH",
    headline: "Bringing the smoke. Bringing the flavor.",
    summary:
      "A smoky, image-led website for an Eastern Carolina–style BBQ catering company — built to book events.",
    challenge:
      "Food sells through the eyes. The site had to make people hungry and then get them to request a catering date.",
    solution:
      "Moody full-bleed food photography, script typography, a persistent ‘Book Now’, an event booking form (date, guests, menu) and clear contract terms.",
    features: [
      "Event booking request form",
      "Menu with pan & tray pricing",
      "Catering consultation request",
      "Event-type cards",
      "Contract terms section",
      "Stats bar",
    ],
    stack: ["Next.js", "Tailwind CSS", "Booking form", "SEO"],
    accent: "#E2B53B",
  },
  {
    slug: "sea-moss-me",
    name: "Sea Moss Me",
    url: "https://sea-moss-me-nextjs.vercel.app/",
    industry: "Wellness E-commerce",
    filter: "Lifestyle",
    location: "South Florida",
    headline: "Peak health is true wealth.",
    summary:
      "A calm, coastal e-commerce site for a small-batch Jamaican sea moss gel brand with four signature flavours.",
    challenge:
      "A new wellness product needed education and trust before people would buy — plus a smooth shop experience.",
    solution:
      "Sunlit ocean imagery, a promo announcement bar, a shop with cart, ‘Sea Moss 101’ education, a fruit & herb guide, blog and newsletter signup.",
    features: [
      "Shop with cart",
      "Promo code announcement bar",
      "Sea Moss 101 education",
      "Blog & newsletter",
      "Local delivery info",
      "Customer testimonials",
    ],
    stack: ["Next.js", "E-commerce", "Tailwind CSS", "SEO"],
    accent: "#E55A3C",
  },
  {
    slug: "l-clayton",
    name: "L Clayton Services",
    url: "https://lclayton.vercel.app/",
    industry: "Financial Planning",
    filter: "Finance",
    location: "Fort Lauderdale, FL",
    headline: "Your trust. Our expertise.",
    summary:
      "An authoritative website for a CFP®-led financial planning and wealth management firm.",
    challenge:
      "Financial advisors live and die by trust. The firm needed a formal, credible presence that still felt approachable.",
    solution:
      "Navy-and-gold styling, a CFP® credential badge, service tracks for federal employees, pre-retirees and retirees, a blog and a clear ‘Let’s start a conversation’ path.",
    features: [
      "Audience-based service pages",
      "Fiduciary values section",
      "Inquiry contact form",
      "Client login",
      "Blog",
      "Video story CTA",
    ],
    stack: ["Next.js", "Tailwind CSS", "Responsive", "SEO"],
    accent: "#D2B160",
  },
  {
    slug: "gen-griffin",
    name: "Gen Griffin",
    url: "https://gengriffin-zeta.vercel.app/",
    industry: "Personal Brand · Coaching",
    filter: "Lifestyle",
    headline: "Build your confidence. Grow your brand.",
    summary:
      "A warm personal-brand website for a digital marketer, podcaster, author and confidence coach.",
    challenge:
      "Gen offers coaching, courses and done-for-you design. The site needed to present all of it without losing her personality.",
    solution:
      "Soft editorial typography with italic accents, candid photography, a confidence check, course & coaching offers and ‘Book a session’ CTAs.",
    features: [
      "Session booking CTAs",
      "Confidence training section",
      "Courses & coaching offers",
      "Done-for-you design services",
      "Testimonials",
      "About & story",
    ],
    stack: ["Next.js", "Tailwind CSS", "Responsive", "SEO"],
    accent: "#2F5D50",
  },
  {
    slug: "elan-forge",
    name: "Élan Forge",
    url: "https://elan-forge.vercel.app/",
    industry: "Fitness & Mentorship",
    filter: "Lifestyle",
    headline: "Strength with purpose.",
    summary:
      "A bold, motivational site for a fitness, mentorship and community brand built around The Pressure Method™.",
    challenge:
      "The brand is more than a gym — it’s training, mentorship and community. The site had to sell the philosophy, not just the workouts.",
    solution:
      "Dark athletic photography with gold accents, a four-pillar philosophy, a weekly class schedule and a ‘Rep for a Reason’ impact counter.",
    features: [
      "Membership CTAs",
      "Weekly class schedule",
      "Training method section",
      "Mentor Circle program",
      "Impact counters",
      "Client proof section",
    ],
    stack: ["Next.js", "Tailwind CSS", "Motion", "SEO"],
    accent: "#C9A35A",
    mobile: true,
  },
];

export const projectFilters = ["All", "Finance", "Consulting", "Logistics", "Lifestyle", "Food"] as const;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectImage = (slug: string) => `/projects/${slug}.jpg`;
export const projectMobileImage = (slug: string) => `/projects/${slug}-mobile.jpg`;
