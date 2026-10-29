
"use client";

import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo/logo.png";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark, FaChevronDown } from "react-icons/fa6";

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/habiter", label: "Habiter" },
    { href: "/investir", label: "Investir" },
    { href: "/simulateur/residence-principale", label: "Résidence principale" },
    { href: "/simulateur/investissement-locatif", label: "Investissement locatif" },
    { href: "/a-propos", label: "À propos" },
  ];

  const simulatorLinks = links.filter((link) =>
    link.href.startsWith("/simulateur/")
  );

  const mainLinks = links.filter(
    (link) => !link.href.startsWith("/simulateur/")
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "inherit";

    return () => {
      document.body.style.overflow = "inherit";
    };
  }, [open]);

  // Ferme les menus après une navigation
  useEffect(() => {
    setOpen(false);
    setSimulatorOpen(false);
  }, [pathname]);

  return (
    <header>
      <div className="logo">
        <a href="/">
          <img src={Logo.src} alt="Gold'n Patrimoine" />
        </a>
      </div>

      <div className="open">
        {!open ? (
          <FaBars
            className="icon"
            onClick={() => setOpen(true)}
          />
        ) : (
          <FaXmark
            className="icon"
            onClick={() => setOpen(false)}
          />
        )}
      </div>

      <nav className={open ? "show" : ""}>
        <ul>
  {mainLinks.map((link) => (
    <React.Fragment key={link.href}>
      {link.href === "/a-propos" && (
        <li
          className={`simulator-menu ${
            simulatorOpen ? "submenu-active" : ""
          } ${
            pathname.startsWith("/simulateur") ? "active" : ""
          }`}
          onMouseEnter={() => {
            if (window.innerWidth > 800) setSimulatorOpen(true);
          }}
          onMouseLeave={() => {
            if (window.innerWidth > 800) setSimulatorOpen(false);
          }}
        >
          <div className="nav-link-row">
            <button
              type="button"
              className="submenu-toggle"
              onClick={() => setSimulatorOpen((prev) => !prev)}
              aria-expanded={simulatorOpen}
              aria-haspopup="true"
            >
              Nos simulateurs
              <FaChevronDown />
            </button>
          </div>

          <ul
            className="simulator-submenu"
            style={{
              display: simulatorOpen ? "flex" : undefined,
            }}
          >
            {simulatorLinks.map((simulator) => (
              <li
                key={simulator.href}
                className={pathname === simulator.href ? "active" : ""}
              >
                <a href={simulator.href}>{simulator.label}</a>
              </li>
            ))}
          </ul>
        </li>
      )}

      <li className={pathname === link.href ? "active" : ""}>
        <a href={link.href}>{link.label}</a>
      </li>
    </React.Fragment>
  ))}

  <li className="mobile-contact">
    <a className="btn-full mobile-btn" href="/contact">
      Contact
    </a>
  </li>
</ul>
      </nav>

      <a className="btn-full desktop-btn" href="/contact">
        Contact
      </a>
    </header>
  );
}
