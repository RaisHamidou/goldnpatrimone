import React from 'react'
import Header from '../Header/Header'
import bg_hero from "../../../assets/hero/pexels-volkerthimm-27307399.jpg"
import CTA from '@/components/Elements/Buttons/CTA/CTA'

export default function Hero({bg, children, hrefFilled, hrefOutline}) {
  return (
    <div className='Hero'>
    
    {/* <div className="bg-hero">
      <img src={bg_hero.src} alt="Hero bg" />
    </div>
    <div className="overlay">
      <div className="content-hero">
   
     {children}
    </div>
   
    </div> */}
    
      <Header/>
        <section className="etude-hero">
        <div className="etude-wrap">
          <div className="etude-eyebrow">Votre projet mérite une étude attentive</div>
          
          {children}
          {/* <h1>Construisons une stratégie immobilière adaptée à vos objectifs.</h1>
          <p>Quelques informations suffisent pour obtenir une première 
          lecture de votre projet locatif et des points à approfondir.</p> */}
        </div>
      </section>  
    </div>
  )
}
