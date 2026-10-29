import "./ContactBanner.scss";

export default function ContactBanner() {
  return (
    <section className="ContactBanner">
      <div className="container cta-flex">
        <div className="cta-content">
          <p className="eyebrow">
            Échangeons ensemble
          </p>

          <h2>Et si nous parlions de votre projet ?</h2>

          <p>
            Résidence principale ou investissement : nous sommes à votre écoute.
          </p>
        </div>

        <a className="btn" href="/contact">
          Nous contacter →
        </a>
      </div>
    </section>
  );
}