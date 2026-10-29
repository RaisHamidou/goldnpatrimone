import express from "express";
import cors from "cors";
const app = express();
import contactRouter from "./router/contact.js"; // ou le chemin de ton router
import dotenv from "dotenv";
dotenv.config();

app.use(express.json())
app.use(cors())

app.use("/api", contactRouter);
export default app 