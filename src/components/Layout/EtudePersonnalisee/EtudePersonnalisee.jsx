

"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./EtudePersonnalisee.scss";

const INITIAL_VALUES = {
  goal: "income",
  property: "new",
  rental: "unknown",
  works: "no",
  price: 220000,
  contribution: 20000,
  fees: 7000,
  workcost: 0,
  rate: 3.5,
  years: "20",
  insurance: 0.3,
  rent: 850,
  vacancy: 0.5,
  tax: 1000,
  copro: 900,
  manage: 7,
  other: 300,
  bracket: "unknown",
  existing: "no",
  location: "",
  firstName: "",
  email: "",
  contactConsent: false,
  tel: "",
};

const GOALS = {
  income: "Générer des revenus complémentaires",
  tax: "Étudier les avantages fiscaux",
  wealth: "Constituer un patrimoine",
  retirement: "Préparer ma retraite",
};

const PROPERTY_LABELS = {
  new: "Immobilier neuf",
  old: "Immobilier ancien",
  either: "Neuf ou ancien",
};

const RENTAL_LABELS = {
  unknown: "À déterminer",
  furnished: "Location meublée",
  bare: "Location non meublée",
};

const WORK_LABELS = {
  no: "Non",
  yes: "Oui",
  unknown: "À déterminer",
};

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value) {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(value)} %`;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({
  label,
  name,
  values,
  onChange,
  type = "text",
  min,
  max,
  maxLength,
  step,
  required = false,
  hint,
  wide = false,
  placeholder,
  children,
}) {
  return (
    <div className={`etude-field${wide ? " etude-field--wide" : ""}`}>
      <label htmlFor={name}>{label}</label>

      {children || (
        <input
          id={name}
          name={name}
          type={type}
          value={values[name] ?? ""}
          onChange={onChange}
          min={min}
          max={max}
          maxLength={maxLength}
          step={step}
          required={required}
          placeholder={placeholder}
        />
      )}

      {hint && <span className="etude-small">{hint}</span>}
    </div>
  );
}

function SelectField({ label, name, values, onChange, options, wide = false }) {
  return (
    <Field label={label} name={name} values={values} onChange={onChange} wide={wide}>
      <select id={name} name={name} value={values[name]} onChange={onChange}>
        {options.map(([value, text]) => (
          <option key={value} value={value}>{text}</option>
        ))}
      </select>
    </Field>
  );
}

export default function EtudePersonnalisee() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [sendHint, setSendHint] = useState("");
  const [sendStatus, setSendStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [studySent, setStudySent] = useState(false);

  const pendingScrollY = useRef(null);

useLayoutEffect(() => {
  if (pendingScrollY.current === null) return;

  const scrollPosition = pendingScrollY.current;
  pendingScrollY.current = null;

  window.scrollTo({
    top: scrollPosition,
    left: 0,
    behavior: "auto",
  });
}, [step]);

const updateValue = (event) => {
  const { name, value, type, checked } = event.target;

  setValues((current) => ({
    ...current,
    [name]: type === "checkbox" ? checked : value,
  }));

  setError("");
  setSendHint("");
  setSendStatus("");
  setStudySent(false);
};

  const results = useMemo(() => {
    const price = numberValue(values.price);
    const fees = numberValue(values.fees);
    const work = numberValue(values.workcost);
    const equity = numberValue(values.contribution);
    const total = price + fees + work;
    const loan = Math.max(0, total - equity);
    const annualRate = numberValue(values.rate) / 100;
    const months = numberValue(values.years) * 12;
    const monthlyRate = annualRate / 12;
    const monthlyLoan = loan === 0
      ? 0
      : monthlyRate === 0
        ? loan / months
        : loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    const insurance = loan * numberValue(values.insurance) / 1200;
    const monthlyDebt = monthlyLoan + insurance;
    const rent = numberValue(values.rent);
    const vacancy = numberValue(values.vacancy);
    const collected = rent * (12 - vacancy);
    const costs = numberValue(values.tax)
      + numberValue(values.copro)
      + numberValue(values.other)
      + collected * numberValue(values.manage) / 100;
    const annualNet = collected - costs;
    const monthlyCash = annualNet / 12 - monthlyDebt;
    const gross = total > 0 ? rent * 12 / total * 100 : 0;
    const net = total > 0 ? annualNet / total * 100 : 0;

    const schemes = [];
    if (values.rental !== "bare") {
      schemes.push([
        "LMNP",
        "À étudier si vous envisagez une location meublée, sous réserve des conditions de qualification et du régime fiscal applicable.",
      ]);
    }
    if (values.property !== "new" && values.works !== "no") {
      schemes.push([
        "Déficit foncier",
        "À examiner en cas de location nue au régime réel avec charges et travaux fiscalement déductibles.",
      ]);
      schemes.push([
        "Denormandie",
        "Possible uniquement pour certains logements anciens rénovés dans des communes éligibles, sous conditions de travaux, location et plafonds.",
      ]);
    }
    if (values.rental !== "furnished") {
      schemes.push([
        "Loc’Avantages",
        "À envisager si vous acceptez un loyer plafonné, des conditions de ressources et un conventionnement avec l’Anah.",
      ]);
    }
    if (values.rental !== "furnished" && (values.property !== "old" || values.works !== "no")) {
      schemes.push([
        "Dispositif Jeanbrun / Relance logement",
        "À vérifier selon la nature du logement, les éventuels travaux, les engagements de location et les critères légaux en vigueur.",
      ]);
    }
    if (!schemes.length) {
      schemes.push(["Étude sur mesure", "Votre projet nécessite une analyse approfondie des régimes possibles."]);
    }

    const metrics = [
      ["Coût global", formatEuro(total)],
      ["Emprunt estimé", formatEuro(loan)],
      ["Mensualité avec assurance", formatEuro(monthlyDebt)],
      ["Rendement brut", formatPercent(gross)],
      ["Rendement net de charges*", formatPercent(net)],
      ["Cash-flow mensuel avant impôts", formatEuro(monthlyCash)],
    ];

    return {
      total, loan, monthlyDebt, monthlyCash, gross, net, vacancy, schemes, metrics,
      annualNet,
    };
  }, [values]);

  const validateStep = () => {
    const numericByStep = {
      1: ["price", "contribution", "fees", "workcost", "rate", "insurance"],
      2: ["rent", "vacancy", "tax", "copro", "manage", "other"],
    };
    for (const name of numericByStep[step] || []) {
      const value = numberValue(values[name]);
      if (values[name] === "" || !Number.isFinite(value)) {
        setError("Vérifiez les montants saisis avant de continuer.");
        return false;
      }
    }

    if (step === 1) {
      const price = numberValue(values.price);
      const contribution = numberValue(values.contribution);
      const fees = numberValue(values.fees);
      const works = numberValue(values.workcost);
      if (price < 10000 || contribution < 0 || fees < 0 || works < 0
        || numberValue(values.rate) < 0 || numberValue(values.rate) > 30
        || numberValue(values.insurance) < 0 || numberValue(values.insurance) > 10) {
        setError("Vérifiez les montants et taux saisis avant de continuer.");
        return false;
      }
      if (contribution > price + fees + works) {
        setError("L’apport dépasse le coût total du projet.");
        return false;
      }
    }

    if (step === 2) {
      if (numberValue(values.rent) < 0 || numberValue(values.vacancy) < 0
        || numberValue(values.vacancy) > 12 || numberValue(values.tax) < 0
        || numberValue(values.copro) < 0 || numberValue(values.manage) < 0
        || numberValue(values.manage) > 100 || numberValue(values.other) < 0) {
        setError("Vérifiez les charges et hypothèses locatives saisies.");
        return false;
      }
    }

    if (step === 4 && values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setError("Vérifiez le format de votre adresse e-mail.");
      return false;
    }
    if (step === 4 && values.contactConsent && !values.email.trim()) {
      setError("Indiquez une adresse e-mail pour transmettre votre étude.");
      return false;
    }
    setError("");
    return true;
  };

  const calculate = () => {
    setResultsVisible(true);
    setSendHint("");
    setSendStatus("");
    window.setTimeout(() => {
      document.getElementById("etude-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

 const nextStep = () => {
  if (!validateStep()) return;

  if (step < 4) {
    pendingScrollY.current = window.scrollY;
    setStep((current) => current + 1);
  } else {
    calculate();
  }
};

const previousStep = () => {
  if (step > 0) {
    pendingScrollY.current = window.scrollY;
    setStep((current) => current - 1);
    setError("");
  }
};



  const sendStudy = async () => {
    if (loading) return false;

    if (!values.contactConsent) {
      setSendHint("Pour transmettre votre étude, cochez d’abord la case de demande de contact à l’étape 5.");
      return false;
    }
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setSendHint("Renseignez une adresse e-mail valide à l’étape 5.");
      return false;
    }

    setLoading(true);
    setSendHint("");
    setSendStatus("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4050";
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/etude-personnalisee`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.firstName.trim() || "Client",
email: values.email.trim(),
tel: values.tel.trim(),
city: values.location.trim(),
contactConsent: values.contactConsent,
            projectType: `${GOALS[values.goal]} — ${PROPERTY_LABELS[values.property]}`,
            loan: results.loan,
            ptz: 0,
            budget: results.total,
            financingNeeded: results.loan,
            monthlyPayment: results.monthlyDebt,
            studyType: "Étude personnalisée",
            rental: RENTAL_LABELS[values.rental],
            works: WORK_LABELS[values.works],
            rent: numberValue(values.rent),
            vacancy: numberValue(values.vacancy),
            grossYield: results.gross,
            netYield: results.net,
            monthlyCashFlow: results.monthlyCash,
            taxBracket: values.bracket,
            alreadyLandlord: values.existing,
            schemes: results.schemes,
            summary: buildSummary(),
          }),
        }
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.status !== "Message Sent") {
        throw new Error(data.message || "L’envoi de votre étude a échoué.");
      }

      setStudySent(true);
      setSendStatus("success");
      setSendHint("Votre étude a été envoyée avec succès à GOLD’N PATRIMOINE.");
      return true;
    } catch (err) {
      setSendStatus("error");
      setSendHint(err instanceof Error ? err.message : "Impossible d’envoyer l’étude. Réessayez ultérieurement.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const buildSummary = () => [
    "Étude GOLD’N PATRIMOINE",
    `Objectif : ${GOALS[values.goal]}`,
    `Bien : ${PROPERTY_LABELS[values.property]}`,
    `Location : ${RENTAL_LABELS[values.rental]}`,
    `Travaux : ${WORK_LABELS[values.works]}`,
    `Prix d’achat : ${formatEuro(numberValue(values.price))}`,
    `Apport : ${formatEuro(numberValue(values.contribution))}`,
    `Frais : ${formatEuro(numberValue(values.fees))}`,
    `Travaux : ${formatEuro(numberValue(values.workcost))}`,
    `Taux du crédit : ${values.rate} %`,
    `Durée : ${values.years} ans`,
    `Assurance : ${values.insurance} %`,
    `Loyer mensuel : ${formatEuro(numberValue(values.rent))}`,
    `Vacance locative : ${values.vacancy} mois/an`,
    `Taxe foncière : ${formatEuro(numberValue(values.tax))}`,
    `Charges non récupérables : ${formatEuro(numberValue(values.copro))}`,
    `Gestion locative : ${values.manage} %`,
    `Autres dépenses : ${formatEuro(numberValue(values.other))}`,
    `Tranche d’imposition : ${values.bracket === "unknown" ? "Inconnue" : `${values.bracket} %`}`,
    `Déjà propriétaire bailleur : ${values.existing === "yes" ? "Oui" : "Non"}`,
    `Secteur recherché : ${values.location.trim() || "Non précisé"}`,
    "",
    ...results.metrics.map(([label, value]) => `${label} : ${value}`),
    "",
    "Dispositifs à approfondir :",
    ...results.schemes.map(([name, description]) => `- ${name} : ${description}`),
    "",
    "Étude indicative sans garantie de résultat.",
  ].join("\n");

  const handlePrint = async () => {
    const sent = studySent || await sendStudy();
    if (!sent) return;
    window.print();
  };

  return (
    <div className="etude-personnalisee">
      

     

      <main className="etude-wrap etude-main">
        <div>
          <div className="etude-panel" id="etude-form">
            <div className="etude-eyebrow">Étape {step + 1} sur 5</div>
            <div className="etude-progress" aria-label={`Progression : ${(step + 1) * 20} %`}>
              <span style={{ width: `${(step + 1) * 20}%` }} />
            </div>

            {step === 0 && (
              <section className="etude-step">
                <h2>Votre projet</h2>
                <p className="etude-hint">Commençons par votre objectif et le type de logement envisagé.</p>
                <div className="etude-fields">
                  <SelectField wide label="Votre objectif principal" name="goal" values={values} onChange={updateValue} options={[
                    ["income", "Générer des revenus complémentaires"],
                    ["tax", "Étudier les avantages fiscaux"],
                    ["wealth", "Constituer un patrimoine"],
                    ["retirement", "Préparer ma retraite"],
                  ]} />
                  <SelectField label="Type de bien" name="property" values={values} onChange={updateValue} options={[
                    ["new", "Immobilier neuf"], ["old", "Immobilier ancien"], ["either", "Je suis ouvert aux deux"],
                  ]} />
                  <SelectField label="Location envisagée" name="rental" values={values} onChange={updateValue} options={[
                    ["unknown", "Je ne sais pas encore"], ["furnished", "Meublée"], ["bare", "Non meublée"],
                  ]} />
                  <SelectField wide label="Travaux envisagés" name="works" values={values} onChange={updateValue} options={[
                    ["no", "Non"], ["yes", "Oui"], ["unknown", "À déterminer"],
                  ]} />
                </div>
              </section>
            )}

            {step === 1 && (
              <section className="etude-step">
                <h2>Votre budget</h2>
                <p className="etude-hint">Nous calculons un financement théorique à partir de vos hypothèses.</p>
                <div className="etude-fields">
                  <Field label="Prix d’achat (€)" name="price" values={values} onChange={updateValue} type="number" min="10000" required />
                  <Field label="Apport personnel (€)" name="contribution" values={values} onChange={updateValue} type="number" min="0" required />
                  <Field label="Frais d’acquisition et annexes (€)" name="fees" values={values} onChange={updateValue} type="number" min="0" required />
                  <Field label="Budget travaux (€)" name="workcost" values={values} onChange={updateValue} type="number" min="0" required />
                  <Field label="Taux du crédit annuel (%)" name="rate" values={values} onChange={updateValue} type="number" min="0" max="30" step="0.05" required />
                  <SelectField label="Durée du crédit (années)" name="years" values={values} onChange={updateValue} options={[["15", "15 ans"], ["20", "20 ans"], ["25", "25 ans"]]} />
                  <Field wide label="Assurance emprunteur annuelle (% du capital initial)" name="insurance" values={values} onChange={updateValue} type="number" min="0" max="10" step="0.05" required />
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="etude-step">
                <h2>Votre prévision locative</h2>
                <p className="etude-hint">Pour une estimation plus réaliste, indiquez vos charges annuelles.</p>
                <div className="etude-fields">
                  <Field label="Loyer mensuel hors charges (€)" name="rent" values={values} onChange={updateValue} type="number" min="0" required />
                  <Field label="Vacance locative (mois/an)" name="vacancy" values={values} onChange={updateValue} type="number" min="0" max="12" step="0.5" required />
                  <Field label="Taxe foncière annuelle (€)" name="tax" values={values} onChange={updateValue} type="number" min="0" required />
                  <Field label="Charges non récupérables annuelles (€)" name="copro" values={values} onChange={updateValue} type="number" min="0" required />
                  <Field label="Gestion locative (% des loyers encaissés)" name="manage" values={values} onChange={updateValue} type="number" min="0" max="100" step="0.5" required />
                  <Field label="Autres dépenses annuelles (€)" name="other" values={values} onChange={updateValue} type="number" min="0" required />
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="etude-step">
                <h2>Votre profil fiscal</h2>
                <p className="etude-hint">Ces informations servent à orienter les dispositifs, pas à calculer un impôt personnalisé.</p>
                <div className="etude-fields">
                  <SelectField label="Tranche marginale d’imposition" name="bracket" values={values} onChange={updateValue} options={[
                    ["unknown", "Je ne sais pas"], ["0", "0 %"], ["11", "11 %"], ["30", "30 %"], ["41", "41 %"], ["45", "45 %"],
                  ]} />
                  <SelectField label="Déjà propriétaire bailleur ?" name="existing" values={values} onChange={updateValue} options={[
                    ["no", "Non"], ["yes", "Oui"],
                  ]} />
                  <Field
  wide
  label="Ville ou secteur recherché (facultatif)"
  name="location"
  values={values}
  onChange={updateValue}
  maxLength={100}
  hint="Ex. : Lyon, Île-de-France…"
/>
                </div>
              </section>
            )}

            {step === 4 && (
              <section className="etude-step">
                <h2>Votre étude est presque prête</h2>
                <p className="etude-hint">L’analyse s’affichera immédiatement. Vous pourrez l’imprimer ou demander un accompagnement.</p>
                <div className="etude-fields">
                  <Field label="Nom et prénom" name="firstName" values={values} onChange={updateValue} hint="Votre nom et prénom" />
                 <Field
  label="Numéro de téléphone"
  name="tel"
  values={values}
  onChange={updateValue}
  type="tel"
  placeholder="06 12 34 56 78"
  hint="Votre numéro de téléphone"
/>
                  <Field label="Adresse e-mail" name="email" values={values} onChange={updateValue} type="email" hint="vous@exemple.fr" />
                  <div className="etude-field etude-field--wide">
                    <label className="etude-consent">
                      <input required name="contactConsent" type="checkbox" checked={values.contactConsent} onChange={updateValue} />
                      <span>Je souhaite transmettre mon étude à GOLD’N PATRIMOINE pour être recontacté(e).</span>
                    </label>
                    <span className="etude-small">Votre étude sera transmise uniquement après votre demande explicite et si vous avez renseigné une adresse e-mail valide.</span>
                  </div>
                </div>
              </section>
            )}

            {error && <p className="etude-error" role="alert">{error}</p>}

            <div className="etude-actions">
              <button className="etude-btn etude-btn--alt" type="button" onClick={previousStep} disabled={step === 0}>
                ← Précédent
              </button>
              <button className="etude-btn" type="button" onClick={nextStep}>
                {step === 4 ? "Voir mon étude →" : "Continuer →"}
              </button>
            </div>
          </div>

          {resultsVisible && (
            <section className="etude-results" id="etude-results" aria-live="polite">
              <div className="etude-eyebrow">GOLD’N PATRIMOINE • Étude indicative</div>
              <h2>{values.firstName.trim() ? `Votre étude, ${values.firstName.trim()}` : "Votre étude personnalisée"}</h2>
              <div className="etude-metrics">
                {results.metrics.map(([label, value]) => (
                  <div className="etude-metric" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <p className="etude-small etude-result-note">
                * Rendement net calculé avant fiscalité et financement. Hypothèse de {values.vacancy} mois de vacance locative par an. Cash-flow avant impôts, sans provision spécifique pour gros travaux, frais exceptionnels ou revente.
              </p>
              <h3>Dispositifs à approfondir</h3>
              {results.schemes.map(([name, description]) => (
                <div className="etude-recommendation" key={name}>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              ))}
              <p className="etude-small">
                Cette présélection ne confirme aucune éligibilité ni économie d’impôt. Une vérification de la localisation, du bien, des plafonds, des travaux et de votre situation fiscale est indispensable.
              </p>
              <p className="etude-disclaimer">
                Simulation indicative, non contractuelle, hors fiscalité et sans garantie de rentabilité. Les loyers, charges, conditions de financement et dispositifs fiscaux doivent être confirmés. Cette étude n’est pas un conseil fiscal, juridique ou financier personnalisé.
              </p>
              <div className="etude-actions etude-print-hide">
                <button className="etude-btn etude-btn--alt" type="button" onClick={handlePrint} disabled={loading}>
                  {loading ? "Envoi en cours…" : "Imprimer / Enregistrer en PDF"}
                </button>
                <button className="etude-btn" type="button" onClick={sendStudy} disabled={loading || studySent}>
                  {loading ? "Envoi en cours…" : studySent ? "Étude transmise ✓" : "Transmettre mon étude →"}
                </button>
              </div>
              {sendHint && <p className={`etude-send-hint etude-send-hint--${sendStatus || "info"}`} role="status" aria-live="polite">{sendHint}</p>}
            </section>
          )}
        </div>

        <aside className="etude-aside">
          <div className="etude-eyebrow">Notre accompagnement</div>
          <h3>Une étude claire, à votre rythme</h3>
          <p>Nous examinons les grands équilibres de votre projet :</p>
          <ul>
            <li>Budget global et financement</li>
            <li>Rentabilité brute et nette de charges</li>
            <li>Effort d’épargne mensuel</li>
            <li>Dispositifs immobiliers à approfondir</li>
          </ul>
          <p className="etude-small">Les calculs sont effectués dans votre navigateur. Les données sont transmises uniquement si vous demandez explicitement l’envoi de votre étude.</p>
        </aside>
      </main>
    </div>
  );
}
