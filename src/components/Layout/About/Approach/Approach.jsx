

const steps = [
  {
    title: "Nous écoutons votre projet",
    description:
      "Vos besoins, votre budget, vos préférences et vos délais guident notre recherche.",
  },
  {
    title: "Nous sélectionnons et comparons",
    description:
      "Nous identifions des biens cohérents avec vos critères et vous expliquons leurs caractéristiques.",
  },
  {
    title: "Nous vous aidons à décider",
    description:
      "Plans, prix, emplacement, financement et étapes de réservation : vous avancez avec une vision claire.",
  },
  {
    title: "Nous restons disponibles",
    description:
      "Nous vous accompagnons dans les démarches et restons votre point de contact au fil de l’avancement de votre acquisition.",
  },
];

export default function Approach() {
  return (
    <section className="about-approach">
      <div className="container-about about-approach__grid">
        <div className="about-approach__content reveal">
          <p className="eyebrow">Notre manière de travailler</p>

          <h2>
            Un accompagnement à vos côtés, du premier échange à la
            concrétisation.
          </h2>

          <div className="about-approach__steps">
            {steps.map((step, index) => (
              <article className="about-approach__step" key={step.title}>
                <span className="about-approach__number">
                  {index + 1}
                </span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="about-approach__visual reveal">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"
            alt="Espace de vie contemporain aux tons naturels"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}