import { unsplash } from "./site";

export const services = [
  {
    id: "web",
    title: "Website Design & Development",
    short: "Web Design & Dev",
    primary: true,
    blurb:
      "Custom, lightning-fast websites built in Next.js — designed to make you look premium and engineered to turn visitors into booked calls, quotes and sales.",
    points: [
      "Conversion-focused UX & copy structure",
      "Custom design — no cookie-cutter templates",
      "Smooth Webflow-style motion & interactions",
      "Booking, quote & lead forms wired to your inbox",
      "SEO foundations, analytics & speed optimisation",
      "Launch, hosting setup & 30 days of support",
    ],
    image: unsplash("1498050108023-c5249f4df085", 1400),
  },
  {
    id: "data",
    title: "Data Analysis",
    short: "Data Analysis",
    blurb:
      "Turn spreadsheets into decisions — dashboards, reports and insights that show what’s working in your business.",
    points: ["Excel / Google Sheets dashboards", "Sales & marketing reports", "KPI tracking"],
    image: unsplash("1551288049-bebda4e38f71", 1000),
    soon: true,
  },
  {
    id: "graphics",
    title: "Graphic Design",
    short: "Graphic Design",
    blurb:
      "Brand visuals that look the part — logos, social media graphics, flyers and marketing collateral.",
    points: ["Brand identity & logos", "Social media kits", "Flyers & ad creatives"],
    image: unsplash("1626785774573-4b799315345d", 1000),
    soon: true,
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    short: "Digital Marketing",
    blurb:
      "Get your new website in front of the right people with SEO, social media and paid campaigns.",
    points: ["Local SEO & Google Business", "Social media strategy", "Ads & email campaigns"],
    image: unsplash("1432888498266-38ffec3eaf0a", 1000),
    soon: true,
  },
];

export const included = [
  { title: "Mobile-first design", text: "Pixel-perfect on every phone, tablet and desktop." },
  { title: "Built to convert", text: "Clear offers, strong CTAs and friction-free forms." },
  { title: "Blazing fast", text: "Next.js performance your visitors (and Google) love." },
  { title: "SEO-ready", text: "Meta tags, sitemap, schema and clean, semantic code." },
  { title: "Motion that wows", text: "Smooth scroll, reveals and micro-interactions." },
  { title: "Leads to your inbox", text: "Booking & quote forms that email you instantly." },
  { title: "Analytics", text: "Know where visitors come from and what they click." },
  { title: "Launch support", text: "Domain, hosting, go-live and 30 days of help." },
];

export const process = [
  {
    step: "01",
    title: "Discovery call",
    text: "We talk about your business, your customers and what a ‘win’ looks like. You get a clear plan, timeline and quote — no jargon.",
    image: unsplash("1531403009284-440f080d1e12", 1200),
  },
  {
    step: "02",
    title: "Strategy & design",
    text: "I map the pages, write the conversion structure and design a custom look for your brand. You review and we refine together.",
    image: unsplash("1581291518857-4e27b48ff24e", 1200),
  },
  {
    step: "03",
    title: "Development",
    text: "I build your site in Next.js with smooth motion, fast loading, forms, SEO and analytics — tested on every screen size.",
    image: unsplash("1555066931-4365d14bab8c", 1200),
  },
  {
    step: "04",
    title: "Launch & grow",
    text: "We go live on your domain. I hand over everything, train you on updates and stay on hand to help you keep growing.",
    image: unsplash("1522071820081-009f0129c71c", 1200),
  },
];

// Starting prices — edit these to match your rates (or set showPrices to false).
export const showPrices = true;
export const pricing = [
  {
    name: "Launch",
    price: "$450",
    note: "starting at",
    desc: "Perfect for a new business or a single offer that needs to look legit — fast.",
    features: [
      "1–3 page custom website",
      "Mobile-first, responsive design",
      "Contact / lead form to your email",
      "WhatsApp & click-to-call buttons",
      "Basic SEO setup",
      "Delivery in about 1–2 weeks",
    ],
  },
  {
    name: "Growth",
    price: "$950",
    note: "starting at",
    desc: "For service businesses ready to generate leads and bookings every week.",
    popular: true,
    features: [
      "Up to 8 custom pages",
      "Booking or quote request flow",
      "Webflow-style motion & interactions",
      "On-page SEO + sitemap + schema",
      "Google Analytics setup",
      "30 days of post-launch support",
    ],
  },
  {
    name: "Premium",
    price: "$1,800",
    note: "starting at",
    desc: "A fully custom experience for brands that want to stand out and scale.",
    features: [
      "Unlimited pages & case studies",
      "E-commerce, portals or integrations",
      "Blog / CMS for easy updates",
      "Advanced animations",
      "Speed & conversion optimisation",
      "Priority support",
    ],
  },
];

export const comparison = {
  rows: [
    "Custom design made for your brand",
    "Structured to convert visitors into leads",
    "Fast Next.js performance",
    "Smooth, premium motion",
    "SEO & analytics set up for you",
    "One person who answers your messages",
  ],
  diy: [false, false, false, false, false, true],
  agency: [true, true, true, true, true, false],
  me: [true, true, true, true, true, true],
};

export const faqs = [
  {
    q: "How long does a website take?",
    a: "Most Launch sites are ready in 1–2 weeks and Growth sites in 2–4 weeks. Bigger builds depend on scope — you’ll get a clear timeline before we start.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on pages and features. The packages above show starting prices; after a quick call I’ll send a fixed quote so there are no surprises.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes. Many of my clients are in the United States. I work remotely across time zones over WhatsApp, email, Zoom or Google Meet.",
  },
  {
    q: "Will I be able to update my website myself?",
    a: "Yes. I can add an easy content editor (CMS) for things like blog posts, services and images, and I’ll show you how to use it.",
  },
  {
    q: "Do you handle domain and hosting?",
    a: "I’ll help you buy or connect your domain and deploy your site on fast, reliable hosting like Vercel — and walk you through it.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your logo (or we can create one), any photos, your services and a rough idea of what you like. I’ll guide you through the rest.",
  },
  {
    q: "How do payments work?",
    a: "Typically 50% to start and 50% before launch. For larger projects we can split it into milestones.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I’ll review your current site, keep what works and rebuild it to look modern, load faster and convert better.",
  },
];

// Add REAL client quotes here and the testimonials section will appear automatically.
export const testimonials: { quote: string; name: string; role: string; project?: string }[] = [];

export const budgets = ["Under $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500+", "Not sure yet"];
export const timelines = ["ASAP (1–2 weeks)", "Within a month", "1–3 months", "Just exploring"];
