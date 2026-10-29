
import "./Benefits.scss";

const benefits = [
  {
    icon: "€",
    title: "Frais réduits",
    items: [
      "Frais d’actes notariés généralement réduits",
      "Pas d’honoraires d’agence supplémentaires pour l’acquéreur dans nos offres concernées",
      "Prix proposés par les promoteurs, selon les programmes",
      "Exonération de taxe foncière possible pendant deux ans, selon la commune et les conditions",
    ],
  },
  {
    icon: "♧",
    title: "Économie d’énergie",
    items: [
      "Constructions récentes répondant aux exigences énergétiques et environnementales applicables, notamment RE2020 selon les projets",
      "Isolation thermique performante et meilleure maîtrise des consommations",
    ],
  },
  {
    icon: "♢",
    title: "Garanties du neuf",
    items: [
      "Garantie décennale sur les dommages relevant de son champ",
      "Garantie biennale de bon fonctionnement",
      "Garantie de parfait achèvement",
      "Confort acoustique et thermique selon les normes applicables",
    ],
  },
  {
    icon: "⌂",
    title: "Prêt à taux zéro",
    items: [
      "Financement sans intérêts d’une partie de la résidence principale, sous conditions",
      "Différé de remboursement possible selon le profil",
      "Conditions de ressources et de primo-accession à vérifier",
    ],
  },
  {
    icon: "%",
    title: "TVA réduite",
    items: [
      "TVA à 5,5 % possible pour certains logements et acquéreurs éligibles",
      "Conditions de localisation, de ressources et d’occupation",
    ],
  },
  {
    icon: "▯",
    title: "100 % connecté",
    items: [
      "Selon les programmes, pilotage à distance de certains équipements",
      "Confort et maîtrise des usages au quotidien",
    ],
  },
  {
    icon: "▤",
    title: "Agencement intelligent",
    wide: true,
    items: [
      "Un logement conçu pour optimiser les espaces",
      "Des possibilités de personnalisation et de choix de prestations selon les programmes et le stade d’avancement",
    ],
  },
];

export default function Benefits() {
  return (
    <section className="housing-benefits-section">
      <div className="container">
        <div className="benefits-panel">
          <div className="center benefits-heading">
            <span className="eyebrow">
              — Les avantages du neuf —
            </span>

            <h2>
              Un cadre de vie moderne,
              <br />
              des atouts concrets pour votre projet.
            </h2>

            <p className="lead">
              Le neuf, c’est plus qu’un logement : c’est une solution
              durable, économique et pensée pour votre avenir.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <article
                className={`benefit-card${benefit.wide ? " wide" : ""}`}
                key={benefit.title}
              >
                <div className="benefit-icon" aria-hidden="true">
                  {benefit.icon}
                </div>

                <h3>{benefit.title}</h3>

                <ul>
                  {benefit.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="benefits-quote">
            Un investissement aujourd’hui,
            <br />
            une sérénité demain.
          </p>
        </div>
      </div>
    </section>
  );
}
