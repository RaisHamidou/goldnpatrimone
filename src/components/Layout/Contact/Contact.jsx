"use client"

import CTA from '@/components/Elements/Buttons/CTA/CTA'
import React, {useState, useEffect} from 'react'
import { FaRegEnvelope,FaPhone } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";


export default function Contact() {
      const [status, setStatus] = useState("Envoyer");
    const [messageSend, setMessageSend] = useState(
      "Si vous avez des remarques, des idées à nous suggérer ou des erreurs à nous signaler, nous serons ravis de vous écouter."
    );
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setStatus("Envoi en cours...");
      const { name, email, subject, message } = e.target.elements;
  
      let details = {
        name: name.value,
        email: email.value,
       
        message: message.value,
      };
  
      let response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      setStatus("Envoyer");
      /* let result = await response.json(); */
      setMessageSend("Message envoyer");
      //alert(result.status)
  
      e.target.reset();
  
      setTimeout(() => {
        setMessageSend(
          "Si vous avez des remarques, des idées à nous suggérer ou des erreurs à nous signaler, nous serons ravis de vous écouter."
        );
      }, 3000);
    };

  return (
    <div id='contact'>
    <div className="container-contact">
<form onSubmit={handleSubmit}>
<h1><FaRegEnvelope className='icon-env'/>Envoyez nous un message</h1>
       <div className="input-contact">
        <input type="text" id='name' placeholder='Nom' />
        <input type="text" id='surname' placeholder='Prénom' />
       </div>
        <div className="input-contact">
        <input type="email" id='email' placeholder='Email'/>
        <input type="tel" id='tel' placeholder='Tél'/>
       </div>
        <div className="input-contact">
        <input type="text" id='cityOfResidence' placeholder='Ville de résidence'/>
        <input type="text" id='cityOfSearch' placeholder='Ville de recherche' />
       </div>
        <div className="input-contact">
        <input type="text" id='number0fPieces' placeholder='Nombre de piéce'/>
        <input type="number" id='budget' placeholder='Budget' />
       </div>
       <textarea name="message" id="message" placeholder='Décriviez nous votre demande'></textarea>
      <div type="submit" className="button-submit">
      <button>
        <CTA variant={"filled"}>

       {status}
         <AiOutlineSend className='icon-send' />
       </CTA>
      </button>
 
      </div>
      
      </form>
       <div className="container-info-contact">
        <h1><FaPhone className='tel-icon'/>Nos coordonnées</h1>
        <p>Nous sommes a votre disposition pour vous aider realiser votre projet</p>
        <div className="details-contact-info">
          <h2>Email</h2>
          <p>contact@goldnpatrimoine.com</p>
        </div>
        <div className="details-contact-info">
          <h2>Téléphone</h2>
          <p>06 20 81 00 90</p>
        </div>
      </div>
    </div>
     
    </div>
  )
}
