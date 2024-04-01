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
import ExibeMeusInvestimentos from "./services/investimentosServices/ExibeMeusInvestimentos";
router.get('/meusInvestimentos/:USUARIO_ID', ExibeMeusInvestimentos);



export default router;