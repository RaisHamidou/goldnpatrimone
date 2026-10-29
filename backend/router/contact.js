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
      to: "contact.dzairhistory@gmail.com",
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
      email,
      tel,
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
    const safeEmail = escapeHtml(email.trim());
    const safeTel = escapeHtml(tel?.trim() || "Non renseigné");
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

Nom : ${name.trim()}
E-mail : ${email.trim()}
Téléphone : ${tel?.trim() || "Non renseigné"}
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

router.post("/etude-personnalisee", async (req, res) => {
  try {
    const {
      name,
      email,
      tel,
      city,
      projectType,
      loan,
      budget,
      financingNeeded,
      monthlyPayment,
      rental,
      works,
      rent,
      vacancy,
      grossYield,
      netYield,
      monthlyCashFlow,
      taxBracket,
      alreadyLandlord,
      schemes,
      summary,
    } = req.body || {};

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

    const safeName = escapeHtmlEtude(name.trim());
    const safeEmail = escapeHtmlEtude(email.trim());
    const safeTel = escapeHtmlEtude(
      typeof tel === "string" ? tel.trim() : ""
    );
    const safeCity = escapeHtmlEtude(
      typeof city === "string" ? city.trim() : ""
    );
    const safeProject = escapeHtmlEtude(projectType || "Non précisé");

    const safeSchemes = Array.isArray(schemes)
      ? schemes
          .map((scheme) => {
            if (!Array.isArray(scheme)) return "";

            const title = escapeHtmlEtude(scheme[0] || "");
            const description = escapeHtmlEtude(scheme[1] || "");

            return title
              ? `<li><strong>${title}</strong> : ${description}</li>`
              : "";
          })
          .filter(Boolean)
          .join("")
      : "";

    const safeSummary =
      typeof summary === "string" && summary.trim()
        ? escapeHtmlEtude(summary.trim())
        : "Aucun résumé fourni.";

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Nouvelle étude personnalisée — ${name.trim()}`,
      text: `
NOUVELLE ÉTUDE PERSONNALISÉE — GOLD'N PATRIMOINE

COORDONNÉES
Nom : ${name.trim()}
E-mail : ${email.trim()}
Téléphone : ${typeof tel === "string" && tel.trim() ? tel.trim() : "Non renseigné"}
Ville / secteur : ${typeof city === "string" && city.trim() ? city.trim() : "Non précisé"}

PROJET
Objectif et type de bien : ${projectType || "Non précisé"}
Type de location : ${rental || "Non précisé"}
Travaux : ${works || "Non précisé"}

RÉSULTATS ESTIMÉS
Budget global : ${formatEuroEtude(budget)}
Financement nécessaire : ${formatEuroEtude(financingNeeded ?? loan)}
Emprunt estimé : ${formatEuroEtude(loan)}
Mensualité avec assurance : ${formatEuroEtude(monthlyPayment)}
Loyer mensuel : ${formatEuroEtude(rent)}
Vacance locative : ${vacancy ?? "Non précisée"} mois/an
Rendement brut : ${grossYield ?? "Non calculé"} %
Rendement net : ${netYield ?? "Non calculé"} %
Cash-flow mensuel avant impôts : ${formatEuroEtude(monthlyCashFlow)}
Tranche d'imposition : ${taxBracket ?? "Non précisée"} %
Déjà propriétaire bailleur : ${alreadyLandlord === "yes" ? "Oui" : alreadyLandlord === "no" ? "Non" : "Non précisé"}

RÉSUMÉ COMPLET
${typeof summary === "string" ? summary : "Aucun résumé fourni."}
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;color:#222;line-height:1.6;max-width:720px;margin:auto">
          <h1 style="font-size:22px">Nouvelle étude personnalisée</h1>
          <p>Une nouvelle demande a été envoyée depuis le simulateur GOLD'N PATRIMOINE.</p>

          <h2>Coordonnées du prospect</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>E-mail :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Téléphone :</strong> ${safeTel || "Non renseigné"}</p>
          <p><strong>Ville / secteur :</strong> ${safeCity || "Non précisé"}</p>

          <h2>Projet immobilier</h2>
          <p><strong>Objectif :</strong> ${safeProject}</p>
          <p><strong>Location :</strong> ${escapeHtmlEtude(rental || "Non précisé")}</p>
          <p><strong>Travaux :</strong> ${escapeHtmlEtude(works || "Non précisé")}</p>

          <h2>Résultats estimés</h2>
          <table style="border-collapse:collapse;width:100%">
            <tbody>
              ${[
                ["Budget global", formatEuroEtude(budget)],
                ["Emprunt estimé", formatEuroEtude(loan)],
                ["Financement nécessaire", formatEuroEtude(financingNeeded ?? loan)],
                ["Mensualité avec assurance", formatEuroEtude(monthlyPayment)],
                ["Loyer mensuel", formatEuroEtude(rent)],
                ["Vacance locative", `${escapeHtmlEtude(vacancy ?? "Non précisée")} mois/an`],
                ["Rendement brut", `${escapeHtmlEtude(grossYield ?? "Non calculé")} %`],
                ["Rendement net", `${escapeHtmlEtude(netYield ?? "Non calculé")} %`],
                ["Cash-flow mensuel avant impôts", formatEuroEtude(monthlyCashFlow)],
                ["Tranche d'imposition", `${escapeHtmlEtude(taxBracket ?? "Non précisée")} %`],
                [
                  "Déjà propriétaire bailleur",
                  alreadyLandlord === "yes" ? "Oui" : alreadyLandlord === "no" ? "Non" : "Non précisé",
                ],
              ]
                .map(
                  ([label, value]) => `
                    <tr>
                      <td style="border:1px solid #ddd;padding:9px"><strong>${label}</strong></td>
                      <td style="border:1px solid #ddd;padding:9px">${value}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>

          ${
            safeSchemes
              ? `<h2>Dispositifs à approfondir</h2><ul>${safeSchemes}</ul>`
              : ""
          }

          <h2>Résumé complet de l'étude</h2>
          <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f6f6f6;padding:16px;border-radius:8px">${safeSummary}</pre>

          <p style="font-size:12px;color:#666">
            Simulation indicative, non contractuelle, à vérifier selon la situation du prospect.
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
    console.error("Erreur envoi étude personnalisée :", error.message);

    return res.status(500).json({
      status: "error",
      message: "Impossible d'envoyer l'étude pour le moment.",
    });
  }
});


export default router;