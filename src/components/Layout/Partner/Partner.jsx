import React from 'react'
import Marquee from 'react-fast-marquee'
//import { Vinci, Nextis, Bouygues, Eiffage, creditAgricole, Icade } from '@/components/other/Partner_Icons/IconsPartner'

import Vinci from "@/assets/svg/partner/svg/vinci.png";
import Nextis from "@/assets/svg/partner/svg/nextis.png"
import Bouygues from "@/assets/svg/partner/svg/Logo_Bouygues_Immobilier 3.png"
import Eiffage from "@/assets/svg/partner/svg/Logo_Eiffage 1.png"
import creditAgricole from '@/assets/svg/partner/svg/creditAgricole.png';
import Icade from "@/assets/svg/partner/svg/icade.png"
import Altarea from "@/assets/svg/partner/svg/Altarea 2.png"
import Cogedim from "@/assets/svg/partner/svg/Cogedim.png"
import Edouard from "@/assets/svg/partner/svg/Edouard.png"
import Kaufman_Broad from "@/assets/svg/partner/svg/Logo_Kaufman_&_Broad 2.png"
import Marginan from "@/assets/svg/partner/svg/Marginan.png"
import Pichet from "@/assets/svg/partner/svg/Pichet.png"


export default function Partner() {
  const partners = [Vinci, Nextis, Bouygues, Eiffage, creditAgricole, Altarea,
Cogedim,
Edouard,
Kaufman_Broad,
Marginan,
Pichet]

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
            {/* <Icon className={index === 1 ? "partner-svg nextis": "partner-svg" }/> */}
            <img className='partner-svg' src={Icon.src} alt="" />
          </div>
        ))}
      </Marquee>
    </section>
  )
}