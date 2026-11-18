"use client";

import { useMemo, useState } from "react";
import "./SimulateurInvestissement.scss";

const INITIAL_VALUES = {
  income: "3500",
  debts: "500",
  tmi: "30",
  goal: "income",
  price: "220000",
  rent: "850",
  deposit: "20000",
  years: "25",
  rate: "3.5",
  insurance: "0.30",
  type: "new",
  furnished: "either",
  fees: "5500",
  works: "3000",
  charges: "85",
  propertytax: "900",
  name: "",
  email: "",
  tel: "",
};

const euro = (value) =>
  `${Math.round(value).toLocaleString("fr-FR")} €`;

const formatPercent = (value, decimals = 2) =>
  `${value.toFixed(decimals).replace(".", ",")} %`;

const toNumber = (value) => Number(value);

function calculateProject(values) {
  const fields = [
    "price",
    "rent",
    "deposit",
    "fees",
    "works",
    "years",
    "rate",
    "insurance",
    "charges",
    "propertytax",
    "income",
    "debts",
  ];

  const numbers = Object.fromEntries(
    fields.map((field) => [field, toNumber(values[field])])
  );

  const valid =
    Object.values(numbers).every(
      (value) => Number.isFinite(value) && value >= 0
    ) &&
    numbers.price > 0 &&
    numbers.years > 0 &&
    numbers.rate <= 20 &&
    numbers.insurance <= 5;

  if (!valid) {
    return { valid: false };
  }

  const {
    price,
    rent,
    deposit,
    fees,
    works,
    years,
    rate,
    insurance,
    charges,
    propertytax,
    income,
    debts,
  } = numbers;

  const total = price + fees + works;
  const loan = Math.max(0, total - deposit);
  const months = years * 12;
  const monthlyRate = rate / 1200;

  const loanPayment =
    loan === 0
      ? 0
      : loan *
        (monthlyRate === 0
          ? 1 / months
          : monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

  const monthlyInsurance = (loan * insurance) / 1200;
  const monthlyPayment = loanPayment + monthlyInsurance;

  const netRent = rent * 0.95 - charges - propertytax / 12;
  const cashFlow = netRent - monthlyPayment;
  const grossYield = (rent * 12 / total) * 100;
  const debtRatio =
    income > 0 ? ((debts + monthlyPayment) / income) * 100 : null;

  return {
    valid: true,
    ...numbers,
    total,
    loan,
    monthlyPayment,
    netRent,
    cashFlow,
    grossYield,
    debtRatio,
  };
}

function getAdvice(values, results) {
  const suggestions = [];

  if (values.type === "new") {
    suggestions.push({
      title: "Location nue dans le neuf",
      description:
        "Une piste cohérente pour une stratégie patrimoniale de long terme, sous réserve de la demande locative et du niveau de loyer.",
    });

    if (values.furnished !== "bare") {
      suggestions.push({
        title: "Location meublée (LMNP si éligible)",
        description:
          "À comparer à la location nue : le régime fiscal dépend des recettes, des charges, du choix micro/réel et des règles en vigueur. Vérifiez les conditions de location meublée.",
      });
    }
  } else if (values.type === "works") {
    suggestions.push({
      title: "Location nue avec travaux et déficit foncier",
      description:
        "À étudier si les travaux sont fiscalement déductibles et si le bien est loué nu, avec les conditions et plafonds applicables.",
    });

    suggestions.push({
      title: "Denormandie, sous conditions",
      description:
        "Possible uniquement pour certains biens anciens, communes, travaux et engagements locatifs éligibles : vérifiez le programme et les règles en vigueur.",
    });
  } else {
    suggestions.push({
      title: "Location nue",
      description:
        "Stratégie simple à comparer entre micro-foncier et régime réel selon les charges et votre situation.",
    });

    if (values.furnished !== "bare") {
      suggestions.push({
        title: "Location meublée (LMNP si éligible)",
        description:
          "Peut être pertinente selon la demande locale et les dépenses, sans garantie d’avantage fiscal.",
      });
    }
  }

  if (
    values.goal === "tax" &&
    values.tmi !== "unknown" &&
    Number(values.tmi) >= 30
  ) {
    suggestions.sort(
      (a, b) =>
        Number(!/travaux|déficit|LMNP/i.test(a.title)) -
        Number(!/travaux|déficit|LMNP/i.test(b.title))
    );
  }

  if (values.goal === "effort" && results.cashFlow < 0) {
    suggestions.unshift({
      title: "Améliorer l’équilibre du projet",
      description:
        "Comparer un prix d’achat inférieur, un loyer réaliste plus élevé ou un apport supérieur, sans dépasser votre capacité financière.",
    });
  }

  if (values.goal === "income" && results.grossYield < 4) {
    suggestions.unshift({
      title: "Vérifier le rendement",
      description:
        "Le rendement brut est relativement limité : comparer d’autres biens ou marchés locatifs, sans négliger les risques.",
    });
  }

  return suggestions.slice(0, 3);
}

function getWarnings(values, results) {
  const warnings = [];

  if (results.debtRatio !== null && results.debtRatio > 35) {
    warnings.push(
      "Les mensualités de crédits représentent plus de 35 % des revenus renseignés, avant tout traitement bancaire des revenus locatifs : faisabilité à vérifier avec un prêteur."
    );
  }

  if (results.deposit > results.total) {
    warnings.push(
      "L’apport dépasse le coût total du projet : aucun crédit n’est nécessaire dans cette simulation."
    );
  }

  if (values.tmi === "unknown") {
    warnings.push(
      "Renseigner votre TMI peut aider à hiérarchiser les pistes fiscales, sans permettre un calcul d’impôt fiable."
    );
  }

  if (values.type === "new") {
    warnings.push(
      "Dans le neuf, vérifiez les charges de copropriété prévisionnelles et les éventuelles conditions de location du programme."
    );
  }

  warnings.push(
    "Vérifiez le loyer de marché, les frais de gestion, l’assurance propriétaire non occupant, la vacance locative et la fiscalité réelle."
  );

  return warnings;
}

function InputField({
  label,
  name,
  values,
  onChange,
  type = "number",
  min,
  max,
  step,
  children,
}) {
  return (
    <div className="investment-field">
      <label htmlFor={name}>{label}</label>

      {children || (
        <input
          id={name}
          name={name}
          type={type}
          value={values[name]}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  );
}

export default function SimulateurInvestissement() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const advice = useMemo(() => {
    if (!results?.valid) return [];
    return getAdvice(values, results);
  }, [values, results]);

  const warnings = useMemo(() => {
    if (!results?.valid) return [];
    return getWarnings(values, results);
  }, [values, results]);

  const updateValue = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const calculated = calculateProject(values);

    if (!calculated.valid) {
      setError("Veuillez vérifier les montants et les taux saisis.");
      return;
    }

    if (!values.email.trim()) {
      setError("Veuillez renseigner votre adresse e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    // Affichage immédiat des résultats
    setResults(calculated);
    setShowResults(true);

    // Défilement vers les résultats
    window.setTimeout(() => {
      document
        .getElementById("investment-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);

    // Envoi de la demande au serveur Nodemailer
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/simulateur-immobilier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            simulatorType: "investissement",
            name: values.name.trim() || "Client",
            email: values.email.trim(),
            tel: values.tel.trim(),
            city: "",
            projectType: "Investissement locatif",

            income: calculated.income,
            debts: calculated.debts,
            tmi: values.tmi,
            goal: values.goal,

            propertyType: values.type,
            rentalMode: values.furnished,

            price: calculated.price,
            rent: calculated.rent,
            deposit: calculated.deposit,
            years: calculated.years,
            rate: calculated.rate,
            insurance: calculated.insurance,
            fees: calculated.fees,
            works: calculated.works,
            charges: calculated.charges,
            propertyTax: calculated.propertytax,

            budget: calculated.total,
            loan: calculated.loan,
            financingNeeded: calculated.loan,
            monthlyPayment: calculated.monthlyPayment,
            grossYield: calculated.grossYield,
            netRent: calculated.netRent,
            cashFlow: calculated.cashFlow,
            debtRatio: calculated.debtRatio,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Une erreur est survenue lors de l’envoi."
        );
      }

      setMessage("Votre demande a bien été envoyée. Merci !");
    } catch (err) {
      setError(
        err.message ||
          "Impossible d’envoyer votre demande. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="investment-simulator">
      <div className="investment-wrap">
        <div className="investment-layout">
          {/* FORMULAIRE */}
          <form
            className="investment-card investment-form"
            onSubmit={handleSubmit}
          >
            <h2>Votre profil</h2>

            <div className="investment-two">
              <InputField
                label="Revenus nets mensuels du foyer (€)"
                name="income"
                values={values}
                onChange={updateValue}
                min="0"
              />

              <InputField
                label="Crédits mensuels existants (€)"
                name="debts"
                values={values}
                onChange={updateValue}
                min="0"
              />
            </div>

            <div className="investment-two">
              <InputField
                label="Tranche marginale d’imposition"
                name="tmi"
                values={values}
                onChange={updateValue}
              >
                <select
                  id="tmi"
                  name="tmi"
                  value={values.tmi}
                  onChange={updateValue}
                >
                  <option value="unknown">Je ne sais pas</option>
                  <option value="0">0 %</option>
                  <option value="11">11 %</option>
                  <option value="30">30 %</option>
                  <option value="41">41 %</option>
                  <option value="45">45 %</option>
                </select>
              </InputField>

              <InputField
                label="Votre objectif prioritaire"
                name="goal"
                values={values}
                onChange={updateValue}
              >
                <select
                  id="goal"
                  name="goal"
                  value={values.goal}
                  onChange={updateValue}
                >
                  <option value="income">
                    Générer des revenus locatifs
                  </option>
                  <option value="tax">Optimiser ma fiscalité</option>
                  <option value="wealth">Construire mon patrimoine</option>
                  <option value="effort">Limiter mon effort d’épargne</option>
                </select>
              </InputField>
            </div>

            <div className="investment-section">
              <h2>Votre projet</h2>

              <div className="investment-two">
                <InputField
                  label="Prix du bien (€)"
                  name="price"
                  values={values}
                  onChange={updateValue}
                  min="1"
                />

                <InputField
                  label="Loyer mensuel envisagé (€)"
                  name="rent"
                  values={values}
                  onChange={updateValue}
                  min="0"
                />
              </div>

              <div className="investment-two">
                <InputField
                  label="Apport personnel (€)"
                  name="deposit"
                  values={values}
                  onChange={updateValue}
                  min="0"
                />

                <InputField
                  label="Durée du prêt"
                  name="years"
                  values={values}
                  onChange={updateValue}
                >
                  <select
                    id="years"
                    name="years"
                    value={values.years}
                    onChange={updateValue}
                  >
                    <option value="15">15 ans</option>
                    <option value="20">20 ans</option>
                    <option value="25">25 ans</option>
                  </select>
                </InputField>
              </div>

              <div className="investment-two">
                <InputField
                  label="Taux d’intérêt annuel (%)"
                  name="rate"
                  values={values}
                  onChange={updateValue}
                  min="0"
                  max="20"
                  step="0.1"
                />

                <InputField
                  label="Assurance emprunteur annuelle (%)"
                  name="insurance"
                  values={values}
                  onChange={updateValue}
                  min="0"
                  max="5"
                  step="0.05"
                />
              </div>

              <div className="investment-two">
                <InputField
                  label="Type de bien"
                  name="type"
                  values={values}
                  onChange={updateValue}
                >
                  <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={updateValue}
                  >
                    <option value="new">Neuf / VEFA</option>
                    <option value="old">Ancien sans travaux</option>
                    <option value="works">Ancien avec travaux</option>
                  </select>
                </InputField>

                <InputField
                  label="Mode de location envisagé"
                  name="furnished"
                  values={values}
                  onChange={updateValue}
                >
                  <select
                    id="furnished"
                    name="furnished"
                    value={values.furnished}
                    onChange={updateValue}
                  >
                    <option value="either">À déterminer</option>
                    <option value="furnished">Meublée</option>
                    <option value="bare">Nue</option>
                  </select>
                </InputField>
              </div>

              <div className="investment-two">
                <InputField
                  label="Frais d’acquisition estimés (€)"
                  name="fees"
                  values={values}
                  onChange={updateValue}
                  min="0"
                />

                <InputField
                  label="Travaux / ameublement (€)"
                  name="works"
                  values={values}
                  onChange={updateValue}
                  min="0"
                />
              </div>

              <div className="investment-two">
                <InputField
                  label="Charges non récupérables + entretien (€/mois)"
                  name="charges"
                  values={values}
                  onChange={updateValue}
                  min="0"
                />

                <InputField
                  label="Taxe foncière hors TEOM (€/an)"
                  name="propertytax"
                  values={values}
                  onChange={updateValue}
                  min="0"
                />
              </div>

              <p className="investment-muted">
                Si vous ne connaissez pas les charges ou la taxe foncière,
                conservez les montants indicatifs et faites-les confirmer
                avant toute décision.
              </p>
            </div>

            {/* COORDONNÉES */}
            <div className="investment-section">
              <h2>Vos coordonnées</h2>

              <div className="investment-two">
                <InputField
                  label="Nom"
                  name="name"
                  values={values}
                  onChange={updateValue}
                  type="text"
                />

                <InputField
                  label="Adresse e-mail"
                  name="email"
                  values={values}
                  onChange={updateValue}
                  type="email"
                />
              </div>

              <InputField
                label="Numéro de téléphone (facultatif)"
                name="tel"
                values={values}
                onChange={updateValue}
                type="tel"
              />

              {/* LE SEUL BOUTON PRINCIPAL */}
              <button
                className="investment-btn"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Calcul et envoi en cours..."
                  : "Calculer et obtenir mon conseil"}
              </button>

              {message && (
                <p className="investment-success" role="status">
                  {message}
                </p>
              )}

              {error && (
                <p className="investment-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </form>

          {/* RÉSULTATS */}
          {showResults && results?.valid && (
            <section
              className="investment-card investment-results"
              id="investment-results"
            >
              <div className="investment-eyebrow">
                Votre étude indicative
              </div>

              <h2>Votre projet en un coup d’œil</h2>

              <div className="investment-result">
                <div className="investment-muted">
                  Effort d’épargne mensuel avant fiscalité
                </div>

                <div className="investment-big">
                  {results.cashFlow >= 0 ? "+" : ""}
                  {euro(results.cashFlow)}/mois
                </div>

                <div className="investment-muted">
                  {results.cashFlow >= 0
                    ? "Excédent de trésorerie estimé avant impôt"
                    : "Montant à compléter chaque mois, avant impôt"}
                </div>
              </div>

              <div className="investment-metrics">
                <div className="investment-metric">
                  <div className="investment-muted">
                    Mensualité de crédit, assurance incluse
                  </div>
                  <strong>{euro(results.monthlyPayment)}/mois</strong>
                </div>

                <div className="investment-metric">
                  <div className="investment-muted">
                    Rendement locatif brut sur coût total
                  </div>
                  <strong>{formatPercent(results.grossYield)}</strong>
                </div>

                <div className="investment-metric">
                  <div className="investment-muted">
                    Revenu locatif net avant financement et impôt / mois
                  </div>
                  <strong>{euro(results.netRent)}/mois</strong>
                </div>

                <div className="investment-metric">
                  <div className="investment-muted">
                    Ratio de crédits / revenus, hors prise en compte
                    bancaire des loyers
                  </div>
                  <strong>
                    {results.debtRatio === null
                      ? "Non calculable"
                      : formatPercent(results.debtRatio, 1)}
                  </strong>
                </div>
              </div>

              <h3>Stratégies à explorer</h3>

              {advice.map((item) => (
                <div className="investment-advice" key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              ))}

              <h3>Points de vigilance</h3>

              <div className="investment-warnings">
                {warnings.map((warning) => (
                  <p key={warning}>{warning}</p>
                ))}
              </div>

              <div className="investment-foot">
                Simulation pédagogique, non contractuelle. Rendement brut
                calculé sur prix + frais + travaux. Vacance locative
                conventionnelle de 5 % du loyer. Le cash-flow est calculé
                avant impôt, sans valorisation du capital remboursé. Les
                critères bancaires réels, la fiscalité (micro/réel,
                amortissements, prélèvements sociaux), les éventuelles
                contraintes de location et les travaux futurs doivent être
                étudiés séparément. La TMI seule ne permet pas de calculer
                l’impôt sur les loyers. Aucune économie fiscale n’est
                garantie.
              </div>

              <button
                className="investment-btn investment-btn--print"
                type="button"
                onClick={() => window.print()}
              >
                Imprimer / Enregistrer en PDF
              </button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}