import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor, FloatingWhatsApp, Preloader, ScrollProgress } from "@/components/layout/Extras";
import { site } from "@/data/site";

const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Web Designer & Developer`,
    template: `%s | ${site.firstName} ${site.lastName}`,
  },
  description: site.description,
  keywords: [
    "web designer",
    "website designer Nigeria",
    "Next.js developer",
    "freelance web developer",
    "website design for small business",
    "landing page design",
    "data analysis",
    "graphic design",
    "digital marketing",
    site.fullName,
  ],
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  openGraph: {
    type: "website",
    title: `${site.fullName} — Websites that turn visitors into clients`,
    description: site.description,
    siteName: site.fullName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.fullName} — Web Designer & Developer`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.fullName,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      telephone: `+${site.whatsappNumber}`,
      url: site.url,
      image: `${site.url}${site.portrait}`,
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      knowsAbout: ["Web Design", "Web Development", "Next.js", "Data Analysis", "Graphic Design", "Digital Marketing"],
    },
    {
      "@type": "ProfessionalService",
      name: `${site.fullName} — Web Design & Development`,
      url: site.url,
      email: site.email,
      telephone: `+${site.whatsappNumber}`,
      areaServed: "Worldwide",
      serviceType: ["Website Design", "Website Development", "Data Analysis", "Graphic Design", "Digital Marketing"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}>
      <head>
        <script
          // Skip the intro animation on repeat visits within the same session
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('intro-seen')==='1')document.documentElement.dataset.intro='seen'}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <Cursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
