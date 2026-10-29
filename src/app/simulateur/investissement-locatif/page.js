import ProductCards from '@/components/Elements/Cards/productCards/productCards'
import EtudePersonnalisee from '@/components/Layout/EtudePersonnalisee/EtudePersonnalisee'
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
          <h1>Construisons votre stratégie d’investissement</h1>
          <p>En quelques étapes, obtenez une première analyse de votre financement, de vos revenus locatifs et des dispositifs à étudier selon votre projet.</p>
        </header> 
            </Hero>
         <EtudePersonnalisee/>
         <Footer/>
    </div>
  )
}
