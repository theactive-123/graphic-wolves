import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import BrandingHero from "@/components/services/Branding/BrandingHero/BrandingHero";
import BrandStatementSection from "@/components/services/Branding/BrandStatementSection/BrandStatementSection";
import ToolsTechnologiesSection from "@/components/services/Branding/ToolsTechnologiesSection/ToolsTechnologiesSection";
import BrandingFeaturedWork from "@/components/services/Branding/BrandingFeaturedWork/BrandingFeaturedWork";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: "Branding & Brand Identity Design",
  description:
    "Build a memorable brand with Graphic Wolves. We create strategic brand identities, visual systems, and design that help businesses stand out and grow.",
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