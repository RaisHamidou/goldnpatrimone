

const services = [
  {
    number: "01 / HABITER",
    title: "Trouver votre futur chez-vous",
    description:
      "Des logements neufs pensés pour votre confort, avec une attention portée à l’emplacement, aux prestations et à votre quotidien.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    alt: "Appartement contemporain lumineux",
  },
  {
    number: "02 / INVESTIR",
    title: "Construire votre patrimoine",
    description:
      "Nous étudions avec vous les opportunités d’investissement et les critères essentiels : budget, demande locative, rentabilité et horizon de détention.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    alt: "Clés et maison miniature pour illustrer l’investissement immobilier",
  },
  {
    number: "03 / SÉLECTION",
    title: "Comparer les bonnes opportunités",
    description:
      "Notre réseau de promoteurs et partenaires vous donne accès à de nombreux programmes, afin de comparer les offres plutôt que de vous limiter à une seule résidence.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
    alt: "Façade d’une résidence immobilière",
  },
];

export default function Services() {
  return (
    <section className="about-services">
      <div className="container-about">
        <div className="section-heading reveal">
          <p className="eyebrow">Nos domaines d’accompagnement</p>

          <h2>À chaque projet, sa solution.</h2>

          <p>
            Parce que chaque parcours est unique, nous prenons le temps de
            comprendre vos priorités avant de vous présenter des biens adaptés.
          </p>
        </div>

        <div className="about-services__grid">
          {services.map((service) => (
            <article className="about-services__card reveal" key={service.number}>
              <img
                src={service.image}
                alt={service.alt}
                loading="lazy"
              />

              <div className="about-services__body">
                <span className="about-services__number">
                  {service.number}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}