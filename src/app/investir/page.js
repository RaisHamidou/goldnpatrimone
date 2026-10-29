import CTA from "@/components/Elements/Buttons/CTA/CTA";
import Footer from "@/components/Layout/Footer/Footer";
import Hero from "@/components/Layout/Hero/Hero";
import Investire from "@/components/Layout/Investire/Investire";
import React from "react";
export const metadata = {
  title: "Investire",
  description:
    "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
  openGraph: {
    title: "Gold'N Patrimoine | Investire",
    description:
      "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
    url: "https://goldnpatrimoine.com",
    siteName: "Gold'N Patrimoine",
    type: "website",
    images: [
      {
        url: "https://goldnpatrimoine.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gold'N Patrimoine",
      },
    ],
  },
};
export default function page() {
  return (
    <div>
      <Hero>
        <h1>Faites de la pierre un <br/> véritable levier <br/> pour votre avenir</h1>
        <p>
         Découvrez les différents dispositifs d’investissement immobilier et trouvez celui qui correspond à vos objectifs : optimiser votre fiscalité, générer des revenus complémentaires ou constituer un patrimoine.
        </p>

        <div className="container-buttons">
          <CTA href={"#_investissement__container"} variant="filled">Découvrir</CTA>
        </div>
      </Hero>
      <Investire />
      <Footer />
    </div>
  );
}
