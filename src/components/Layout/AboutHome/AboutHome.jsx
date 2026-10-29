
export default function About() {
  return (
    <section className="section about-home">
      <div className="container about-grid">
        <div className="about-photo">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85"
            alt="Clés de maison sur un bureau, symbole d’un projet immobilier"
            loading="lazy"
          />
        </div>

        <div className="about-content">
          <p className="eyebrow">À vos côtés</p>
          <h2>Un projet immobilier mérite toute notre attention</h2>

          <p>
            Chaque parcours est unique. Que vous souhaitiez devenir
            propriétaire ou investir, nous prenons le temps de comprendre
            vos attentes pour vous proposer des solutions pertinentes.
          </p>

          <p>
            Chez GOLD’N PATRIMOINE, nous privilégions la transparence,
            la disponibilité et une relation de confiance durable.
          </p>

          <a className="btn" href="/a-propos">
            Découvrir notre agence →
          </a>
        </div>
      </div>
    </section>
  );
}
