
import "./Legal.scss";

export default function Cookies() {
  return (
    <main className="legal-page">
      <article className="legal-container">

        <div className="legal-header">
          <span className="legal-eyebrow">GOLD’N PATRIMOINE</span>
          <h1>Politique de cookies</h1>
          <p className="legal-date">
            Dernière mise à jour : 9 novembre 2026
          </p>
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier susceptible d'être enregistré
              sur le terminal d'un utilisateur lorsqu'il consulte un site internet.
            </p>
            <p>
              D'autres technologies, appelées traceurs, peuvent remplir
              des fonctions similaires.
            </p>
            <p>
              Ces technologies peuvent servir au fonctionnement du site,
              à la mémorisation de préférences ou, sous certaines conditions,
              à la mesure d'audience.
            </p>
          </section>

          <section className="legal-section">
  <h2>3. Quels types de cookies utilisons-nous ?</h2>

  <h3>Cookies strictement nécessaires</h3>
  <p>
    Ces cookies sont indispensables au fonctionnement du site. Ils permettent
    notamment d’assurer sa sécurité et son bon fonctionnement.
  </p>

  <h3>Cookies de mesure d’audience</h3>
  <p>
    Ces cookies nous permettent de mesurer la fréquentation du site et de
    comprendre comment les visiteurs naviguent afin d’améliorer nos services.
    Nous utilisons Google Analytics à cette fin.
  </p>

  <h3>Services tiers</h3>
  <p>
    Certains contenus ou fonctionnalités peuvent être fournis par des services
    tiers. Ces services sont susceptibles d’utiliser leurs propres cookies.
  </p>
</section>

          <section className="legal-section">
            <h2>3. Gestion du consentement</h2>
            <p>
              Lorsque le site utilise des traceurs soumis au consentement,
              l'utilisateur peut accepter ou refuser leur dépôt.
            </p>
            <p>
              Le refus doit être aussi simple que l'acceptation.
            </p>
            <p>
              L'utilisateur doit également pouvoir retirer son consentement
              à tout moment, notamment grâce à un lien
              « Gérer mes cookies » accessible depuis le site.
            </p>
            <p>
              Les traceurs non essentiels concernés ne doivent pas être déposés
              avant l'obtention d'un consentement valide.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Durées de conservation</h2>
            <p>
              Les durées de conservation des cookies dépendent de leur finalité
              et de leur configuration.
            </p>
            <p>
              Les choix de consentement sont conservés pendant une durée adaptée,
              après laquelle un nouveau choix peut être demandé.
            </p>
            <p>
              Les durées exactes doivent être renseignées dans l'inventaire
              des cookies effectivement utilisés.
            </p>
          </section>

         <section className="legal-section">
  <h2>6. Liste des cookies utilisés</h2>

  <p>
    Le site utilise Google Analytics pour mesurer son audience.
  </p>

  <div className="legal-table-wrapper">
    <table className="legal-table">
      <thead>
        <tr>
          <th>Cookie / Service</th>
          <th>Finalité</th>
          <th>Durée de conservation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Google Analytics</td>
          <td>
            Mesure d’audience et analyse de la fréquentation du site.
          </td>
          <td>Selon la configuration de Google Analytics.</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

          <section className="legal-section">
            <h2>6. Protection des données</h2>
            <p>
              Pour davantage d'informations sur les traitements de données
              personnelles et les droits des utilisateurs, consultez
              la politique de confidentialité de GOLD’N PATRIMOINE.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Contact</h2>
            <p>
              Pour toute question relative à cette politique :
            </p>
            <a
              className="legal-email"
              href="mailto:m.diaby@goldnpatrimoine.com"
            >
              m.diaby@goldnpatrimoine.com
            </a>
          </section>

          <section className="legal-section">
            <h2>8. Mise à jour</h2>
            <p>
              Cette politique peut être modifiée afin de refléter
              les évolutions techniques et réglementaires du site.
            </p>
          </section>

        </div>

        <footer className="legal-bottom">
          <span>GOLD’N PATRIMOINE</span>
          <span>Document juridique</span>
        </footer>

      </article>
    </main>
  );
}
