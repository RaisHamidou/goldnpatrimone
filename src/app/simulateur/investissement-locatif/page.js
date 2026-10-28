import ProductCards from '@/components/Elements/Cards/productCards/productCards'
import Footer from '@/components/Layout/Footer/Footer'
import Hero from '@/components/Layout/Hero/Hero'
import Offer from '@/components/Layout/Offer/Offer'
import OfferPage from '@/components/Layout/OfferPage/OfferPage'
import SimulateurImmobilier from '@/components/Layout/SimulateurImmobilier/SimulateurImmobilier'
import React from 'react'

export default function page() {
  return (
    <div>
       <Hero>
              <header className="sim-header">
          <div className="sim-brand">GOLD'N PATRIMOINE · Simulateur immobilier</div>
          <h1>Construisons votre avenir immobilier.</h1>
          <p>Estimez votre capacité d’emprunt, votre budget d’achat et votre éventuel prêt à taux zéro. Une première vision claire pour préparer votre projet dans le neuf.</p>
        </header>
      
              
            </Hero>
          <SimulateurImmobilier/>
    </div>
  )
}
