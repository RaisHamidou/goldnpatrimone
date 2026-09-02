import express from "express"
import nodemailer from "nodemailer"

const router = express.Router()
const EmailContact = nodemailer.createTransport({
service:"gmail",
port:465,
secure:true,
auth:{
    user:process.env.EMAIL,
    pass: process.env.PASSWORD
}
})

EmailContact.verify((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Ready to send")
    }
})

router.post("/contact", (req, res)=>{
const {name, surname, email, tel, cityOfResidence, cityOfSearch,number0fPieces, budget, message} = req.body

 const mail = {
    from: name,
    to: "contact.dzairhistory@gmail.com",
    subject: `Email du site de la part de ${name} ${surname}`,
    html: `
    <div> 
    <h1>Info sur le client</h1>
    <h2>${name} ${surname}</h2>
    <p>Email: ${email}</p>
    <p>Tel: ${tel}</p>
    <p>Ville de résidence: ${cityOfResidence}</p>
    <p>Ville de recherche: ${cityOfSearch}</p>
    <p>Nombre de piéce: ${number0fPieces}</p>
    <p>Budget: ${budget}</p>
    </div>
    <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
})

export default router