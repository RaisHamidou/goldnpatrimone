import app from "./backend/app.js";

const PORT = 4050;


app.listen(process.env.PORT, ()=>{
    `http://localhost:${PORT}`
})