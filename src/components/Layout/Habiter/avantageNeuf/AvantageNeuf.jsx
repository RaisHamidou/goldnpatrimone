
import {
  Coins,
  Leaf,
  ShieldCheck,
  House,
  Percent,
  Smartphone,
  PanelsTopLeft,
  Check,
} from "lucide-react";



const avantages = [
  {
    titre: "Frais réduits",
    icone: Coins,
    points: [
      "Frais d’actes notariés réduits",
      "Pas d’honoraires d’agence",
      "Prix identiques promoteurs",
      "Possibilité d’exonération de taxe foncière partielle ou totale pendant 2 ans",
    ],
  },
  {
    titre: "Économie d’énergie",
    icone: Leaf,
    points: [
      "Un logement neuf, c’est le respect d’une réglementation technique et environnementale de dernière génération (RT2012), garantissant une isolation thermique et une réduction en dépenses énergétiques.",
    ],
  },
  {
    titre: "Garanties du neuf",
    icone: ShieldCheck,
    points: [
      "Garantie décennale sur le gros-œuvre",
      "Garantie biennale sur les matériaux",
      "Garantie de parfait achèvement",
      "Garantie d’isolation phonique et thermique",
    ],
  },
  {
    titre: "Prêt à taux zéro",
    icone: House,
    points: [
      "Financez jusqu’à 50% de l’acquisition de votre résidence principale",
      "Possibilité de remboursement de prêt en différé",
      "Réservé aux primo-accédants ou aux personnes n’ayant pas été propriétaire de leur résidence principale depuis au moins 2 ans.",
    ],
  },
  {
    titre: "TVA réduite",
    icone: Percent,
    points: [
      <>
        Profitez d’une <strong>TVA à 5,5%</strong> au lieu de 20% pour votre résidence principale.
      </>,
    ],
  },
  {
    titre: "100% connecté",
    icone: Smartphone,
    points: [
      "Maîtrisez votre logement à domicile ou à une assistance depuis votre mobile.",
    ],
  },
  {
    titre: "Agencement intelligent",
    icone: PanelsTopLeft,
    points: [
      "Concevez votre futur logement sur mesure en achetant sur plan.",
      "Bénéficiez de larges possibilités de personnalisations.",
    ],
  },
];

export default function AvantagesNeuf() {
  return (
    <section className="avantages-neuf">
      <header className="avantages-neuf__header">
        <div className="avantages-neuf__eyebrow">
          <span />
          <p>Les avantages du neuf</p>
          <span />
        </div>

        <h1>
          Un cadre de vie moderne,
          <br className="desktop-break" />
          des atouts concrets pour votre projet.
        </h1>

        <p className="avantages-neuf__intro">
          Le neuf, c’est plus qu’un logement : c’est une solution durable,
          économique et pensée pour votre avenir.
        </p>
      </header>

      <div className="avantages-neuf__grid">
        {avantages.map((avantage) => {
          const Icone = avantage.icone;

          return (
            <article className="avantage-card" key={avantage.titre}>
              <div className="avantage-card__icon">
                <Icone strokeWidth={1.5} aria-hidden="true" />
              </div>

              <h2>{avantage.titre}</h2>
              <span className="avantage-card__underline" />

              <ul>
                {avantage.points.map((point, index) => (
                  <li key={index}>
                    <Check
                      className="avantage-card__check"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="avantages-neuf__bottom">
        <div
          className="avantages-neuf__photo"
          role="img"
          aria-label="Salon moderne et lumineux"
        />

        <div className="avantages-neuf__signature">
          <p>
            Un investissement
            <br />
            aujourd’hui, une sérénité
            <br />
            demain.
          </p>
          <span />
        </div>

        <svg
          className="avantages-neuf__decoration"
          viewBox="0 0 180 240"
          fill="none"
          aria-hidden="true"
        >
          <path d="M160 230C130 170 125 100 85 20C120 45 165 110 160 230Z" />
          <path d="M160 230C105 185 65 125 35 65C80 90 140 150 160 230Z" />
          <path d="M160 230C140 155 145 75 160 5C180 65 180 150 160 230Z" />
          <path d="M160 230C100 210 45 180 10 130C65 145 125 180 160 230Z" />
        </svg>
      </div>
    </section>
  );
}
