import CTA from '@/components/Elements/Buttons/CTA/CTA'
import React from 'react'

export default function Investire() {
  return (
    <section className='section-invest'>
    <div className='investire'>
        <div className="container-info-investir">
            <div className="subtitle-info-investire">VOTRE FUTUR LOGEMENT</div>
            <div className="title-info-investire"><h1>Habitez un logement <br/> pensé pour demain</h1></div>
            <div className="text-info-investire">Découvrez des logements neufs, confortables et bien situés, 
            conçus pour répondre à vos besoins quotidiens et accompagner votre projet de vie.</div>
            <CTA variant={"outline"}>Nous contactez</CTA>
        </div>
        <div className="info-investire-img">
        
           <img src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1000&auto=format&fit=crop" alt="" /> 
        </div>
    </div>
    </section>
  )
}
