// Central place for your personal details. Edit here and it updates everywhere.

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348145488504";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "mdigital1196@gmail.com";

export const site = {
  firstName: "Fiyinfoluwa",
  middleName: "Tomiwa",
  lastName: "IKUYAJOLU",
  fullName: "Fiyinfoluwa Tomiwa Ikuyajolu",
  shortName: "Fiyin",
  role: "Web Designer & Next.js Developer",
  tagline: "Websites that turn visitors into clients.",
  description:
    "Fiyinfoluwa Tomiwa Ikuyajolu designs and builds fast, modern, high-converting websites for service businesses — plus data analysis, graphic design and digital marketing.",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  availability: "Booking new projects",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email,
  phoneDisplay: "+234 814 548 8504",
  whatsappNumber,
  whatsappLink: (text = "Hi Fiyinfoluwa! I found your portfolio and I'd like to talk about a website project.") =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
  mailto: (subject = "New website project") => `mailto:${email}?subject=${encodeURIComponent(subject)}`,
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  portrait: "/images/fiyinfoluwa-hero.jpg",
  portraitAbout: "/images/fiyinfoluwa-about.jpg",
  portraitStudio: "/images/fiyinfoluwa-studio.jpg",
  // Add your profile links here — empty ones are hidden automatically.
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
    { label: "X / Twitter", href: "" },
    { label: "Behance", href: "" },
  ],
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const unsplash = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=80`;
