import express from "express";
import cors from "cors";
const app = express();
import contact from "./router/contact.js"

app.use(express.json())
app.use(cors)

app.use('/api/contact');
export default app 