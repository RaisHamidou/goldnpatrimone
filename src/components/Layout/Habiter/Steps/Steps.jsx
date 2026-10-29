
import "./Steps.scss";

const steps = [
  "Découverte de votre projet.",
  "Visites et conseils personnalisés.",
  "Nous négocions pour vous, avec exigence et détermination.",
  "Réservation du logement.",
  "Signature chez le notaire et remise des clés.",
  "À vos côtés, même après la livraison !",
];

export default function Steps() {
  return (
    <section className="housing-steps section">
      <div className="container">
        <h2 className="section-title">
          Un accompagnement à chaque étape.
        </h2>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step}>
              <div className="step-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <p>{step}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
