import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import ServicesHero from "@/components/services/ServicesHero/ServicesHero";
import AgencyIntroSection from "@/components/services/AgencyIntroSection/AgencyIntroSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";
import ServicesAccordion from "@/components/services/ServicesAccordion/ServicesAccordion";
import ProjectsIntroSection from "@/components/services/ProjectsIntroSection/ProjectsIntroSection";
import CreativeTeamSection from "@/components/services/CreativeTeamSection/CreativeTeamSection";
import FeatureWorkSection from "@/components/home/FeaturedWorkSection/FeaturedWorkSection";
export const metadata: Metadata = {
  title: { absolute: "Digital Design Agency Services | Graphic Wolves" },
  description: "Graphic Wolves is a digital design agency offering branding, custom web development, and e-commerce services to help businesses build stronger brands and digital experiences.",
  keywords: ["digital design agency", "creative digital agency", "full service creative agency"],
};

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <ServicesHero />
      <AgencyIntroSection />
      <ServicesAccordion />
      <ProjectsIntroSection />
      <CreativeTeamSection />
      <FeatureWorkSection noOverlap />
      <ReviewsSection />
      <FooterSection />
    </main>
  );
}
