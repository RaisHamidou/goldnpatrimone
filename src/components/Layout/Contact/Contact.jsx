"use client";

import React, { useState,useRef } from "react";
import { FiMail, FiPhone, FiSend, FiMapPin, FiHome, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    tel: "",
    postalCode: "", 
    cityOfResidence: "",
    cityOfSearch: "",
    number0fPieces: "",
    budget: "",
    message: "Bonjour,Je souhaite échanger avec votre équipe afin d’obtenir des informations complémentaires sur vos offres et votre accompagnement immobilier.Je vous remercie par avance pour votre attention.Cordialement. ",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, text: "" });
  const [token, setToken] = useState("");
  const turnstileRef = useRef(null);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
    setStatus({
      type: "error",
      text: "Veuillez patienter pendant la vérification."
    });
    return;
  }

    setLoading(true);
    setStatus({ type: null, text: "" });

    try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4050";
      const response = await fetch(  `${apiUrl.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            ...formData,
          turnstileToken: token
          }
        ),
        
      });

      const data = await response.json();

      if (data.status === "Message Sent") {
        setStatus({
          type: "success",
          text: "Votre message a été envoyé avec succès !",
        });
        setFormData({
          name: "",
          surname: "",
          email: "",
          tel: "",
          postalCode: "",
          cityOfResidence: "",
          cityOfSearch: "",
          number0fPieces: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          text: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        text: "Impossible de contacter le serveur.",
      });
    } finally {
      setToken("");
  turnstileRef.current?.reset();
      setLoading(false);
    }
  };

  return (
    <section id="containerContact">
      {status.type && (
        <div
          className={`"toast" ${
            status.type === "error" ?"toastError" : ""
          }`}
        >
          {status.type === "success" ? (
            <FiCheckCircle className={"toastIcon"} />
          ) : (
            <FiAlertCircle className={"toastIcon"} />
          )}
          <span>{status.text}</span>
        </div>
      )}

      <div className="card-contact">
        {/* Colonne Formulaire */}
        <div className={"formColumn"}>
          <div className="header">
            <div className={"iconCircle"}>
              <FiMail size={22} />
            </div>
            <h2>Envoyez-nous un message</h2>
          </div>

          <form onSubmit={handleSubmit} className="formGrid">
            <div className="fieldGroup">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Dupont"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="surname">Prénom</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Ex: Jean"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jean.dupont@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="tel">Téléphone</label>
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="06 12 34 56 78"
                value={formData.tel}
                onChange={handleChange}
              />
            </div>

            {/* Code Postal et Ville de résidence */}
            <div className="fieldGroup">
              <label htmlFor="postalCode">Code postal</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Ex: 75013"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="cityOfResidence">Ville de résidence</label>
              <input
                type="text"
                id="cityOfResidence"
                name="cityOfResidence"
                placeholder="Ex: Paris"
                value={formData.cityOfResidence}
                onChange={handleChange}
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="cityOfSearch">Ville de recherche</label>
              <input
                type="text"
                id="cityOfSearch"
                name="cityOfSearch"
                placeholder="Ex: Lyon"
                value={formData.cityOfSearch}
                onChange={handleChange}
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="number0fPieces">Nombre de pièces</label>
              <select
                id="number0fPieces"
                name="number0fPieces"
                value={formData.number0fPieces}
                onChange={handleChange}
              >
                <option value="">Sélectionnez...</option>
                <option value="T1/Studio">T1 / Studio</option>
                <option value="T2">T2 (2 pièces)</option>
                <option value="T3">T3 (3 pièces)</option>
                <option value="T4">T4 (4 pièces)</option>
                <option value="T5+">T5 et plus / Maison</option>
              </select>
            </div>

            <div className="fieldGroup fullWidth">
              <label htmlFor="budget">Budget estimé (€)</label>
              <input
                type="text"
                id="budget"
                name="budget"
                placeholder="Ex: 350 000 €"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <div className="fieldGroup fullWidth">
              <label htmlFor="message">Décrivez-nous votre demande</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Précisez votre projet immobilier ou patrimonial..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="fullWidth">
              <Turnstile
              ref={turnstileRef}
    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
    onSuccess={setToken}
    onExpire={() => setToken("")}
    onError={() => setToken("")}
    options={{
      appearance: "interaction-only"
    }}
  />
              <button
                type="submit"
                className="submitBtn"
                disabled={loading || !token}
              >
                {loading ? (
                  <>
                    <span>Envoi en cours...</span>
                    <FiLoader className="spinner" />
                  </>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <FiSend className="btnIcon" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Colonne Coordonnées */}
        <div className="infoColumn">
          <div className="header">
            <div className="iconCircle goldCircle">
              <FiPhone size={22} />
            </div>
            <h2>Nos coordonnées</h2>
          </div>

          <p className="infoIntro">
            Nous sommes à votre entière disposition pour vous accompagner et
            réaliser votre projet en toute sérénité.
          </p>

          <div className="infoCards">
            <a
              href="mailto:m.diaby@goldnpatrimoine.com"
              className="infoCard"
            >
              <div className="cardIcon">
                <FiMail />
              </div>
              <div>
                <span className="cardLabel">Email</span>
                <span className="cardValue">
                  m.diaby@goldnpatrimoine.com
                </span>
              </div>
            </a>

            <a href="tel:0620810090" className="infoCard">
              <div className="cardIcon">
                <FiPhone />
              </div>
              <div>
                <span className="cardLabel">Téléphone</span>
                <span className="cardValue">06 20 81 00 90</span>
              </div>
            </a>

            <div className="infoCard">
              <div className="cardIcon">
                <FiMapPin />
              </div>
              <div>
                <span className="cardLabel">Zone d'intervention</span>
                <span className="cardValue">France</span>
              </div>
            </div>
          </div>

          <div className="goldBadge">
            <FiHome className="badgeIcon" />
            <div>
              <strong>Un accompagnement clé en main</strong>
              <p>Conseil en gestion de patrimoine & investissement d'exception.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}