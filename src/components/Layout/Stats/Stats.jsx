
const statistics = [
  {
    value: "6 ans +",
    label: "d’expérience dans l’immobilier",
  },
  {
    value: "100 env.",
    label: "clients accompagnés",
  },
  {
    value: "1",
    label: "priorité : votre satisfaction",
  },
];

export default function Stats() {
  return (
    <section className="section stats">
      <div className="container">
        <div className="center">
          <p className="eyebrow">
            GOLD’N PATRIMOINE en quelques mots
          </p>
          <h2>Une expérience au service de votre projet</h2>
        </div>

        <div className="stats-grid">
          {statistics.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
