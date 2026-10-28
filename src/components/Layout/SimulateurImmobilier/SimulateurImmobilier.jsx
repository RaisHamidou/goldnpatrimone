 "use client";

import { useMemo, useState } from "react";
import "./SimulateurImmobilier.scss";
import LogoSim from '../../../assets/logo/logo-n.png'

const INITIAL = {
  income: 4000, debts: 0, effort: 35, deposit: 15000, term: "25", rate: 3.5, insurance: 0.3,
  zone: "A", people: "2", rfr: 45000, ptzPrice: 250000, homeType: "apt", firstBuyer: "yes", otherLoans: 200000,
  targetPrice: 250000, cash: 15000, ptzManual: 0, notaryRate: 2.5, guarantee: 2500, otherCosts: 1000,
  budgetIncome: 4000, budgetDebts: 0, budgetTerm: "25", budgetRate: 3.5, budgetInsurance: 0.3,
  clientName: "", clientEmail: "", clientPhone: "", city: "",
  projectType: "Résidence principale", contactConsent: "no",
};

const ZONES = {
  A: {
    income: [49000, 73500, 88200, 102900, 117600, 132300, 147000, 161700],
    caps: [150000, 225000, 270000, 315000, 360000, 360000, 360000, 360000],
    tr: [25000, 31000, 37000, 49000],
  },
  B1: {
    income: [34500, 51750, 62100, 72450, 82800, 93150, 103500, 113850],
    caps: [135000, 202500, 243000, 283500, 324000, 324000, 324000, 324000],
    tr: [21500, 26000, 30000, 34500],
  },
  B2: {
    income: [31500, 47250, 56700, 66150, 75600, 85050, 94500, 103950],
    caps: [110000, 165000, 198000, 231000, 264000, 264000, 264000, 264000],
    tr: [18000, 22500, 27000, 31500],
  },
  C: {
    income: [28500, 42750, 51300, 59850, 68400, 76950, 85500, 94050],
    caps: [100000, 150000, 180000, 210000, 240000, 240000, 240000, 240000],
    tr: [15000, 19500, 24000, 28500],
  },
};

const COEFF = [1, 1.5, 1.8, 2.1, 2.4, 2.7, 3, 3.3];
const APT_SHARES = [0.5, 0.4, 0.4, 0.2];
const HOUSE_SHARES = [0.3, 0.2, 0.2, 0.1];
const DEFERRALS = [
  "10 ans de différé, puis 15 ans de remboursement",
  "8 ans de différé, puis 12 ans de remboursement",
  "2 ans de différé, puis 13 ans de remboursement",
  "Pas de différé ; remboursement sur 10 ans",
];

const euro = (value) =>
  Number.isFinite(value)
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(Math.max(0, value))
    : "—";

const percent = (value) =>
  Number.isFinite(value)
    ? `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`
    : "—";

const nonNegative = (value) => Math.max(0, Number(value) || 0);

function paymentFactor(annualRate, years) {
  const monthlyRate = annualRate / 1200;
  const count = years * 12;
  return monthlyRate === 0
    ? 1 / count
    : monthlyRate / (1 - Math.pow(1 + monthlyRate, -count));
}

function loanFromPayment(monthly, annualRate, years, insuranceRate) {
  const factor = paymentFactor(annualRate, years) + insuranceRate / 1200;
  return factor > 0 ? Math.max(0, monthly) / factor : 0;
}

function Field({ label, name, value, onChange, type = "number", options, hint, ...props }) {

  return (
    <div className="sim-field">
      <label htmlFor={`sim-${name}`}>{label}</label>
      {options ? (
        <select
          id={`sim-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`sim-${name}`}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required
          {...(type === "number" ? { min: 0 } : {})}
          {...props}
        />
      )}
      {hint && <small>{hint}</small>}
    </div>
  );
}

function Subhead({ children }) {
  return <div className="sim-subhead">{children}</div>;
}

function Metric({ label, value, primary = false }) {
  return (
    <div className={`sim-metric${primary ? " sim-metric--primary" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SectionHead({ title, description, tag }) {
  return (
    <div className="sim-section-head">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="sim-tag">{tag}</span>
    </div>
  );
}

export default function  SimulateurImmobilier() {
  const [values, setValues] = useState({ ...INITIAL });
  const [activeTab, setActiveTab] = useState("capacity");
  const [contactError, setContactError] = useState("");

  const setField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const calculations = useMemo(() => {
    const v = values;
    const n = (key) => nonNegative(v[key]);

    // Capacité d'emprunt
    const income = n("income");
    const debts = n("debts");
    const effort = Math.min(50, Math.max(1, Number(v.effort) || 35)) / 100;
    const term = Number(v.term);
    const rate = n("rate");
    const insurance = n("insurance");
    const available = Math.max(0, income * effort - debts);
    const loan = loanFromPayment(available, rate, term, insurance);
    const capacityBudget = loan + n("deposit");
    const ratio = income ? ((debts + available) / income) * 100 : 0;
    const capacity = { income, debts, available, loan, term, rate, insurance, budget: capacityBudget, ratio };

    // Estimation indicative du PTZ (barèmes simplifiés fournis)
    const zone = v.zone;
    const people = Math.min(8, Math.max(1, Number(v.people) || 1));
    const index = people - 1;
    const rfr = n("rfr");
    const cost = n("ptzPrice");
    const type = v.homeType;
    const firstBuyer = v.firstBuyer;
    const otherLoans = n("otherLoans");
    const zoneData = ZONES[zone];
    const operationCap = zoneData.caps[index];
    const incomeCap = zoneData.income[index];
    const resources = Math.max(rfr, cost / 9);
    const quotient = resources / COEFF[index];
    const tranche = quotient <= zoneData.tr[0] ? 1 : quotient <= zoneData.tr[1] ? 2 : quotient <= zoneData.tr[2] ? 3 : quotient <= zoneData.tr[3] ? 4 : 5;
    const shares = type === "house" ? HOUSE_SHARES : APT_SHARES;
    const share = shares[tranche - 1] || 0;
    const eligibleIncome = resources <= incomeCap;
    const eligible = eligibleIncome && firstBuyer !== "no" && firstBuyer !== "exception" && tranche <= 4 && cost > 0;
    let ptzAmount = eligible ? Math.min(cost, operationCap) * share : 0;
    if (otherLoans > 0) ptzAmount = Math.min(ptzAmount, otherLoans);
    const reasons = [];
    if (!eligibleIncome) reasons.push("Le RFR dépasse le plafond de ressources affiché pour la zone et la taille du foyer.");
    if (firstBuyer === "no") reasons.push("La condition de primo-accession n’est pas remplie, sauf exception applicable.");
    if (firstBuyer === "exception") reasons.push("L’exception à la condition de primo-accession doit être validée.");
    if (tranche > 4) reasons.push("Le quotient de ressources se situe au-delà de la tranche 4.");
    if (!cost) reasons.push("Saisissez le coût de l’opération.");
    const ptz = {
      eligible, amount: ptzAmount, share, tranche, resources, quotient, operationCap,
      deferral: tranche <= 4 ? DEFERRALS[tranche - 1] : "À vérifier",
      note: eligible
        ? `Calcul simplifié fondé sur les plafonds de ressources, le quotient familial, le plafond d’opération et la quotité indicative. Le montant réel et le différé doivent être confirmés par un établissement prêteur. ${otherLoans > 0 ? "Le montant est plafonné par les autres prêts renseignés." : "Renseignez les autres prêts éligibles pour vérifier le plafond légal."}`
        : `${reasons.join(" ")} Le résultat n’est pas une décision officielle.`,
    };

    // Budget d'acquisition
    const price = n("targetPrice");
    const deposit = n("cash");
    const ptzManual = n("ptzManual");
    const notary = price * n("notaryRate") / 100;
    const guarantee = n("guarantee");
    const other = n("otherCosts");
    const total = price + notary + guarantee + other;
    const need = Math.max(0, total - deposit - ptzManual);
    const budgetIncome = n("budgetIncome");
    const budgetDebts = n("budgetDebts");
    const maxMonth = Math.max(0, budgetIncome * 0.35 - budgetDebts);
    const budgetTerm = Number(v.budgetTerm);
    const budgetRate = n("budgetRate");
    const budgetInsurance = n("budgetInsurance");
    const monthly = need * (paymentFactor(budgetRate, budgetTerm) + budgetInsurance / 1200);
    const budget = {
      price, deposit, ptzAmt: ptzManual, notary, guarantee, other, total, need, monthly, maxMonth,
      note: `Mensualité indicative sur le financement restant, assurance estimée comprise. ${monthly > maxMonth ? "Attention : cette mensualité dépasse le repère de 35 % après prise en compte des crédits renseignés." : "Mensualité comparée à un taux d’effort indicatif de 35 % (hors autres charges du foyer)."}`,
    };

    return {
      capacity,
      ptz,
      budget,
      summary: {
        loan: capacity.loan,
        ptz: ptz.amount,
        housingBudget: Math.max(0, capacity.loan + n("deposit") + ptz.amount),
        monthly: budget.monthly,
      },
    };
  }, [values]);

  const { capacity, ptz, budget, summary } = calculations;
  const handlePrint = () => {
  const fields = document.querySelectorAll(
    ".sim-contact-grid input, .sim-contact-grid select"
  );

  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return;
    }
  }

  window.print();
};

  const reset = () => {
    setValues({ ...INITIAL });
    setContactError("");
  };

  const prepareEmail = () => {
    setContactError("");
    /* if (values.contactConsent !== "yes") {
      setContactError("Pour préparer une demande de contact, sélectionnez d’abord l’option indiquant que vous souhaitez être recontacté.");
      return;
    } */
    const name = values.clientName.trim();
    const email = values.clientEmail.trim();
    if (!name || !email || !email.includes("@")) {
      setContactError("Veuillez renseigner votre nom et une adresse e-mail valide.");
      return;
    }

    const body = [
      "Bonjour GOLD'N PATRIMOINE,",
      "",
      "Je souhaite être accompagné(e) dans mon projet immobilier.",
      "",
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Téléphone : ${values.clientPhone}`,
      `Secteur recherché : ${values.city}`,
      `Projet : ${values.projectType}`,
      "",
      "Synthèse indicative :",
      `Capital bancaire estimé : ${euro(capacity.loan)}`,
      `PTZ potentiel estimé : ${euro(ptz.amount)}`,
      `Budget du projet : ${euro(budget.total)}`,
      `Financement restant : ${euro(budget.need)}`,
      `Mensualité estimée : ${euro(budget.monthly)}`,
      "",
      "Merci de me recontacter.",
      "",
      "Cordialement",
    ].join("\n");

    window.location.href =
      `mailto:?subject=${encodeURIComponent("Demande d’accompagnement immobilier — GOLD’N PATRIMOINE")}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const tabs = [
    { id: "capacity", label: "1. Capacité" },
    { id: "ptz", label: "2. PTZ" },
    { id: "budget", label: "3. Budget & frais" },
    { id: "summary", label: "4. Synthèse" },
  ];

  return (
    <div className="sim-wrap">
      <div className="sim-app">
        <nav className="sim-tabs" aria-label="Modules de simulation">
          {tabs.map((tab) => (
            <button
              className="sim-tab"
              key={tab.id}
              type="button"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="sim-main">
          {activeTab === "capacity" && (
            <section className="sim-panel">
              <SectionHead
                title="Votre capacité d’emprunt"
                description="Indiquez les revenus du foyer et les paramètres envisagés pour estimer un financement bancaire."
                tag="Estimation indicative"
              />
              <div className="sim-grid">
                <Subhead>Votre situation financière</Subhead>
                <Field label="Revenus nets mensuels du foyer (€)" name="income" value={values.income} onChange={setField} step="50" />
                <Field label="Mensualités de crédits existants (€)" name="debts" value={values.debts} onChange={setField} step="10" />
                <Field label="Taux d’effort cible (%)" name="effort" value={values.effort} onChange={setField} min="1" max="50" step="1" hint="35 % est un repère usuel, la banque examine aussi le reste à vivre." />
                <Field label="Apport personnel (€)" name="deposit" value={values.deposit} onChange={setField} step="500" />
                <Field label="Durée du crédit principal" name="term" value={values.term} onChange={setField} options={[10, 15, 20, 25].map((x) => ({ value: String(x), label: `${x} ans` }))} />
                <Field label="Taux nominal annuel (%)" name="rate" value={values.rate} onChange={setField} max="15" step="0.05" />
                <Field label="Assurance estimée (% annuel du capital initial)" name="insurance" value={values.insurance} onChange={setField} max="3" step="0.05" hint="Le coût réel dépend de l’âge, du profil et du contrat." />
              </div>
              <div className="sim-results">
                <div className="sim-result-grid">
                  <Metric primary label="Mensualité maximale disponible, assurance incluse" value={`${euro(capacity.available)}/mois`} />
                  <Metric label="Capital bancaire estimé" value={euro(capacity.loan)} />
                  <Metric label="Budget avec apport (hors PTZ)" value={euro(capacity.budget)} />
                  <Metric label="Taux d’effort estimé après projet" value={capacity.income ? percent(capacity.ratio) : "—"} />
                </div>
                <p className="sim-note">Le montant estimé suppose que la mensualité disponible couvre le crédit et une assurance calculée approximativement sur le capital initial. La banque peut retenir un montant différent.</p>
              </div>
            </section>
          )}

          {activeTab === "ptz" && (
            <section className="sim-panel">
              <SectionHead
                title="Estimation du prêt à taux zéro (PTZ)"
                description="Pour un achat destiné à devenir votre résidence principale. Les paramètres réglementaires et le zonage doivent être confirmés."
                tag="Barèmes indicatifs 2025–2027"
              />
              <div className="sim-grid">
                <Subhead>Le logement et le foyer</Subhead>
                <Field label="Zone du logement" name="zone" value={values.zone} onChange={setField} options={[{ value: "A", label: "A / A bis" }, { value: "B1", label: "B1" }, { value: "B2", label: "B2" }, { value: "C", label: "C" }]} hint="Vérifiez le zonage de la commune exacte." />
                <Field label="Personnes destinées à occuper le logement" name="people" value={values.people} onChange={setField} options={Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: i === 7 ? "8 personnes ou plus" : `${i + 1} personne${i ? "s" : ""}` }))} />
                <Field label="Revenu fiscal de référence total (€)" name="rfr" value={values.rfr} onChange={setField} step="100" hint="En principe, revenus fiscaux N-2 des occupants." />
                <Field label="Coût total de l’opération (€)" name="ptzPrice" value={values.ptzPrice} onChange={setField} step="1000" />
                <Field label="Type de logement neuf" name="homeType" value={values.homeType} onChange={setField} options={[{ value: "apt", label: "Appartement neuf" }, { value: "house", label: "Maison individuelle neuve" }]} />
                <Field label="Condition de primo-accession" name="firstBuyer" value={values.firstBuyer} onChange={setField} options={[{ value: "yes", label: "Oui, condition remplie" }, { value: "no", label: "Non" }, { value: "exception", label: "Situation dérogatoire à vérifier" }]} hint="En règle générale, ne pas avoir été propriétaire de sa résidence principale durant les 2 dernières années, sous réserve d’exceptions." />
                <Field label="Autres prêts de plus de 2 ans concourant au financement (€)" name="otherLoans" value={values.otherLoans} onChange={setField} step="1000" hint="Le PTZ ne peut normalement pas dépasser le montant des autres prêts éligibles de plus de 2 ans." />
              </div>
              <div className="sim-results">
                <div className="sim-result-grid">
                  <Metric primary label="Résultat indicatif" value={<span className={`sim-pill ${ptz.eligible ? "" : "sim-pill--warn"}`}>{ptz.eligible ? "Potentiellement éligible" : "À vérifier"}</span>} />
                  <Metric label="Montant potentiel du PTZ" value={euro(ptz.amount)} />
                  <Metric label="Quotité appliquée" value={percent(ptz.share * 100)} />
                  <Metric label="Tranche de ressources estimée" value={ptz.tranche <= 4 ? `Tranche ${ptz.tranche}` : "Hors tranches retenues"} />
                </div>
                <p className="sim-note">{ptz.note}</p>
                <div className="sim-table-wrap">
                  <table>
                    <thead><tr><th>Étape du calcul</th><th>Estimation</th></tr></thead>
                    <tbody>
                      <tr><td>Ressources retenues (max. RFR ou coût de l’opération ÷ 9)</td><td>{euro(ptz.resources)}</td></tr>
                      <tr><td>Ressources divisées par le coefficient familial</td><td>{euro(ptz.quotient)}</td></tr>
                      <tr><td>Plafond d’opération retenu</td><td>{euro(ptz.operationCap)}</td></tr>
                      <tr><td>Durée de différé indicative selon tranche</td><td>{ptz.deferral}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === "budget" && (
            <section className="sim-panel">
              <SectionHead
                title="Budget d’acquisition et frais"
                description="Évaluez le prix de logement compatible avec vos paramètres, puis ajustez les frais liés à votre programme."
                tag="Personnalisable"
              />
              <div className="sim-grid">
                <Subhead>Hypothèses d’achat</Subhead>
                <Field label="Prix du logement (€)" name="targetPrice" value={values.targetPrice} onChange={setField} step="1000" />
                <Field label="Apport personnel (€)" name="cash" value={values.cash} onChange={setField} step="500" />
                <Field label="PTZ estimé ou confirmé (€)" name="ptzManual" value={values.ptzManual} onChange={setField} step="1000" hint="Reportez ici le résultat du module PTZ si pertinent." />
                <Field label="Frais d’acte estimés (% du prix)" name="notaryRate" value={values.notaryRate} onChange={setField} max="10" step="0.1" hint="Valeur indicative à confirmer selon le bien et l’opération." />
                <Field label="Garantie, dossier et frais bancaires (€)" name="guarantee" value={values.guarantee} onChange={setField} step="100" />
                <Field label="Autres frais / options (€)" name="otherCosts" value={values.otherCosts} onChange={setField} step="100" />
                <Field label="Revenus nets mensuels du foyer (€)" name="budgetIncome" value={values.budgetIncome} onChange={setField} step="50" />
                <Field label="Crédits existants (€ / mois)" name="budgetDebts" value={values.budgetDebts} onChange={setField} step="10" />
                <Field label="Durée du prêt bancaire" name="budgetTerm" value={values.budgetTerm} onChange={setField} options={[10, 15, 20, 25].map((x) => ({ value: String(x), label: `${x} ans` }))} />
                <Field label="Taux nominal annuel (%)" name="budgetRate" value={values.budgetRate} onChange={setField} max="15" step="0.05" />
                <Field label="Assurance estimée (% annuel)" name="budgetInsurance" value={values.budgetInsurance} onChange={setField} max="3" step="0.05" />
              </div>
              <div className="sim-results">
                <div className="sim-result-grid">
                  <Metric label="Frais d’acte estimés" value={euro(budget.notary)} />
                  <Metric label="Coût total du projet estimé" value={euro(budget.total)} />
                  <Metric primary label="Financement à trouver après apport et PTZ" value={euro(budget.need)} />
                  <Metric label="Mensualité bancaire estimée, assurance incluse" value={`${euro(budget.monthly)}/mois`} />
                </div>
                <p className="sim-note">{budget.note}</p>
              </div>
            </section>
          )}

          {activeTab === "summary" && (
            <section className="sim-panel">
              <SectionHead
                title="La synthèse de votre projet"
                description="Récapitulatif des hypothèses saisies et des estimations. Vous pouvez imprimer cette page ou demander un accompagnement."
                tag="Préparation de rendez-vous"
              />
              <div className="sim-results">
                <div className="sim-result-grid">
                  <Metric label="Capital bancaire estimé" value={euro(summary.loan)} />
                  <Metric label="PTZ potentiel estimé" value={euro(summary.ptz)} />
                  <Metric label="Budget logement indicatif" value={euro(summary.housingBudget)} />
                  <Metric primary label="Mensualité bancaire estimée" value={`${euro(summary.monthly)}/mois`} />
                </div>
                <p className="sim-note">Prix saisi : <strong>{euro(budget.price)}</strong> · Apport : <strong>{euro(budget.deposit)}</strong> · Frais estimés : <strong>{euro(budget.notary + budget.guarantee + budget.other)}</strong>. Résultats indicatifs uniquement ; voir les avertissements ci-dessous.</p>
              </div>
              <div className="sim-grid sim-contact-grid">
                <Field label="Prénom et nom" name="clientName" type="text" value={values.clientName} onChange={setField} autoComplete="name" placeholder="Votre nom" />
                <Field label="E-mail" name="clientEmail" type="email" value={values.clientEmail} onChange={setField} autoComplete="email" placeholder="vous@exemple.fr" />
                <Field label="Téléphone" name="clientPhone" type="tel" value={values.clientPhone} onChange={setField} autoComplete="tel" placeholder="06 00 00 00 00" />
                <Field label="Ville ou secteur recherché" name="city" type="text" value={values.city} onChange={setField} placeholder="Ex. Chessy, Noisiel…" />
                <Field label="Votre projet" name="projectType" value={values.projectType} onChange={setField} options={[{ value: "Résidence principale", label: "Résidence principale" }, { value: "Investissement locatif", label: "Investissement locatif" }, { value: "Je me renseigne", label: "Je me renseigne" }]} />
                
              </div>
              <div className="sim-actions">
                <button className="sim-btn" type="button" onClick={prepareEmail}>Préparer ma demande par e-mail</button>
                <button
  className="sim-btn sim-btn--secondary"
  type="button"
 onClick={handlePrint}
>
  Imprimer / enregistrer en PDF
</button>
              </div>
              {contactError && <p className="sim-error" role="alert">{contactError}</p>}
              <p className="sim-note">Le bouton e-mail ouvre votre logiciel de messagerie avec un récapitulatif. Pour collecter automatiquement les coordonnées, il faudra connecter ce formulaire à votre outil de contact/CRM et ajouter une notice de confidentialité adaptée.</p>
            </section>
          )}

          <div className="sim-actions sim-global-actions">
            <button className="sim-btn sim-btn--secondary" type="button" onClick={reset}>Réinitialiser les valeurs</button>
            <a className="sim-btn" href="https://goldnpatrimoine.netlify.app/" target="_blank" rel="noopener noreferrer">Découvrir GOLD’N PATRIMOINE</a>
          </div>
        </main>

        <footer className="sim-footer">
          <div className="sim-footer-row">
            <div className="sim-sign"><strong>GOLD'N PATRIMOINE</strong><br/><span>Votre avenir commence ici.</span>
             <div className="logo-sim">
              <img src={LogoSim.src} alt="" />
            </div>
            </div>
            <span>Simulation gratuite · Résultats indicatifs</span>
           
          </div>
        </footer>
        <div className="sim-fineprint">
          Important : cet outil est informatif et non contractuel. Il ne constitue pas une offre de prêt, un conseil financier personnalisé ou une décision officielle d’éligibilité au PTZ. Le calcul réel dépend de la commune exacte, des ressources retenues, de la nature du projet, des plafonds réglementaires, du calendrier de remboursement, de l’assurance, des frais et de l’analyse de la banque. Les frais d’acte et les conditions fiscales sont à vérifier pour chaque opération. Les données saisies restent dans cette page et ne sont pas transmises automatiquement.
        </div>
      </div>
    </div>
  );
}
