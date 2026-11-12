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
  title: { absolute: "Branding, Web Development & E-Commerce | Graphic Wolves" },
  description: "Explore Graphic Wolves branding, custom web development, and e-commerce services, with selected projects and ways to discuss your next project.",
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
