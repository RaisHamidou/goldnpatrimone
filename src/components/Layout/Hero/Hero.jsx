import React from 'react'
import Header from '../Header/Header'
import bg_hero from "../../../assets/hero/pexels-volkerthimm-27307399.jpg"
import CTA from '@/components/Elements/Buttons/CTA/CTA'

export default function Hero({bg, children, hrefFilled, hrefOutline}) {
  return (
    <div className='Hero'>
    
    <div className="bg-hero">
      <img src={bg_hero.src} alt="Hero bg" />
    </div>
    <div className="overlay">
      <div className="content-hero">
   {/*    <h1>Construisons votre avenir immobilier</h1>
      <p>Découvrez une sélection de logements neufs et de biens soigneusement choisis pour répondre à tous vos projets.</p>
      
    <div className="container-buttons">
      <CTA variant="filled"> 
      Nos offres
      </CTA>
      <CTA variant="outilne">
        En savoir plus
      </CTA>
    </div> */}
     {children}
    </div>
   
    </div>
    
      <Header/>
    </div>
  )
}
