import React from 'react'
import Marquee from 'react-fast-marquee'
import { Vinci, Nextis, Bouygues, Eiffage } from '@/components/other/Partner_Icons/IconsPartner'

export default function Partner() {
  const partners = [Vinci, Nextis, Bouygues, Eiffage]

  return (
    <section className="partner">
    <h1>Nos Partenaires</h1>
      <Marquee
        direction="left"
        speed={35}
        gradient={false}
        pauseOnHover={true}
        autoFill={true}
      >
        {partners.map((Icon, index) => (
          <div className="partner-icon" key={`partner-${index}`}>
            <Icon className={index === 1 ? "partner-svg nextis": "partner-svg" }/>
          </div>
        ))}
      </Marquee>
    </section>
  )
}