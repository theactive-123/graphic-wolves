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
  title: { absolute: "Shopify E-Commerce Design & Development | Graphic Wolves" },
  description:
    "Graphic Wolves offers Shopify development, custom themes, e-commerce integrations, and conversion-focused store experiences.",
  keywords: ["shopify plus agency","shopify development agency","ecommerce website design company","ecommerce development agency","shopify agency"],
  alternates: { canonical: "/services/e-commerce" },
};
export default function EcommercePage() {
	return (
		<main data-page="e-commerce">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "Service", "@id": "https://graphicwolves.com/services/e-commerce#service",
                  name: "Shopify E-Commerce Design and Development", url: "https://graphicwolves.com/services/e-commerce",
                  serviceType: "E-Commerce Design and Development",
                  description: "Shopify store setup, custom themes, app development, Shopify Plus solutions, and e-commerce integrations.",
                  provider: { "@id": "https://graphicwolves.com/#organization" } },
                { "@type": "BreadcrumbList", itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://graphicwolves.com/" },
                  { "@type": "ListItem", position: 2, name: "Services", item: "https://graphicwolves.com/services" },
                  { "@type": "ListItem", position: 3, name: "E-Commerce", item: "https://graphicwolves.com/services/e-commerce" },
                ] },
              ],
            }) }} />
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
