import express from "express";
import router from "./routes";
import 'dotenv/config';
import cors from 'cors';
// import Serverless from "serverless-http";


const app = express();

app.use(cors({
    origin: 'https://same-deadpool-purple-greece.bohr.io/',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true
}))

app.use(express.json())
const PORT = 3300;
app.use(router)
// conexao();

// const servlessApp = Serverless(app);

// export const handler = async (event: any, context: any) => {
//     return await servlessApp(event, context);
//   };

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando na porta ${PORT}`); 
})
export default app;