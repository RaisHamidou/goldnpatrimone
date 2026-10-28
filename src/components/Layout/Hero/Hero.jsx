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
   
     {children}
    </div>
   
    </div>
    
      <Header/>
    </div>
  )
}
