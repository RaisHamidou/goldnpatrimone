
"use client";

import { useEffect, useState } from "react";
import { FiShield } from "react-icons/fi";

import { BiCookie } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";

import "./CookieConsent.scss";

const CONSENT_KEY = "goldn_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);

    if (!consent) {
      setVisible(true);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setAnalytics(parsed.analytics === true);
      } catch {
        setVisible(true);
      }
    }
  }, []);

  const saveConsent = (analyticsConsent) => {
    const consent = {
      necessary: true,
      analytics: analyticsConsent,
      date: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

    setAnalytics(analyticsConsent);
    setVisible(false);
    setSettingsOpen(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <button
        className="cookie-consent-close"
        onClick={() => saveConsent(false)}
        aria-label="Fermer et refuser les cookies"
      >
        <FaXmark />
      </button>

      <div className="cookie-consent-header">
        <div className="cookie-consent-icon">
          <BiCookie />
        </div>

        <div>
          <span className="cookie-consent-eyebrow">
            GOLD’N PATRIMOINE
          </span>
          <h3>Votre confidentialité</h3>
        </div>
      </div>

      <p className="cookie-consent-description">
        Nous utilisons des cookies pour améliorer votre expérience
        et mesurer l’audience de notre site.
      </p>

      {settingsOpen && (
        <div className="cookie-consent-settings">
          <div className="cookie-setting">
            <div>
              <strong>Cookies nécessaires</strong>
              <span>Indispensables au fonctionnement du site.</span>
            </div>
            <span className="cookie-required">Toujours actifs</span>
          </div>

          <div className="cookie-setting">
            <div>
              <strong>Google Analytics</strong>
              <span>Nous aide à comprendre la fréquentation du site.</span>
            </div>

            <button
              type="button"
              className={`cookie-switch ${analytics ? "active" : ""}`}
              onClick={() => setAnalytics(!analytics)}
              role="switch"
              aria-checked={analytics}
              aria-label="Autoriser Google Analytics"
            >
              <span />
            </button>
          </div>
        </div>
      )}

      <div className="cookie-consent-actions">
        {settingsOpen ? (
          <>
            <button
              className="cookie-btn cookie-btn-secondary"
              onClick={() => saveConsent(false)}
            >
              Tout refuser
            </button>

            <button
              className="cookie-btn cookie-btn-primary"
              onClick={() => saveConsent(analytics)}
            >
              Enregistrer
            </button>
          </>
        ) : (
          <>
            <button
              className="cookie-btn cookie-btn-primary"
              onClick={() => saveConsent(true)}
            >
              Accepter
            </button>

            <button
              className="cookie-btn cookie-btn-secondary"
              onClick={() => saveConsent(false)}
            >
              Refuser
            </button>

            <button
              className="cookie-btn cookie-btn-settings"
              onClick={() => setSettingsOpen(true)}
            >
              <CiSettings />
              Personnaliser
            </button>
          </>
        )}
      </div>

      <div className="cookie-consent-footer">
        <FiShield />
        <span>
          Consultez notre politique de confidentialité pour en savoir plus.
        </span>
      </div>
    </div>
  );
}
