import type { Metadata } from "next";
import Hero from "@/components/home/Hero/Hero";
import HorizontalWords from "@/components/home/HorizontalWords/HorizontalWords";
import FutureSection from "@/components/home/FutureSection/FutureSection";
import StatsSection from "@/components/home/StatsSection/StatsSection";
import ExpertiseSection from "@/components/home/ExpertiseSection/ExpertiseSection";
import ServicesSection from "@/components/home/ServicesSection/ServicesSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection/FeaturedWorkSection";
import ProudClientsSection from "@/components/home/ProudClientsSection/ProudClientsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: {
    absolute: "Top Digital Design Agency | Graphic Wolves",
  },
  description:
    "Elevate your brand with a top Digital Design Agency. Graphic Wolves delivers standout graphic design, branding, and website development services.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HorizontalWords />
      <FutureSection />
      <StatsSection />
      <ExpertiseSection />
      <ServicesSection />
      <ReviewsSection showHeading />
      <FeaturedWorkSection />
      <ProudClientsSection />
      <FooterSection />
    </main>
  );
}
