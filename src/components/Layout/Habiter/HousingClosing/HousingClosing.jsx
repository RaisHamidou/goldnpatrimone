
"use client"
import ContactPopup from "@/components/ContactPopup/ContactPopup";
import "./HousingClosing.scss";
import React, {useState} from 'react';
export default function HousingClosing() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="housing-closing">
      <div className="container">
        <a onClick={()=>setIsOpen(true)} className="btn outline">
          Échanger avec un conseiller →
        </a>

        <p className="note">
          Les avantages présentés sont soumis à conditions et varient selon
          les programmes et les situations individuelles.
        </p>
      </div>
      <ContactPopup isOpen={isOpen} setIsOpen={setIsOpen}/>
    </section>
  );
}
