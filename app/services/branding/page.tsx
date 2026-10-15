import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import BrandingHero from "@/components/services/Branding/BrandingHero/BrandingHero";
import BrandStatementSection from "@/components/services/Branding/BrandStatementSection/BrandStatementSection";
import ToolsTechnologiesSection from "@/components/services/Branding/ToolsTechnologiesSection/ToolsTechnologiesSection";
import BrandingFeaturedWork from "@/components/services/Branding/BrandingFeaturedWork/BrandingFeaturedWork";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: { absolute: "Brand Identity Design Services | Graphic Wolves" },
  description:
    "Build a stronger brand with Graphic Wolves. We offer brand strategy, logo design, visual identity, and rebranding services tailored to your business goals.",
  keywords: [
    "brand identity design services",
    "brand strategy agency",
    "logo design agency",
    "rebranding agency",
    "brand positioning agency",
    "startup branding agency",
  ],
  alternates: { canonical: "/services/branding" },
};

export default function BrandingPage() {
  return (
    <main>
      <Header />
      <BrandingHero />
      <BrandStatementSection />
      <ToolsTechnologiesSection />
      <BrandingFeaturedWork />
      <ReviewsSection />
      <FooterSection />
    </main>
  );
}