import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();



// On garde le nom cohérent : "EmailContact" ou changez tout en "contactEmail"
const EmailContact = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

EmailContact.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
});

router.post("/contact", async (req, res) => {
  try {
    const { 
      name, 
      surname, 
      email, 
      tel, 
      postalCode, 
      cityOfResidence, 
      cityOfSearch, 
      number0fPieces, 
      budget, 
      message 
    } = req.body;

    const mail = {
      from: process.env.EMAIL,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Email du site de la part de ${name} ${surname}`,
      html: `
        <div style="font-family: sans-serif; color: #333;"> 
          <h1 style="color: #ca9e57;">Information sur le client</h1>
          <h2>${name} ${surname}</h2>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Tel :</strong> ${tel}</p>
          <p><strong>Code postal :</strong> ${postalCode}</p>
          <p><strong>Ville de résidence :</strong> ${cityOfResidence}</p>
          <p><strong>Ville de recherche :</strong> ${cityOfSearch}</p>
          <p><strong>Nombre de pièces :</strong> ${number0fPieces}</p>
          <p><strong>Budget :</strong> ${budget}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>`,
    };

    await EmailContact.sendMail(mail);
    return res.status(200).json({ status: "Message Sent" });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    return res.status(500).json({ status: "ERROR", message: error.message });
  }
});


function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatEuro(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount < 0) {
    return "Non renseigné";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

router.post("/simulateur-immobilier", async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      tel,
      livingCity,
      city,
      projectType,
      loan,
      ptz,
      budget,
      financingNeeded,
      monthlyPayment,
    } = req.body ?? {};

    // Vérification des champs indispensables
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.length > 150 ||
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        status: "ERROR",
        message: "Nom ou adresse e-mail invalide.",
      });
    }

    // Limiter la taille des champs textuels
    if (
      (tel != null && (typeof tel !== "string" || tel.length > 40)) ||
      (city != null && (typeof city !== "string" || city.length > 150)) ||
      (projectType != null &&
        (typeof projectType !== "string" || projectType.length > 100))
    ) {
      return res.status(400).json({
        status: "ERROR",
        message: "Certaines informations sont invalides.",
      });
    }

    // Vérifier les montants envoyés par le simulateur
    const amounts = {
      loan,
      ptz,
      budget,
      financingNeeded,
      monthlyPayment,
    };

    for (const [key, value] of Object.entries(amounts)) {
      if (
        typeof value !== "number" ||
        !Number.isFinite(value) ||
        value < 0 ||
        value > 100_000_000
      ) {
        return res.status(400).json({
          status: "ERROR",
          message: `Le montant ${key} est invalide.`,
        });
      }
    }

    if (!process.env.EMAIL || !process.env.PASSWORD ||
        !process.env.CONTACT_EMAIL) {
      console.error("Configuration e-mail incomplète.");
      return res.status(500).json({
        status: "ERROR",
        message: "Le service d'envoi est momentanément indisponible.",
      });
    }

    const safeName = escapeHtml(name.trim());
    const safeSurName = escapeHtml(surname.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeTel = escapeHtml(tel?.trim() || "Non renseigné");
    const safeLivingCity = escapeHtml(city?.trim() || "Non renseigné");
    const safeCity = escapeHtml(city?.trim() || "Non renseigné");
    const safeProject = escapeHtml(
      projectType?.trim() || "Non renseigné"
    );

    const financialRows = [
      ["Capital bancaire estimé", formatEuro(loan)],
      ["PTZ potentiel estimé", formatEuro(ptz)],
      ["Budget total du projet", formatEuro(budget)],
      ["Financement restant", formatEuro(financingNeeded)],
      ["Mensualité estimée", `${formatEuro(monthlyPayment)} / mois`],
    ];

    const htmlRows = financialRows
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;">
              ${escapeHtml(label)}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              <strong>${escapeHtml(value)}</strong>
            </td>
          </tr>
        `
      )
      .join("");

    const textRows = financialRows
      .map(([label, value]) => `${label} : ${value}`)
      .join("\n");

    const mail = {
      from: process.env.EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Demande immobilière — ${name.trim()}`,
      text: `
Nouvelle demande depuis le simulateur immobilier GOLD'N PATRIMOINE

Nom : ${surname.trim()}
Prénom : ${name.trim()}
E-mail : ${email.trim()}
Téléphone : ${tel?.trim() || "Non renseigné"}
Ville de Résidence : ${livingCity?.trim() || "Non renseigné"}
Secteur recherché : ${city?.trim() || "Non renseigné"}
Type de projet : ${projectType?.trim() || "Non renseigné"}

SYNTHÈSE INDICATIVE
${textRows}

Cette simulation est indicative et ne constitue pas une offre de prêt.
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;max-width:700px;margin:auto;line-height:1.6;">
          <h1 style="color:#b18a45;">
            GOLD'N PATRIMOINE
          </h1>

          <h2>Nouvelle demande immobilière</h2>

          <p>Une demande a été envoyée depuis le simulateur immobilier.</p>

          <h3>Coordonnées du client</h3>

          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>E-mail :</strong> ${safeEmail}</p>
          <p><strong>Téléphone :</strong> ${safeTel}</p>
          <p><strong>Secteur recherché :</strong> ${safeCity}</p>
          <p><strong>Type de projet :</strong> ${safeProject}</p>

          <h3>Synthèse financière indicative</h3>

          <table style="width:100%;border-collapse:collapse;">
            <tbody>${htmlRows}</tbody>
          </table>

          <p style="margin-top:24px;color:#777;font-size:12px;">
            Les montants sont des estimations communiquées par le simulateur.
            Ils ne constituent ni une offre de prêt ni une décision d'éligibilité.
          </p>
        </div>
      `,
    };

    await EmailContact.sendMail(mail);

    return res.status(200).json({
      status: "Message Sent",
    });
  } catch (error) {
    console.error("Erreur envoi simulateur immobilier :", error);

    return res.status(500).json({
      status: "ERROR",
      message: "L'envoi a échoué. Veuillez réessayer ultérieurement.",
    });
  }
});

const escapeHtmlEtude = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatEuroEtude = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

router.post("/investissement-locatif", async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      tel,
      city,
      projectType,

      // Financement
      loan,
      ptz,
      budget,
      financingNeeded,
      monthlyPayment,

      // Informations financières
      income,
      debts,
      tmi,
      goal,

      // Bien immobilier
      propertyType,
      rentalMode,
      price,
      rent,
      deposit,
      years,
      rate,
      insurance,
      fees,
      works,
      charges,
      propertyTax,

      // Résultats de la simulation
      grossYield,
      netRent,
      cashFlow,
      debtRatio,

      // Conseils et avertissements
      advice,
      warnings,

      // Anciens champs conservés
      vacancy,
      netYield,
      monthlyCashFlow,
      taxBracket,
      alreadyLandlord,
      schemes,
      summary,
    } = req.body ?? {};

    // Vérification des champs indispensables
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        status: "error",
        message: "Veuillez renseigner un nom et une adresse e-mail valides.",
      });
    }

    // Vérification de la configuration e-mail
    if (
      !process.env.EMAIL ||
      !process.env.PASSWORD ||
      !process.env.CONTACT_EMAIL
    ) {
      console.error("Configuration e-mail incomplète.");

      return res.status(500).json({
        status: "error",
        message: "Le service d'envoi d'e-mail est momentanément indisponible.",
      });
    }

    // Helpers de sécurisation et de formatage
    const safeValue = (value, fallback = "Non renseigné") => {
      if (value === undefined || value === null || value === "") {
        return fallback;
      }

      if (typeof value !== "string" && typeof value !== "number") {
        return fallback;
      }

      return escapeHtmlEtude(String(value));
    };

    const safeText = (value, fallback = "Non renseigné") => {
      if (typeof value !== "string" || !value.trim()) {
        return fallback;
      }

      return value.trim();
    };

    const safeArray = (value) => {
      if (!Array.isArray(value)) return [];

      return value
        .filter((item) => typeof item === "string" || typeof item === "number")
        .map((item) => String(item).slice(0, 1000));
    };

    const safeName = escapeHtmlEtude(name.trim());
      const safesurname = escapeHtmlEtude(surname.trim());
    const safeEmail = escapeHtmlEtude(email.trim());
    const safeTel = safeValue(tel);
    const safeCity = safeValue(city);
    const safeProject = safeValue(projectType);

    const safeAdvice = escapeHtmlEtude(
      typeof advice === "string" ? advice.slice(0, 5000) : "Aucun conseil fourni."
    );

    const safeWarnings = safeArray(warnings)
      .map((warning) => `<li>${escapeHtmlEtude(warning)}</li>`)
      .join("");

    const safeSchemes = Array.isArray(schemes)
      ? schemes
          .filter((scheme) => Array.isArray(scheme))
          .map((scheme) => {
            const title = escapeHtmlEtude(String(scheme[0] ?? "").slice(0, 500));
            const description = escapeHtmlEtude(
              String(scheme[1] ?? "").slice(0, 1000)
            );

            return title
              ? `<li><strong>${title}</strong> : ${description}</li>`
              : "";
          })
          .filter(Boolean)
          .join("")
      : "";

    const safeSummary = escapeHtmlEtude(
      typeof summary === "string"
        ? summary.slice(0, 10000)
        : "Aucun résumé fourni."
    );

    const landlordLabel =
      alreadyLandlord === "yes"
        ? "Oui"
        : alreadyLandlord === "no"
          ? "Non"
          : "Non précisé";

    const projectRows = [
      ["Revenus mensuels", formatEuroEtude(income)],
      ["Crédits et charges mensuels", formatEuroEtude(debts)],
      ["Tranche marginale d'imposition", `${safeValue(tmi)} %`],
      ["Objectif", safeValue(goal)],
      ["Type de bien", safeValue(propertyType)],
      ["Mode de location", safeValue(rentalMode)],
      ["Prix du bien", formatEuroEtude(price)],
      ["Apport personnel", formatEuroEtude(deposit)],
      ["Durée du crédit", `${safeValue(years)} ans`],
      ["Taux du crédit", `${safeValue(rate)} %`],
      ["Assurance", `${safeValue(insurance)} %`],
      ["Frais", formatEuroEtude(fees)],
      ["Travaux", formatEuroEtude(works)],
      ["Charges", formatEuroEtude(charges)],
      ["Taxe foncière", formatEuroEtude(propertyTax)],
      ["Loyer mensuel", formatEuroEtude(rent)],
      ["Rendement brut", `${safeValue(grossYield, "Non calculé")} %`],
      ["Loyer net estimé", formatEuroEtude(netRent)],
      ["Cash-flow mensuel", formatEuroEtude(cashFlow)],
      ["Taux d'endettement", `${safeValue(debtRatio, "Non calculé")} %`],
      ["Emprunt estimé", formatEuroEtude(loan)],
      ["PTZ", formatEuroEtude(ptz)],
      ["Budget global", formatEuroEtude(budget)],
      ["Financement nécessaire", formatEuroEtude(financingNeeded)],
      ["Mensualité avec assurance", formatEuroEtude(monthlyPayment)],
    ];

    const htmlRows = projectRows
      .map(
        ([label, value]) => `
          <tr>
            <td style="border:1px solid #ddd;padding:9px">
              <strong>${escapeHtmlEtude(label)}</strong>
            </td>
            <td style="border:1px solid #ddd;padding:9px">
              ${escapeHtmlEtude(String(value))}
            </td>
          </tr>
        `
      )
      .join("");

    const textRows = projectRows
      .map(([label, value]) => `${label} : ${value}`)
      .join("\n");

    // Contenu de l'e-mail
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Nouvelle étude personnalisée — ${name.trim()}`,

      text: `
NOUVELLE ÉTUDE PERSONNALISÉE — GOLD'N PATRIMOINE

COORDONNÉES
Prénom : ${name.trim()}
Nom : ${surname.trim()}
E-mail : ${email.trim()}
Téléphone : ${safeText(tel)}
Ville / secteur : ${safeText(city)}

PROJET
Objectif et type de bien : ${safeText(projectType)}
Type de bien : ${safeText(propertyType)}
Mode de location : ${safeText(rentalMode)}

INFORMATIONS ET RÉSULTATS DE LA SIMULATION
${textRows}

CONSEIL PERSONNALISÉ
${safeText(advice, "Aucun conseil fourni.")}

POINTS DE VIGILANCE
${safeArray(warnings).length
  ? safeArray(warnings).join("\n")
  : "Aucun point de vigilance renseigné."}

DISPOSITIFS À APPROFONDIR
${Array.isArray(schemes)
  ? schemes
      .filter((scheme) => Array.isArray(scheme))
      .map((scheme) => `${scheme[0] ?? ""} : ${scheme[1] ?? ""}`)
      .join("\n")
  : "Non renseigné"}

RÉSUMÉ COMPLET
${safeText(summary, "Aucun résumé fourni.")}

ANCIENS INDICATEURS
Vacance locative : ${vacancy ?? "Non précisée"} mois/an
Rendement net : ${netYield ?? "Non calculé"} %
Cash-flow mensuel avant impôts : ${formatEuroEtude(monthlyCashFlow)}
Tranche d'imposition : ${taxBracket ?? "Non précisée"} %
Déjà propriétaire bailleur : ${landlordLabel}

Simulation indicative et non contractuelle.
      `.trim(),

      html: `
        <div style="font-family:Arial,sans-serif;color:#222;line-height:1.6;max-width:720px;margin:auto">

          <h1 style="font-size:22px">
            Nouvelle étude personnalisée
          </h1>

          <p>
            Une nouvelle demande a été envoyée depuis le simulateur
            GOLD'N PATRIMOINE.
          </p>

          <h2>Coordonnées du prospect</h2>

          <p><strong>Prénom :</strong> ${safesurname}</p>
           <p><strong>Nom :</strong> ${safeName}</p>
          <p>
            <strong>E-mail :</strong>
            <a href="mailto:${safeEmail}">${safeEmail}</a>
          </p>
          <p><strong>Téléphone :</strong> ${safeTel}</p>
          

          <h2>Projet immobilier</h2>

          <p><strong>Objectif :</strong> ${safeProject}</p>
          <p><strong>Type de bien :</strong> ${safeValue(propertyType)}</p>
          <p><strong>Mode de location :</strong> ${safeValue(rentalMode)}</p>

          <h2>Informations financières et résultats estimés</h2>

          <table style="border-collapse:collapse;width:100%">
            <tbody>
              ${htmlRows}
            </tbody>
          </table>

          <h2>Conseil personnalisé</h2>

          <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f6f6f6;padding:16px;border-radius:8px">${safeAdvice}</pre>

          ${
            safeWarnings
              ? `
                <h2>Points de vigilance</h2>
                <ul>${safeWarnings}</ul>
              `
              : ""
          }

          ${
            safeSchemes
              ? `
                <h2>Dispositifs à approfondir</h2>
                <ul>${safeSchemes}</ul>
              `
              : ""
          }

          ${
            summary
              ? `
                <h2>Résumé complet de l'étude</h2>
                <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f6f6f6;padding:16px;border-radius:8px">${safeSummary}</pre>
              `
              : ""
          }

          <h2>Anciennes informations de l'étude</h2>

          <p><strong>Vacance locative :</strong> ${safeValue(vacancy)} mois/an</p>
          <p><strong>Rendement net :</strong> ${safeValue(netYield)} %</p>
          <p><strong>Cash-flow mensuel :</strong> ${formatEuroEtude(monthlyCashFlow)}</p>
          <p><strong>Tranche d'imposition :</strong> ${safeValue(taxBracket)} %</p>
          <p><strong>Déjà propriétaire bailleur :</strong> ${landlordLabel}</p>

          <p style="font-size:12px;color:#666;margin-top:24px">
            Simulation indicative, non contractuelle, à vérifier selon
            la situation du prospect.
          </p>

        </div>
      `,
    };

    await EmailContact.sendMail(mailOptions);

    return res.status(200).json({
      status: "Message Sent",
      message: "Étude transmise avec succès.",
    });

  } catch (error) {
    console.error(
      "Erreur envoi étude personnalisée :",
      error.message
    );

    return res.status(500).json({
      status: "error",
      message: "Impossible d'envoyer l'étude pour le moment.",
    });
  }
});


export default router;