import CTA from '@/components/Elements/Buttons/CTA/CTA';
import React from 'react';


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
           <CTA variant={"outline"}>Faite vous rappelez</CTA>
            {/* <a href="#" className="link-underlined">Voir nos offres</a> */}
          </div>
        </div>
      </div>


      <div className="process-section">
        <div className="container">
          <h2 className="process-title">Un accompagnement à chaque étape</h2>
          
          <div className="process-steps">
            <div className="step-card">
              <span>Découverte<br />du projet</span>
            </div>
            <div className="step-card">
              <span>Visite et<br />conseils</span>
            </div>
            <div className="step-card">
              <span>Réservation<br />du<br />logement</span>
            </div>
            <div className="step-card">
              <span>Signature et<br />remise des<br />clés</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Habiter;