import CTA from '@/components/Elements/Buttons/CTA/CTA';
import About from '@/components/Layout/About/About'
import Footer from '@/components/Layout/Footer/Footer'
import Hero from '@/components/Layout/Hero/Hero'
import React from 'react'

export const metadata = {
  title: "A propos",
  description: "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
  openGraph: {
  title: "Gold'N Patrimoine | A propos",
  description: "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
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
              <h1>Votre projet immobilier mérite toute notre attention.</h1>
              <p>
               Bien plus qu’une recherche de logement, nous vous proposons un accompagnement humain, des conseils clairs et un large choix d’opportunités immobilières soigneusement sélectionnées.
              </p>
      
              <div className="container-buttons">
                <CTA href={"#notre-histoire"} variant="filled">Découvrir</CTA>
              </div>
            </Hero>
      <About/>
      <Footer/>
    </div>
  )
}
