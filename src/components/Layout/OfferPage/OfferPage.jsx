"use client"
import CTA from "@/components/Elements/Buttons/CTA/CTA";
import ProductCards from "@/components/Elements/Cards/productCards/productCards";
import { FaSliders,FaHeadset } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";

import React, { useState } from "react";

const VILLES = [
  { id: 1, nom: "Paris", codePostal: "75000", departement: "Paris", region: "Île-de-France" },
  { id: 2, nom: "Marseille", codePostal: "13000", departement: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur" },
  { id: 3, nom: "Lyon", codePostal: "69000", departement: "Rhône", region: "Auvergne-Rhône-Alpes" },
  { id: 4, nom: "Toulouse", codePostal: "31000", departement: "Haute-Garonne", region: "Occitanie" },
  { id: 5, nom: "Nice", codePostal: "06000", departement: "Alpes-Maritimes", region: "Provence-Alpes-Côte d'Azur" },
  { id: 6, nom: "Nantes", codePostal: "44000", departement: "Loire-Atlantique", region: "Pays de la Loire" },
  { id: 7, nom: "Montpellier", codePostal: "34000", departement: "Hérault", region: "Occitanie" },
  { id: 8, nom: "Strasbourg", codePostal: "67000", departement: "Bas-Rhin", region: "Grand Est" },
  { id: 9, nom: "Bordeaux", codePostal: "33000", departement: "Gironde", region: "Nouvelle-Aquitaine" },
  { id: 10, nom: "Lille", codePostal: "59000", departement: "Nord", region: "Hauts-de-France" },
  { id: 11, nom: "Rennes", codePostal: "35000", departement: "Ille-et-Vilaine", region: "Bretagne" },
  { id: 12, nom: "Reims", codePostal: "51100", departement: "Marne", region: "Grand Est" },
  { id: 13, nom: "Le Havre", codePostal: "76600", departement: "Seine-Maritime", region: "Normandie" },
  { id: 14, nom: "Saint-Étienne", codePostal: "42000", departement: "Loire", region: "Auvergne-Rhône-Alpes" },
  { id: 15, nom: "Toulon", codePostal: "83000", departement: "Var", region: "Provence-Alpes-Côte d'Azur" },
];

export default function OfferPage() {
  const [ville, setVille] = useState("");

  return (
    <div className="section-offre">
      <div className="container-offer">
        <div className="container-filter">
          <aside>
            <div className="city-filter">
              <div className="filter-title">Affinez votre recherche</div>

              <div className="input-city-filter">
                <div className="lieu">Lieu</div>

                <div className="filter-group">
                  <select
                    id="villeSelect"
                    name="ville"
                    className={`filter-select ${ville === "" ? "is-placeholder" : ""}`}
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                  >
                    <option value="">Villes</option>
                    {VILLES.map((v) => (
                      <option key={v.id} value={v.nom}>
                        {v.nom} ({v.codePostal})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="submit-city-filter">
                  <CTA variant="filled"> <FaSliders/> Filtrer</CTA>
                </div>
              </div>
            </div>
            <div className="container-info-offer">
            <div className="info-offer-icon">
              <FaHeadset className="headM"/>
            </div>
              <div className="info-offer-title">Besoin d’un conseil ? </div>
              <div className="info-offer-content">Nos conseillez vous accompgne dans vos recherche</div>
              <a className="callback-info">
                Être rappelé <FaLongArrowAltRight/>
              </a>
            </div>
          </aside>
        </div>

        <div className="container-cards">
        <div className="cards-offer">
                    <ProductCards />
          <ProductCards />
          <ProductCards />
          <ProductCards />
          <ProductCards />
          <ProductCards />
          <ProductCards />
          <ProductCards />
          <ProductCards />
        </div>
          <div className="more-offer">
            <CTA variant={"outline"}>
              Voir plus
            </CTA>
          </div>
        </div>
      </div>
    </div>
  );
}