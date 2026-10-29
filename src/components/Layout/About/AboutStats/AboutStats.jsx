

const stats = [
  {
    value: "184 000+",
    label: "lots neufs et rénovés référencés dans notre réseau",
  },
  {
    value: "6 900+",
    label: "programmes accessibles via nos partenaires",
  },
  {
    value: "6 ans +",
    label: "d’expérience dans l’immobilier",
  },
  {
    value: "100 env.",
    label: "clients accompagnés",
  },
];

export default function AboutStats() {
  return (
    <section className="about-stats">
      <div className="container-about">
        <div className="section-heading reveal">
          <p className="eyebrow">
            Un réseau étendu, un accompagnement personnalisé
          </p>

          <h2>Un vaste choix, sans perdre l’essentiel : vous.</h2>

          <p>
            Grâce à notre réseau de partenaires et de promoteurs, nous vous
            aidons à explorer un large éventail de possibilités, dans le neuf
            comme dans l’immobilier rénové.
          </p>
        </div>

        <div className="about-stats__grid reveal">
          {stats.map((stat) => (
            <div className="about-stats__item" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="about-stats__note">
          Chiffres communiqués par GOLD’N PATRIMOINE. Les stocks et
          disponibilités évoluent selon les promoteurs et partenaires.
        </p>
      </div>
    </section>
  );
}