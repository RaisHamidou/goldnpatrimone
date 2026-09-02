import CTA from '@/components/Elements/Buttons/CTA/CTA'
import ProductCards from '@/components/Elements/Cards/productCards/productCards'
import React from 'react'

export default function Offer() {
  return (
    <div className='offer-home'>
    <div className="title-offer-home">
        <h1>Dernières offres</h1>
    </div>
<div className="container-offer-home">
    <ProductCards/>
    <ProductCards/>
    <ProductCards/>
    <ProductCards/>
</div>
<div className="container-button-offer-home">
    <CTA variant={"filled"} >
        Voir plus
    </CTA>
    <CTA> Nous contactez </CTA>
</div>
    </div>
  )
}
