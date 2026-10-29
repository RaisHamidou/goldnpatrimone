import CTA from '@/components/Elements/Buttons/CTA/CTA';
import Footer from '@/components/Layout/Footer/Footer'
import Habiter from '@/components/Layout/Habiter/Habiter'
import Hero from '@/components/Layout/Hero/Hero'
import React from 'react'
export const metadata = {
  title: "Habiter",
  description: "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
  openGraph: {
  title: "Gold'N Patrimoine | Habiter",
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
             <h1>Construisons votre avenir immobilier</h1>
            <p>Découvrez une sélection de logements neufs et de biens soigneusement choisis pour répondre à tous vos projets.</p>
            
          <div className="container-buttons">
            <CTA href={"#decouvrir"} variant="filled"> 
            Découvrir
            </CTA>
            
          </div>
            </Hero>
      <Habiter/>
      <Footer/>
    </div>
  )
}
