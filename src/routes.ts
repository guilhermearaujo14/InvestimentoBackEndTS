import  Express , { Request, Response ,Router} from "express";

/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
import CadastrarInvestimentosController from "./controllers/investimentosController/CadastraInvestimentos";


const router = Router();

router.get('/teste', (req: Request, res: Response)=>{
    res.send('Rota funcionando');
})

/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento/:USUARIO_ID', CadastrarInvestimentosController);



// testes de rotas especificas
import LerGoogleSheet from "./api/google";
router.get('/google', LerGoogleSheet);



export default router;