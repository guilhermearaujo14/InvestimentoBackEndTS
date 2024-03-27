import  Express , { Request, Response ,Router} from "express";

/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
import CadastrarInvestimentosController from "./controllers/investimentosController/CadastraInvestimentos";


const router = Router();

router.get('/teste', (req: Request, res: Response)=>{
    res.send('Rota funcionando');
})

/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento', CadastrarInvestimentosController);




export default router;