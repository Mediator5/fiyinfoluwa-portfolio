import { Hero } from "@/components/sections/Hero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { Included } from "@/components/sections/Included";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Comparison } from "@/components/sections/Comparison";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Booking } from "@/components/sections/Booking";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <FeaturedWork />
      <Services />
      <Included />
      <Process />
      <About />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Booking />
    </>
  );
}
