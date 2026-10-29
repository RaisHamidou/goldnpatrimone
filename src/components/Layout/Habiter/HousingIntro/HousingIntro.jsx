


export default function HousingIntro() {
  return (
    <section className="housing-intro section" id="decouvrir">
      <div className="container split">
        <img
          className="photo"
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
          alt="Logement contemporain lumineux avec terrasse"
        />

        <div className="housing-intro-content">
          <span className="eyebrow">Votre futur logement</span>

          <h2>Habitez un logement pensé pour demain</h2>

          <p>
            Découvrez des logements neufs, confortables et bien situés,
            conçus pour répondre à vos besoins quotidiens et accompagner
            votre projet de vie.
          </p>

          <a className="btn outline" href="/contact">
            Échanger avec un conseiller →
          </a>
        </div>
      </div>
    </section>
  );
}
