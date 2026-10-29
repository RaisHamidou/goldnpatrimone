
const advantages = [
  {
    symbol: "⌂",
    title: "Des biens sélectionnés",
    description:
      "Nous recherchons des opportunités cohérentes avec vos besoins, votre budget et vos objectifs.",
  },
  {
    symbol: "◇",
    title: "Des prix compétitifs",
    description:
      "Nous étudions les offres disponibles pour vous aider à faire un choix éclairé, sans frais cachés annoncés.",
  },
  {
    symbol: "♡",
    title: "Un suivi personnalisé",
    description:
      "De la découverte du projet aux démarches d’acquisition, nous restons à vos côtés.",
  },
];

export default function Why() {
  return (
    <section className="section why">
      <div className="container">
        <div className="center">
          <p className="eyebrow">Notre engagement</p>
          <h2>Bien plus qu’une recherche immobilière</h2>
          <p className="lead">
            Un interlocuteur attentif, des informations claires et un
            accompagnement à chaque étape.
          </p>
        </div>

        <div className="why-grid">
          {advantages.map((item) => (
            <article className="why-card" key={item.title}>
              <div className="symbol" aria-hidden="true">
                {item.symbol}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
