
import "./Simulator.scss";

export default function Simulator() {
  return (
    <section className="housing-simulator">
      <div className="simulator-content">
        <span className="eyebrow">Votre projet commence ici</span>

        <h2>Quel budget pour votre futur logement ?</h2>

        <p>
          Estimez votre capacité de financement et découvrez les solutions
          à explorer pour l’achat de votre résidence principale.
        </p>
      </div>

      <a className="btn" href="/simulateur/residence-principale">
        Accéder au simulateur →
      </a>
    </section>
  );
}
