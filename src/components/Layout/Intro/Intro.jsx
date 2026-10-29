
export default function Intro() {
  return (
    <section className="section intro" id="nos-solutions">
      <div className="container">
        <div className="center">
          <p className="eyebrow">
            Votre projet au cœur de nos priorités
          </p>
          <h2>Votre avenir commence ici</h2>
          <p className="lead">
            Achetez votre futur logement, réalisez un investissement ou
            développez votre patrimoine grâce à des opportunités immobilières
            soigneusement sélectionnées.
          </p>
        </div>

        <div className="choices">
          <article className="choice">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85"
              alt="Salon lumineux d’un logement contemporain"
              loading="lazy"
            />

            <div className="choice-content">
              <p className="eyebrow">Habiter</p>
              <h3>Résidence principale</h3>
              <p>
                Découvrez nos logements alliant confort moderne, performance
                énergétique et prestations de qualité, pensés pour votre
                quotidien et vos envies.
              </p>
              <a className="btn outline" href="/habiter">
                Découvrir les logements →
              </a>
            </div>
          </article>

          <article className="choice">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85"
              alt="Architecture résidentielle contemporaine"
              loading="lazy"
            />

            <div className="choice-content">
              <p className="eyebrow">Investir</p>
              <h3>Investissement locatif</h3>
              <p>
                Étudiez les dispositifs adaptés à vos objectifs, préparez
                votre avenir et développez votre patrimoine grâce à une
                sélection d’opportunités immobilières.
              </p>
              <a className="btn outline" href="/investir">
                Explorer l’investissement →
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
