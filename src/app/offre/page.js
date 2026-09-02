import ProductCards from '@/components/Elements/Cards/productCards/productCards'
import Footer from '@/components/Layout/Footer/Footer'
import Hero from '@/components/Layout/Hero/Hero'
import Offer from '@/components/Layout/Offer/Offer'
import OfferPage from '@/components/Layout/OfferPage/OfferPage'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <OfferPage/>
      <Footer/>
    </div>
  )
}
