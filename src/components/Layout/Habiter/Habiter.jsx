import CTA from '@/components/Elements/Buttons/CTA/CTA';
import React from 'react';
import img from "../../../assets/hero/AC05F7FC-77B3-420B-BAAD-1EA7523E7120.png"
import AvantagesNeuf from './avantageNeuf/AvantageNeuf';


const Habiter = () => {
  return (
    <section className="real-estate-section">

      <div className="container hero-container">
        <div className="hero-image-wrapper">
        
          <img 
            src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1000&auto=format&fit=crop" 
            alt="Immeuble parisien classique" 
            className="hero-image"
          />
        </div>
        
        <div className="hero-content">
          <span className="hero-subtitle">VOTRE FUTUR LOGEMENT</span>
          <h1 className="hero-title">
            Habitez un<br />
            logement pensé<br />
            pour demain
          </h1>
          <p className="hero-description">
            Découvrez des logements neufs,<br />
            confortables et bien situés, conçus pour<br />
            répondre à vos besoins quotidiens et<br />
            accompagner votre projet de vie.
          </p>
          
          <div className="hero-actions">
           <CTA variant={"outline"}>Echanger avec un conseiller</CTA>
            {/* <a href="#" className="link-underlined">Voir nos offres</a> */}
          </div>
        </div>
      </div>


      <div className="process-section">
        <div className="container">
        <h2 className="stats-title">Un accompagnement à chaque étape.</h2>
          
          
          <div className="process-steps">
            <div className="step-card">
              <span>Découverte<br />du projet.</span>
            </div>
            <div className="step-card">
              <span>Visite et<br />conseils.</span>
            </div>
            <div className="step-card">
              <span>Nous négocions pour vous,<br />avec exigence et <br/> détermination.</span>
            </div>
            <div className="step-card">
              <span>Réservation<br />du<br />logement.</span>
            </div>
            <div className="step-card">
              <span>Signature chez le notaire et<br />remise des<br />clés.</span>
            </div>
             <div className="step-card">
              <span>A vos cotés,<br />même<br />aprés la livraison !</span>
            </div>
          </div>
             {/* <h2 className="stats-title">Un accompagnement serein, des conditions avantageuses.</h2> */}
              <AvantagesNeuf/>
        </div>
        {/*  <AvantagesNeuf/> */}
        <div className="cta-habiter">
       <CTA variant={"outline"}>Echanger avec un conseiller</CTA>
        </div>
        
      </div>
    </section>
  );
};

export default Habiter;