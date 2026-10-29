

export default function AboutIntro() {
  return (
    <section className="about-intro" id="notre-histoire">
      <div className="container-about about-intro__grid">
        <div className="about-intro__visual reveal">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"
            alt="Intérieur contemporain lumineux d'un logement"
            loading="lazy"
          />

          <div className="about-intro__stamp">
            <strong>6 ans +</strong>
            d’expérience dans l’immobilier
          </div>
        </div>

        <div className="about-intro__copy reveal">
          <p className="eyebrow">Qui sommes-nous ?</p>

          <h2>L’immobilier, avec exigence et proximité.</h2>

          <p>
            Chez <strong>GOLD’N PATRIMOINE</strong>, nous sommes convaincus
            qu’un projet immobilier se construit d’abord autour de vos envies,
            de votre budget et de vos objectifs.
          </p>

          <p>
            Que vous recherchiez votre future résidence principale ou
            souhaitiez réaliser un investissement locatif, notre rôle est de
            vous aider à avancer sereinement, avec des informations accessibles
            et un interlocuteur attentif à chaque étape.
          </p>

          <p>
            Forts de plus de six années d’expérience et d’une centaine de
            clients accompagnés, nous mettons notre connaissance du marché au
            service de vos décisions.
          </p>

          <a href="/contact" className="btn btn-outline">
            Échangeons sur votre projet <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}