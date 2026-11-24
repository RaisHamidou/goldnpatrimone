"use client";
import { useState, useRef, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiSend,
  FiMapPin,
  FiX,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { Turnstile } from "@marsidev/react-turnstile";
import "./ContactPopup.scss";
const INITIAL_VALUES = {
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
};
export default function ContactPopup({
  buttonText = "Nous contacter",
  className = "", isOpen, setIsOpen
}) {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: null,
    text: "",
  });
  const [token, setToken] = useState("");
 const turnstileRef = useRef(null);

 useEffect(() => {
   if (!isOpen) setToken("");
 }, [isOpen]);

 const closePopup = () => {
    if (loading) return;
   setToken("");
    setIsOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   if (!token || loading || status.type === "success") return;
    setLoading(true);
    setStatus({ type: null, text: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, turnstileToken: token }),
      });
      const data = await response.json();
      if (!response.ok || data.status !== "Message Sent") {
        throw new Error("Erreur lors de l'envoi.");
      }
      setStatus({
        type: "success",
        text: "Votre message a été envoyé avec succès !",
      });
      setFormData({ ...INITIAL_VALUES });
      setTimeout(() => {
        setIsOpen(false);
        setStatus({ type: null, text: "" });
      }, 2200);
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        text: "Impossible d'envoyer votre message. Veuillez réessayer.",
      });
    } finally {
     setToken("");
     turnstileRef.current?.reset();
      setLoading(false);
    }
  };
  return (
    <>
     {/*  <button*
        type="button"
        className={`contact-popup-trigger ${className}`}
        onClick={() => {
          setStatus({ type: null, text: "" });
          setIsOpen(true);
        }}
      >
        {buttonText}
*      </button> */}
      {isOpen && (
        <div
className="contact-popup-overlay"
onMouseDown={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          <div
className="contact-popup"
role="dialog"
aria-modal="true"
aria-labelledby="contact-popup-title"
          >
            <button
type="button"
className="contact-popup-close"
onClick={closePopup}
aria-label="Fermer"
disabled={loading}
            >
              <FiX />
            </button>
            <div className="contact-popup-header">
              <div className="contact-popup-icon">
                <FiMail />
              </div>
              <span className="contact-popup-eyebrow">
                GOLD'N PATRIMOINE
              </span>
              <h2 id="contact-popup-title">
                Parlons de votre projet
              </h2>
              <p>
                Notre équipe est à votre disposition pour
                vous accompagner dans votre projet immobilier.
              </p>
            </div>
            {status.type && (
              <div
className={`contact-popup-toast ${
                  status.type === "error"
                    ? "error"
                    : "success"
                }`}
role="status"
              >
                {status.type === "success" ? (
                  <FiCheckCircle />
                ) : (
                  <FiAlertCircle />
                )}
                <span>{status.text}</span>
              </div>
            )}
            <form
onSubmit={handleSubmit}
className="contact-popup-form"
            >
              <div className="contact-popup-grid">
                <div className="contact-popup-field">
                  <label htmlFor="contact-name">Nom *</label>
                  <input
id="contact-name"
name="name"
value={formData.name}
onChange={handleChange}
placeholder="Ex : Dupont"
required
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-surname">Prénom *</label>
                  <input
id="contact-surname"
name="surname"
value={formData.surname}
onChange={handleChange}
placeholder="Ex : Jean"
required
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-email">Email *</label>
                  <input
id="contact-email"
type="email"
name="email"
value={formData.email}
onChange={handleChange}
placeholder="jean@email.com"
required
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-tel">Téléphone</label>
                  <input
id="contact-tel"
type="tel"
name="tel"
value={formData.tel}
onChange={handleChange}
placeholder="06 12 34 56 78"
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-postal">Code postal</label>
                  <input
id="contact-postal"
name="postalCode"
value={formData.postalCode}
onChange={handleChange}
placeholder="Ex : 75013"
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-residence">
                    Ville de résidence
                  </label>
                  <input
id="contact-residence"
name="cityOfResidence"
value={formData.cityOfResidence}
onChange={handleChange}
placeholder="Ex : Paris"
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-search">
                    Ville de recherche
                  </label>
                  <input
id="contact-search"
name="cityOfSearch"
value={formData.cityOfSearch}
onChange={handleChange}
placeholder="Ex : Lyon"
                  />
                </div>
                <div className="contact-popup-field">
                  <label htmlFor="contact-pieces">
                    Nombre de pièces
                  </label>
                  <select
id="contact-pieces"
name="number0fPieces"
value={formData.number0fPieces}
onChange={handleChange}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="T1/Studio">T1 / Studio</option>
                    <option value="T2">T2</option>
                    <option value="T3">T3</option>
                    <option value="T4">T4</option>
                    <option value="T5+">T5 et plus / Maison</option>
                  </select>
                </div>
                <div className="contact-popup-field full-width">
                  <label htmlFor="contact-budget">
                    Budget estimé (€)
                  </label>
                  <input
id="contact-budget"
name="budget"
value={formData.budget}
onChange={handleChange}
placeholder="Ex : 350 000 €"
                  />
                </div>
                <div className="contact-popup-field full-width">
                  <label htmlFor="contact-message">
                    Votre demande *
                  </label>
                  <textarea
id="contact-message"
name="message"
rows={4}
value={formData.message}
onChange={handleChange}
placeholder="Décrivez-nous votre projet immobilier ou patrimonial..."
required
                  />
                </div>
              </div>
              <Turnstile
               ref={turnstileRef}
               siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
               onSuccess={setToken}
               onExpire={() => setToken("")}
               onError={() => setToken("")}
               options={{ appearance: "interaction-only" }}
             />
             <button
type="submit"
className="contact-popup-submit"
disabled={loading || !token || status.type === "success"}
              >
                {loading ? (
                  <>
                    Envoi en cours...
                    <FiLoader className="contact-popup-spinner" />
                  </>
                ) : (
                  <>
                    Envoyer mon message
                    <FiSend />
                  </>
                )}
              </button>
            </form>
            <div className="contact-popup-footer">
              <a href="mailto:m.diaby@goldnpatrimoine.com">
                <FiMail />
                m.diaby@goldnpatrimoine.com
              </a>
              <a href="tel:0620810090">
                <FiPhone />
                06 20 81 00 90
              </a>
              <span>
                <FiMapPin />
                France
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
