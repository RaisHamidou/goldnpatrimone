"use client";
import { useMemo, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
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
  surname: "",
  email: "",
  tel: "",
};
// FORMATAGE
const euro = (value) => `${Math.round(value).toLocaleString("fr-FR")} €`;
const percent = (value, decimals = 2) =>
  `${value.toFixed(decimals).replace(".", ",")} %`;
// CONVERSION DES NOMBRES
const toNumber = (value) => {
  if (typeof value === "number") return value;
  const normalized = String(value)
    .replace(/[\s\u00A0\u202F]/g, "")
    .replace(",", ".");
  return normalized === "" ? NaN : Number(normalized);
};
// CALCUL DU PROJET
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
    numbers.years <= 30 &&
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
  const grossYield = total > 0 ? ((rent * 12) / total) * 100 : 0;
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
// CONSEILS
function getAdvice(values, results) {
  const suggestions = [];
  const { type, furnished, goal, tmi } = values;
  const { cashFlow, grossYield } = results;
  if (type === "new") {
    suggestions.push({
      title: "Location nue dans le neuf",
      description:
        "Une piste cohérente pour une stratégie patrimoniale de long terme, sous réserve de la demande locative et du niveau de loyer.",
    });
    if (furnished !== "bare") {
      suggestions.push({
        title: "Location meublée (LMNP si éligible)",
        description:
          "À comparer à la location nue : le régime fiscal dépend des recettes, des charges, du choix micro/réel et des règles en vigueur.",
      });
    }
  } else if (type === "works") {
    suggestions.push({
      title: "Location nue avec travaux et déficit foncier",
      description:
        "À étudier si les travaux sont fiscalement déductibles et si le bien est loué nu, avec les conditions et plafonds applicables.",
    });
    suggestions.push({
      title: "Denormandie, sous conditions",
      description:
        "Possible uniquement pour certains biens anciens, communes, travaux et engagements locatifs éligibles. Vérifiez les règles en vigueur.",
    });
  } else {
    suggestions.push({
      title: "Location nue",
      description:
        "Stratégie à comparer entre micro-foncier et régime réel selon les charges et votre situation.",
    });
    if (furnished !== "bare") {
      suggestions.push({
        title: "Location meublée (LMNP si éligible)",
        description:
          "Peut être pertinente selon la demande locale et les dépenses, sans garantie d'avantage fiscal.",
      });
    }
  }
  if (goal === "tax" && tmi !== "unknown" && Number(tmi) >= 30) {
    suggestions.sort(
      (a, b) =>
        Number(!/travaux|déficit|LMNP/i.test(a.title)) -
        Number(!/travaux|déficit|LMNP/i.test(b.title))
    );
  }
  if (goal === "effort" && cashFlow < 0) {
    suggestions.unshift({
      title: "Améliorer l’équilibre du projet",
      description:
        "Comparer un prix d’achat inférieur, un loyer réaliste plus élevé ou un apport supérieur, sans dépasser votre capacité financière.",
    });
  }
  if (goal === "income" && grossYield < 4) {
    suggestions.unshift({
      title: "Vérifier le rendement",
      description:
        "Le rendement brut est relativement limité. Comparez d’autres biens ou marchés locatifs, sans négliger les risques.",
    });
  }
  return suggestions.slice(0, 3);
}
// POINTS DE VIGILANCE
function getWarnings(values, results) {
  const warnings = [];
  if (results.debtRatio !== null && results.debtRatio > 35) {
    warnings.push(
      "Les mensualités de crédits représentent plus de 35 % des revenus renseignés, avant tout traitement bancaire des revenus locatifs : faisabilité à vérifier avec un prêteur."
    );
  }
  if (Number(values.deposit) > results.total) {
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
// CHAMP DE SAISIE
function InputField({
  label,
  name,
  values,
  onChange,
  type = "number",
  min,
  max,
  step,
  required = true,
  autoComplete,
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
step={step ?? (type === "number" ? "any" : undefined)}
required={required}
autoComplete={autoComplete}
        />
      )}
    </div>
  );
}
// SIMULATEUR
export default function SimulateurInvestissement() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
 const [token, setToken] = useState("");
 const turnstileRef = useRef(null);
  const results = useMemo(() => calculateProject(values), [values]);
  const advice = useMemo(
    () => (results.valid ? getAdvice(values, results) : []),
    [values, results]
  );
  const warnings = useMemo(
    () => (results.valid ? getWarnings(values, results) : []),
    [values, results]
  );
// MISE À JOUR DES CHAMPS
  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
    setMessage("");
  };
// ENVOI DU FORMULAIRE ET IMPRESSION
  const handleSubmit = async (event, shouldPrint = false) => {
    event?.preventDefault();
    if (loading) return;
   if (!token) {
     setError("Veuillez patienter pendant la vérification.");
     return;
   }
// 0. Validation native (tous les champs requis), y compris pour le bouton « Imprimer »
    if (formRef.current && !formRef.current.reportValidity()) return;
    setError("");
    setMessage("");
// 1. Vérification des coordonnées
    const name = values.name.trim();
    const surname = values.surname.trim();
    const email = values.email.trim();
    const tel = values.tel.trim();
    if (!name || !surname || !email || !tel) {
      setError(
        "Veuillez renseigner votre prénom, votre nom, votre adresse e-mail et votre numéro de téléphone."
      );
      return;
    }
// 2. Vérification de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez renseigner une adresse e-mail valide.");
      return;
    }
// 3. Vérification du téléphone
    if (!/^[+()\d\s.-]{6,25}$/.test(tel) || tel.replace(/\D/g, "").length < 6) {
      setError("Veuillez renseigner un numéro de téléphone valide.");
      return;
    }
// 4. Vérification des calculs
    const calculated = calculateProject(values);
    if (!calculated.valid) {
      setError("Veuillez vérifier les montants et les taux saisis.");
      return;
    }
// 5. Préparation de l'envoi
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4050";
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/investissement-locatif`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            simulatorType: "investissement",
           turnstileToken: token,
// Coordonnées
            name,
            surname,
            email,
            tel,
            city: "",
            projectType: "Investissement locatif",
// Profil
            income: calculated.income,
            debts: calculated.debts,
            tmi: values.tmi,
            goal: values.goal,
// Projet immobilier
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
// Financement
            budget: calculated.total,
            loan: calculated.loan,
            financingNeeded: calculated.loan,
            monthlyPayment: calculated.monthlyPayment,
// Rentabilité
            grossYield: calculated.grossYield,
            netRent: calculated.netRent,
            cashFlow: calculated.cashFlow,
            debtRatio: calculated.debtRatio,
// Conseils et avertissements
            advice: getAdvice(values, calculated),
            warnings: getWarnings(values, calculated),
          }),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          data.message || "Une erreur est survenue lors de l'envoi."
        );
      }
// 6. Confirmation de l'envoi
      setMessage("Votre demande a bien été envoyée. Merci !");
// 7. Impression uniquement après confirmation
      if (shouldPrint) {
        window.print();
      } else {
        document.getElementById("investment-results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Impossible de contacter le serveur. Veuillez réessayer."
          : err.message || "Impossible d'envoyer votre demande. Veuillez réessayer."
      );
    } finally {
     setToken("");
     turnstileRef.current?.reset();
      setLoading(false);
    }
  };
  return (
    <main className="investment-simulator">
      <div className="investment-wrap">
        <div className="investment-layout">
          {/* FORMULAIRE */}
          <form
ref={formRef}
className="investment-card investment-form"
onSubmit={(event) => handleSubmit(event, false)}
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
required
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
required
                >
                  <option value="income">Générer des revenus locatifs</option>
                  <option value="tax">Optimiser ma fiscalité</option>
                  <option value="wealth">Construire mon patrimoine</option>
                  <option value="effort">Limiter mon effort d’épargne</option>
                </select>
              </InputField>
            </div>
            {/* VOTRE PROJET */}
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
required
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
required
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
required
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
                conservez les montants indicatifs et faites-les confirmer avant
                toute décision.
              </p>
            </div>
            {/* COORDONNÉES */}
            <div className="investment-section">
              <h2>Vos coordonnées</h2>
              <div className="investment-two">
                <InputField
label="Prénom"
name="name"
values={values}
onChange={updateValue}
type="text"
autoComplete="given-name"
required
                />
                <InputField
label="Nom"
name="surname"
values={values}
onChange={updateValue}
type="text"
autoComplete="family-name"
required
                />
              </div>
              <div className="investment-two">
                <InputField
label="Adresse e-mail"
name="email"
values={values}
onChange={updateValue}
type="email"
autoComplete="email"
required
                />
                <InputField
label="Numéro de téléphone"
name="tel"
values={values}
onChange={updateValue}
type="tel"
autoComplete="tel"
required
                />
              </div>
              {/* BOUTON CALCULER ET ENVOYER */}
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={setToken}
                onExpire={() => setToken("")}
                onError={() => setToken("")}
                options={{ appearance: "interaction-only" }}
              />
              <button
className="investment-btn"
type="submit"
disabled={loading || !token}
              >
                {loading ? "Envoi en cours..." : "Calculer et obtenir mon conseil"}
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
          <section
className="investment-card investment-results"
id="investment-results"
          >
            <div className="investment-eyebrow">Votre étude indicative</div>
            <h2>Votre projet en un coup d’œil</h2>
            {!results.valid ? (
              <p className="investment-error">
                Vérifiez les montants et les taux pour afficher les résultats.
              </p>
            ) : (
              <>
                <div className="investment-result">
                  <div className="investment-muted">
                    Effort d’épargne mensuel avant fiscalité
                  </div>
                  <div className="investment-big">
                    {results.cashFlow >= 0 ? "+" : "-"}
                    {euro(Math.abs(results.cashFlow))}/mois
                  </div>
                  <div className="investment-muted">
                    {results.cashFlow >= 0
                      ? "Excédent de trésorerie estimé avant impôt"
                      : "Montant à compléter chaque mois, avant impôt"}
                  </div>
                </div>
                <div className="investment-metrics">
                  <div className="investment-metric">
                    <span>Mensualité de crédit, assurance incluse</span>
                    <strong>{euro(results.monthlyPayment)}/mois</strong>
                  </div>
                  <div className="investment-metric">
                    <span>Rendement locatif brut sur coût total</span>
                    <strong>{percent(results.grossYield)}</strong>
                  </div>
                  <div className="investment-metric">
                    <span>
                      Revenu locatif net avant financement et impôt / mois
                    </span>
                    <strong>{euro(results.netRent)}/mois</strong>
                  </div>
                  <div className="investment-metric">
                    <span>
                      Ratio de crédits / revenus, hors prise en compte bancaire
                      des loyers
                    </span>
                    <strong>
                      {results.debtRatio === null
                        ? "Non calculable"
                        : percent(results.debtRatio, 1)}
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
                <ul className="investment-warnings">
                  {warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="investment-foot">
              Simulation pédagogique, non contractuelle. Rendement brut calculé
              sur prix + frais + travaux. Vacance locative conventionnelle de
              5 % du loyer. Le cash-flow est calculé avant impôt, sans
              valorisation du capital remboursé. Les critères bancaires réels,
              la fiscalité (micro/réel, amortissements, prélèvements sociaux),
              les éventuelles contraintes de location et les travaux futurs
              doivent être étudiés séparément. La TMI seule ne permet pas de
              calculer l’impôt sur les loyers. Aucune économie fiscale n’est
              garantie.
            </div>
            {/* BOUTON IMPRIMER / PDF */}
            <button
className="investment-btn investment-btn--print"
type="button"
onClick={(event) => handleSubmit(event, true)}
disabled={loading || !token}
            >
              {loading ? "Envoi en cours..." : "Envoyer et Imprimer / Enregistrer en PDF"}
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}