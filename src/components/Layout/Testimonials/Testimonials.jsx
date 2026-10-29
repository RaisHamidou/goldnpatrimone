
const testimonials = [
  {
    title: "Témoignage client",
    description:
      "Ajoutez ici un avis authentique recueilli auprès d’un acquéreur accompagné par votre agence.",
  },
  {
    title: "Une expérience partagée",
    description:
      "Présentez un retour d’expérience sur la disponibilité et la qualité de votre accompagnement.",
  },
  {
    title: "Un projet concrétisé",
    description:
      "Valorisez ici un témoignage réel sur le parcours d’achat ou d’investissement.",
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="center">
          <p className="eyebrow">La confiance se construit</p>
          <h2>Ce que nos clients disent de nous</h2>
          <p className="lead">
            Une place réservée à vos véritables témoignages clients,
            à intégrer après leur accord.
          </p>
        </div>

        <div className="quote-grid">
          {testimonials.map((testimonial) => (
            <article
              className="quote placeholder"
              key={testimonial.title}
            >
              <div className="stars" aria-label="Aucun avis renseigné">
                ☆☆☆☆☆
              </div>

              <h3>{testimonial.title}</h3>
              <p>{testimonial.description}</p>
              <small>Avis à renseigner</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
