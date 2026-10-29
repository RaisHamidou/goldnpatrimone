import app from "./backend/app.js";

const PORT = process.env.PORT || 4050;

app.listen(PORT, () => {
   console.log(`Serveur lancé sur : http://localhost:${PORT}`);
});