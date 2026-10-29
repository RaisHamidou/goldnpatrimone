


const benefits = [
  {
    icon: "▤",
    title: "Générer des revenus complémentaires",
    description:
      "Percevez des loyers pour compléter vos revenus ou préparer votre retraite.",
  },
  {
    icon: "⌂",
    title: "Développer votre patrimoine",
    description:
      "Constituez progressivement un patrimoine immobilier transmissible.",
  },
  {
    icon: "%",
    title: "Étudier votre fiscalité",
    description:
      "Certains dispositifs peuvent présenter des avantages selon votre situation.",
  },
  {
    icon: "♧",
    title: "Préparer l’avenir",
    description:
      "Anticipez vos futurs besoins grâce à un projet immobilier réfléchi.",
  },
];

const schemes = [
  {
    label: "JEANBRUN",
    title: "Relance logement",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
    description:
      "Un dispositif pour certains logements collectifs neufs ou anciens faisant l’objet d’une réhabilitation éligible.",
    criteria: [
      "Location nue sous conditions",
      "Engagement locatif de 9 ans",
      "Plafonds et conditions à vérifier",
    ],
  },
  {
    label: "LMNP",
    title: "Louer en meublé",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
    description:
      "La location meublée non professionnelle peut offrir différentes options de déclaration des revenus locatifs.",
    criteria: [
      "Logement équipé et meublé",
      "Micro-BIC ou régime réel",
      "Conditions fiscales à étudier",
    ],
  },
  {
    label: "DÉFICIT FONCIER",
    title: "Valoriser l’ancien",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=700&q=80",
    description:
      "Certaines charges et dépenses de travaux déductibles peuvent générer un déficit foncier.",
    criteria: [
      "Location nue au régime réel",
      "Nature des travaux déterminante",
      "Imputation sous conditions",
    ],
  },
  {
    label: "DENORMANDIE",
    title: "Rénover pour investir",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80",
    description:
      "Un dispositif de réduction d’impôt pour l’achat et la rénovation de logements anciens éligibles.",
    criteria: [
      "Communes éligibles",
      "Travaux répondant aux critères",
      "Engagement et plafonds locatifs",
    ],
  },
  {
    label: "LOC’AVANTAGES",
    title: "Louer solidaire",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80",
    description:
      "Un dispositif pour les propriétaires acceptant de louer à un loyer encadré, sous convention avec l’Anah.",
    criteria: [
      "Conventionnement requis",
      "Plafonds de loyers et ressources",
      "Avantage fiscal sous conditions",
    ],
  },
];

const criteria = [
  "L’emplacement et les transports",
  "Le financement et les charges",
  "Le prix d’achat",
  "Le régime fiscal",
  "La demande locative",
  "Le potentiel de revente",
];

export default function InvestissementImmobilier() {
  return (
    <main className="investissement">
      <section className="investissement__section">
        <div className="investissement__container" id="_investissement__container">
          <span className="investissement__eyebrow">
            Pourquoi investir ?
          </span>

          <h2>Les avantages de l’investissement immobilier</h2>

          <p className="investissement__lead">
            L’investissement locatif peut vous aider à préparer votre avenir
            tout en développant votre patrimoine. Chaque projet mérite une
            analyse de son emplacement, de son financement et de sa rentabilité.
          </p>

          <div className="investissement__benefits">
            {benefits.map((benefit) => (
              <article
                className="investissement__benefit"
                key={benefit.title}
              >
                <div className="investissement__round" aria-hidden="true">
                  {benefit.icon}
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="investissement__section"
        id="dispositifs"
      >
        <div className="investissement__container investissement__schemes">
          <span className="investissement__eyebrow">
            Les dispositifs à étudier
          </span>

          <h2>Des solutions adaptées à votre projet</h2>

          <p className="investissement__lead">
            Chaque dispositif a ses particularités. Découvrez les grandes
            lignes de cinq solutions pour mieux comprendre vos possibilités.
          </p>

          <div className="investissement__scheme-grid">
            {schemes.map((scheme) => (
              <article
                className="investissement__scheme"
                key={scheme.label}
              >
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  loading="lazy"
                />

                <div className="investissement__scheme-body">
                  <span className="investissement__scheme-label">
                    {scheme.label}
                  </span>

                  <h3>{scheme.title}</h3>
                  <p>{scheme.description}</p>

                  <ul>
                    {scheme.criteria.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <a
                    className="investissement__more"
                    href="/contact"
                  >
                    En savoir plus <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="investissement__fine">
            Les informations présentées sont générales et indicatives.
            Les règles fiscales et les conditions d’éligibilité peuvent
            évoluer. Une vérification personnalisée auprès d’un professionnel
            compétent est nécessaire avant toute décision.
          </p>
        </div>
      </section>

      <section className="investissement__section">
        <div className="investissement__container investissement__advice">
          <img
            className="investissement__advice-image"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=85"
            alt="Projet immobilier et remise de clés"
            loading="lazy"
          />

          <div className="investissement__panel">
            <span className="investissement__eyebrow">
              Nos conseils
            </span>

            <h2>
              Ne choisissez pas uniquement en fonction de la fiscalité
            </h2>

            <p>
              Un avantage fiscal ne garantit pas la rentabilité d’un
              investissement. Examinez notamment :
            </p>

            <div className="investissement__criteria">
              {criteria.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div className="investissement__panel investissement__consult">
            <span className="investissement__eyebrow">
              Votre projet
            </span>

            <h2>Quel investissement vous correspond ?</h2>

            <p>
              GOLD’N PATRIMOINE vous aide à identifier des opportunités
              immobilières adaptées à vos objectifs.
            </p>

            <a className="investissement__button" href="/isimulateur/investissement-locatif">
              Faire une étude personnalisée <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

    
    </main>
  );
}
