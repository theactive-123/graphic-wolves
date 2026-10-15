import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import FooterSection from "@/components/layout/Footer/FooterSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import EcommerceHero from "@/components/services/e-commerce/EcommerceHero/EcommerceHero";
import EcommerceStatementSection from "@/components/services/e-commerce/EcommerceStatementSection/EcommerceStatementSection";
import EcommerceProcessSection from "@/components/services/e-commerce/EcommerceProcessSection/EcommerceProcessSection";
import EcommerceTechnologies from "@/components/services/e-commerce/EcommerceTechnologies/EcommerceTechnologies";
import EcommerceFeaturedWork from "@/components/services/e-commerce/EcommerceFeaturedWork/EcommerceFeaturedWork";
export const metadata: Metadata = {
  title: { absolute: "Shopify Plus Agency | Graphic Wolves" },
  description:
    "Graphic Wolves is a Shopify Plus agency offering Shopify development, custom themes, e-commerce integrations, and conversion-focused store experiences.",
  keywords: ["shopify plus agency","shopify development agency","ecommerce website design company","ecommerce development agency","shopify agency"],
  alternates: { canonical: "/services/e-commerce" },
};
export default function EcommercePage() {
	return (
		<main data-page="e-commerce">
			<Header />
			<EcommerceHero />
            <EcommerceStatementSection />
			<EcommerceProcessSection />
			<EcommerceTechnologies />
			<EcommerceFeaturedWork />
			<ReviewsSection />
			<FooterSection />
		</main>
	);
}
