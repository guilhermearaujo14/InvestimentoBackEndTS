import express from "express";
import router from "./routes";
import conexao from "./database";
import 'dotenv/config';


const app = express();
const PORT = 3300;
app.use(router)
conexao();

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando na porta ${PORT}`);
})
