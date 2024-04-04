import  Express , { Request, Response ,Router} from "express";

/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
import CadastrarInvestimentosController from "./controllers/investimentosController/CadastraInvestimentos";
import ExibeMeusInvestimentos from '../src/controllers/investimentosController/ExibeMeusInvestimentos'


/* IMPORTAÇÃO ARQUIVO TOTALIZADORES */
import ExibeTotalizadores from "./controllers/totalizadoresController";

const router = Router();

router.get('/teste', (req: Request, res: Response)=>{
    res.send('Rota funcionando');
})

/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento/:USUARIO_ID', CadastrarInvestimentosController);
router.get('/meusInvestimentos/:USUARIO_ID', ExibeMeusInvestimentos);


/* ROTAS TOTALLIZADORES */
router.get('/totalizadores/:USUARIO_ID', ExibeTotalizadores);



// testes de rotas especificas



export default router;

