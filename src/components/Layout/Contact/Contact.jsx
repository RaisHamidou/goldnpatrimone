"use client";

import React, { useState } from "react";
import { 
  FiMail, 
  FiPhone, 
  FiSend, 
  FiMapPin, 
  FiHome, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiLoader 
} from "react-icons/fi";
import styles from "./Contact.module.scss";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    tel: "",
    postalCode: "", // Nouveau champ ajouté
    cityOfResidence: "",
    cityOfSearch: "",
    number0fPieces: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, text: "" });

    try {
      const response = await fetch("http://localhost:4050/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      {status.type && (
        <div
          className={`${styles.toast} ${
            status.type === "error" ? styles.toastError : ""
          }`}
        >
          {status.type === "success" ? (
            <FiCheckCircle className={styles.toastIcon} />
          ) : (
            <FiAlertCircle className={styles.toastIcon} />
          )}
          <span>{status.text}</span>
        </div>
      )}

      <div className={styles.card}>
        {/* Colonne Formulaire */}
        <div className={styles.formColumn}>
          <div className={styles.header}>
            <div className={styles.iconCircle}>
              <FiMail size={22} />
            </div>
            <h2>Envoyez-nous un message</h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.fieldGroup}>
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

            <div className={styles.fieldGroup}>
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

            <div className={styles.fieldGroup}>
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

            <div className={styles.fieldGroup}>
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
            <div className={styles.fieldGroup}>
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

            <div className={styles.fieldGroup}>
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

            <div className={styles.fieldGroup}>
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

            <div className={styles.fieldGroup}>
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

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
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

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
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

            <div className={styles.fullWidth}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Envoi en cours...</span>
                    <FiLoader className={styles.spinner} />
                  </>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <FiSend className={styles.btnIcon} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Colonne Coordonnées */}
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <div className={`${styles.iconCircle} ${styles.goldCircle}`}>
              <FiPhone size={22} />
            </div>
            <h2>Nos coordonnées</h2>
          </div>

          <p className={styles.infoIntro}>
            Nous sommes à votre entière disposition pour vous accompagner et
            réaliser votre projet en toute sérénité.
          </p>

          <div className={styles.infoCards}>
            <a
              href="mailto:contact.dzairhistory@gmail.com"
              className={styles.infoCard}
            >
              <div className={styles.cardIcon}>
                <FiMail />
              </div>
              <div>
                <span className={styles.cardLabel}>Email</span>
                <span className={styles.cardValue}>
                  m.diaby@goldnpatrimoine.com
                </span>
              </div>
            </a>

            <a href="tel:0620810090" className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <FiPhone />
              </div>
              <div>
                <span className={styles.cardLabel}>Téléphone</span>
                <span className={styles.cardValue}>06 20 81 00 90</span>
              </div>
            </a>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <FiMapPin />
              </div>
              <div>
                <span className={styles.cardLabel}>Zone d'intervention</span>
                <span className={styles.cardValue}>France</span>
              </div>
            </div>
          </div>

          <div className={styles.goldBadge}>
            <FiHome className={styles.badgeIcon} />
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